import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { getGuide, guides } from "@/content/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.description },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const related = (guide.related ?? [])
    .map(getGuide)
    .filter((g) => g !== undefined)
    .map((g) => ({ href: `/guides/${g.slug}`, label: g.title }));

  return (
    <ArticleLayout
      article={guide}
      path={`/guides/${guide.slug}`}
      crumbs={[{ href: "/guides", label: "Guides" }, { label: guide.title }]}
      related={related}
    />
  );
}
