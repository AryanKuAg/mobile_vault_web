import type { Metadata } from "next";
import { Container, CtaBand, Faq, JsonLd, LinkCard, PageHero } from "@/components/page-parts";
import { homeFaq } from "@/content/faq";
import { features } from "@/content/features";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/features" },
  title: "Features",
  description: `Every ${site.name} feature, from pattern-key encryption and the recovery phrase to a vault for each pattern.`,
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>Everything in {site.name}, <span className="text-accent">and how it keeps you safe.</span></>}
        lede="Each feature is built on the same foundation: your files are encrypted with a key that only exists when you draw your pattern."
        crumbs={[{ label: "Features" }]}
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <LinkCard key={f.slug} href={`/features/${f.slug}`} title={f.title} body={f.summary} icon={f.icon} />
            ))}
          </div>
          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="mb-8 text-center font-display text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold tracking-[-0.03em]">
              Frequently asked questions
            </h2>
            <Faq items={homeFaq} />
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: homeFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
              }}
            />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
