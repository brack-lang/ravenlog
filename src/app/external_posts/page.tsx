import type { Metadata } from "next";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import BlogSettings from "../_assets/blog_settings.json";
import ExternalPostsList from "../_components/ExternalPostsList";

const ExternalPosts = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const externalPosts = await fetch(`${baseUrl}/api/external_posts`).then((res) => res.json());
  return (
    <>
      <Header
        title={BlogSettings.external.heading}
        description={`${ExternalPosts.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <ExternalPostsList posts={externalPosts.posts} />
      <Footer />
    </>
  );
};

export default ExternalPosts;

export const metadata: Metadata = {
  title: BlogSettings.external.heading,
};
