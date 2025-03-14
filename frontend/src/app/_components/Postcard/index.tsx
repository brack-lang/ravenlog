import type { Post } from "../../_utils/types";
import type { BlogSettings } from "src/app/_utils/types";
import type { CSSProperties } from 'react';
import Image from "next/image";

type Props = {
  post: Post;
  blog_settings: BlogSettings;
  is_og?: boolean;
};

const Postcard = ({ post, blog_settings, is_og }: Props) => {
  const outerWidth = is_og ? 1200 : 350;
  const style_postcard = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  const style_outer = {
    margin: is_og ? "0" : `${10 * outerWidth / 420}px`,
    backgroundColor: "#3c405b",
    height: `${630 * outerWidth / 1200}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: `${outerWidth}px`,
    padding: `0 ${10 * outerWidth / 420}px`,
  };
  const style_inner = {
    width: `${1110 * outerWidth / 1200}px`,
    height: `${530 * outerWidth / 1200}px`,
    backgroundColor: "#eee",
    borderRadius: `${8 * outerWidth / 420}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const style_container: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "80%",
  }
  const style_top: CSSProperties = {
    color: "#222",
    width: "85%",
    display: "flex",
    flexDirection: "column",
  }
  const style_title: CSSProperties = {
    fontSize: `${16 * outerWidth / 350}px`,
    wordBreak: "break-word",
    fontWeight: "600",
    lineHeight: "1.3",
    marginTop: `${8 * outerWidth / 420}px`,
  };
  const style_description = {
    fontSize: `${8 * outerWidth / 350}px`,
    color: "#222",
    fontWeight: "600",
    marginTop: `${8 * outerWidth / 420}px`,
  };
  const style_tags = {
    fontSize: `${8 * outerWidth / 350}px`,
    color: "#222",
    fontWeight: "600",
    marginTop: `${4 * outerWidth / 420}px`,
  };
  const style_metadata = {
    display: "flex",
    alignItems: "center",
    width: "85%",
    marginTop: "auto",
  };
  const style_icon = {
    borderRadius: "50%",
    width: `${40 * outerWidth / 420}px`,
    height: `${40 * outerWidth / 420}px`,
    marginRight: `${8 * outerWidth / 350}px`,
  };
  const style_name_and_date: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    marginLeft: `${4 * outerWidth / 420}px`,
  };
  const style_name: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    fontSize: `${13 * outerWidth / 420}px`,
    color: "#222",
    fontWeight: "600",
  };
  const style_date: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    fontSize: `${10 * outerWidth / 420}px`,
    color: "#222",
    fontWeight: "600",
  }
  const style_logo = {
    marginLeft: "auto",
    height: `${40 * outerWidth / 420}px`,
  }
  return (
    <a style={style_postcard}href={`/posts/${post.date}/${post.slug}`}>
      <span style={style_outer}>
        <span style={style_inner}>
          <span style={style_container}>
            <span style={style_top}>
              <p style={style_title}>{post.title}</p>
              <p style={style_description}>{post.description}</p>
              <p style={style_tags}>
                {post.tags.map((tag: string) => `#${tag}`).join(" ")}
              </p>
            </span>
            <span style={style_metadata}>
              <Image
                style={style_icon}
                src={`/${post.author.icon}`}
                alt="the author's icon"
                width={40 * outerWidth / 350}
                height={40 * outerWidth / 350}
              />
              <span style={style_name_and_date}>
                <span style={style_name}>{post.author.name}</span>
                <span style={style_date}>{post.date}</span>
              </span>
              <Image
                style={style_logo}
                src={`/${blog_settings.logo}`}
                alt="the blog's logo"
                height={40 * outerWidth / 350}
                width={40 * outerWidth / 350 * 2}
              />
            </span>
          </span>
        </span>
      </span>
    </a>
  );
};

export default Postcard;
