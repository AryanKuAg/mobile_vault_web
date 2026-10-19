import type { Metadata } from "next";
import { AppStoreButton } from "@/components/app-store-button";
import { Container, PageHero } from "@/components/page-parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vault Invite",
  description: `Someone wants to send you files privately with ${site.name}. Here's how to receive them.`,
  robots: { index: false },
};

const steps = [
  { title: `Install ${site.name}`, body: "It's free on the App Store for iPhone and iPad." },
  { title: "Create your vault", body: "Draw a pattern and write down your recovery phrase. No account needed." },
  { title: "Open the invite link again", body: "Tap the link you were sent. The files are decrypted straight into your vault and never touch Photos." },
];

export default function InvitePage() {
  return (
    <>
      <PageHero
        eyebrow="Vault Invite"
        title={<>Someone sent you <span className="text-accent">something private.</span></>}
        lede={`This invite delivers files end-to-end encrypted, from their ${site.name} vault to yours. Only your device can open them.`}
      >
        <div className="mt-10">
          <AppStoreButton />
        </div>
      </PageHero>
      <section className="py-20">
        <Container className="max-w-3xl">
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="card flex gap-5 p-6">
                <span className="font-display text-4xl font-bold leading-none text-highlight">{i + 1}</span>
                <span>
                  <span className="block font-display text-xl font-bold">{s.title}</span>
                  <span className="mt-1 block text-muted">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-faint">
            The decryption key is in the part of the link after the # symbol. Browsers never send that part to any server, including ours.
          </p>
        </Container>
      </section>
    </>
  );
}
