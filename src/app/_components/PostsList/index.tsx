import type { Post } from "src/app/_utils/types";
import TextBody from "../TextBody";
import "./style.css";
import Link from "next/link";

type Props = {
  posts: Post[];
}

const PostsList = ({ posts }: Props) => {
  return (
    <div className="postsList">
      <TextBody>
        <ul className="postsList_list">
          {posts.map((post: Post) => (
            <li
              key={post.slug}
              className="postsList_item"
            >
              <span>
                {post.date}:{" "}
                <Link href={`/posts/${post.date}/${post.slug}`}>{post.title}</Link>{" "}
              </span>
              {/* <ul className="postsList_description">
                <li>{post.description}</li>
                <li>
                  by <Link href={`/authors/${post.author.id}`}>{post.author.name}</Link>
                </li>
              </ul> */}
            </li>
          ))}
        </ul>
      </TextBody>
    </div>
  )
}

export default PostsList;
