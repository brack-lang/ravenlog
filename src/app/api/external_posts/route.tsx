import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import BlogSettings from '../../_assets/blog_settings.json';

const parser = new Parser();

export async function GET() {
  try {
    const noteId = BlogSettings.external.note.id;
    const zennId = BlogSettings.external.zenn.id;

    const noteFeed = await parser.parseURL(`https://note.com/${noteId}/rss`);
    const zennFeed = await parser.parseURL(`https://zenn.dev/${zennId}/feed`);

    const noteArticles = noteFeed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: formatPubDate(item.pubDate),
      contentSnippet: stripHtmlTags(item.contentSnippet || ''),
      media: 'note',
    }));

    const zennArticles = zennFeed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: formatPubDate(item.pubDate),
      contentSnippet: item.contentSnippet || '',
      media: 'zenn',
    }));

    const articles = [...noteArticles, ...zennArticles].sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return NextResponse.json({ posts: articles });
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return NextResponse.json({ error: 'Failed to fetch RSS feeds' }, { status: 500 });
  }
}

function formatPubDate(dateString: string | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}
