import type { ExternalPost } from "src/app/_utils/types";
import TextBody from "../TextBody";
import "./style.css";

type Props = {
  posts: ExternalPost[];
}

const ExternalPostsList = ({ posts }: Props) => {
  return (
    <div className="postsList">
      <TextBody>
        <ul className="postsList_list">
          {posts.map((post: ExternalPost) => (
            <li
              key={`${post.title}-${post.pubDate}`}
              className="postsList_item"
            >
              <span>
                {post.pubDate}:{" "}
                <a href={post.link} target="_blank" rel="noreferrer noopenner">{post.title}</a>
              </span>
            </li>
          ))}
        </ul>
      </TextBody>
    </div>
  )
}

export default ExternalPostsList;
