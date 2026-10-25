import type { Metadata } from "next";
import { Container, CtaBand, LinkCard, PageHero } from "@/components/page-parts";
import { tools } from "@/content/tools";

export const metadata: Metadata = {
  alternates: { canonical: "/tools" },
  title: "Free Privacy Tools",
  description: "Free image and privacy tools that run entirely in your browser: metadata remover, compressor, resizer, converter, QR codes, redaction and passwords.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title={<>Useful tools that <span className="text-accent">never upload your files.</span></>}
        lede="Everything here runs in your browser. Your images stay on your device, so you can even use these offline once the page has loaded."
        crumbs={[{ label: "Tools" }]}
      />
      <section className="py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <LinkCard key={t.slug} href={`/tools/${t.slug}`} title={t.title} body={t.summary} icon={t.icon} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
