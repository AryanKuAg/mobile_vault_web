import { Container, CtaBand, Faq, InlineCta, JsonLd, PageHero, Related, type Crumb } from "@/components/page-parts";
import type { Article } from "@/content/guides";
import { Markdown, headings } from "@/lib/markdown";
import { site } from "@/lib/site";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** A blog post's extras: who wrote it and when, its share image, and the questions under it. */
export type PostDetails = {
  author: string;
  published: string;
  image: string;
  faq: { q: string; a: string }[];
};

export function ArticleLayout({
  article,
  crumbs,
  path,
  related,
  post,
}: {
  article: Article;
  crumbs: Crumb[];
  path: string;
  related: { href: string; label: string }[];
  post?: PostDetails;
}) {
  const toc = headings(article.body);
  const url = `${site.url}${path}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": post ? "BlogPosting" : "Article",
              headline: article.title,
              description: article.description,
              ...(post && {
                datePublished: post.published,
                author: { "@type": "Person", name: post.author },
                image: `${site.url}${post.image}`,
              }),
              dateModified: article.updated,
              mainEntityOfPage: url,
              publisher: { "@type": "Organization", name: site.company, url: site.url },
            },
            ...(post?.faq.length
              ? [
                  {
                    "@type": "FAQPage",
                    mainEntity: post.faq.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  },
                ]
              : []),
          ],
        }}
      />
      <PageHero eyebrow={article.category} title={article.title} lede={article.description} crumbs={crumbs}>
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint">
          {post ? (
            <>
              <span>By {post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              {article.updated !== post.published && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatDate(article.updated)}</span>
                </>
              )}
            </>
          ) : (
            <span>Updated {formatDate(article.updated)}</span>
          )}
          <span aria-hidden="true">·</span>
          <span>{article.readMinutes} min read</span>
          {!post && (
            <>
              <span aria-hidden="true">·</span>
              <span>By the {site.name} team</span>
            </>
          )}
        </p>
      </PageHero>
      <section className="py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="min-w-0 max-w-3xl">
              <Markdown source={article.body} />
              <InlineCta />
              {post && post.faq.length > 0 && (
                <section className="mt-16" aria-labelledby="questions">
                  <h2 id="questions" className="mb-6 font-display text-2xl font-bold">
                    Questions
                  </h2>
                  <Faq items={post.faq} />
                </section>
              )}
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
