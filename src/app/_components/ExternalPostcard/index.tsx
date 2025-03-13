import Image from "next/image";
import type { ExternalPost } from "../../_utils/types";
import BlogSettings from "../../_assets/blog_settings.json";
import "./style.css";

type Props = {
  post: ExternalPost;
};

const ExternalPostcard = ({ post }: Props) => {
  const author = BlogSettings.authors.find((author) => author.admin);
  if (!author) {
    throw new Error("author not found");
  }
  return (
    <a className="external_postcard"
      href={post.link} target="_blank" rel="noopener noreferrer">
      <div className="outer">
        <div className="inner">
          <div className="container">
            <div className="top">
              <p className="title">{post.title}</p>
              <p className="description">{post.contentSnippet}</p>
            </div>
            <div className="metadata">
              <Image
                className="icon"
                src={`/${author.icon}`}
                alt="the author's icon"
                width={40}
                height={40}
              />
              <div className="name_and_date">
                <div className="name">{author.name}</div>
                <div className="date">{post.pubDate}</div>
              </div>
              {post.media === "zenn" ? (
                <Image
                  className="zenn"
                  src="/zenn.webp"
                  alt="Zenn"
                  width={90}
                  height={20}
                />
              ) : post.media === "note" ? (
                <Image
                  className="note"
                  src="/note.svg"
                  alt="note"
                  width={70}
                  height={30}
                />
              ) : (
                <Image
                  className="logo"
                  src={`/${BlogSettings.logo}`}
                  alt="the blog's logo"
                  height={40}
                  width={-1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ExternalPostcard;
