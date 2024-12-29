import { ImageResponse } from "next/og";
import Postcard from "../../_components/Postcard";
import type { NextRequest } from "next/server";
import BlogSettings from "../../_assets/blog_settings.json";
import Posts from "../../_assets/posts.json";
import type { Post } from "../../_utils/types";

const glowSansFont = async () => {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = new URL(`${base}/GlowSansJ-Normal-Bold.otf`, import.meta.url)
  const response = await fetch(url)
  if (response.status == 200) {
    return await response.arrayBuffer()
  }
  throw new Error('failed to load font data')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const date = searchParams.get("date") || "";
  const postsJson: Post[] = Posts.posts.concat(Posts.daily, Posts.weekly, Posts.monthly, Posts.annual);
  const post = postsJson.find((post) => post.slug === slug && post.date === date);
  if (!post) {
    throw new Error("Post not found");
  }
  const fontData = await glowSansFont();
  return new ImageResponse(
    <Postcard
      post={post}
      blog_settings={BlogSettings}
      is_og={true}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GlowSansJ-Normal-Bold",
          data: fontData,
          style: "normal",
        }
      ]
    }
  )
}

