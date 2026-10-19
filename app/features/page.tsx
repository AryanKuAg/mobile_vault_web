import type { Metadata } from "next";
import { Container, CtaBand, LinkCard, PageHero } from "@/components/page-parts";
import { features } from "@/content/features";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description: `Every ${site.name} feature, from pattern-key encryption and deniable vaults to encrypted backup and private sharing.`,
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
              <LinkCard key={f.slug} href={`/features/${f.slug}`} title={f.title} body={f.summary} icon={f.icon} meta={f.tier} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
