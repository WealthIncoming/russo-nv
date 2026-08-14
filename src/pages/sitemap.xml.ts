import type { APIRoute } from 'astro';
import { sortedArticles, ARTICLE_BASE } from '@/data/articles';

const SITE_URL = 'https://www.russonv.com';

const PAGES = [
  { path: '/',           priority: '1.0', changefreq: 'weekly' },
  { path: '/services',   priority: '0.9', changefreq: 'monthly' },
  { path: '/services/industriele-schilderwerken', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/tankcoating', priority: '0.9', changefreq: 'monthly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects',   priority: '0.8', changefreq: 'monthly' },
  { path: '/safety',     priority: '0.7', changefreq: 'monthly' },
  { path: '/about',      priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',    priority: '0.9', changefreq: 'monthly' },
  { path: ARTICLE_BASE,  priority: '0.8', changefreq: 'weekly' },
];

const enPath = (path: string) => (path === '/' ? '/en' : `/en${path}`);

const alternatesFor = (nlUrl: string, enUrl: string) =>
  `    <xhtml:link rel="alternate" hreflang="nl-be" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="nl" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${nlUrl}" />`;

const urlBlock = (loc: string, changefreq: string, priority: string, alternates: string, lastmod?: string) =>
  `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;

export const GET: APIRoute = () => {
  const pageEntries = PAGES.flatMap((page) => {
    const nlUrl = `${SITE_URL}${page.path}`;
    const enUrl = `${SITE_URL}${enPath(page.path)}`;
    const alternates = alternatesFor(nlUrl, enUrl);
    return [
      urlBlock(nlUrl, page.changefreq, page.priority, alternates),
      urlBlock(enUrl, page.changefreq, page.priority, alternates),
    ];
  });

  const articleEntries = sortedArticles().flatMap((article) => {
    const path = `${ARTICLE_BASE}/${article.slug}`;
    const nlUrl = `${SITE_URL}${path}`;
    const enUrl = `${SITE_URL}${enPath(path)}`;
    const alternates = alternatesFor(nlUrl, enUrl);
    const lastmod = (article.updated ?? article.date).slice(0, 10);
    return [
      urlBlock(nlUrl, 'monthly', '0.7', alternates, lastmod),
      urlBlock(enUrl, 'monthly', '0.7', alternates, lastmod),
    ];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...pageEntries, ...articleEntries].join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
