import type { Metadata } from "next";
import Link from "next/link";
import { Container, Faq, PageHero } from "@/components/page-parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/support" },
  title: "Support",
  description: `Get help with ${site.name}: forgotten patterns, recovery phrases, more than one vault, moving to a new iPhone and more.`,
};

const help = [
  {
    q: "I forgot my pattern. How do I get back in?",
    a: `On ${site.name}'s lock screen, tap "Use recovery phrase" and type the phrase you saved when you made that vault, then choose a new pattern. The phrase only works on the iPhone where you made the vault. Without the pattern or the phrase, nobody can open the vault, not even us.`,
  },
  {
    q: "I lost both the pattern and the recovery phrase",
    a: `Then that vault can't be opened, by you or by us. ${site.name} never stores either one, so there's nothing to reset. Your other vaults aren't affected. If you'd like the space back, Wipe Everything (the gear on the lock screen) deletes every vault on the iPhone.`,
  },
  {
    q: "Can I have more than one vault?",
    a: "Yes. Each pattern opens its own vault. On the lock screen, draw a pattern you haven't used, draw it again to confirm, and save the new vault's recovery phrase. Vaults are never listed, and none of them can see into another.",
  },
  {
    q: "I drew my pattern and it offered to make a new vault",
    a: "The pattern you drew doesn't match any vault. Patterns are exact: the same dots in a different order, or one dot more or fewer, make a different pattern. Go back and draw again carefully. After five patterns in a row that open nothing, the app makes you wait before trying again, starting at 30 seconds and doubling up to 15 minutes.",
  },
  {
    q: "I opened the app and my vault is empty",
    a: "You probably confirmed a new pattern by mistake, which makes a new, empty vault. Lock the app and draw your usual pattern. Your vault is still there.",
  },
  {
    q: "How do I move to a new iPhone?",
    a: `Vaults can't be transferred: they're tied to the iPhone they were made on and aren't part of iCloud or computer backups, and recovery phrases only work on that iPhone. Before you switch, open each vault, select what you want to keep and share it to Files or a computer. Then import it into ${site.name} on the new phone and delete the exported copies.`,
  },
  {
    q: "Imported photos are still in my camera roll",
    a: `Importing copies photos into the vault; ${site.name} doesn't delete anything from Photos. Once the import has finished, delete the originals in Photos, then open Photos → Recently Deleted and delete them there too.`,
  },
  {
    q: "The app locked in the middle of an import",
    a: `${site.name} locks whenever you leave it, and an import that's still running stops. Unlock the vault and import the remaining items; everything already added is safe.`,
  },
  {
    q: "How do I delete a vault, or everything?",
    a: "Inside a vault, tap the gear, then Delete This Vault. To delete every vault, tap the gear on the lock screen, then Wipe Everything. Both are permanent.",
  },
  {
    q: "Does deleting the app delete my vaults?",
    a: "Yes. Deleting the app permanently deletes every vault in it. There's no copy anywhere else.",
  },
  {
    q: "Does it work on iPad?",
    a: `Not yet. ${site.name} is for iPhone, with iOS 17 or later. iPad is on the roadmap in What's New.`,
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
            Looking for more detail? Browse the <Link href="/guides" className="font-semibold text-ink underline">guides</Link>, read about the{" "}
            <Link href="/features/recovery-phrase" className="font-semibold text-ink underline">recovery phrase</Link>, or see{" "}
            <Link href="/features/security-architecture" className="font-semibold text-ink underline">how our encryption works</Link>.
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
