import type { Metadata } from "next";
import { Container, CtaBand, PageHero } from "@/components/page-parts";
import { releases, roadmap } from "@/content/changelog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "What's New",
  description: `Release notes for every ${site.name} update, and what we're working on next.`,
};

function formatMonth(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]} ${d}, ${y}`;
}

export default function WhatsNewPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="What's new"
        lede={`Every ${site.name} release, newest first. We ship small, frequent updates and tell you exactly what changed.`}
        crumbs={[{ label: "What's New" }]}
      />
      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="mb-16 rounded-3xl border-2 border-dashed border-accent/50 bg-surface p-7">
            <h2 className="font-display text-xl font-bold">What we&apos;re working on</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {roadmap.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 border-2 border-highlight" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <ol className="relative space-y-12 border-l-2 border-line pl-8">
            {releases.map((r) => (
              <li key={r.version} className="relative">
                <span className="diamond absolute -left-[42px] top-1.5 !h-4 !w-4" />
                <p className="text-sm font-semibold text-faint">
                  <span className="mr-2 rounded-full bg-accent px-2.5 py-0.5 font-bold text-accent-ink">v{r.version}</span>
                  {formatMonth(r.date)}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">{r.title}</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-highlight">
                  {r.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
