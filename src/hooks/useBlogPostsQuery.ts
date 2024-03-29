import { BlogPostsQuery } from "@/__autogenerated__/gatsby-graphql";
import { graphql, useStaticQuery } from "gatsby";

const useBlogPostsQuery = (): BlogPostsQuery => {
  const posts = useStaticQuery<BlogPostsQuery>(graphql`
    query blogPosts {
      blog: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        posts: nodes {
          frontmatter {
            date(fromNow: true)
            title
            author
            externalUrl
          }
          excerpt
          id
          fields {
            slug
          }
        }
      }
    }
  `);
  return posts;
};

export default useBlogPostsQuery;
