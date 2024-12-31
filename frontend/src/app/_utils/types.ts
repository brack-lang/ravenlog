export type Post = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  slug: string;
  author: Author;
  body: string;
};

export type Author = {
  name: string;
  icon: string;
  id: string;
  email?: string;
  website?: string;
  github_id?: string;
  x_id?: string;
  admin?: boolean;
};

export type ExternalPost = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  media: string;
};

export type Link = {
  text: string;
  href: string;
};

export type Footer = {
  admin: string;
  period: string;
  links: Link[];
};

export type PostsList = {
  heading: string;
  description: string;
  icon: string;
};

export type ExternalZenn = {
  id: string;
};

export type ExternalNote = {
  id: string;
};

export type External = {
  heading: string;
  description: string;
  zenn: ExternalZenn;
  note: ExternalNote;
};

export type Daily = {
  heading: string;
  description: string;
};

export type Weekly = {
  heading: string;
  description: string;
};

export type Monthly = {
  heading: string;
  description: string;
};

export type Annual = {
  heading: string;
  description: string;
};

export type BlogSettings = {
  title: string;
  description: string;
  comments: string[];
  footer: Footer;
  logo: string;
  external: External;
  daily: Daily;
  weekly: Weekly;
  monthly: Monthly;
  annual: Annual;
  authors: Author[];
};

export type AllPosts = {
  posts: Post[];
  daily: Post[];
  weekly: Post[];
  monthly: Post[];
  annual: Post[];
};
