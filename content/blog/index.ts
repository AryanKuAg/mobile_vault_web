import type { Article } from "@/content/guides";
import { post as howToHideTextMessagesOnIphone } from "./how-to-hide-text-messages-on-iphone";
import { post as advancedDataProtectionIcloudExplained } from "./advanced-data-protection-icloud-explained";
import { post as stolenDeviceProtectionIphoneExplained } from "./stolen-device-protection-iphone-explained";
import { post as howToHideAppsOnIphone } from "./how-to-hide-apps-on-iphone";
import { post as howToPermanentlyDeletePhotosIphone } from "./how-to-permanently-delete-photos-iphone";
import { post as recentlyDeletedPhotosIphoneExplained } from "./recently-deleted-photos-iphone-explained";
import { post as howToLockAnAlbumOnIphone } from "./how-to-lock-an-album-on-iphone";
import { post as howToSeeHiddenPhotosOnIphone } from "./how-to-see-hidden-photos-on-iphone";

// The blog: dated posts, one file each in this folder, listed below. Every post is
// checked by content/blog/blog.test.ts (run `npm test`) before it goes out.

export const authors = {
  "aryan-kumar": "Aryan Kumar",
  "surya-narayanan": "Surya Narayanan",
} as const;

export type AuthorId = keyof typeof authors;

export const categories = ["How-to", "Explainer", "Security", "Comparison"] as const;

/**
 * A post is a guide's fields with a date, a byline and a few questions under it.
 * `related` takes site paths ("/guides/…", "/blog/…"), so a post can point
 * anywhere on the site, and its read time is counted rather than typed.
 */
export type BlogPost = Omit<Article, "updated" | "readMinutes" | "related" | "category"> & {
  category: (typeof categories)[number];
  published: string; // ISO date
  updated?: string; // ISO date, when the post changed in substance
  author: AuthorId;
  related?: string[];
  faq: { q: string; a: string }[];
};

// Newest first. A new post goes in this list, imported like the one above.
export const posts: BlogPost[] = [howToHideTextMessagesOnIphone, advancedDataProtectionIcloudExplained, stolenDeviceProtectionIphoneExplained, howToLockAnAlbumOnIphone, howToHideAppsOnIphone, howToSeeHiddenPhotosOnIphone, howToPermanentlyDeletePhotosIphone, recentlyDeletedPhotosIphoneExplained].sort((a, b) => b.published.localeCompare(a.published));

export const postPath = (slug: string) => `/blog/${slug}`;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Each post's cover, drawn at build (app/blog/[slug]/cover.png): the share card, and the image search sees. */
export const coverSize = { width: 1200, height: 630 };
export const coverPath = (slug: string) => `${postPath(slug)}/cover.png`;

/** Words in the body, at 238 a minute. */
export function readMinutes(body: string) {
  const words = body.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  return Math.max(1, Math.round(words / 238));
}

/** The post in the shape the article layout reads. */
export const asArticle = (p: BlogPost): Article => ({
  ...p,
  related: undefined,
  updated: p.updated ?? p.published,
  readMinutes: readMinutes(p.body),
});

/** The date the blog last changed, for the sitemap and the feed. */
export const lastChanged = () => posts.map((p) => p.updated ?? p.published).sort().at(-1);
