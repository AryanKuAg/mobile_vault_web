import type { Metadata } from "next";
import { Container, CtaBand, JsonLd, LinkCard, PageHero } from "@/components/page-parts";
import { authors, postPath, posts, readMinutes } from "@/content/blog";
import { site } from "@/lib/site";

const DESCRIPTION = `New posts on photo privacy, iPhone security and encryption, in plain English, from the people who make ${site.name}.`;

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes on privacy, <span className="text-accent">for the phone in your pocket.</span>
          </>
        }
        lede="How-tos, explainers and straight answers about keeping photos, files and apps private on iPhone. A new one most days."
        crumbs={[{ label: "Blog" }]}
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <LinkCard
                key={p.slug}
                href={postPath(p.slug)}
                title={p.title}
                body={p.description}
                meta={`${p.category} · ${formatDate(p.published)} · ${readMinutes(p.body)} min read`}
              />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `The ${site.name} blog`,
          description: DESCRIPTION,
          url: `${site.url}/blog`,
          publisher: { "@type": "Organization", name: site.company, url: site.url },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            url: `${site.url}${postPath(p.slug)}`,
            datePublished: p.published,
            dateModified: p.updated ?? p.published,
            author: { "@type": "Person", name: authors[p.author] },
          })),
        }}
      />
    </>
  );
}
