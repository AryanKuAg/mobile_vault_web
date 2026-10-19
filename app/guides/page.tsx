import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, LinkCard, PageHero } from "@/components/page-parts";
import { guides } from "@/content/guides";
import { scenarios } from "@/content/scenarios";

export const metadata: Metadata = {
  title: "Privacy & Encryption Guides",
  description: "Practical, plain-English guides to hiding photos, understanding encryption and keeping your iPhone private.",
};

export default function GuidesPage() {
  const categories = [...new Set(guides.map((g) => g.category))];

  return (
    <>
      <PageHero
        eyebrow="Guides"
        title={<>Privacy &amp; encryption, <span className="text-accent">explained plainly.</span></>}
        lede="How-tos and explainers for keeping photos and files private on iPhone, whichever app you use."
        crumbs={[{ label: "Guides" }]}
      />
      <section className="py-20">
        <Container>
          <Link href="/scenarios" className="card mb-16 flex flex-col justify-between gap-4 p-7 sm:flex-row sm:items-center">
            <span>
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-highlight">Scenarios</span>
              <span className="mt-1 block font-display text-xl font-bold">
                Real situations: shared passcodes, border checks, repairs and more
              </span>
            </span>
            <span className="btn btn-ghost shrink-0">{scenarios.length} scenarios →</span>
          </Link>
          {categories.map((cat) => (
            <div key={cat} className="mb-16 last:mb-0">
              <h2 className="mb-6 font-display text-2xl font-bold">{cat}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {guides
                  .filter((g) => g.category === cat)
                  .map((g) => (
                    <LinkCard key={g.slug} href={`/guides/${g.slug}`} title={g.title} body={g.description} meta={`${g.readMinutes} min read`} />
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
