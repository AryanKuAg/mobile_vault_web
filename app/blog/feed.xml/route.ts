import { authors, lastChanged, postPath, posts } from "@/content/blog";
import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rfc822 = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

/** The blog as RSS, for feed readers and anything else that follows new posts. Prerendered at build. */
export function GET() {
  const items = posts
    .map((p) => {
      const url = `${site.url}${postPath(p.slug)}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <dc:creator>${esc(authors[p.author])}</dc:creator>
      <category>${esc(p.category)}</category>
      <pubDate>${rfc822(p.published)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>The ${site.name} blog</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Photo privacy, iPhone security and encryption, in plain English, from ${site.name}.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(lastChanged() ?? "2026-10-24")}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
