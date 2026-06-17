import type { APIRoute } from 'astro';
import { sortedArticles, ARTICLE_BASE } from '@/data/articles';

const SITE_URL = 'https://www.russonv.com';

// RSS feed for the NL "Kenniscentrum" (primary market). EN articles live at
// /en/insights/<slug>; add a second feed there later if needed.
const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = () => {
  const articles = sortedArticles();
  const lastBuild = articles[0] ? new Date(articles[0].updated ?? articles[0].date).toUTCString() : new Date(0).toUTCString();

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}${ARTICLE_BASE}/${article.slug}`;
      const c = article.NL;
      return `    <item>
      <title>${xmlEscape(c.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${xmlEscape(c.excerpt)}</description>
      <category>${xmlEscape(c.category)}</category>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Russo NV Kenniscentrum</title>
    <link>${SITE_URL}${ARTICLE_BASE}</link>
    <atom:link href="${SITE_URL}${ARTICLE_BASE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Praktische gidsen en expertise over industriële coatings, stralen en corrosiebescherming van Russo NV.</description>
    <language>nl-be</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
