"use client";
import { useParams } from "next/navigation";
import BlogSettings from "../../_assets/blog_settings.json";
import type { Author, Post } from "../../_utils/types";
import NotFound from "src/app/not-found";
import Header from "src/app/_components/Header";
import Posts from "../../_assets/posts.json";
import Footer from "src/app/_components/Footer";
import PostsList from "src/app/_components/PostsList";

const AuthorPosts = () => {
  const { author_id } = useParams();
  const author = BlogSettings.authors.find((author: Author) => author.id === author_id);
  const posts = Posts.posts.filter((post: Post) => post.author.id === author_id);
  return author == null ? (
    <NotFound />
  )
    : (<>
      <Header
        title={`${author.name}の記事`}
        description={`${posts.length}件の記事があります`}
        show_goto_top_link={true}
      />
      <PostsList posts={posts} />
      <Footer />
    </>);
}

export default AuthorPosts;

