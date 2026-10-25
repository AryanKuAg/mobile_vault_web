import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { asArticle, authors, coverPath, coverSize, getPost, postPath, posts } from "@/content/blog";
import { comparisons } from "@/content/compare";
import { features } from "@/content/features";
import { guides } from "@/content/guides";
import { scenarios } from "@/content/scenarios";
import { tools } from "@/content/tools";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: postPath(p.slug) },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: p.title,
      description: p.description,
      publishedTime: p.published,
      modifiedTime: p.updated ?? p.published,
      authors: [authors[p.author]],
      images: [{ url: coverPath(p.slug), ...coverSize, alt: p.title }],
    },
  };
}

/** Every page a post can point to, by path, with the title to show for it. */
const titles = new Map<string, string>([
  ...posts.map((p): [string, string] => [postPath(p.slug), p.title]),
  ...guides.map((g): [string, string] => [`/guides/${g.slug}`, g.title]),
  ...scenarios.map((s): [string, string] => [`/scenarios/${s.slug}`, s.title]),
  ...features.map((f): [string, string] => [`/features/${f.slug}`, f.title]),
  ...comparisons.map((c): [string, string] => [`/compare/${c.slug}`, `${site.name} vs ${c.competitor}`]),
  ...tools.map((t): [string, string] => [`/tools/${t.slug}`, t.title]),
]);

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  // The post's own picks first, then the newest other posts, up to four.
  const picks = (post.related ?? []).filter((href) => titles.has(href));
  const newer = posts.filter((p) => p.slug !== post.slug).map((p) => postPath(p.slug));
  const related = [...new Set([...picks, ...newer])].slice(0, 4).map((href) => ({ href, label: titles.get(href)! }));

  return (
    <ArticleLayout
      article={asArticle(post)}
      path={postPath(post.slug)}
      crumbs={[{ href: "/blog", label: "Blog" }, { label: post.title }]}
      related={related}
      post={{
        author: authors[post.author],
        published: post.published,
        image: coverPath(post.slug),
        faq: post.faq,
      }}
    />
  );
}
