---
title: Implementing Digest Authentication in .NET
author: Callum Houghton
date: 2022-05-04
---

'The HttpClient class should handle this' I hear you say. Well, unfortunately setting network credentials on a HttpClient instance didn't seem to work for me. [Multiple](https://stackoverflow.com/questions/62190100/c-sharp-httpclient-digest-authentication-not-work) [people](https://stackoverflow.com/questions/59939357/net-core-httpclient-digest-authentication) [seem](https://stackoverflow.com/questions/65761976/net-5-httpclient-digest-authentication) [to](https://github.com/dotnet/runtime/issues/50283) be reporting that they also were running into issues. I couldn't find any information as to whether this should be fixed in .NET 6, plus I needed it to be portable to .NET Framework 4.8 (💀💀💀). Either way, I'm going to run through how I implemented digest authentication as an extension method for the HttpClient class.

**TL;DR: You can read the code in my GitHub repository [here](https://github.com/CallumHoughton18/csharp-dotnet-digest-authentication), the README provides an example usage. For one request we generate two requests using my method as nothing (nonces, nonce counts) is cached. You can probably cache the header and implement the nonce count properly but that is beyond the scope of what I needed.**

This isn't going to implement the full RFC specification for digest authentication. Instead it should be a pretty good starting point for people looking for something that 'just works'.

I'll be using [Httpbin](https://httpbin.org/) to simulate the digest authentication workflow.

### Prerequisites

* Familiarity with .NET development
* Familiarity with HTTP
* A fuzzy idea of what digest authentication is and or knowledge of basic authentication
* Be frustrated that .NET doesn't do this for you (❗**IMPORTANT**❗)

### Digest Authentication - An Overview

[Wikipedia already gives a great overview](https://en.wikipedia.org/wiki/Digest_access_authentication) of how digest authentication works. If you want a more in depth explanation you should probably read that. But to follow along all you really need to know is:

* A request is sent, the server responds with a 401, and the response has a header like:

    `WWW-Authenticate: Digest realm="testrealm@host.com",
                        qop="auth",
                        nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                        opaque="5ccc069c403ebaf9f0171e9517f40e41"`
* You parse the header and retrieve the realm, qop (quality of protection), nonce, and opaque challenges.
* Using a combination of the username, password, and nonces you calculate some new hashes and build up an Authorization header like:

    `Authorization: Digest username="Mufasa",
                     realm="testrealm@host.com",
                     nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                     uri="/dir/index.html",
                     qop=auth,
                     nc=00000001,
                     cnonce="0a4f113b",
                     response="6629fae49393a05397450978507c4ef1",
                     opaque="5ccc069c403ebaf9f0171e9517f40e41"`
* You then resend the request with the given authorization header, which should allow you access to the resource.

A couple of things to note here. One being that in my use case I only needed to use MD5 as my hashing algorithm. Digest authentication can also use SHA-256, and this is usually specified in the challenge `algorithm=SHA-256,` in the WWW-Authenticate header. [Though the mdn web docs suggest this isn't really supported and rarely used](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) so for simplicity I haven't accounted for my use case.

The last thing is that the quality of protection (qop) challenge can have more values than just 'auth'. Some examples you may see it like `qop=auth-int` where `auth-int` is authentication with integrity protection. Again, I didn't need to account for this for my use case.

### Interpreting the 401 Error

Below, you can see the code for wiring up a HttpClient instance to try and get a resource at httpbin:

```csharp
var client = new HttpClient();
client.BaseAddress = new Uri("https://httpbin.org");
var response = await client.GetAsync("/digest-auth/auth/username/password");
```

You can see the response code is 401 if you inspect it with a debugger.

Digging further you can see one of the response headers is `WWW-Authenticate: Digest realm="me@kennethreitz.com", nonce="dd355b0ef0f19b473c6a6609aa288adb", qop="auth", opaque="5a6aa7c0f368ef5c3ae070778fcd54f2", algorithm=MD5, stale=FALSE`. This is our first indication that this response is an authentication challenge response, it even gives us the authentication type: `Digest`.

### Parsing the WWW-Authenticate Header

Using the code below we can parse the WWW-Authenticate header to pull out the values we need to generate an authorization header. Which will be added to our second, authenticated, request.

```csharp
var wwwAuthenticateHeaderValue = response.Headers.GetValues("WWW-Authenticate").FirstOrDefault();

var realm = GrabHeaderVar("realm", wwwAuthenticateHeaderValue);
var nonce = GrabHeaderVar("nonce", wwwAuthenticateHeaderValue);
var qop = GrabHeaderVar("qop", wwwAuthenticateHeaderValue);

var clientNonce = new Random().Next(123400, 9999999).ToString();
var opaque = GrabHeaderVar("opaque", wwwAuthenticateHeaderValue);

private static string GetChallengeValueFromHeader(string challengeName, string fullHeaderValue)
{
    // if variableName = qop, the below regex would look like qop="([^""]*)"
    // So it matches anything with the challenge name and then gets the challenge value
    var regHeader = new Regex($@"{challengeName}=""([^""]*)""");
    var matchHeader = regHeader.Match(fullHeaderValue);
    
    if (matchHeader.Success) return matchHeader.Groups[1].Value;
    
    throw new ApplicationException($"Header {challengeName} not found");
}
```

I then opt'd to throw the parsed challenge values into a class just to make it easier to manage. You'll also notice here I'm not doing anything fancy with maintaining the nonce count state. **This is because if the server see's the same nonce count for a previously sent nonce, the response will be a replay**. This was fine for my use case where I was just accessing static content, but it's something to keep in mind. This *might* lead to servers rejecting a request if they interpret it as a replay attack. That sounds like a problem for another day to me 👉😎👉.

```csharp
var digestHeader = new DigestAuthHeader(realm, username, password, nonce, qop, nonceCount: 1, clientNonce, opaque);

internal class DigestAuthHeader
{
    public DigestAuthHeader(string realm, string username, string password, string nonce, string qualityOfProtection, 
        int nonceCount, string clientNonce, string opaque)
    {
        Realm = realm;
        Username = username;
        Password = password;
        Nonce = nonce;
        QualityOfProtection = qualityOfProtection;
        NonceCount = nonceCount;
        ClientNonce = clientNonce;
        Opaque = opaque;
    }

    public string Realm { get; }
    public string Username { get; }
    public string Password { get; }
    public string Nonce { get; }
    public string QualityOfProtection { get; }
    public int NonceCount { get; }
    public string ClientNonce { get; }
    public string Opaque { get; }
}
```

### Generating the Challenge Response Header

With the challenge values pulled out we can generate the challenge response `Authorization` header value, using the code below:

```csharp
private static string GenerateMD5Hash(string input)
{
    // x2 formatter is for hexadecimal in the ToString function
    using MD5 hash = MD5.Create();
    return string.Concat(hash.ComputeHash(Encoding.UTF8.GetBytes(input))
                                .Select( x => x.ToString("x2"))
    );
} 

private static string GetDigestHeader(DigestAuthHeader digest, string digestUri, HttpMethod method)
{
    var ha1 = GenerateMD5Hash($"{digest.Username}:{digest.Realm}:{digest.Password}");
    var ha2 = GenerateMD5Hash($"{method}:{digestUri}");
    var digestResponse =
        GenerateMD5Hash($"{ha1}:{digest.Nonce}:{digest.NonceCount:00000000}:{digest.ClientNonce}:{digest.QualityOfProtection}:{ha2}");

    var headerString =
        $"Digest username=\"{digest.Username}\", realm=\"{digest.Realm}\", nonce=\"{digest.Nonce}\", uri=\"{digestUri}\", " +
        $"algorithm=MD5, qop={digest.QualityOfProtection}, nc={digest.NonceCount:00000000}, cnonce=\"{digest.ClientNonce}\", " +
        $"response=\"{digestResponse}\", opaque=\"{digest.Opaque}\"";

    return headerString;
}
```

Because I'm super lazy, I'll copy and paste the Wikipedia explanation that links to the above code section:

The "response" value is calculated in three steps, as follows. Where values are combined, they are delimited by colons.

1. The MD5 hash of the combined username, authentication realm and password is calculated. The result is referred to as Ha1.
2. The MD5 hash of the combined method and digest URI is calculated, e.g. of "GET" and "/dir/index.html". The result is referred to as Ha2.
3. The MD5 hash of the combined HA1 result, server nonce (nonce), request counter (nc), client nonce (cnonce), quality of protection code (qop) and HA2 result is calculated. The result is the "response" value provided by the client.

### Extending the HttpClient class

I decided to wrap all this authentication and re-sending requests in an extension method, which you can see below:

```csharp
public static async Task<HttpResponseMessage> SendWithDigestAuthAsync(this HttpClient client, 
    HttpRequestMessage request, HttpCompletionOption httpCompletionOption,
    string username, string password)
{
    var newRequest = CloneBeforeContentSet(request);
    var response = await client.SendAsync(request, httpCompletionOption);
    if (response.StatusCode != System.Net.HttpStatusCode.Unauthorized) return response;

    var wwwAuthenticateHeaderValue = response.Headers.GetValues("WWW-Authenticate").FirstOrDefault();

    var realm = GetChallengeValueFromHeader("realm", wwwAuthenticateHeaderValue);
    var nonce = GetChallengeValueFromHeader("nonce", wwwAuthenticateHeaderValue);
    var qop = GetChallengeValueFromHeader("qop", wwwAuthenticateHeaderValue);

    // Must be fresh on every request, so low chance of same client nonce here by just using a random number.
    var clientNonce = new Random().Next(123400, 9999999).ToString();
    var opaque = GetChallengeValueFromHeader("opaque", wwwAuthenticateHeaderValue);

    var digestHeader = new DigestAuthHeader(realm, username, password, nonce, qop, nonceCount: 1, clientNonce, opaque);
    var digestRequestHeader = GetDigestHeader(digestHeader, newRequest.RequestUri.ToString(), request.Method);

    newRequest.Headers.Add("Authorization", digestRequestHeader);
    var authRes = await client.SendAsync(newRequest, httpCompletionOption);
    return authRes;
}

private static HttpRequestMessage CloneBeforeContentSet(this HttpRequestMessage req)
{
    // Deep clone of a given request, outlined here:
    // https://stackoverflow.com/questions/18000583/re-send-httprequestmessage-exception/18014515#18014515
    HttpRequestMessage clone = new HttpRequestMessage(req.Method, req.RequestUri);

    clone.Content = req.Content;
    clone.Version = req.Version;

    foreach (KeyValuePair<string, object> prop in req.Properties)
    {
        clone.Properties.Add(prop);
    }

    foreach (KeyValuePair<string, IEnumerable<string>> header in req.Headers)
    {
        clone.Headers.TryAddWithoutValidation(header.Key, header.Value);
    }

    return clone;
}
```

### The Final Call 🤞

With all the nasty authentication stuff abstracted away the final function calls should look fairly simple and you're really just substituting one method call:

```csharp
var client = new HttpClient();
client.BaseAddress = new Uri("https://httpbin.org");

var request = new HttpRequestMessage(HttpMethod.Get, "/digest-auth/auth/username/password");
request.Headers.Add("Accept", "*/*");
request.Headers.Add("User-Agent", "HttpClientDigestAuthTester");
request.Headers.Add("Accept-Encoding", "gzip, deflate, br");
request.Headers.Add("Connection", "keep-alive");

// This will no respond with a 200 status code
var response = await client.SendWithDigestAuthAsync(request, HttpCompletionOption.ResponseContentRead, "username", "password");

// this is what originally gave a 401 status code
//var response = await client.GetAsync("/digest-auth/auth/username/password");
```

Inspecting the response object should show it now responds with a 200 status code, so we've successfully performed the authentication dance with the server!

### Final Words

Hopefully someone informs me that there's a simpler more '.NET' way of doing this. Where .NET does most of the heavy lifting for you. If anyone does, be sure to reach out and I'll happily strike through this entire post and point out the better way of doing it.

As I mentioned in a previous section this implementation is far from implementing the full RFC specification for digest authentication, but it should be a decent starting point.

The code for this is on my [GitHub](https://github.com/CallumHoughton18/csharp-dotnet-digest-authentication) so feel free to have a look through or make any suggestions.
