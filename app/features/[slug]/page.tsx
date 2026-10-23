import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Container, CtaBand, Faq, InlineCta, PageHero } from "@/components/page-parts";
import { features, getFeature } from "@/content/features";
import { Markdown } from "@/lib/markdown";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const f = getFeature((await params).slug);
  if (!f) return {};
  return { title: f.title, description: f.summary };
}

export default async function FeaturePage({ params }: PageProps<"/features/[slug]">) {
  const feature = getFeature((await params).slug);
  if (!feature) notFound();

  const others = features.filter((f) => f.slug !== feature.slug);

  return (
    <>
      <PageHero
        eyebrow={feature.title}
        title={feature.headline}
        lede={feature.lede}
        crumbs={[{ href: "/features", label: "Features" }, { label: feature.title }]}
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="min-w-0 max-w-3xl">
              <Markdown source={feature.body} />
              {feature.faq.length > 0 && (
                <div className="mt-16">
                  <h2 className="mb-6 font-display text-2xl font-bold">Questions about {feature.title}</h2>
                  <Faq items={feature.faq} />
                </div>
              )}
              <InlineCta />
            </article>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-faint">More features</p>
              <ul className="space-y-1">
                {others.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/features/${f.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-muted transition hover:bg-surface hover:text-accent">
                      <Icon name={f.icon} className="h-4 w-4 text-accent" />
                      {f.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
