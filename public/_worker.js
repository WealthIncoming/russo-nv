// Pages advanced mode: with a _worker.js deployed, Cloudflare ignores the
// _redirects and _headers files entirely, so the redirect behaviours they
// carried live here instead. _redirects cannot express domain-level rules
// anyway (the reason this worker exists): .be hosts must 301 to www.russonv.com.
//
// This worker also powers privacy-friendly, cookieless visitor analytics:
//   - logs each real page view (IP + Cloudflare edge geo) to a D1 binding `DB`,
//     viewable on the password-protected /_visits dashboard. First-party and
//     server-side, so it needs no cookie-consent banner (GDPR legitimate
//     interest; disclosed in the privacy policy; rows auto-expire after 90 days).
//   - injects the cookieless Cloudflare Web Analytics beacon when the
//     WEB_ANALYTICS_TOKEN variable is set.
//
// Every binding/variable below is OPTIONAL. If DB, ADMIN_PASSWORD or
// WEB_ANALYTICS_TOKEN are unset the site behaves exactly as it did before —
// logging is skipped, the beacon is not injected, and /_visits explains what
// is still missing. Nothing here can break a page render.

const CANONICAL_HOST = "www.russonv.com";
const RETENTION_DAYS = 90;

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

// ---------------------------------------------------------------------------
// Visit logging (D1)
// ---------------------------------------------------------------------------

const VISITS_DDL =
  "CREATE TABLE IF NOT EXISTS visits (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL, ip TEXT, " +
  "country TEXT, city TEXT, region TEXT, org TEXT, path TEXT, " +
  "referer TEXT, ua TEXT)";

async function logVisit(request, env) {
  if (!env.DB) return;
  const url = new URL(request.url);
  const cf = request.cf || {};
  const insert = env.DB.prepare(
    "INSERT INTO visits (ts, ip, country, city, region, org, path, referer, ua) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(
    new Date().toISOString(),
    request.headers.get("CF-Connecting-IP") || null,
    cf.country || null,
    cf.city || null,
    cf.region || null,
    cf.asOrganization || null,
    url.pathname,
    request.headers.get("Referer") || null,
    request.headers.get("User-Agent") || null
  );

  try {
    await insert.run();
  } catch (err) {
    // First write against a fresh database: create the table, then retry once.
    try {
      await env.DB.prepare(VISITS_DDL).run();
      await insert.run();
    } catch (_) {
      // Never let analytics break a page render — swallow and move on.
      return;
    }
  }

  // Self-expiring retention: on ~2% of writes, sweep rows past the window.
  // ISO-8601 UTC timestamps sort lexicographically, so a string compare works.
  if (Math.random() < 0.02) {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400000).toISOString();
    try {
      await env.DB.prepare("DELETE FROM visits WHERE ts < ?").bind(cutoff).run();
    } catch (_) { /* ignore */ }
  }
}

// ---------------------------------------------------------------------------
// /_visits dashboard (HTTP Basic Auth)
// ---------------------------------------------------------------------------

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Russo NV visitor log", charset="UTF-8"',
      "content-type": "text/plain; charset=UTF-8",
    },
  });
}

// Length-leaking but value-constant comparison — good enough to blunt timing
// attacks on a low-value single-user admin page.
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Returns true (authorised), false (bad/missing credentials) or "unset"
// (no ADMIN_PASSWORD configured yet).
function checkAuth(request, env) {
  if (!env.ADMIN_PASSWORD) return "unset";
  const header = request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) return false;
  let decoded = "";
  try { decoded = atob(header.slice(6)); } catch (_) { return false; }
  const sep = decoded.indexOf(":");
  const user = sep === -1 ? "" : decoded.slice(0, sep);
  const pass = sep === -1 ? decoded : decoded.slice(sep + 1);
  return safeEqual(user, env.ADMIN_USER || "russo") && safeEqual(pass, env.ADMIN_PASSWORD);
}

function plain(message, status) {
  return new Response(message, {
    status: status || 200,
    headers: { "content-type": "text/plain; charset=UTF-8", "cache-control": "no-store" },
  });
}

function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function handleVisits(request, env) {
  const auth = checkAuth(request, env);
  if (auth === "unset") {
    return plain(
      "Visitor log not configured yet.\n\nSet an ADMIN_PASSWORD environment variable on this " +
      "Pages project (Settings -> Variables and Secrets) to enable this page.",
      503
    );
  }
  if (!auth) return unauthorized();
  if (!env.DB) {
    return plain(
      "Visitor log database not connected yet.\n\nAdd a D1 binding named DB to this Pages " +
      "project (Settings -> Functions -> D1 database bindings), then redeploy.",
      503
    );
  }

  const url = new URL(request.url);
  const wantsJson = url.pathname.endsWith(".json") || url.searchParams.get("format") === "json";

  let recent = [], daily = [], totals = { hits: 0, visitors: 0 };
  try {
    recent = (await env.DB.prepare(
      "SELECT ts, ip, country, city, region, org, path, referer, ua " +
      "FROM visits ORDER BY ts DESC LIMIT 300"
    ).all()).results || [];
    daily = (await env.DB.prepare(
      "SELECT substr(ts, 1, 10) AS day, COUNT(*) AS hits, COUNT(DISTINCT ip) AS visitors " +
      "FROM visits GROUP BY day ORDER BY day DESC LIMIT 30"
    ).all()).results || [];
    totals = (await env.DB.prepare(
      "SELECT COUNT(*) AS hits, COUNT(DISTINCT ip) AS visitors FROM visits"
    ).first()) || totals;
  } catch (_) {
    // Table not created until the first visit is logged.
    return plain("No visits recorded yet. Check back after the site receives traffic.");
  }

  if (wantsJson) {
    return new Response(JSON.stringify({ totals, daily, recent }, null, 2), {
      headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" },
    });
  }

  const dailyRows = daily.map((d) =>
    `<tr><td>${esc(d.day)}</td><td class="num">${d.hits}</td><td class="num">${d.visitors}</td></tr>`
  ).join("");

  const visitRows = recent.map((v) => `<tr>
    <td class="nowrap">${esc((v.ts || "").replace("T", " ").slice(0, 16))}</td>
    <td class="mono">${esc(v.ip)}</td>
    <td>${esc([v.city, v.region, v.country].filter(Boolean).join(", "))}</td>
    <td>${esc(v.org)}</td>
    <td class="mono">${esc(v.path)}</td>
    <td class="muted">${esc((v.referer || "").slice(0, 60))}</td>
    <td class="muted small">${esc((v.ua || "").slice(0, 90))}</td>
  </tr>`).join("");

  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Visitor log — Russo NV</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #0f0f10; color: #e7e7e9; font: 14px/1.5 -apple-system, Segoe UI, Roboto, sans-serif; }
  header { background: #1a1a1d; padding: 20px 24px; border-bottom: 2px solid #e4572e; }
  h1 { margin: 0; font-size: 18px; letter-spacing: .04em; text-transform: uppercase; }
  .sub { color: #9a9aa0; font-size: 12px; margin-top: 4px; }
  main { padding: 24px; max-width: 1200px; margin: 0 auto; }
  .cards { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; }
  .card { background: #1a1a1d; border: 1px solid #2a2a2e; border-radius: 8px; padding: 16px 20px; min-width: 160px; }
  .card .n { font-size: 28px; font-weight: 700; color: #e4572e; }
  .card .l { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #9a9aa0; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: #9a9aa0; margin: 28px 0 10px; }
  table { width: 100%; border-collapse: collapse; background: #161618; border: 1px solid #2a2a2e; border-radius: 8px; overflow: hidden; }
  th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #232327; vertical-align: top; }
  th { background: #1f1f23; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #9a9aa0; position: sticky; top: 0; }
  tr:last-child td { border-bottom: 0; }
  .num { text-align: right; font-variant-numeric: tabular-nums; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }
  .muted { color: #8a8a90; }
  .small { font-size: 12px; }
  .nowrap { white-space: nowrap; }
  .daily { max-width: 420px; }
  footer { color: #6a6a70; font-size: 12px; padding: 24px; max-width: 1200px; margin: 0 auto; }
</style></head>
<body>
<header>
  <h1>Russo NV — Visitor log</h1>
  <div class="sub">Cookieless, server-side. IP &amp; location logged at the edge · rows auto-deleted after ${RETENTION_DAYS} days.</div>
</header>
<main>
  <div class="cards">
    <div class="card"><div class="n">${totals.hits}</div><div class="l">Page views (90d)</div></div>
    <div class="card"><div class="n">${totals.visitors}</div><div class="l">Unique IPs (90d)</div></div>
    <div class="card"><div class="n">${daily[0] ? daily[0].hits : 0}</div><div class="l">Views today/last day</div></div>
  </div>

  <h2>Per day (last 30 days)</h2>
  <table class="daily"><thead><tr><th>Day</th><th class="num">Views</th><th class="num">Unique IPs</th></tr></thead>
    <tbody>${dailyRows || '<tr><td colspan="3" class="muted">No data yet.</td></tr>'}</tbody></table>

  <h2>Recent visits (latest 300)</h2>
  <table><thead><tr><th>Time (UTC)</th><th>IP</th><th>Location</th><th>Network</th><th>Page</th><th>Referrer</th><th>Device</th></tr></thead>
    <tbody>${visitRows || '<tr><td colspan="7" class="muted">No visits yet.</td></tr>'}</tbody></table>
</main>
<footer>Raw JSON: <span class="mono">/_visits.json</span> · This page is noindexed and password-protected.</footer>
</body></html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=UTF-8", "cache-control": "no-store" },
  });
}

// ---------------------------------------------------------------------------
// Cookieless Cloudflare Web Analytics beacon
// ---------------------------------------------------------------------------

function injectBeacon(response, token) {
  const tag =
    `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" ` +
    `data-cf-beacon='{"token":"${token}"}'></script>`;
  return new HTMLRewriter()
    .on("body", { element(el) { el.append(tag, { html: true }); } })
    .transform(response);
}

// ---------------------------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
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

    // Private dashboard — handled here, never falls through to static assets.
    if (url.pathname === "/_visits" || url.pathname === "/_visits.json") {
      return handleVisits(request, env);
    }

    const isPreview = host.endsWith(".pages.dev");
    const response = await env.ASSETS.fetch(request);
    const isHtml = (response.headers.get("content-type") || "").includes("text/html");

    // Log genuine page views only (HTML, GET, 200) on the live host — never
    // assets, the admin path, or preview deployments.
    if (
      isHtml && request.method === "GET" && response.status === 200 &&
      !url.pathname.startsWith("/_") && !isPreview
    ) {
      ctx.waitUntil(logVisit(request, env));
    }

    let out = response;
    if (isHtml && env.WEB_ANALYTICS_TOKEN && !isPreview) {
      out = injectBeacon(out, env.WEB_ANALYTICS_TOKEN);
    }

    if (isPreview) {
      out = new Response(out.body, out);
      out.headers.set("X-Robots-Tag", "noindex");
    }

    return out;
  },
};
