import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { getScenario, scenarios } from "@/content/scenarios";

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/scenarios/[slug]">): Promise<Metadata> {
  const s = getScenario((await params).slug);
  if (!s) return {};
  return { title: s.title, description: s.description };
}

export default async function ScenarioPage({ params }: PageProps<"/scenarios/[slug]">) {
  const scenario = getScenario((await params).slug);
  if (!scenario) notFound();

  const related = scenarios
    .filter((s) => s.group === scenario.group && s.slug !== scenario.slug)
    .map((s) => ({ href: `/scenarios/${s.slug}`, label: s.title }));

  return (
    <ArticleLayout
      article={scenario}
      path={`/scenarios/${scenario.slug}`}
      crumbs={[{ href: "/scenarios", label: "Scenarios" }, { label: scenario.group }]}
      related={related}
    />
  );
}
