/**
 * What the site shows up for in Google, and what that says to write next,
 * from the Search Console API (free). No dependencies: the service account's
 * key signs its own token.
 *
 *   npm run seo:report
 *
 *   GSC_KEY    the service account's JSON key: the JSON itself, base64 of it,
 *              or the path to the file. Without it the script says so and
 *              stops, and the daily run falls back to seo/backlog.md.
 *   GSC_SITE   optional: the property, e.g. sc-domain:privateroll.app.
 *              Otherwise it's the one the key can read for SITE_HOST.
 *   SITE_HOST  optional: the site's host, privateroll.app by default.
 *
 * Writes seo/report.json (everything, for reading closely) and prints the
 * short version: the buckets seo/ROUTINE.md picks the day's work from.
 * Search Console's numbers run two to three days behind.
 */
import { createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

try {
  process.loadEnvFile(".env.local");
} catch {
  // No local env file: the cloud run sets GSC_KEY itself.
}

const HOST = process.env.SITE_HOST ?? "privateroll.app";
const API = "https://searchconsole.googleapis.com/webmasters/v3";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const OUT = "seo/report.json";

/** Pages that list other pages rather than answer a question: a query landing there has no page of its own. */
const isHub = (path) => path === "/" || /^\/[^/]+\/?$/.test(path) || /^\/blog\/(topic|author)\//.test(path);

const STOP = new Set(["the", "and", "for", "how", "what", "why", "with", "from", "does", "are", "can", "you", "your"]);

/** Whether a page's address already names the query: most of its words are in the path. */
function pageNames(query, path) {
  const words = query.split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
  return words.length > 0 && words.filter((w) => path.includes(w)).length / words.length >= 0.6;
}

/** Roughly the click-through rate a result gets at positions 1 to 5. */
const EXPECTED_CTR = [0.28, 0.16, 0.11, 0.08, 0.06];

/** "london to new york flight time", "how long is the flight from delhi to dubai" */
const ROUTE_QUERY = [
  /^(?:how long (?:is (?:the |a )?)?(?:flight|flying|fly)|flight (?:time|duration)) (?:from )?(.+?) to (.+?)(?: flight| \?)?$/,
  /^(.+?) to (.+?) (?:flight|flying) (?:time|duration|hours|length)$/,
  /^(.+?) to (.+?) how (?:long|many hours)(?: flight| by plane)?$/,
];

function loadKey() {
  const raw = process.env.GSC_KEY?.trim();
  if (!raw) return null;
  const text = raw.startsWith("{")
    ? raw
    : existsSync(raw)
      ? readFileSync(raw, "utf8")
      : Buffer.from(raw, "base64").toString();
  return JSON.parse(text);
}

async function accessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const part = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const body = `${part({ alg: "RS256", typ: "JWT" })}.${part({
    iss: key.client_email,
    scope: SCOPE,
    aud: key.token_uri,
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(body).sign(key.private_key, "base64url");
  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${body}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Google turned the key down (${res.status}): ${await res.text()}`);
  return (await res.json()).access_token;
}

async function api(token, path, body) {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: body && JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Search Console said ${res.status} to ${path}: ${await res.text()}`);
  return res.json();
}

/** The property for HOST: a Domain property if there is one, as it covers www and http too. */
async function findSite(token) {
  if (process.env.GSC_SITE) return process.env.GSC_SITE;
  const { siteEntry = [] } = await api(token, "/sites");
  const sites = siteEntry.map((s) => s.siteUrl);
  const site = [`sc-domain:${HOST}`, `https://${HOST}/`, `https://www.${HOST}/`].find((s) => sites.includes(s));
  if (!site) {
    throw new Error(
      `The key can't read ${HOST} in Search Console. Add the service account's email as a user on the property. It can read: ${sites.join(", ") || "nothing"}`,
    );
  }
  return site;
}

/** Every row for the dates, 25,000 at a time. */
async function rows(token, site, [startDate, endDate], dimensions) {
  const out = [];
  for (let startRow = 0; ; startRow += 25_000) {
    const { rows: page = [] } = await api(token, `/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      startDate,
      endDate,
      dimensions,
      rowLimit: 25_000,
      startRow,
      dataState: "all",
    });
    out.push(...page);
    if (page.length < 25_000) return out;
  }
}

const day = (offset) => new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);
const path = (url) => new URL(url).pathname;
const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

function flatten(raw, dimensions) {
  return raw.map((r) => ({
    ...Object.fromEntries(dimensions.map((d, i) => [d, d === "page" ? path(r.keys[i]) : r.keys[i]])),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: round(r.ctr * 100),
    position: round(r.position),
  }));
}

function table(list, columns) {
  if (!list.length) return "  (none yet)\n";
  return (
    list.map((r) => `  - ${columns.map((c) => (typeof c === "function" ? c(r) : r[c])).join(" | ")}`).join("\n") + "\n"
  );
}

const key = loadKey();
if (!key) {
  console.log("No GSC_KEY set, so no Search Console data: take today's topic from seo/backlog.md.");
  process.exit(0);
}

const token = await accessToken(key);
const site = await findSite(token);
const now = [day(-28), day(-1)];
const before = [day(-56), day(-29)];
const [byQuery, pages, pagesBefore] = await Promise.all([
  rows(token, site, now, ["query", "page"]).then((r) => flatten(r, ["query", "page"])),
  rows(token, site, now, ["page"]).then((r) => flatten(r, ["page"])),
  rows(token, site, before, ["page"]).then((r) => flatten(r, ["page"])),
]);

// One row per query: the page that ranks best for it, and the query's totals.
const queries = new Map();
for (const r of byQuery) {
  const q = queries.get(r.query);
  if (!q) queries.set(r.query, { ...r, pages: 1 });
  else {
    q.clicks += r.clicks;
    q.impressions += r.impressions;
    q.pages += 1;
    if (r.position < q.position) Object.assign(q, { page: r.page, position: r.position, ctr: r.ctr });
  }
}
const perQuery = [...queries.values()].sort((a, b) => b.impressions - a.impressions);

const improve = byQuery
  .filter((r) => !isHub(r.page) && r.impressions >= 20 && r.position > 4 && r.position <= 20)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30);
const lowCtr = byQuery
  .filter(
    (r) =>
      r.position <= 5 && r.impressions >= 50 && r.ctr / 100 < EXPECTED_CTR[Math.max(0, Math.round(r.position) - 1)] / 2,
  )
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 15);
// A page that names the query but ranks low needs time or a refresh, not a second page.
const unanswered = perQuery
  .filter((q) => q.impressions >= 10 && (isHub(q.page) || (q.position > 20 && !pageNames(q.query, q.page))))
  .slice(0, 30);
const routes = perQuery
  .map((q) => {
    const m = ROUTE_QUERY.map((re) => q.query.match(re)).find(Boolean);
    return (
      m && { from: m[1], to: m[2], query: q.query, impressions: q.impressions, page: q.page, position: q.position }
    );
  })
  .filter(Boolean)
  .slice(0, 50);
// Several pages showing for one query, close together: they may be splitting it.
const shared = perQuery.filter((q) => q.pages > 1 && q.impressions >= 20).slice(0, 15);

const was = new Map(pagesBefore.map((p) => [p.page, p.clicks]));
const moves = pages
  .map((p) => ({
    page: p.page,
    clicks: p.clicks,
    before: was.get(p.page) ?? 0,
    change: p.clicks - (was.get(p.page) ?? 0),
  }))
  .sort((a, b) => b.change - a.change);
const sum = (list, k) => list.reduce((n, r) => n + r[k], 0);
const totals = {
  now: { dates: now, clicks: sum(pages, "clicks"), impressions: sum(pages, "impressions") },
  before: { dates: before, clicks: sum(pagesBefore, "clicks"), impressions: sum(pagesBefore, "impressions") },
};

mkdirSync("seo", { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify(
    {
      site,
      made: new Date().toISOString(),
      totals,
      improve,
      lowCtr,
      unanswered,
      routes,
      shared,
      moves,
      queries: perQuery,
      pages,
    },
    null,
    2,
  ),
);

console.log(`# Search Console: ${site}, ${now[0]} to ${now[1]}

Clicks ${totals.now.clicks} (the 28 days before: ${totals.before.clicks}), impressions ${totals.now.impressions} (${totals.before.impressions}).

## 1. Ranking but not top: improve the page (query | page | position | impressions)
${table(improve, ["query", "page", "position", "impressions"])}
## 1b. Top five with few clicks: rewrite the title and description (query | page | position | CTR %)
${table(lowCtr, ["query", "page", "position", "ctr"])}
## 2. No page answers it: a new post (query | page Google shows | position | impressions)
${table(unanswered, ["query", "page", "position", "impressions"])}
${routes.length ? `## 3. Route searches (from | to | impressions | page)\n${table(routes, ["from", "to", "impressions", "page"])}\n` : ""}## Pages splitting one query (query | pages | impressions)
${table(shared, ["query", "pages", "impressions"])}
## Biggest movers in clicks (page | now | before)
${table(
  [...new Set([...moves.slice(0, 5), ...moves.slice(-5)])].filter((m) => m.change !== 0),
  ["page", "clicks", "before"],
)}
Full data: ${OUT}`);
