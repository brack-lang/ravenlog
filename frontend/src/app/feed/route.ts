import Rss from "rss";
import BlogSettings from "../_assets/blog_settings.json";
import Posts from "@/app/_assets/posts.json";

const url = String(process.env.NEXT_PUBLIC_BASE_URL);

export const revalidate = 86400;

export async function GET() {
  const feed = new Rss({
    title: BlogSettings.title,
    description: BlogSettings.description,
    feed_url: `${url}/feed`,
    site_url: url,
    language: "ja",
  });

  const posts = Posts.posts.concat(Posts.daily).concat(Posts.weekly).concat(Posts.monthly).concat(Posts.annual);
  for (const post of posts) {
    feed.item({
      title: post.title,
      description: `${post.description}`,
      url: `${url}/${post.date}/${post.slug}`,
      date: post.date,
    });
  }

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
}
