import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Container, CtaBand, InlineCta, PageHero, Related } from "@/components/page-parts";
import { comparisons, getComparison, type Cell } from "@/content/compare";
import { Markdown } from "@/lib/markdown";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const c = getComparison((await params).slug);
  if (!c) return {};
  return { title: `${site.name} vs ${c.competitor}`, description: c.summary };
}

function CellValue({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
        <Icon name="check" className="h-5 w-5 text-accent" /> Yes
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex items-center gap-1.5 text-faint">
        <Icon name="x" className="h-5 w-5 text-highlight" /> No
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center gap-1.5 text-muted">
        <Icon name="minus" className="h-5 w-5" /> Partly
      </span>
    );
  return <span className="text-muted">{value}</span>;
}

export default async function ComparisonPage({ params }: PageProps<"/compare/[slug]">) {
  const c = getComparison((await params).slug);
  if (!c) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Comparison · ${c.kind}`}
        title={<>{site.name} vs <span className="text-accent">{c.competitor}</span></>}
        lede={c.lede}
        crumbs={[{ href: "/compare", label: "Compare" }, { label: c.competitor }]}
      />
      <section className="py-16">
        <Container className="max-w-4xl">
          <div className="overflow-x-auto rounded-3xl border border-line bg-surface">
            <table className="w-full min-w-[540px] text-left text-[0.95rem]">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-4 font-semibold text-faint">At a glance</th>
                  <th className="px-6 py-4 font-display text-lg font-bold text-accent">{site.name}</th>
                  <th className="px-6 py-4 font-display text-lg font-bold">{c.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <td className="px-6 py-4 font-medium">{r.label}</td>
                    <td className="px-6 py-4"><CellValue value={r.us} /></td>
                    <td className="px-6 py-4"><CellValue value={r.them} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-faint">
            Details about {c.competitor} come from its public documentation and can change between versions.
            {c.reviewed ? ` Last reviewed ${c.reviewed}.` : " Check the current version before deciding."}
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-surface p-7">
              <h2 className="font-display text-xl font-bold">Choose {c.competitor} if…</h2>
              <ul className="mt-4 space-y-3 text-muted">
                {c.chooseThem.map((t) => (
                  <li key={t} className="flex gap-3"><Icon name="arrow" className="mt-1 h-4 w-4 shrink-0 text-faint" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border-2 border-accent bg-surface p-7">
              <h2 className="font-display text-xl font-bold text-accent">Choose {site.name} if…</h2>
              <ul className="mt-4 space-y-3 text-muted">
                {c.chooseUs.map((t) => (
                  <li key={t} className="flex gap-3"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <article className="mt-6 max-w-3xl">
            <Markdown source={c.body} />
          </article>
          <InlineCta />
          <Related
            title="Other comparisons"
            links={comparisons.filter((o) => o.slug !== c.slug).map((o) => ({ href: `/compare/${o.slug}`, label: `${site.name} vs ${o.competitor}` }))}
          />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
