import PostsData from "../../../../../_assets/posts.json";
import type { Post as PostType } from "../../../../../_utils/types";
import type { Metadata } from "next";
import PostClient from "./client";

const Posts = () => {
  return <PostClient />;
};

export default Posts;

type Props = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = PostsData.posts.find(
    (post: PostType) =>
      post.slug === params.slug &&
      post.date === `${params.year}/${params.month}/${params.day}`
  );

  if (post === undefined) {
    return {
      title: `${params.year}/${params.month}/${params.day}/${params.slug} not found`,
    };
  }

  const title = post.title;
  const description = post.description;
  const imageParams = new URLSearchParams();
  imageParams.set("slug", post.slug);
  imageParams.set("date", post.date);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: `/api/og?${imageParams.toString()}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.date}/${post.slug}`,
    }
  };
}
