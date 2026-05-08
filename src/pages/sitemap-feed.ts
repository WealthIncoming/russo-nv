import type { APIRoute } from 'astro';

const SITE_URL = 'https://www.russonv.com';

const PAGES = [
  { path: '/',           priority: '1.0', changefreq: 'weekly' },
  { path: '/services',   priority: '0.9', changefreq: 'monthly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects',   priority: '0.8', changefreq: 'monthly' },
  { path: '/safety',     priority: '0.7', changefreq: 'monthly' },
  { path: '/about',      priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',    priority: '0.9', changefreq: 'monthly' },
];

const enPath = (path: string) => (path === '/' ? '/en' : `/en${path}`);

export const GET: APIRoute = () => {
  const entries = PAGES.flatMap((page) => {
    const nlUrl = `${SITE_URL}${page.path}`;
    const enUrl = `${SITE_URL}${enPath(page.path)}`;
    const alternates = `    <xhtml:link rel="alternate" hreflang="nl-be" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="nl" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${nlUrl}" />`;
    return [
      `  <url>
    <loc>${nlUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>`,
      `  <url>
    <loc>${enUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>`,
    ];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
