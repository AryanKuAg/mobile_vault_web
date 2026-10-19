import { Container, PageHero } from "@/components/page-parts";
import { Markdown } from "@/lib/markdown";

// Flip to true once a lawyer has reviewed the text for your jurisdiction.
const REVIEWED = false;

export function LegalPage({ title, updated, body }: { title: string; updated: string; body: string }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ label: title }]}>
        <p className="mt-6 text-sm text-faint">Last updated {updated}</p>
      </PageHero>
      <section className="py-16">
        <Container className="max-w-3xl">
          {!REVIEWED && (
            <p className="mb-10 rounded-2xl border border-highlight/50 bg-highlight/10 p-4 text-sm font-semibold text-highlight">
              Template text. Review with a lawyer and make sure it matches how your app really handles data before publishing.
            </p>
          )}
          <Markdown source={body} />
        </Container>
      </section>
    </>
  );
}
