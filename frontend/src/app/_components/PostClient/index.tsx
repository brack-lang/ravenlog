"use client";
import JsxParser from "react-jsx-parser";
import { codeToHtml } from "shiki";
import Posts from "@/app/_assets/posts.json";
import type { Post as PostType } from "@/app/_utils/types";

import "./style.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/app/_components/Footer";
import PostHeader from "@/app/_components/PostHeader";
import TextBody from "@/app/_components/TextBody";
import NotFound from "@/app/not-found";

import Anchor from "src/app/_ravenlog_components/Anchor";
import Bold from "src/app/_ravenlog_components/Bold";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "src/app/_ravenlog_components/Headings";
import Italic from "src/app/_ravenlog_components/Italic";
import RavenlogImage from "@/app/_ravenlog_components/RavenlogImage";
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from "src/app/_ravenlog_components/List";
import { BlockMath, InlineMath } from "src/app/_ravenlog_components/Math";
import Stmt from "src/app/_ravenlog_components/Stmt";

const InlineHighlight = ({ text, lang }: { text: string; lang: string }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const highlight = async () => {
      const result = await codeToHtml(text, {
        lang,
        theme: "github-dark-dimmed",
      });
      setHtml(result);
    };
    highlight();
  }, [text, lang]);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export const PostClient = () => {
  const { year, month, day, slug } = useParams();
  const JsxParserAny = JsxParser as unknown as React.FC<any>;

  const postsJson: PostType[] = Posts.posts.concat(Posts.daily, Posts.weekly, Posts.monthly, Posts.annual);
  const post = postsJson.find(
    (post: PostType) =>
      post.slug === slug && post.date === `${year}/${month}/${day}`
  );
  return post === undefined ? (
    <NotFound />
  ) : (
    <>
      <PostHeader post={post} />
      <TextBody>
        <JsxParserAny
          bindings={{}}
          components={{
            Stmt,
            Heading1,
            Heading2,
            Heading3,
            Heading4,
            Heading5,
            Heading6,
            Bold,
            Italic,
            InlineHighlight,
            InlineMath,
            BlockMath,
            UnorderedList,
            OrderedList,
            ListItem,
            Anchor,
            RavenlogImage,
          }}
          jsx={post.body}
        />
      </TextBody>
      <Footer />
    </>
  );
};

export default PostClient;
