"use client";
import { useParams } from "next/navigation";
import type { Post } from "../../_utils/types";
import NotFound from "src/app/not-found";
import Header from "src/app/_components/Header";
import Posts from "../../_assets/posts.json";
import Footer from "src/app/_components/Footer";
import PostsList from "src/app/_components/PostsList";

const TagsPosts = () => {
  const { tag } = useParams();
  if (typeof tag !== "string") {
    return <NotFound />;
  }
  const decoded_tag = decodeURI(tag);
  const posts = Posts.posts.filter((post: Post) => post.tags.includes(decoded_tag));
  return (<>
      <Header
        title={`#${decoded_tag}が付けられた記事`}
        description={`${posts.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={posts} />
      <Footer />
    </>);
}

export default TagsPosts;

