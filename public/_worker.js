// Pages advanced mode: with a _worker.js deployed, Cloudflare ignores the
// _redirects and _headers files entirely, so all three behaviors they carried
// live here instead. _redirects cannot express domain-level rules anyway
// (the reason this worker exists): .be hosts must 301 to www.russonv.com.

const CANONICAL_HOST = "www.russonv.com";

const LEGACY_PATHS = [
  [/^\/gratis-offerte\/?$/, "/contact/"],
  [/^\/diensten(\/.*)?$/, "/services/"],
  [/^\/over-ons\/?$/, "/about/"],
  [/^\/projecten\/?$/, "/projects/"],
];

function legacyTarget(pathname) {
  for (const [pattern, target] of LEGACY_PATHS) {
    if (pattern.test(pathname)) return target;
  }
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;

    const wrongHost =
      host === "russonv.com" || host === "russonv.be" || host === "www.russonv.be";
    const legacy = legacyTarget(url.pathname);

    if (wrongHost || legacy) {
      if (wrongHost) url.hostname = CANONICAL_HOST;
      if (legacy) url.pathname = legacy;
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);

    if (host.endsWith(".pages.dev")) {
      const noindexed = new Response(response.body, response);
      noindexed.headers.set("X-Robots-Tag", "noindex");
      return noindexed;
    }

    return response;
  },
};
