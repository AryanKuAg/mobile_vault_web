/**
 * Tells the IndexNow search engines (Bing, Yandex, Seznam, Naver and the
 * rest) that pages are new or changed, so they recrawl them within hours.
 * Google doesn't take part; it goes by the sitemap's lastmod instead.
 *
 *   npm run seo:ping https://privateroll.app/blog/some-post [more URLs]
 *   npm run seo:ping -- --sitemap           every URL in the live sitemap
 *   npm run seo:ping -- --changed <file>    the live sitemap's URLs that are new, or whose lastmod
 *                                           moved, since the list saved in <file> (all of them when
 *                                           there's no file yet), then saves the new list there
 *
 * After each deploy of main, .github/workflows/indexnow.yml runs the --changed form, so a new
 * post is sent without anyone running this.
 *
 * The key is public by design: it's the file in public/ named after itself,
 * which proves the request comes from the site. Run it after the deploy is
 * live, or the engines fetch the old page.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const HOST = process.env.SITE_HOST ?? "privateroll.app";

const file = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
const key = file?.slice(0, -4);
if (!key || readFileSync(`public/${file}`, "utf8").trim() !== key) {
  throw new Error("No IndexNow key in public/: a file named <32 hex characters>.txt holding just those characters.");
}

/** The live sitemap as { url: lastmod }, with "" for a page that has no lastmod. */
async function liveSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`, { cache: "no-store" });
  if (!res.ok) throw new Error(`The sitemap said ${res.status}`);
  const xml = await res.text();
  return Object.fromEntries(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => [
      entry.match(/<loc>([^<]+)<\/loc>/)[1],
      entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "",
    ]),
  );
}

let urls = process.argv.slice(2);
let save = () => {};
if (urls[0] === "--sitemap") {
  urls = Object.keys(await liveSitemap());
} else if (urls[0] === "--changed") {
  const stateFile = urls[1];
  if (!stateFile) throw new Error("Give the file that keeps the last list: --changed .indexnow.json");
  const now = await liveSitemap();
  const before = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};
  urls = Object.keys(now).filter((u) => before[u] !== now[u]);
  save = () => writeFileSync(stateFile, `${JSON.stringify(now, null, 2)}\n`);
  if (!urls.length) {
    console.log("IndexNow: nothing new or changed in the sitemap.");
    save();
    process.exit(0);
  }
}
const elsewhere = urls.filter((u) => new URL(u).hostname !== HOST);
if (!urls.length || elsewhere.length) {
  throw new Error(
    elsewhere.length ? `Not on ${HOST}: ${elsewhere.join(", ")}` : "Give the URLs to send, --sitemap or --changed <file>.",
  );
}

// The protocol takes up to 10,000 URLs a request.
for (let i = 0; i < urls.length; i += 10_000) {
  const urlList = urls.slice(i, i + 10_000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList }),
  });
  // 200: done. 202: accepted, the key still being checked (the first time).
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow said ${res.status}: ${await res.text()}`);
  }
  console.log(`IndexNow ${res.status}: sent ${urlList.length} URL${urlList.length === 1 ? "" : "s"}.`);
  for (const u of urlList) console.log(`  ${u}`);
}
// Only after every batch went through, so a failed run sends the same pages next time.
save();
