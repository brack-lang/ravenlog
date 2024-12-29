import BlogSettings from "../_assets/blog_settings.json";

export const getRandomComment = () => {
  const comments = BlogSettings.comments;
  const index = Math.floor(Math.random() * comments.length);
  return comments[index];
};
