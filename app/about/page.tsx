import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { Container, CtaBand, PageHero } from "@/components/page-parts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: `Who makes ${site.name}, why it exists, and the principles we build it by.`,
};

const principles = [
  {
    icon: "lock",
    title: "We can't, so we won't",
    body: "The best privacy promise is one we're technically unable to break. We design so that we never hold anything that could open your vault.",
  },
  {
    icon: "user",
    title: "No identity required",
    body: "You don't need an account, an email or a phone number. We can't leak, sell or hand over data we never collected.",
  },
  {
    icon: "spark",
    title: "No ads, no data brokers",
    body: `${site.name} is free, and it has no ad networks, no data brokers and no analytics SDKs watching what you do.`,
  },
  {
    icon: "book",
    title: "Explain everything",
    body: "We publish how our encryption works in plain language, and we say clearly what it doesn't protect against.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Building <span className="text-accent">the vault we wanted.</span></>}
        lede={`${site.name} is made independently. It isn't funded by advertisers, and it doesn't answer to anyone who wants your data.`}
        crumbs={[{ label: "About" }]}
      />
      <section className="py-20">
        <Container className="max-w-4xl">
          {/* Personalise this section with your own story. */}
          <div className="prose-vault max-w-3xl">
            <h2>Why {site.name} exists</h2>
            <p>
              Phones have become the place we keep everything: IDs, medical records, photos of our kids, things from past relationships, screenshots we might need one day. Yet the people most likely to see those things aren&apos;t hackers. They&apos;re people who already have our phone in their hands.
            </p>
            <p>
              Most &quot;hidden&quot; folders open with the same passcode as the phone. Many vault apps can reset your PIN by email, which means someone other than you can get in. We wanted something different: a vault whose only key is in your head.
            </p>
            <h2>How we build</h2>
            <p>
              Every feature starts with a question: <strong>does this require us to know anything about you?</strong> If the answer is yes, we find another way or we don&apos;t build it. That&apos;s why there&apos;s no account, no cloud we control, and no break-in photos. Those would all need the app to know more than it should.
            </p>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="card p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                  <Icon name={p.icon} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-3xl border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-bold">Get in touch</h2>
            <p className="mt-2 text-muted">
              Questions, feedback or a security report? Email{" "}
              <a href={`mailto:${site.supportEmail}`} className="font-semibold text-accent underline">
                {site.supportEmail}
              </a>
              . We read everything.
            </p>
          </div>
        </Container>
      </section>
      <CtaBand title="See for yourself." />
    </>
  );
}
