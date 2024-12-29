import type { Metadata } from "next";
import Posts from "../_assets/posts.json";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import PostsList from "../_components/PostsList";

const Weekly = () => {
  return (
    <>
      <Header
        title={BlogSettings.weekly.heading}
        description={`${Posts.weekly.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={Posts.weekly} />
      <Footer />
    </>
  );
};

export default Weekly;

export const metadata: Metadata = {
  title: BlogSettings.weekly.heading,
};

