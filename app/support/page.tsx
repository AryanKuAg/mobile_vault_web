import type { Metadata } from "next";
import Link from "next/link";
import { Container, Faq, PageHero } from "@/components/page-parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${site.name}: forgotten patterns, restoring backups, moving to a new iPhone and more.`,
};

const help = [
  {
    q: "I forgot my pattern",
    a: "On the unlock screen, tap Use recovery phrase and enter the words you wrote down when you created the vault. You'll then set a new pattern. Without the pattern or the phrase we can't recover the vault, because we never have either.",
  },
  {
    q: "I opened the app and my vault is empty",
    a: "You probably drew a slightly different pattern. Every pattern opens a vault, so a mistake opens a new, empty one. Lock the app and draw your pattern again carefully.",
  },
  {
    q: "How do I move to a new iPhone?",
    a: "Make sure Encrypted Backup is on and has finished (Settings → Backup). On the new phone, sign in to the same Apple account, install the app, and unlock with your pattern or recovery phrase. The restore starts automatically.",
  },
  {
    q: "How do I restore Pro?",
    a: "Open Settings → Pro → Restore Purchases while signed in with the Apple account you used to buy it.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Subscriptions are managed by Apple. Open the Settings app → your name → Subscriptions, then choose the app.",
  },
  {
    q: "Imported photos are still in my camera roll",
    a: "iOS asks for permission before an app can delete photos. Turn on Delete originals after import, confirm the prompt, then empty Recently Deleted in Photos.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="How can we help?"
        lede="Answers to the most common questions. Can't find yours? Email us. A real person replies, usually within a day."
        crumbs={[{ label: "Support" }]}
      >
        <a href={`mailto:${site.supportEmail}`} className="btn btn-primary mt-8">
          Email {site.supportEmail}
        </a>
      </PageHero>
      <section className="py-20">
        <Container className="max-w-3xl">
          <Faq items={help} />
          <p className="mt-10 text-muted">
            Looking for more detail? Browse the <Link href="/guides" className="font-semibold text-accent underline">guides</Link> or see{" "}
            <Link href="/features/security-architecture" className="font-semibold text-accent underline">how our encryption works</Link>.
          </p>
          <div className="mt-12 rounded-3xl border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-bold">Reporting a security issue</h2>
            <p className="mt-2 text-muted">
              Please email {site.supportEmail} with &quot;Security&quot; in the subject line. We&apos;ll acknowledge within 48 hours and credit you publicly if you&apos;d like.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
