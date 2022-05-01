---
title: Implementing Digest Authentication in .NET
author: Callum Houghton
date: 
---

'HTTPClient should handle this' I hear you say. Well, unfortunately network credentials on a HTTPClient instance didn't seem to have any affect for me. [Multiple](https://stackoverflow.com/questions/62190100/c-sharp-httpclient-digest-authentication-not-work) [people](https://stackoverflow.com/questions/59939357/net-core-httpclient-digest-authentication) [seem](https://stackoverflow.com/questions/65761976/net-5-httpclient-digest-authentication) [to](https://github.com/dotnet/runtime/issues/50283) be reporting that they also were running into issues. I couldn't find any information as to whether this should be fixed in .NET 6. Either way, I'm going to run through in this blog post how I implemented digest authentication as an extension method for the HTTPClient class.

**TL;DR: You can read the code in my GitHub repository [here](&&insert link when done). For one request we generate two requests using my method. You can probably cache the header and implement the nonce count properly but that is beyond the scope of what I needed. [I've also published a Nuget package that does all this for you](&&insert link when done)**.

Some of the URL's may be changed / censored in the article as I don't have permission to share them, but you should be able to follow along with the server you're having trouble authenticating against.

### Digest Authentication - An Overview

[Wikipedia already gives a great overview](https://en.wikipedia.org/wiki/Digest_access_authentication) of how digest authentication works. If you want a more in depth explanation you should probably read that. Plus I'm lazy and it saves me some key strokes. But, to use the code in this article all you really need to know is:

* A request is sent, the server responds with a 401, and the response has a header like:

    `WWW-Authenticate: Digest realm="testrealm@host.com",
                        qop="auth",
                        nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                        opaque="5ccc069c403ebaf9f0171e9517f40e41"`
* You parse the header and retrievd the realm, qop (quality of protection), nonce, and opaque variables.
* Using a combination of the username, password, nonce you calculate some new hashes and build up an Authorization header like:

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

### Interpreting the 401 Error

Below, you can see the code for wiring up a HTTPClient instance to try and get a resource:

```
&& code example here
```
You can see the response code is 403 when you inspect it with the debugger. Digging further you can see one of the response headers is `www-authentication:&&header here`. This is our first indication that this response is an authentication challenge response, it even gives us the authentication type: `Digest`.

### Parsing the www-authentication Header

Using the code below we can parse the www-authentication header to pull out the values we need to go onto to generate an Authorization header to add to our second, authenticated, request.

