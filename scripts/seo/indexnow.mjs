/**
 * Tells the IndexNow search engines (Bing, Yandex, Seznam, Naver and the
 * rest) that pages are new or changed, so they recrawl them within hours.
 * Google doesn't take part; it goes by the sitemap's lastmod instead.
 *
 *   npm run seo:ping https://privateroll.app/blog/some-post [more URLs]
 *   npm run seo:ping -- --sitemap     every URL in the live sitemap
 *
 * The key is public by design: it's the file in public/ named after itself,
 * which proves the request comes from the site. Run it after the deploy is
 * live, or the engines fetch the old page.
 */
import { readFileSync, readdirSync } from "node:fs";

const HOST = process.env.SITE_HOST ?? "privateroll.app";

const file = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
const key = file?.slice(0, -4);
if (!key || readFileSync(`public/${file}`, "utf8").trim() !== key) {
  throw new Error("No IndexNow key in public/: a file named <32 hex characters>.txt holding just those characters.");
}

let urls = process.argv.slice(2);
if (urls[0] === "--sitemap") {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const elsewhere = urls.filter((u) => new URL(u).hostname !== HOST);
if (!urls.length || elsewhere.length) {
  throw new Error(
    elsewhere.length ? `Not on ${HOST}: ${elsewhere.join(", ")}` : "Give the URLs to send, or --sitemap.",
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
}
