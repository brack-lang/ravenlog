import type { Metadata } from "next";
import Posts from "@/app/_assets/posts.json";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import PostsList from "../_components/PostsList";

const Daily = () => {
  return (
    <>
      <Header
        title={BlogSettings.daily.heading}
        description={`${Posts.daily.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={Posts.daily} />
      <Footer />
    </>
  );
};

export default Daily;

export const metadata: Metadata = {
  title: BlogSettings.daily.heading,
};
