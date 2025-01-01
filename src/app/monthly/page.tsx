import type { Metadata } from "next";
import Posts from "../_assets/posts.json";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import PostsList from "../_components/PostsList";

const Monthly = () => {
  return (
    <>
      <Header
        title={BlogSettings.monthly.heading}
        description={`${Posts.monthly.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={Posts.monthly} />
      <Footer />
    </>
  );
};

export default Monthly;

export const metadata: Metadata = {
  title: BlogSettings.monthly.heading,
};

