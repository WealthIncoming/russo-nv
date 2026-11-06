import type { APIRoute } from 'astro';
import { sortedArticles, ARTICLE_BASE } from '@/data/articles';
import { CASE_STUDIES } from '@/data/case-studies';

const SITE_URL = 'https://www.russonv.com';

const PAGES = [
  { path: '/',           priority: '1.0', changefreq: 'weekly' },
  { path: '/services',   priority: '0.9', changefreq: 'monthly' },
  { path: '/services/industriele-schilderwerken', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/tankcoating', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/industrieel-stralen', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/corrosiebescherming', priority: '0.9', changefreq: 'monthly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects',   priority: '0.8', changefreq: 'monthly' },
  { path: '/safety',     priority: '0.7', changefreq: 'monthly' },
  { path: '/about',      priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',    priority: '0.9', changefreq: 'monthly' },
  { path: ARTICLE_BASE,  priority: '0.8', changefreq: 'weekly' },
];

const enPath = (path: string) => (path === '/' ? '/en' : `/en${path}`);

const xmlEscape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Real project photos with descriptive alt text belong in Google Images too.
const imageTags = (images: (string | undefined)[]) =>
  [...new Set(images.filter(Boolean) as string[])]
    .map((src) => `\n    <image:image><image:loc>${xmlEscape(src.startsWith('http') ? src : SITE_URL + src)}</image:loc></image:image>`)
    .join('');

const alternatesFor = (nlUrl: string, enUrl: string) =>
  `    <xhtml:link rel="alternate" hreflang="nl-be" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="nl" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${nlUrl}" />`;

const urlBlock = (loc: string, changefreq: string, priority: string, alternates: string, lastmod?: string, images = '') =>
  `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}${images}
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

  const caseEntries = CASE_STUDIES.flatMap((c) => {
    const path = `/projects/${c.slug}`;
    const nlUrl = `${SITE_URL}${path}`;
    const enUrl = `${SITE_URL}${enPath(path)}`;
    const alternates = alternatesFor(nlUrl, enUrl);
    const images = imageTags([c.heroImage, c.secondaryImage]);
    return [
      urlBlock(nlUrl, 'monthly', '0.7', alternates, undefined, images),
      urlBlock(enUrl, 'monthly', '0.7', alternates, undefined, images),
    ];
  });

  const articleEntries = sortedArticles().flatMap((article) => {
    const path = `${ARTICLE_BASE}/${article.slug}`;
    const nlUrl = `${SITE_URL}${path}`;
    const enUrl = `${SITE_URL}${enPath(path)}`;
    const alternates = alternatesFor(nlUrl, enUrl);
    const lastmod = (article.updated ?? article.date).slice(0, 10);
    const inline = article.NL.body.flatMap((b) => (b.type === 'image' ? [b.src] : []));
    const images = imageTags([article.heroImage, ...inline]);
    return [
      urlBlock(nlUrl, 'monthly', '0.7', alternates, lastmod, images),
      urlBlock(enUrl, 'monthly', '0.7', alternates, lastmod, images),
    ];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...pageEntries, ...caseEntries, ...articleEntries].join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
