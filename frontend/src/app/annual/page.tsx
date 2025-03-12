import type { Metadata } from "next";
import Posts from "@/app/_assets/posts.json";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import PostsList from "../_components/PostsList";

const Annual = () => {
  return (
    <>
      <Header
        title={BlogSettings.annual.heading}
        description={`${Posts.annual.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={Posts.annual} />
      <Footer />
    </>
  );
};

export default Annual;

export const metadata: Metadata = {
  title: BlogSettings.annual.heading,
};

