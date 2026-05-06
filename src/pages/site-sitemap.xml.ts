import type { APIRoute } from 'astro';

const SITE_URL = 'https://www.russonv.com';

const URLS = [
  { path: '/',           priority: '1.0', changefreq: 'weekly' },
  { path: '/services',   priority: '0.9', changefreq: 'monthly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects',   priority: '0.8', changefreq: 'monthly' },
  { path: '/safety',     priority: '0.7', changefreq: 'monthly' },
  { path: '/about',      priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',    priority: '0.9', changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(u => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
