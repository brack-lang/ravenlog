import ExternalPosts from "./_assets/external_posts.json";
import {
  faKiwiBird,
  faGlobe,
  faShrimp,
  faDove,
  faOtter,
  faDragon,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./_components/Footer";
import PostsSection from "./_components/PostsSection";
import Posts from "./_assets/posts.json";
import Header from "./_components/Header";
import { getRandomComment } from "./_utils/posts";
import ExternalPostsSection from "./_components/ExternalPostsSection";
import BlogSettings from "./_assets/blog_settings.json";

const Home = () => {
  const comment = getRandomComment();
  return (
    <>
      <Header
        title={BlogSettings.title}
        description={comment}
        show_goto_top_link={false}
      />
      <PostsSection
        title={BlogSettings.posts.heading}
        description={BlogSettings.posts.description}
        to_index_page_link="/posts"
        posts={Posts.posts}
        icon={faKiwiBird}
        blog_settings={BlogSettings}
      />
      <ExternalPostsSection
        title={BlogSettings.external.heading}
        description={BlogSettings.external.description}
        to_index_page_link="/external_posts"
        external_posts={ExternalPosts.posts}
        icon={faGlobe}
      />
      <PostsSection
        title={BlogSettings.daily.heading}
        description={BlogSettings.daily.description}
        to_index_page_link="/daily"
        posts={Posts.daily}
        icon={faShrimp}
        blog_settings={BlogSettings}
      />
      <PostsSection
        title={BlogSettings.weekly.heading}
        description={BlogSettings.weekly.description}
        to_index_page_link="/weekly"
        posts={Posts.weekly}
        icon={faDove}
        blog_settings={BlogSettings}
      />
      <PostsSection
        title={BlogSettings.monthly.heading}
        description={BlogSettings.monthly.description}
        to_index_page_link="/monthly"
        posts={Posts.monthly}
        icon={faOtter}
        blog_settings={BlogSettings}
      />
      <PostsSection
        title={BlogSettings.annual.heading}
        description={BlogSettings.annual.description}
        to_index_page_link="/annual"
        posts={Posts.annual}
        icon={faDragon}
        blog_settings={BlogSettings}
      />
      <Footer />
    </>
  );
};

export default Home;
