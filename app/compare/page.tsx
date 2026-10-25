import type { Metadata } from "next";
import { Container, CtaBand, LinkCard, PageHero } from "@/components/page-parts";
import { comparisons } from "@/content/compare";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare",
  description: `How ${site.name} compares with Apple's Hidden album, Google Photos Locked Folder, popular vault apps and calculator vaults.`,
};

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title={<>{site.name} vs. <span className="text-accent">the alternatives.</span></>}
        lede="Honest side-by-sides, including when another option is the better fit. The question that matters is who can open your photos besides you."
        crumbs={[{ label: "Compare" }]}
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((c) => (
              <LinkCard key={c.slug} href={`/compare/${c.slug}`} title={`${site.name} vs ${c.competitor}`} body={c.summary} meta={c.kind} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Real encryption. No ads. No account." />
    </>
  );
}
