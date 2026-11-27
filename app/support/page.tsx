import type { Metadata } from "next";
import Link from "next/link";
import { Container, Faq, PageHero } from "@/components/page-parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/support" },
  title: "Support",
  description: `Get help with ${site.name}: forgotten patterns, recovery phrases, moving to a new iPhone, ${site.name} Pro, shared vaults and more.`,
};

const help = [
  {
    q: "I forgot my pattern. How do I get back in?",
    a: `On ${site.name}'s lock screen, tap "Use recovery phrase", type that vault's recovery phrase, then choose a new pattern. Without the pattern or the phrase, nobody can open the vault, not even us.`,
  },
  {
    q: "I lost both the pattern and the recovery phrase",
    a: `Then that vault can't be opened, by you or by us: we can't see or reset either one. Your other vaults aren't affected. If you'd like the space back, Wipe Everything (the gear on the lock screen) deletes every vault on the iPhone.`,
  },
  {
    q: "How do I move to a new iPhone?",
    a: `From ${site.name} 2.0, turn on Encrypted Backup for each vault (the gear inside the vault, then Encrypted Backup; part of ${site.name} Pro). On the new iPhone, sign in to the same iCloud account, install ${site.name}, tap "Use recovery phrase" on the lock screen and type the vault's phrase. The vault downloads from your iCloud, and you choose a new pattern. Without a backup, vaults stay on the iPhone they were made on: open each one, share what you want to keep to Files or a computer, then import it on the new iPhone.`,
  },
  {
    q: "Can I have more than one vault?",
    a: `Yes. Each pattern opens its own vault. In ${site.name} 2.0, draw a pattern you haven't used on the lock screen and a new, empty vault opens; then save its recovery phrase from the gear inside the vault (Save Recovery Phrase). Vaults are never listed, and none of them can see into another. The free plan has up to 3 vaults, and ${site.name} Pro has no limit.`,
  },
  {
    q: "I opened the app and my vault is empty",
    a: "You probably drew a pattern that isn't quite your usual one, which opens a different, empty vault. Patterns are exact: the same dots in a different order, or one dot more or fewer, make a different pattern. Lock the app and draw your usual pattern carefully. Your vault is still there. To remove the empty one, open it, tap the gear, then Delete This Vault.",
  },
  {
    q: `What is ${site.name} Pro?`,
    a: `${site.name} Pro, from version 2.0, adds unlimited photos, videos and vaults, Encrypted Backup, vault sharing, the panic vault, disguised app icons and slideshow. Choose weekly or yearly (with a free week if you haven't had one), or buy it once for life. The free plan holds up to 100 photos, 10 videos and 3 vaults; files and notes have no limit.`,
  },
  {
    q: "How do I cancel my subscription, or get a refund?",
    a: "Open iPhone Settings, tap your name, then Subscriptions, and choose PrivateRoll Pro. Cancel at least 24 hours before it renews; Pro stays on until the end of the period you've paid for. Apple handles payments and refunds: ask for a refund at reportaproblem.apple.com.",
  },
  {
    q: "I bought Pro, but the app doesn't show it",
    a: `Make sure the App Store is signed in to the Apple Account you bought it with, then tap Restore at the bottom of the ${site.name} Pro screen (the gear, then the ${site.name} Pro card).`,
  },
  {
    q: "What happens when Pro ends?",
    a: "You keep everything you've added. Adding more than 100 photos, 10 videos or 3 vaults needs Pro again, and backups stop, but you can still restore and delete them. Your app icon, a panic vault and earlier shares keep working.",
  },
  {
    q: "How does vault sharing work?",
    a: `Inside the vault, tap the gear, then Share This Vault and Share With Someone New. ${site.name} gives you a share phrase, which works once; send it to the person. On their iPhone, they tap "Join shared vault" on the lock screen, type the phrase and choose a pattern. They can see the vault but can't change it, and they can save files from it only if you allow that. You can stop sharing at any time. Sharing is part of ${site.name} Pro (version 2.0).`,
  },
  {
    q: "Something in a vault shared with me shouldn't be there",
    a: "Open that vault, tap the gear, then Report a Problem: it writes an email to us. You can also tap Leave Shared Vault, and only its owner can share it with you again, with a new phrase. Shared vaults are end-to-end encrypted, so we can't see what's in them, but we read every report and reply.",
  },
  {
    q: "What is the panic vault?",
    a: "For when someone forces you to unlock. Opening a panic vault permanently deletes every other vault, with their backups and shares, right away and with no warning. Set one up from the gear inside a vault (Use as Panic Vault, part of Pro), and only ever open it if you're forced to. Try it with throwaway vaults first.",
  },
  {
    q: "Imported photos are still in my camera roll",
    a: `Importing copies photos into the vault. From version 2.0, ${site.name} offers to delete the originals when an import finishes: photos go to Recently Deleted in Photos, and files are deleted from Files. To do it yourself, delete them in Photos, then open Photos › Recently Deleted and delete them there too.`,
  },
  {
    q: "The app locked in the middle of an import",
    a: `${site.name} locks whenever you leave it, and an import that's still running stops. Unlock the vault and import the remaining items; everything already added is safe.`,
  },
  {
    q: "How do I delete a vault, or everything?",
    a: "Inside a vault, tap the gear, then Delete This Vault. To delete every vault, tap the gear on the lock screen, then Wipe Everything. Both are permanent, and both also delete the vaults' iCloud backups.",
  },
  {
    q: "Does deleting the app delete my vaults?",
    a: "Yes, on that iPhone, permanently. Backups in your iCloud stay, and their recovery phrases can restore them. To delete those too, turn off Encrypted Backup in each vault before deleting the app.",
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
