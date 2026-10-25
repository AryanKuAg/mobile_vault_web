import { readdirSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { authors, categories, postPath, posts, readMinutes } from "@/content/blog";
import { guides } from "@/content/guides";
import { scenarios } from "@/content/scenarios";
import { Markdown } from "@/lib/markdown";
import { site } from "@/lib/site";

/**
 * The checks every post passes before it goes out, whoever wrote it: it's
 * listed, it fits a search result, it's dated sensibly, it links only to real
 * pages, and its markdown is the small subset lib/markdown.tsx renders.
 */

// Every page the sitemap lists, as a path. The posts' links have to land on one.
const pages = new Set(sitemap().map((e) => e.url.slice(site.url.length) || "/"));
const files = readdirSync(__dirname)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts" && !f.endsWith(".test.ts"))
  .map((f) => f.replace(/\.ts$/, ""));
const linksIn = (md: string) => [...md.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1].replace(/[?#].*$/, "") || "/");
const words = (md: string) => md.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

describe("the blog", () => {
  it("lists every post file in content/blog, under its own name", () => {
    expect([...files].sort()).toEqual(posts.map((p) => p.slug).sort());
    for (const p of posts) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("is in the sitemap, post by post", () => {
    expect(pages.has("/blog")).toBe(true);
    for (const p of posts) expect(pages.has(postPath(p.slug)), p.slug).toBe(true);
  });

  it("gives every post a title of its own, guides and scenarios included", () => {
    const titles = [...posts, ...guides, ...scenarios].map((a) => a.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
  });

  it("keeps titles and descriptions to what search results show", () => {
    for (const p of posts) {
      expect(p.title.length, p.slug).toBeLessThanOrEqual(60);
      expect(p.description.length, p.slug).toBeGreaterThanOrEqual(70);
      expect(p.description.length, p.slug).toBeLessThanOrEqual(170);
    }
  });

  it("dates no post in the future, and one post a day at most", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const p of posts) {
      expect(p.published, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.published <= today, `${p.slug}: ${p.published}`).toBe(true);
      if (p.updated) expect(p.updated >= p.published && p.updated <= today, p.slug).toBe(true);
    }
    expect(new Set(posts.map((p) => p.published)).size).toBe(posts.length);
  });

  it("credits a real author and files each post under a known category", () => {
    for (const p of posts) {
      expect(Object.keys(authors), p.slug).toContain(p.author);
      expect(categories, p.slug).toContain(p.category);
    }
  });

  it("links only to pages that exist, and to at least two of them", () => {
    for (const p of posts) {
      const links = [...linksIn(p.body), ...(p.related ?? [])];
      for (const href of links) expect(pages.has(href), `${p.slug} → ${href}`).toBe(true);
      expect(new Set(linksIn(p.body)).size, p.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("is long enough to be worth the click", () => {
    for (const p of posts) expect(words(p.body), p.slug).toBeGreaterThanOrEqual(600);
    for (const p of posts) expect(readMinutes(p.body)).toBeGreaterThanOrEqual(3);
  });

  it("answers at least three questions, none twice", () => {
    for (const p of posts) {
      expect(p.faq.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(new Set(p.faq.map((f) => f.q)).size, p.slug).toBe(p.faq.length);
    }
  });

  it("uses only the markdown the site renders", () => {
    for (const p of posts) {
      const html = renderToStaticMarkup(createElement(Markdown, { source: p.body }));
      // Anything the parser didn't understand comes out as raw syntax.
      expect(html, p.slug).not.toMatch(/\*\*|\]\(|^#|<p>#|`|\$\{|undefined/m);
    }
  });
});
