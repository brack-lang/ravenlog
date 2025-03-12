import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Post, BlogSettings } from "../../_utils/types";
import Postcard from "../Postcard";
import "./style.css";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  description: string;
  to_index_page_link: string;
  posts: Post[];
  icon: IconDefinition;
  blog_settings: BlogSettings;
};

const PostsSection = ({
  title,
  description,
  to_index_page_link,
  posts,
  icon,
  blog_settings,
}: Props) => {
  return (
    <div className="new_posts_section">
      <h2>
        <FontAwesomeIcon icon={icon} className="icon" />
        {title}
      </h2>
      <p className="description">{description}</p>
      {posts.length === 0 ? (
        <div className="no_posts">
          <p>まだ投稿されていません</p>
        </div>
      ) : (<>
        <div className="postcard_wrapper">
          {posts
            .slice(0, Math.min(5, posts.length))
            .map((post: Post) => (
              <Postcard
                post={post}
                key={post.slug}
                blog_settings={blog_settings}
                to_index_page_link={to_index_page_link}
              />
            ))}
        </div>
        <div className="note_possible_to_slide">横にスライドできます</div>
        <div className="link_to_index_page">
          <a href={to_index_page_link}>一覧を見る</a>
        </div>
      </>)}
    </div>
  );
};

export default PostsSection;
