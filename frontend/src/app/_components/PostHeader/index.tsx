import { Post } from "../../_utils/types";
import "./style.css";
import Link from "next/link";

type Props = {
  post: Post;
};

const Header = ({ post }: Props) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const iconUrl = `${base}/${post.author.icon}`;
  return (
    <header className="header">
      <h1 className="title">{post.title}</h1>
      <p className="description">{post.description}</p>
      <p className="tags">
        {post.tags.map((tag) => (
          <Link href={`/tags/${tag}`} key={tag} className="tag">
            #{tag}
          </Link>
        ))}
      </p>
      <Link className="author" href={`/authors/${post.author.id}`}>
        <img
          src={iconUrl}
          alt={post.author.name}
          width={30}
          height={30}
          className="author_icon"
        />
        <span className="author_name">
          {post.author.name} (@{post.author.id})
        </span>
      </Link>
      <p className="publish">{post.date}に公開</p>
    </header>
  );
};

export default Header;
