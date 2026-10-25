import type { MetadataRoute } from "next";
import { coverPath, lastChanged, postPath, posts } from "@/content/blog";
import { comparisons } from "@/content/compare";
import { features } from "@/content/features";
import { guides } from "@/content/guides";
import { scenarios } from "@/content/scenarios";
import { tools } from "@/content/tools";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/features", "/compare", "/guides", "/scenarios", "/tools", "/whats-new", "/about", "/support", "/privacy", "/terms"];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...features.map((f) => ({ url: `${site.url}/features/${f.slug}` })),
    ...comparisons.map((c) => ({ url: `${site.url}/compare/${c.slug}` })),
    { url: `${site.url}/blog`, lastModified: lastChanged() },
    ...posts.map((p) => ({
      url: `${site.url}${postPath(p.slug)}`,
      lastModified: p.updated ?? p.published,
      // The post's cover, so it can show in image search.
      images: [`${site.url}${coverPath(p.slug)}`],
    })),
    ...guides.map((g) => ({ url: `${site.url}/guides/${g.slug}`, lastModified: g.updated })),
    ...scenarios.map((s) => ({ url: `${site.url}/scenarios/${s.slug}`, lastModified: s.updated })),
    ...tools.map((t) => ({ url: `${site.url}/tools/${t.slug}` })),
  ];
}
