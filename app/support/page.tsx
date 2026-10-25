import type { Metadata } from "next";
import Link from "next/link";
import { Container, Faq, PageHero } from "@/components/page-parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/support" },
  title: "Support",
  description: `Get help with ${site.name}: forgotten patterns, empty vaults, moving to a new iPhone and more.`,
};

const help = [
  {
    q: "I forgot my pattern",
    a: `There's no way to recover it. ${site.name} doesn't store your pattern or anything that could reset it, so a vault whose pattern is forgotten can't be opened, by you or by us. Vaults with patterns you remember aren't affected.`,
  },
  {
    q: "It says no vault opens with my pattern",
    a: "The pattern you drew doesn't match any vault. Patterns are exact: the same dots in a different order, or one dot more or fewer, make a different pattern. Draw again carefully. After five patterns that open nothing, the app makes you wait before trying again, starting at 30 seconds.",
  },
  {
    q: "I opened the app and my vault is empty",
    a: "You probably confirmed a new pattern by mistake, which creates a new, empty vault. Lock the app and draw your usual pattern. Your vault is still there.",
  },
  {
    q: "How do I move to a new iPhone?",
    a: `Vaults can't be transferred: they're tied to the device they were made on and aren't part of iCloud or computer backups. Before you switch, open each vault, select what you want to keep and share it to Files or a computer. Then import it into ${site.name} on the new phone and delete the exported copies.`,
  },
  {
    q: "Imported photos are still in my camera roll",
    a: `After an import, ${site.name} offers to remove the originals. Choose Delete Originals and confirm the iOS prompt; the photos then sit in Recently Deleted in Photos for 30 days unless you empty it. Removing originals needs full Photos access (Settings → Privacy & Security → Photos → ${site.name}).`,
  },
  {
    q: "Items I added from the share sheet aren't showing",
    a: "They appear the next time you unlock the vault whose pattern you drew in the share sheet. If you drew a different vault's pattern, they're in that vault.",
  },
  {
    q: "The app locked in the middle of an import",
    a: `${site.name} locks whenever you leave it, and an import that's still running stops. Unlock the vault and import the remaining items; everything already added is safe.`,
  },
  {
    q: "Does deleting the app delete my vaults?",
    a: "Yes. Deleting the app permanently deletes every vault in it. There's no copy anywhere else.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="How can we help?"
        lede="Answers to the most common questions. Can't find yours? Email us. A real person reads every message."
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
              Please email {site.supportEmail} with &quot;Security&quot; in the subject line. We&apos;ll get back to you as soon as we can, and credit you publicly if you&apos;d like.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
