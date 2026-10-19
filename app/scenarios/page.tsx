import type { Metadata } from "next";
import { Container, CtaBand, LinkCard, PageHero } from "@/components/page-parts";
import { scenarioGroups, scenarios } from "@/content/scenarios";

export const metadata: Metadata = {
  title: "Privacy Scenarios",
  description: "Step-by-step help for real situations: a partner who knows your passcode, a border search, a phone repair, a shared family iPad and more.",
};

export default function ScenariosPage() {
  return (
    <>
      <PageHero
        eyebrow="Scenarios"
        title={<>Real situations. <span className="text-accent">Practical answers.</span></>}
        lede="Privacy problems rarely start with hackers. They start with a borrowed phone, a shared iPad or someone who knows your passcode."
        crumbs={[{ href: "/guides", label: "Guides" }, { label: "Scenarios" }]}
      />
      <section className="py-20">
        <Container>
          {scenarioGroups.map((group) => (
            <div key={group} className="mb-16 last:mb-0">
              <h2 className="mb-6 font-display text-2xl font-bold">{group}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {scenarios
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <LinkCard key={s.slug} href={`/scenarios/${s.slug}`} title={s.title} body={s.description} />
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
