import { Container, CtaBand, InlineCta, JsonLd, PageHero, Related, type Crumb } from "@/components/page-parts";
import type { Article } from "@/content/guides";
import { Markdown, headings } from "@/lib/markdown";
import { site } from "@/lib/site";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

export function ArticleLayout({
  article,
  crumbs,
  path,
  related,
}: {
  article: Article;
  crumbs: Crumb[];
  path: string;
  related: { href: string; label: string }[];
}) {
  const toc = headings(article.body);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          dateModified: article.updated,
          mainEntityOfPage: `${site.url}${path}`,
          publisher: { "@type": "Organization", name: site.company },
        }}
      />
      <PageHero eyebrow={article.category} title={article.title} lede={article.description} crumbs={crumbs}>
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint">
          <span>Updated {formatDate(article.updated)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>By the {site.name} team</span>
        </p>
      </PageHero>
      <section className="py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="min-w-0 max-w-3xl">
              <Markdown source={article.body} />
              <InlineCta />
              <Related links={related} />
            </article>
            {toc.length > 1 && (
              <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-faint">On this page</p>
                <ul className="space-y-2 border-l border-line text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted transition hover:border-accent hover:text-accent">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
