import type { Metadata } from "next";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import ExternalPosts from "../_assets/external_posts.json";
import ExternalPostsList from "../_components/ExternalPostsList";

const Daily = () => {
  return (
    <>
      <Header
        title={BlogSettings.external.heading}
        description={`${ExternalPosts.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <ExternalPostsList posts={ExternalPosts.posts} />
      <Footer />
    </>
  );
};

export default Daily;

export const metadata: Metadata = {
  title: BlogSettings.daily.heading,
};
