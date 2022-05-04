import React from "react";
import Header from "@/components/Header";
import PageWithNavBar from "@/components/layout/PageWithHeader";
import useBlogPostsQuery from "@/hooks/useBlogPostsQuery";
import PostSummary from "@/components/page components/blog/PostSummary";

const Blog = (): JSX.Element => {
  const posts = useBlogPostsQuery();
  const postSummaries = posts.blog.posts.map(post => (
    <PostSummary
      key={post.id}
      title={post.frontmatter.title}
      author={post.frontmatter.author}
      date={post.frontmatter.date}
      excerpt={post.excerpt}
      postExternalLink={post.frontmatter.externalUrl}
      postInternalLink={post.fields.slug}
    />
  ));
  return (
    <PageWithNavBar header={<Header />}>
      <div className="flex flex-col justify-center items-center mr-5 ml-5">
        {postSummaries}
      </div>
    </PageWithNavBar>
  );
};
export default Blog;
