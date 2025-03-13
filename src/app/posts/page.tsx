import type { Metadata } from "next";
import PostsData from "../_assets/posts.json";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import PostsList from "../_components/PostsList";

const Posts = () => {
  return (
    <>
      <Header
        title={BlogSettings.posts.heading}
        description={`${PostsData.posts.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={PostsData.posts} />
      <Footer />
    </>
  );
};

export default Posts;

export const metadata: Metadata = {
  title: BlogSettings.posts.heading,
};
