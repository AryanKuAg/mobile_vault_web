import { Container, PageHero } from "@/components/page-parts";
import { Markdown } from "@/lib/markdown";

// The text describes how PrivateRoll handles data as of the date shown, but no lawyer has
// reviewed it. Set DRAFT to true to show a warning while the text is being reworked.
const DRAFT = false;

export function LegalPage({ title, updated, body }: { title: string; updated: string; body: string }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ label: title }]}>
        <p className="mt-6 text-sm text-faint">Last updated {updated}</p>
      </PageHero>
      <section className="py-16">
        <Container className="max-w-3xl">
          {DRAFT && (
            <p className="mb-10 rounded-2xl border border-highlight/50 bg-highlight/10 p-4 text-sm font-semibold text-highlight">
              Draft. This text is being revised and may not yet match how the app handles data.
            </p>
          )}
          <Markdown source={body} />
        </Container>
      </section>
    </>
  );
}
