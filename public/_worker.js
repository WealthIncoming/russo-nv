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
// WEB_ANALYTICS_TOKEN are unset the site behaves exactly as it did before -
// logging is skipped, the beacon is not injected, and /_visits explains what
// is still missing. Nothing here can break a page render.

const CANONICAL_HOST = "www.russonv.com";
const RETENTION_DAYS = 90;

const LEGACY_PATHS = [
  // Old sitemap path (pre-self-host Wix workaround) → canonical /sitemap.xml.
  [/^\/sitemap-feed\/?$/, "/sitemap.xml"],
  // Targets are slash-less: the site builds with format:"file" (see
  // astro.config.mjs), so /path is the canonical 200 and /path/ 308s to it.
  [/^\/gratis-offerte\/?$/, "/contact"],
  // Remaining legacy .be pages (verified against the Wayback Machine crawl of
  // the old site, 2026-08-20): the thank-you page and the old privacy policy.
  [/^\/bedankt-voor-uw-aanvraag\/?$/, "/contact"],
  [/^\/privacy-policy\/?$/, "/privacy"],
  // Specific legacy .be URL → recapture straight onto the dedicated page
  // (must come before the general /diensten rule below).
  [/^\/diensten\/industriele-schilderwerken(\/.*)?$/, "/services/industriele-schilderwerken"],
  [/^\/diensten(\/.*)?$/, "/services"],
  [/^\/over-ons\/?$/, "/about"],
  [/^\/projecten\/?$/, "/projects"],
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
      // Never let analytics break a page render - swallow and move on.
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
// Contact-form conversions (D1)
//
// The contact form fires a same-origin POST /_event on a successful Web3Forms
// submit. We record name + company only (the lead's email/phone already go to
// the inbox via Web3Forms; we don't duplicate that PII here). Matched back to a
// visitor session by IP + time on the /_visits dashboard. Same 90-day expiry.
// ---------------------------------------------------------------------------

const FORM_EVENTS_DDL =
  "CREATE TABLE IF NOT EXISTS form_events (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL, ip TEXT, " +
  "country TEXT, city TEXT, region TEXT, org TEXT, page TEXT, " +
  "name TEXT, company TEXT)";

async function logFormEvent(request, env) {
  const noContent = new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  if (!env.DB) return noContent;

  // Light anti-abuse: only accept same-site submissions.
  const origin = request.headers.get("Origin") || "";
  if (origin && !(origin.includes("russonv.") || origin.endsWith(".pages.dev"))) return noContent;

  let body = {};
  try { body = await request.json(); } catch (_) { body = {}; }
  const cap = (v, n) => (typeof v === "string" && v ? v.slice(0, n) : null);

  const cf = request.cf || {};
  const insert = env.DB.prepare(
    "INSERT INTO form_events (ts, ip, country, city, region, org, page, name, company) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(
    new Date().toISOString(),
    request.headers.get("CF-Connecting-IP") || null,
    cf.country || null,
    cf.city || null,
    cf.region || null,
    cf.asOrganization || null,
    cap(body.page, 256),
    cap(body.name, 200),
    cap(body.company, 200)
  );

  try {
    await insert.run();
  } catch (_) {
    try {
      await env.DB.prepare(FORM_EVENTS_DDL).run();
      await insert.run();
    } catch (_) { /* never let a beacon error surface */ }
  }

  if (Math.random() < 0.05) {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400000).toISOString();
    try { await env.DB.prepare("DELETE FROM form_events WHERE ts < ?").bind(cutoff).run(); } catch (_) { /* ignore */ }
  }
  return noContent;
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

// Length-leaking but value-constant comparison - good enough to blunt timing
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

// ---------------------------------------------------------------------------
// Classification & parsing - all derived at render time from stored columns
// (User-Agent + network), so it applies retroactively to the whole 90-day log.
// ---------------------------------------------------------------------------

// Known crawlers, SEO/AI bots, scanners and CLI/library agents.
const BOT_UA_RE = /bot\b|bot\/|crawl|spider|slurp|mediapartners|bingpreview|facebookexternalhit|facebot|ia_archiver|ahrefs|semrush|mj12|dotbot|petal|bytespider|gptbot|chatgpt|oai-searchbot|ccbot|claudebot|claude-web|anthropic|perplexity|amazonbot|applebot|dataforseo|blexbot|seznam|screaming\s?frog|headlesschrome|phantomjs|python-requests|python-urllib|aiohttp|go-http-client|libwww|httpclient|okhttp|scrapy|masscan|zgrab|censys|shodan|nuclei|nmap|wget|curl\/|java\/|jakarta|axios|node-fetch|got\s|lighthouse|pingdom|uptimerobot|statuscake|gtmetrix|site24x7|expanse|internet-?measurement|paloaltonetworks|l9scan|scanner|probe|monitoring|whatsapp|uripreview|preview|fingerprint|domain-list|puppeteer|playwright|selenium|electron\/|microsoft office\//i;

// Hosting / cloud / scanner networks - traffic from here is automated even when
// the User-Agent is spoofed to look like a browser. The second line holds the
// hosting firms seen faking browser traffic in the log (checked 11/11/2026).
const DC_ORG_RE = new RegExp([
  "amazon|aws|google\\s?(llc|cloud|inc)|microsoft|azure|digitalocean|digital\\s?ocean|ovh|hetzner|linode|akamai|fastly|vultr|scaleway|contabo|leaseweb|choopa|oracle|alibaba|tencent|huawei|censys|shodan|stretchoid|binaryedge|driftnet|palo\\s?alto|internet\\s?census|datacamp|m247|cogent|hostwinds|hostinger|namecheap|godaddy|colocrossing|quadranet|servers|data\\s?center|datacenter|hosting|\\bvpn\\b|proxy|\\brelay\\b|colocation|code200|collyer|aventice|sabotage|techoff|cia\\s?triad|mod\\s?mission|aceville|artikel\\s?10",
  "feo\\s?prest|netcrafters|bestdc|datagio|3xk\\s?tech|white\\s?label\\s?services|racknerd|hostpapa|aliyun|wookra|a100\\s?row|atlas\\s?network|logicweb|host\\s?baltic|power\\s?nms|serv\\.host|alexhost|global\\s?layer|^server$|internet\\s?security|tower\\s?two|barracuda|hurricane?\\s?electric",
  "hostroyale|hostaly|directbackup|myridweb|traffictransit|\\bipxo\\b|netcup|netlabs|blatant|subnet\\s?digital|\\bsyn\\s?ltd|limited\\s?network|chiron\\s?software|4th\\s?utility|global\\s?transit|panaglobal|^decrypt$|virtualine|frantech|web2objects|\\bbl\\s?networks",
].join("|"), "i");

// russonv.be, www.russonv.be and the bare russonv.com only ever answer with a
// 301 to www.russonv.com, and a browser keeps the ORIGINAL referrer across a
// redirect. A page view that claims to come from one of them is forged; scanners
// even put the file they just probed there (https://russonv.be/.git/config).
const FAKE_REF_RE = /^https?:\/\/(?:(?:www\.)?russonv\.be|russonv\.com)(?:[:/?#]|$)/i;
const PROBE_REF_RE = /^https?:\/\/[^/]*russonv\.[a-z]+\/(?:[^?#]*\/)?(?:\.|%2e)|^https?:\/\/[^/]*russonv\.[a-z]+\/.*(?:php-?info|info\.php|actuator|server-status|wp-admin|wp-login|cgi-bin|backend\/|%2f)/i;

// Chrome ships a new major version every 4 weeks (131 on 12/11/2024) and updates
// itself, so a plain Chrome or Edge more than STALE_CHROME majors behind the date
// of the visit is a frozen bot User-Agent, not a person. Only the plain Chrome /
// Edge template is judged: Samsung Internet, Opera and in-app browsers can lag.
const CHROME_BASE_MAJOR = 131;
const CHROME_BASE_MS = Date.UTC(2024, 10, 12);
const STALE_CHROME = 12;
const PLAIN_CHROME_RE = /^Mozilla\/5\.0 \(([^)]*)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/((\d+)\.\d+\.\d+\.\d+) (?:Mobile )?Safari\/537\.36(?: Edg\/[\d.]+)?$/;

// Browsers whose Chrome token lags behind Chrome itself (in-app WebViews, phone
// makers' own browsers): never judged on version age.
const LAGGING_CHROME_RE = /; wv\)|SamsungBrowser|MiuiBrowser|HuaweiBrowser|UCBrowser|QQBrowser|Quark|HeyTap|VivoBrowser|OppoBrowser|Silk\//i;
// Firefox also ships every 4 weeks (133 on 26/11/2024) except the ESR lines,
// which companies keep for a year.
const FIREFOX_BASE_MAJOR = 133;
const FIREFOX_BASE_MS = Date.UTC(2024, 10, 26);
const FIREFOX_ESR = { 115: 1, 128: 1, 140: 1, 152: 1, 153: 1 };
const RELEASE_MS = 28 * 86400000;

// A User-Agent that no real browser sends. Returns the reason, or null.
function forgedBrowser(u, ts) {
  if (/MSIE |Trident\//.test(u)) return "Internet Explorer (retired)";
  if (!/AppleWebKit\/|Gecko\//.test(u)) return "Not a browser";
  const t = Date.parse(ts || "") || Date.now();
  const c = u.match(/\bChrome\/([\d.]+)/);
  if (c) {
    // Real Chrome always sends a four-part version and "(KHTML, like Gecko)".
    if (c[1].split(".").length !== 4 || !/\(KHTML, like Gecko\)/.test(u)) return "Fake browser signature";
    const major = +c[1].split(".")[0];
    const m = u.match(PLAIN_CHROME_RE);
    if (m) {
      if (/Windows NT [56]\./.test(m[1]) && major >= 110) return "Fake browser signature"; // Chrome 110+ never ran on Windows 7
      // Since Chrome 113 every real Chrome and Edge sends the reduced string:
      // version NNN.0.0.0 and, on Android, the frozen "Linux; Android 10; K".
      // A full build number or a real phone model there is a bot's UA list.
      if (major >= 113 && !/\.0\.0\.0$/.test(m[2])) return "Fake browser signature";
      if (major >= 113 && /Android/.test(m[1]) && m[1] !== "Linux; Android 10; K") return "Fake browser signature";
    }
    if (!LAGGING_CHROME_RE.test(u)) {
      const expected = CHROME_BASE_MAJOR + Math.floor((t - CHROME_BASE_MS) / RELEASE_MS);
      if (major < expected - STALE_CHROME) return "Outdated browser (bot)";
    }
  } else if (/AppleWebKit\/537\.36/.test(u) && !/Safari\//.test(u)) {
    return "Fake browser signature"; // truncated Chromium string
  }
  const f = u.match(/\bFirefox\/(\d+)/);
  if (f && !FIREFOX_ESR[+f[1]]) {
    const expected = FIREFOX_BASE_MAJOR + Math.floor((t - FIREFOX_BASE_MS) / RELEASE_MS);
    if (+f[1] < expected - STALE_CHROME) return "Outdated browser (bot)";
  }
  return null;
}

const BOT_NAMES = {
  googlebot: "Googlebot", bingbot: "Bingbot", yandexbot: "YandexBot", duckduckbot: "DuckDuckBot",
  baiduspider: "Baiduspider", applebot: "Applebot", gptbot: "GPTBot", "oai-searchbot": "OpenAI",
  chatgpt: "ChatGPT", claudebot: "ClaudeBot", "claude-web": "Claude", anthropic: "Anthropic",
  perplexitybot: "PerplexityBot", ahrefsbot: "AhrefsBot", semrushbot: "SemrushBot", mj12bot: "MJ12bot",
  dotbot: "DotBot", petalbot: "PetalBot", bytespider: "Bytespider", amazonbot: "Amazonbot",
  facebookexternalhit: "Facebook", ccbot: "CCBot", dataforseo: "DataForSEO", censys: "Censys (scanner)",
  masscan: "masscan (scanner)", zgrab: "zgrab (scanner)", nuclei: "nuclei (scanner)",
  curl: "curl", wget: "wget", "python-requests": "Python script", scrapy: "Scrapy",
  whatsapp: "WhatsApp link preview", uripreview: "Link preview", fingerprint: "CMS fingerprinter",
  "microsoft office/": "Office app link check",
};

// A full page load whose referrer is the same page of the live site. The site
// navigates client-side, so a person never produces that; form-spam bots that
// fetch / and then /contact with a home-made referrer do.
function selfReferral(referer, path) {
  if (!referer || !path) return false;
  let ref;
  try { ref = new URL(referer); } catch (_) { return false; }
  if (ref.hostname !== CANONICAL_HOST) return false;
  const norm = (p) => (p.replace(/\/+$/, "") || "/");
  return norm(ref.pathname) === norm(path);
}

// The name of a self-declared bot / tool User-Agent, or null.
function botName(u) {
  if (!BOT_UA_RE.test(u)) return null;
  const lower = u.toLowerCase();
  for (const key in BOT_NAMES) {
    if (lower.includes(key)) return BOT_NAMES[key];
  }
  const m = u.match(/([a-z0-9.\-]*bot)/i);
  return m ? m[1] : "Bot / crawler";
}

// A 30-day window holds ~10k rows but only ~700 distinct User-Agents and
// networks, so the regex work is memoised per call (keeps the Worker's CPU low).
function memo(map, key, fn) {
  if (!map) return fn();
  if (map.has(key)) return map.get(key);
  const v = fn();
  map.set(key, v);
  return v;
}
function newClassifyCache() {
  return { bot: new Map(), forged: new Map(), dc: new Map() };
}

function classifyVisit(ua, org, country, ts, referer, path, cache) {
  const u = (ua || "").trim();
  if (!u) return { kind: "bot", name: "No user-agent" };
  if ((country || "").toUpperCase() === "T1") return { kind: "bot", name: "Tor" };
  const named = memo(cache && cache.bot, u, () => botName(u));
  if (named) return { kind: "bot", name: named };
  if (referer) {
    if (PROBE_REF_RE.test(referer)) return { kind: "bot", name: "Vulnerability scanner" };
    if (FAKE_REF_RE.test(referer)) return { kind: "bot", name: "Fake referrer" };
    if (selfReferral(referer, path)) return { kind: "bot", name: "Fake referrer" };
  }
  // Browser age only moves one version per 4 weeks: one verdict per UA per month.
  const forged = memo(cache && cache.forged, u + "|" + (ts || "").slice(0, 7), () => forgedBrowser(u, ts));
  if (forged) return { kind: "bot", name: forged };
  if (org && memo(cache && cache.dc, org, () => DC_ORG_RE.test(org))) return { kind: "datacenter", name: "Datacenter / automated" };
  return { kind: "human", name: "Human" };
}

// Behavioural pass over rows already classified one by one: catches bots that
// wear a clean browser User-Agent from a residential or proxy network.
//   1. Page burst. The site navigates client-side, so a person logs one server
//      page view per landing. BURST or more full page loads from one IP within
//      BURST_MS is a crawler walking the menu. Applies to every country.
//   2. Flood. A foreign IP with more than FLOOD views, or any IP (home market
//      included) with more than DAY_FLOOD views on one day.
//   3. Fleet. One exact User-Agent spread over UA_FLEET or more foreign IPs.
//   4. Swarm. SWARM or more different foreign IPs within SWARM_MS: a botnet on
//      residential proxies, one hit per IP. Real foreign visits to this site
//      come a few per day, never five in the same minute.
// BE/NL/LU visitors are only judged by 1 and the day cap of 2, so a real
// Belgian sharing a common phone User-Agent is never hidden.
function applyBehaviour(rows) {
  const BURST = 4, BURST_MS = 30000, PAIR_MS = 3000, FLOOD = 20, DAY_FLOOD = 30, UA_FLEET = 20, SWARM = 5, SWARM_MS = 60000;
  const HOME = { BE: 1, NL: 1, LU: 1 };
  const isHuman = (r) => r._kind === "human";
  const mark = (r, name) => { r._kind = "bot"; r._name = name; };

  const byIp = new Map();
  for (const r of rows) {
    if (!isHuman(r)) continue;
    let a = byIp.get(r.ip);
    if (!a) { a = []; byIp.set(r.ip, a); }
    a.push(r);
  }
  for (const list of byIp.values()) {
    if (list.length < 2) continue;
    list.sort((a, b) => a._t - b._t);
    const t = list.map((r) => r._t);
    let j = 0;
    for (let i = 0; i < list.length; i++) {
      while (t[i] - t[j] > BURST_MS) j++;
      if (i - j + 1 >= BURST) for (let k = j; k <= i; k++) mark(list[k], "Crawler (page burst)");
      // Two different pages loaded within PAIR_MS: no person clicks that fast,
      // form-spam bots fetch / and /contact back to back.
      if (i > 0 && t[i] - t[i - 1] <= PAIR_MS && list[i].path !== list[i - 1].path) {
        mark(list[i - 1], "Crawler (page burst)");
        mark(list[i], "Crawler (page burst)");
      }
    }
  }

  const ipHits = new Map(), ipDay = new Map(), uaIps = new Map();
  for (const r of rows) {
    if (!isHuman(r)) continue;
    ipHits.set(r.ip, (ipHits.get(r.ip) || 0) + 1);
    const dk = r.ip + "|" + (r.ts || "").slice(0, 10);
    ipDay.set(dk, (ipDay.get(dk) || 0) + 1);
    let s = uaIps.get(r.ua);
    if (!s) { s = new Set(); uaIps.set(r.ua, s); }
    s.add(r.ip);
  }
  for (const r of rows) {
    if (!isHuman(r)) continue;
    if ((ipDay.get(r.ip + "|" + (r.ts || "").slice(0, 10)) || 0) > DAY_FLOOD) { mark(r, "High-volume IP"); continue; }
    if (HOME[(r.country || "").toUpperCase()]) continue;
    if ((ipHits.get(r.ip) || 0) > FLOOD) mark(r, "High-volume IP");
    else if (r.ua && (uaIps.get(r.ua) || new Set()).size >= UA_FLEET) mark(r, "Bot fleet (shared UA)");
  }

  // The swarm window counts every browser-looking foreign row (also the ones
  // already caught on their own), but only marks rows still counted as human.
  const foreign = rows
    .filter((r) => r._browserish && !HOME[(r.country || "").toUpperCase()])
    .sort((a, b) => a._t - b._t);
  const ft = foreign.map((r) => r._t);
  const inWin = new Map();
  let lo = 0;
  for (let i = 0; i < foreign.length; i++) {
    inWin.set(foreign[i].ip, (inWin.get(foreign[i].ip) || 0) + 1);
    while (ft[i] - ft[lo] > SWARM_MS) {
      const ip = foreign[lo].ip, n = inWin.get(ip) - 1;
      if (n) inWin.set(ip, n); else inWin.delete(ip);
      lo++;
    }
    if (inWin.size >= SWARM) for (let k = lo; k <= i; k++) if (isHuman(foreign[k])) mark(foreign[k], "Bot swarm");
  }
}

function classifyRows(rows, cache) {
  const c0 = cache || newClassifyCache();
  for (const r of rows) {
    const c = classifyVisit(r.ua, r.org, r.country, r.ts, r.referer, r.path, c0);
    r._kind = c.kind;
    r._name = c.name;
    r._t = Date.parse(r.ts) || 0;
    const u = (r.ua || "").trim();
    r._browserish = !!u && u.startsWith("Mozilla/5.0 (") && !memo(c0.bot, u, () => botName(u));
  }
  applyBehaviour(rows);
}

function parseUA(ua) {
  const u = ua || "";
  let device = "Desktop";
  if (/ipad|tablet|playbook|silk|kindle/i.test(u)) device = "Tablet";
  else if (/mobi|iphone|ipod|windows phone|(android.*mobile)/i.test(u)) device = "Mobile";
  let os = "-";
  if (/windows nt/i.test(u)) os = "Windows";
  else if (/iphone|ipad|ipod|cpu os|iphone os/i.test(u)) os = "iOS";
  else if (/mac os x|macintosh/i.test(u)) os = "macOS";
  else if (/android/i.test(u)) os = "Android";
  else if (/cros/i.test(u)) os = "ChromeOS";
  else if (/linux/i.test(u)) os = "Linux";
  let browser = "-";
  if (/edg(a|ios|)?\//i.test(u)) browser = "Edge";
  else if (/opr\/|opera/i.test(u)) browser = "Opera";
  else if (/samsungbrowser/i.test(u)) browser = "Samsung";
  else if (/firefox\/|fxios/i.test(u)) browser = "Firefox";
  else if (/chrome\/|crios/i.test(u)) browser = "Chrome";
  else if (/safari\//i.test(u) && /version\//i.test(u)) browser = "Safari";
  if (/linkedinapp|linkedin/i.test(u)) browser = "LinkedIn app";
  else if (/fban|fbav|instagram/i.test(u)) browser = "Facebook / Instagram app";
  else if (browser === "-" && /iphone|ipad|; wv\)/i.test(u)) browser = "In-app browser";
  return { device, os, browser };
}

function flag(cc) {
  if (!cc || cc.length !== 2 || !/^[a-z]{2}$/i.test(cc)) return "";
  const up = cc.toUpperCase();
  return String.fromCodePoint(...[...up].map((c) => 127397 + c.charCodeAt(0)));
}

const COUNTRY_NAMES = {
  BE: "Belgium", NL: "Netherlands", LU: "Luxembourg", FR: "France", DE: "Germany",
  GB: "United Kingdom", US: "United States", IE: "Ireland", ES: "Spain", IT: "Italy",
  PT: "Portugal", PL: "Poland", RO: "Romania", SE: "Sweden", NO: "Norway", DK: "Denmark",
  FI: "Finland", CH: "Switzerland", AT: "Austria", CZ: "Czechia", SK: "Slovakia", HU: "Hungary",
  GR: "Greece", BG: "Bulgaria", HR: "Croatia", IN: "India", CN: "China", RU: "Russia",
  UA: "Ukraine", TR: "Turkey", BR: "Brazil", CA: "Canada", MX: "Mexico", AU: "Australia",
  JP: "Japan", KR: "South Korea", SG: "Singapore", HK: "Hong Kong", AE: "UAE", SA: "Saudi Arabia",
  IL: "Israel", MA: "Morocco", EG: "Egypt", ZA: "South Africa", NG: "Nigeria", VN: "Vietnam",
  ID: "Indonesia", TH: "Thailand", PH: "Philippines",
};
function countryName(cc) {
  return COUNTRY_NAMES[(cc || "").toUpperCase()] || cc || "Unknown";
}

function sourceOf(referer) {
  if (!referer) return "Direct";
  let host = "";
  try { host = new URL(referer).hostname.replace(/^www\./, ""); } catch (_) { host = String(referer); }
  const h = host.toLowerCase();
  if (h.includes("russonv.")) return "Internal";
  if (h.includes("google")) return "Google";
  if (h.includes("bing")) return "Bing";
  if (h.includes("duckduckgo")) return "DuckDuckGo";
  if (h.includes("yahoo")) return "Yahoo";
  if (h.includes("ecosia")) return "Ecosia";
  if (h.includes("linkedin") || h === "lnkd.in") return "LinkedIn";
  if (h.includes("facebook") || h === "fb.com") return "Facebook";
  if (h.includes("instagram")) return "Instagram";
  if (h.includes("twitter") || h === "t.co" || h === "x.com") return "X / Twitter";
  if (h.includes("youtube") || h === "youtu.be") return "YouTube";
  if (h.includes("whatsapp")) return "WhatsApp";
  if (h.includes("gmail") || h.includes("mail.")) return "Email";
  return host || "Referral";
}

function prettyPage(path) {
  if (!path) return "-";
  const en = /^\/en(\/|$)/.test(path);
  let p = path.replace(/^\/en/, "").replace(/\/+$/, "");
  let name;
  if (p === "" || p === "/") name = "Home";
  else {
    name = p.split("/").filter(Boolean)
      .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
      .join(" / ");
  }
  return en ? name + " · EN" : name;
}

function csvCell(v) {
  return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
}

function topN(map, n) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([key, count]) => ({ key, count }));
}

function countBy(arr, fn) {
  const m = new Map();
  for (const r of arr) {
    const k = fn(r);
    if (k == null || k === "") continue;
    m.set(k, (m.get(k) || 0) + 1);
  }
  return m;
}

// Render a labelled horizontal-bar breakdown. `label` may contain trusted HTML
// (flags); caller is responsible for escaping the dynamic text portion.
function barList(entries, total, accent) {
  if (!entries.length) return '<div class="muted small">No data yet.</div>';
  const max = Math.max(...entries.map((e) => e.count), 1);
  return entries.map((e) => {
    const pct = Math.round((e.count / max) * 100);
    const share = total ? Math.round((e.count / total) * 100) : 0;
    return `<div class="bar"><div class="bar-label">${e.label}</div>` +
      `<div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${accent || "#e4572e"}"></div></div>` +
      `<div class="bar-val">${e.count}<span class="bar-pct">${share}%</span></div></div>`;
  }).join("");
}

const fmt = (n) => Number(n || 0).toLocaleString("en-US");

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
  const wantsCsv = url.pathname.endsWith(".csv") || url.searchParams.get("format") === "csv";
  const showBots = url.searchParams.get("bots") === "1" || url.searchParams.get("bots") === "show";

  // Bots are over 90% of the log (55k rows in 90 days on 11/11/2026), so the
  // newest N rows of the whole table only reached back about a week. The
  // dashboard therefore reads a fixed window of WINDOW_DAYS: per-day totals
  // straight from SQL, and only the rows that could be a person (a real browser
  // User-Agent, no bot name, not Tor) for the detailed classification. The
  // "include bots" view, JSON and bot CSV add the newest RAW_LIMIT raw rows.
  const WINDOW_DAYS = 30;
  const CAND_LIMIT = 15000;
  const RAW_LIMIT = 6000;
  const dayMs = 86400000;
  const todayStart = (() => { const d = new Date(); d.setUTCHours(0, 0, 0, 0); return d.getTime(); })();
  const since = new Date(todayStart - (WINDOW_DAYS - 1) * dayMs).toISOString();
  const COLS = "ts, ip, country, city, region, org, path, referer, ua";
  const CAND_SQL =
    "SELECT " + COLS + " FROM visits WHERE ts >= ? " +
    "AND ua LIKE 'Mozilla/5.0 (%' AND (ua LIKE '%AppleWebKit/%' OR ua LIKE '%Gecko/%') " +
    "AND ua NOT LIKE '%bot%' AND ua NOT LIKE '%crawl%' AND ua NOT LIKE '%spider%' " +
    "AND ua NOT LIKE '%Trident/%' AND ua NOT LIKE '%MSIE %' AND (country IS NULL OR country <> 'T1') " +
    "ORDER BY ts DESC LIMIT " + CAND_LIMIT;

  let cand = [], dayTotals = [], raw = null;
  try {
    cand = (await env.DB.prepare(CAND_SQL).bind(since).all()).results || [];
    dayTotals = (await env.DB.prepare(
      "SELECT substr(ts, 1, 10) AS d, COUNT(*) AS n FROM visits WHERE ts >= ? GROUP BY d"
    ).bind(since).all()).results || [];
    if (showBots || wantsJson) {
      raw = (await env.DB.prepare(
        "SELECT " + COLS + " FROM visits ORDER BY ts DESC LIMIT " + RAW_LIMIT
      ).all()).results || [];
    }
  } catch (_) {
    return plain("No visits recorded yet. Check back after the site receives traffic.");
  }
  if (!dayTotals.length && !(raw && raw.length)) {
    return plain("No visits recorded yet. Check back after the site receives traffic.");
  }

  try {
    const capped = cand.length >= CAND_LIMIT;
    classifyRows(cand);
    const humans = cand.filter((r) => r._kind === "human");
    const totalEvents = dayTotals.reduce((s, d) => s + (d.n || 0), 0);
    const botCount = Math.max(0, totalEvents - humans.length);

    // Raw rows take the verdict of the same row in the window, so both views
    // agree; older or obvious-bot rows are judged on their own.
    let rows = cand;
    if (raw) {
      const key = (r) => r.ts + "|" + r.ip + "|" + r.path;
      const verdict = new Map();
      for (const r of cand) verdict.set(key(r), r);
      const rc = newClassifyCache();
      for (const r of raw) {
        const v = verdict.get(key(r));
        if (v) { r._kind = v._kind; r._name = v._name; continue; }
        const c = classifyVisit(r.ua, r.org, r.country, r.ts, r.referer, r.path, rc);
        r._kind = c.kind;
        r._name = c.name;
      }
      rows = raw;
    }

    // ---- JSON API ----
    if (wantsJson) {
      const payload = {
        generatedAt: new Date().toISOString(),
        window: "last " + WINDOW_DAYS + " days (totals); visits = most recent " + RAW_LIMIT + " raw events",
        totals: {
          events: totalEvents,
          humanViews: humans.length,
          bots: botCount,
          uniqueHumanVisitors: new Set(humans.map((h) => h.ip)).size,
        },
        visits: rows.map((r) => ({
          ts: r.ts, kind: r._kind, detail: r._name, ip: r.ip, country: r.country, city: r.city,
          region: r.region, network: r.org, page: r.path, source: sourceOf(r.referer),
          referer: r.referer, ua: r.ua,
        })),
      };
      return new Response(JSON.stringify(payload, null, 2), {
        headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" },
      });
    }

    // ---- CSV export ----
    if (wantsCsv) {
      const set = showBots ? rows : humans;
      const header = "timestamp,kind,detail,ip,country,city,region,network,page,source,device,os,browser,referer,user_agent";
      const lines = set.map((r) => {
        const ua = parseUA(r.ua);
        return [r.ts, r._kind, r._name, r.ip, countryName(r.country), r.city, r.region, r.org,
          r.path, sourceOf(r.referer), ua.device, ua.os, ua.browser, r.referer, r.ua]
          .map(csvCell).join(",");
      });
      return new Response([header, ...lines].join("\r\n"), {
        headers: {
          "content-type": "text/csv; charset=UTF-8",
          "content-disposition": 'attachment; filename="russonv-visitors.csv"',
          "cache-control": "no-store",
        },
      });
    }

    // ---- Aggregates for the HTML dashboard ----
    const now = Date.now();
    const tsMs = (r) => Date.parse(r.ts) || 0;

    // Contact-form leads (conversions). A missing table just means "none yet".
    let formEvents = [];
    try {
      formEvents = (await env.DB.prepare(
        "SELECT ts, ip, country, city, region, org, page, name, company FROM form_events ORDER BY ts DESC LIMIT 1000"
      ).all()).results || [];
    } catch (_) { formEvents = []; }
    const leadsTotal = formEvents.length;
    const leadsToday = formEvents.filter((fe) => tsMs(fe) >= todayStart).length;
    const leads24 = formEvents.filter((fe) => tsMs(fe) >= now - dayMs).length;
    const CONVERT_BUFFER = 30 * 60000; // a submit up to 30 min after the last page view still counts
    const eventsByIp = new Map();
    for (const fe of formEvents) {
      let a = eventsByIp.get(fe.ip);
      if (!a) { a = []; eventsByIp.set(fe.ip, a); }
      a.push(fe);
    }

    const uniqueHumans = new Set(humans.map((h) => h.ip)).size;
    const humansToday = humans.filter((h) => tsMs(h) >= todayStart).length;
    const humans7 = humans.filter((h) => tsMs(h) >= now - 7 * dayMs).length;
    const humans30 = humans.length;
    const fromGoogle = humans.filter((h) => sourceOf(h.referer) === "Google").length;

    // Daily chart (human vs bot), last 30 calendar days incl. empty days:
    // all events per day from SQL, people from the classified window.
    const totalByDay = new Map(dayTotals.map((d) => [d.d, d.n || 0]));
    const humanByDay = countBy(humans, (r) => (r.ts || "").slice(0, 10));
    const days = [];
    for (let i = WINDOW_DAYS - 1; i >= 0; i--) {
      const ds = new Date(todayStart - i * dayMs).toISOString().slice(0, 10);
      const h = humanByDay.get(ds) || 0;
      days.push({ ds, h, b: Math.max(0, (totalByDay.get(ds) || 0) - h) });
    }
    // Bots outnumber people about 30 to 1, so in the real-visitor view the
    // chart shows people only (scaled to them); the bots view stacks both.
    const dayMax = Math.max(...days.map((d) => d.h + (showBots ? d.b : 0)), 1);
    const chartBars = days.map((d) => {
      const hH = Math.round((d.h / dayMax) * 100);
      const bH = showBots ? Math.round((d.b / dayMax) * 100) : 0;
      return `<div class="col" title="${d.ds} - ${d.h} visitors, ${d.b} bots">` +
        `<div class="col-bars"><div class="seg human" style="height:${hH}%"></div>` +
        `<div class="seg bot" style="height:${bH}%"></div></div>` +
        `<div class="col-lbl">${esc(d.ds.slice(5))}</div></div>`;
    }).join("");

    // Breakdowns (real visitors by default; include bots when toggled).
    const base = showBots ? rows : humans;
    const total = base.length;
    const countryEntries = topN(countBy(base, (r) => r.country), 8)
      .map((e) => ({ label: `${flag(e.key)} ${esc(countryName(e.key))}`, count: e.count }));
    const pageEntries = topN(countBy(base, (r) => r.path), 8)
      .map((e) => ({ label: esc(prettyPage(e.key)), count: e.count }));
    const sourceEntries = topN(countBy(base, (r) => sourceOf(r.referer)), 8)
      .map((e) => ({ label: esc(e.key), count: e.count }));
    const deviceEntries = topN(countBy(humans, (r) => parseUA(r.ua).device), 4)
      .map((e) => ({ label: esc(e.key), count: e.count }));
    const browserEntries = topN(countBy(humans, (r) => parseUA(r.ua).browser), 6)
      .map((e) => ({ label: esc(e.key), count: e.count }));

    // Visitor journeys - group each human's hits into sessions (30-min gap).
    const byIp = new Map();
    for (const h of humans) {
      let arr = byIp.get(h.ip);
      if (!arr) { arr = []; byIp.set(h.ip, arr); }
      arr.push(h);
    }
    const SESSION_GAP = 30 * 60000;
    const sessions = [];
    for (const [ip, list] of byIp) {
      list.sort((a, b) => tsMs(a) - tsMs(b));
      let cur = null;
      for (const r of list) {
        const t = tsMs(r);
        if (!cur || t - cur.end > SESSION_GAP) {
          cur = { ip, country: r.country, city: r.city, region: r.region, ua: r.ua, referer: r.referer, start: t, end: t, pages: [] };
          sessions.push(cur);
        }
        cur.end = t;
        const pg = prettyPage(r.path);
        if (cur.pages[cur.pages.length - 1] !== pg) cur.pages.push(pg);
      }
    }
    sessions.sort((a, b) => b.start - a.start);

    // New vs returning visitor: count distinct sessions per IP (a 30-min+ gap is
    // a new session, typically a return visit). IP-based, so it's a close
    // estimate, dynamic/shared IPs can blur it.
    const ipSessionCount = new Map();
    for (const s of sessions) ipSessionCount.set(s.ip, (ipSessionCount.get(s.ip) || 0) + 1);
    const returningVisitors = [...ipSessionCount.values()].filter((c) => c > 1).length;
    const visitorBadge = (ip) => {
      const c = ipSessionCount.get(ip) || 1;
      return c > 1
        ? `<span class="badge ret" title="Seen across ${c} sessions">Returning · ${c}×</span>`
        : '<span class="badge new">New</span>';
    };

    const sessionLead = (s) => {
      const evs = eventsByIp.get(s.ip);
      if (!evs) return null;
      return evs.find((e) => { const t = tsMs(e); return t >= s.start - 5 * 60000 && t <= s.end + CONVERT_BUFFER; }) || null;
    };
    const journeyRows = sessions.slice(0, 25).map((s) => {
      const ua = parseUA(s.ua);
      const place = [s.city, countryName(s.country)].filter(Boolean).join(", ");
      const when = new Date(s.start).toISOString().replace("T", " ").slice(0, 16);
      const mins = Math.max(0, Math.round((s.end - s.start) / 60000));
      const dur = mins >= 1 ? mins + " min" : "-";
      const lead = sessionLead(s);
      const leadChip = lead ? `<span class="chip lead">✉ Lead${lead.name ? " · " + esc(lead.name) : ""}</span> ` : "";
      const trail = s.pages.slice(0, 12).map((p) => `<span class="chip">${esc(p)}</span>`).join('<span class="arrow">→</span>');
      const more = s.pages.length > 12 ? ' <span class="muted">…</span>' : "";
      return `<tr${lead ? ' class="converted"' : ""}><td class="nowrap">${esc(when)}</td>` +
        `<td>${flag(s.country)} ${esc(place)}</td>` +
        `<td>${visitorBadge(s.ip)}</td>` +
        `<td><span class="badge">${esc(ua.device)}</span> ${esc(ua.browser)}</td>` +
        `<td>${esc(sourceOf(s.referer))}</td>` +
        `<td class="num">${s.pages.length}</td>` +
        `<td class="muted small nowrap">${dur}</td>` +
        `<td class="journey">${leadChip}${trail}${more}</td></tr>`;
    }).join("");

    // Dedicated leads list: each submission with the journey that led to it.
    const leadRows = formEvents.slice(0, 50).map((fe) => {
      const when = (fe.ts || "").replace("T", " ").slice(0, 16);
      const place = [fe.city, countryName(fe.country)].filter(Boolean).join(", ");
      const who = [fe.name, fe.company].filter(Boolean).map(esc).join(" · ") || '<span class="muted">(no name given)</span>';
      const evt = tsMs(fe);
      const sess = sessions.find((s) => s.ip === fe.ip && evt >= s.start - 5 * 60000 && evt <= s.end + CONVERT_BUFFER);
      const trail = sess
        ? sess.pages.slice(0, 14).map((p) => `<span class="chip">${esc(p)}</span>`).join('<span class="arrow">→</span>')
        : `<span class="chip">${esc(prettyPage(fe.page))}</span>`;
      return `<tr class="converted"><td class="nowrap">${esc(when)}</td>` +
        `<td>${who}</td>` +
        `<td>${flag(fe.country)} ${esc(place)}</td>` +
        `<td>${esc(prettyPage(fe.page))}</td>` +
        `<td class="journey">${trail}</td></tr>`;
    }).join("");

    // Recent visits table.
    const recentList = (showBots ? rows : humans).slice(0, 300);
    const visitRows = recentList.map((v) => {
      const ua = parseUA(v.ua);
      const badge = v._kind === "human"
        ? '<span class="badge ok">Human</span>'
        : (v._kind === "bot"
          ? `<span class="badge bot" title="${esc(v.ua || "")}">${esc(v._name)}</span>`
          : `<span class="badge dc" title="${esc(v.org || "")}">Datacenter</span>`);
      const place = [v.city, countryName(v.country)].filter(Boolean).join(", ");
      const newRet = v._kind === "human" ? " " + visitorBadge(v.ip) : "";
      return `<tr><td class="nowrap">${esc((v.ts || "").replace("T", " ").slice(0, 16))}</td>` +
        `<td>${badge}${newRet}</td>` +
        `<td>${flag(v.country)} ${esc(place)}</td>` +
        `<td class="mono small">${esc(v.ip)}</td>` +
        `<td>${esc(prettyPage(v.path))}</td>` +
        `<td>${esc(sourceOf(v.referer))}</td>` +
        `<td class="small">${esc(ua.device)} · ${esc(ua.browser)} <span class="muted">${esc(ua.os)}</span></td></tr>`;
    }).join("");

    const dailyRows = [...days].reverse().slice(0, 14).map((d) =>
      `<tr><td>${esc(d.ds)}</td><td class="num">${d.h}</td><td class="num">${d.b}</td></tr>`
    ).join("");

    const toggle = showBots
      ? '<a class="btn" href="/_visits">👤 Real visitors only</a>'
      : `<a class="btn" href="/_visits?bots=1">🤖 Include bots (${fmt(botCount)})</a>`;
    const csvHref = showBots ? "/_visits.csv?bots=1" : "/_visits.csv";
    const viewLabel = showBots ? "All traffic" : "Real visitors";

    const alertBanner = leads24 > 0
      ? `<div class="alert">🔔 <strong>${fmt(leads24)}</strong> new contact-form ${leads24 === 1 ? "lead" : "leads"} in the last 24 hours` +
        `${leadsToday > 0 ? ` (${fmt(leadsToday)} today)` : ""}. Jump to <a href="#leads">leads</a>.</div>`
      : "";

    const html = `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Visitor analytics - Russo NV</title>
<style>
  :root { color-scheme: dark; --bg:#0e0e10; --panel:#17171a; --panel2:#1d1d21; --line:#2a2a2f; --txt:#ececef; --mut:#9a9aa2; --accent:#e4572e; --bot:#52525b; --ok:#3fb950; --dc:#d29922; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--txt); font:14px/1.55 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif; }
  a { color:inherit; }
  header { background:linear-gradient(180deg,#1c1c20,#161619); padding:22px 26px; border-bottom:2px solid var(--accent); }
  .brand { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  h1 { margin:0; font-size:17px; letter-spacing:.06em; text-transform:uppercase; }
  .pill { font-size:11px; color:var(--accent); border:1px solid var(--accent); border-radius:999px; padding:2px 10px; letter-spacing:.05em; }
  .sub { color:var(--mut); font-size:12px; margin-top:6px; }
  main { padding:24px 26px 60px; max-width:1240px; margin:0 auto; }
  .controls { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin:0 0 22px; }
  .btn { font-size:12.5px; background:var(--panel2); border:1px solid var(--line); border-radius:7px; padding:7px 13px; text-decoration:none; color:var(--txt); transition:border-color .15s; }
  .btn:hover { border-color:var(--accent); }
  .view { color:var(--mut); font-size:12px; margin-left:auto; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:14px; margin-bottom:30px; }
  .card { background:var(--panel); border:1px solid var(--line); border-radius:11px; padding:16px 18px; }
  .card.hero { background:linear-gradient(160deg,#241410,#17171a); border-color:#5a2a1a; }
  .card .n { font-size:30px; font-weight:750; line-height:1.1; letter-spacing:-.01em; }
  .card.hero .n { color:var(--accent); font-size:34px; }
  .card .l { font-size:10.5px; text-transform:uppercase; letter-spacing:.09em; color:var(--mut); margin-top:6px; }
  .card.muted .n { color:var(--mut); }
  h2 { font-size:12px; text-transform:uppercase; letter-spacing:.1em; color:var(--mut); margin:34px 0 12px; }
  .panel { background:var(--panel); border:1px solid var(--line); border-radius:11px; padding:18px 20px; }
  .chart { display:flex; align-items:flex-end; gap:3px; height:150px; padding-top:6px; }
  .col { flex:1; min-width:0; display:flex; flex-direction:column; align-items:center; gap:6px; height:100%; }
  .col-bars { flex:1; width:100%; max-width:22px; margin:0 auto; display:flex; flex-direction:column-reverse; justify-content:flex-start; background:#202024; border-radius:3px; overflow:hidden; }
  .seg { width:100%; }
  .seg.human { background:var(--accent); }
  .seg.bot { background:var(--bot); }
  .col-lbl { font-size:8.5px; color:#70707a; transform:rotate(-90deg); white-space:nowrap; height:34px; line-height:1; margin-top:2px; }
  .legend { display:flex; gap:18px; margin-top:14px; font-size:12px; color:var(--mut); }
  .legend i { display:inline-block; width:11px; height:11px; border-radius:3px; margin-right:6px; vertical-align:-1px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
  .grid .panel h3 { margin:0 0 12px; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--mut); }
  .bar { display:grid; grid-template-columns:1fr 90px auto; align-items:center; gap:10px; margin:7px 0; font-size:13px; }
  .bar-label { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .bar-track { background:#202024; border-radius:4px; height:8px; overflow:hidden; }
  .bar-fill { height:100%; border-radius:4px; }
  .bar-val { font-variant-numeric:tabular-nums; color:var(--txt); font-size:12.5px; white-space:nowrap; }
  .bar-pct { color:var(--mut); margin-left:6px; }
  table { width:100%; border-collapse:collapse; background:var(--panel); border:1px solid var(--line); border-radius:11px; overflow:hidden; }
  th, td { text-align:left; padding:9px 13px; border-bottom:1px solid #232327; vertical-align:top; }
  th { background:var(--panel2); font-size:10.5px; text-transform:uppercase; letter-spacing:.06em; color:var(--mut); }
  tr:last-child td { border-bottom:0; }
  tbody tr:hover { background:#1b1b1f; }
  .num { text-align:right; font-variant-numeric:tabular-nums; }
  .mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  .muted { color:var(--mut); } .small { font-size:12px; } .nowrap { white-space:nowrap; }
  .badge { display:inline-block; font-size:11px; padding:1px 8px; border-radius:999px; background:#26262b; color:#cfcfd6; border:1px solid #34343b; }
  .badge.ok { background:rgba(63,185,80,.13); color:#6fd585; border-color:rgba(63,185,80,.35); }
  .badge.bot { background:rgba(228,87,46,.13); color:#f0a085; border-color:rgba(228,87,46,.3); }
  .badge.dc { background:rgba(210,153,34,.13); color:#e0bf6a; border-color:rgba(210,153,34,.3); }
  .alert { background:rgba(63,185,80,.12); border:1px solid rgba(63,185,80,.4); color:#8fe0a0; border-radius:10px; padding:12px 16px; margin:0 0 20px; font-size:13.5px; }
  .alert a { color:#bff0c9; }
  .card.lead { background:linear-gradient(160deg,#0f2417,#17171a); border-color:#1f5a36; }
  .card.lead .n { color:var(--ok); }
  tr.converted { background:rgba(63,185,80,.06); }
  .chip.lead { background:rgba(63,185,80,.14); border-color:rgba(63,185,80,.4); color:#8fe0a0; font-weight:600; }
  .badge.new { background:rgba(90,141,214,.14); color:#9cc0f0; border-color:rgba(90,141,214,.4); }
  .badge.ret { background:rgba(176,127,214,.16); color:#c6a3e6; border-color:rgba(176,127,214,.4); }
  .journey { line-height:2; }
  .chip { display:inline-block; background:#202024; border:1px solid #303036; border-radius:6px; padding:1px 8px; font-size:11.5px; }
  .arrow { color:#5a5a63; margin:0 5px; }
  .scroll { overflow-x:auto; }
  footer { color:#62626a; font-size:12px; margin-top:34px; border-top:1px solid var(--line); padding-top:18px; }
  footer a { color:var(--mut); }
</style></head>
<body>
<header>
  <div class="brand"><h1>Russo NV - Visitor analytics</h1><span class="pill">${esc(viewLabel)}</span></div>
  <div class="sub">Cookieless &amp; server-side · location detected at the Cloudflare edge · data auto-deletes after ${RETENTION_DAYS} days · figures cover the last ${WINDOW_DAYS} days${capped ? " (capped at " + fmt(CAND_LIMIT) + " possible visitors)" : ""}${showBots ? " · bot rows below = newest " + fmt(RAW_LIMIT) + " raw events" : ""}</div>
</header>
<main>
  ${alertBanner}
  <div class="controls">
    ${toggle}
    <a class="btn" href="${csvHref}">⬇ Download CSV</a>
    <a class="btn" href="/_visits.json">{ } JSON</a>
    <span class="view">Breakdowns &amp; journeys reflect: <strong>${esc(viewLabel)}</strong></span>
  </div>

  <div class="cards">
    <div class="card hero"><div class="n">${fmt(uniqueHumans)}</div><div class="l">Real visitors, 30 days (unique)</div></div>
    <div class="card lead"><div class="n">${fmt(leadsTotal)}</div><div class="l">Contact-form leads</div></div>
    <div class="card"><div class="n">${fmt(returningVisitors)}</div><div class="l">Returning visitors</div></div>
    <div class="card"><div class="n">${fmt(fromGoogle)}</div><div class="l">From Google, 30 days</div></div>
    <div class="card"><div class="n">${fmt(humansToday)}</div><div class="l">Visits today</div></div>
    <div class="card"><div class="n">${fmt(humans7)}</div><div class="l">Last 7 days</div></div>
    <div class="card"><div class="n">${fmt(humans30)}</div><div class="l">Last 30 days</div></div>
    <div class="card muted"><div class="n">${fmt(botCount)}</div><div class="l">Bots filtered out, 30 days</div></div>
  </div>

  ${leadRows ? `<h2 id="leads">Contact-form leads: who filled in the form</h2>
  <div class="scroll"><table>
    <thead><tr><th>Time (UTC)</th><th>Lead</th><th>Location</th><th>Submitted from</th><th>Path through the site</th></tr></thead>
    <tbody>${leadRows}</tbody>
  </table></div>` : ""}

  <h2>Visits per day - last 30 days</h2>
  <div class="panel">
    <div class="chart">${chartBars}</div>
    <div class="legend"><span><i style="background:var(--accent)"></i>Real visitors</span>${showBots ? '<span><i style="background:var(--bot)"></i>Bots / crawlers</span>' : '<span class="muted">Bots hidden here, see "Include bots"</span>'}</div>
  </div>

  <h2>Where your visitors come from</h2>
  <div class="grid">
    <div class="panel"><h3>Top countries</h3>${barList(countryEntries, total)}</div>
    <div class="panel"><h3>Most-viewed pages</h3>${barList(pageEntries, total, "#5a8dd6")}</div>
    <div class="panel"><h3>Traffic sources</h3>${barList(sourceEntries, total, "#3fb27f")}</div>
    <div class="panel"><h3>Devices</h3>${barList(deviceEntries, humans.length, "#b07fd6")}</div>
    <div class="panel"><h3>Browsers</h3>${barList(browserEntries, humans.length, "#d6a25a")}</div>
  </div>

  <h2>Visitor journeys - recent sessions (real visitors)</h2>
  <div class="scroll"><table>
    <thead><tr><th>Started (UTC)</th><th>Location</th><th>Visitor</th><th>Device</th><th>Source</th><th class="num">Pages</th><th>Time</th><th>Path through the site</th></tr></thead>
    <tbody>${journeyRows || '<tr><td colspan="8" class="muted">No multi-page sessions yet.</td></tr>'}</tbody>
  </table></div>

  <h2>Recent visits - latest 300 (${esc(viewLabel)})</h2>
  <div class="scroll"><table>
    <thead><tr><th>Time (UTC)</th><th>Type</th><th>Location</th><th>IP</th><th>Page</th><th>Source</th><th>Device</th></tr></thead>
    <tbody>${visitRows || '<tr><td colspan="7" class="muted">No visits in this view.</td></tr>'}</tbody>
  </table></div>

  <h2>Daily totals - last 14 days</h2>
  <table style="max-width:420px"><thead><tr><th>Day</th><th class="num">Visitors</th><th class="num">Bots</th></tr></thead>
    <tbody>${dailyRows}</tbody></table>

  <footer>
    Privacy-friendly analytics - no cookies, no tracking scripts, no consent banner required (GDPR legitimate interest; data auto-deleted after ${RETENTION_DAYS} days).
    Bot detection is heuristic: bot names, forged or outdated browser signatures, forged referrers, hosting networks, and behaviour (page bursts, floods, swarms). It is applied at view time, so it also cleans older rows. ·
    <a href="${csvHref}">CSV</a> · <a href="/_visits.json">JSON</a>
  </footer>
</main>
</body></html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=UTF-8", "cache-control": "no-store" },
    });
  } catch (err) {
    return plain(
      "Visitor dashboard hit an error while rendering:\n  " + (err && err.message ? err.message : String(err)) +
      "\n\nThe raw data is still available at /_visits.json",
      200
    );
  }
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

    // Contact-form conversion beacon (fire-and-forget from the contact page).
    if (url.pathname === "/_event" && request.method === "POST") {
      return logFormEvent(request, env);
    }

    // Private dashboard - handled here, never falls through to static assets.
    if (url.pathname === "/_visits" || url.pathname === "/_visits.json" || url.pathname === "/_visits.csv") {
      return handleVisits(request, env);
    }

    const isPreview = host.endsWith(".pages.dev");
    const response = await env.ASSETS.fetch(request);
    const isHtml = (response.headers.get("content-type") || "").includes("text/html");

    // Log genuine page views only (HTML, GET, 200) on the live host - never
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

    out = new Response(out.body, out);
    if (isPreview) {
      out.headers.set("X-Robots-Tag", "noindex");
    } else {
      out.headers.set("Strict-Transport-Security", "max-age=31536000");
    }

    return out;
  },
};
