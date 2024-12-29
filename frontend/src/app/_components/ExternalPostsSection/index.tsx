import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ExternalPost } from "../../_utils/types";
import "./style.css";
import ExternalPostcard from "../ExternalPostcard";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  description: string;
  to_index_page_link: string;
  external_posts: ExternalPost[];
  icon: IconDefinition;
};

const ExternalPostsSection = ({
  title,
  description,
  to_index_page_link,
  external_posts,
  icon,
}: Props) => {
  return (
    <div className="new_external_posts_section">
      <h2>
        <FontAwesomeIcon icon={icon} className="icon" />
        {title}
      </h2>
      <p className="description">{description}</p>
      {external_posts.length === 0 ? (
        <div className="no_posts">
          <p>まだ投稿されていません</p>
        </div>
      ) : (<>
        <div className="postcard_wrapper">
          {external_posts
            .slice(0, Math.min(5, external_posts.length))
            .map((post: ExternalPost) => (
              <ExternalPostcard
                post={post}
                key={post.title}
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

export default ExternalPostsSection;
