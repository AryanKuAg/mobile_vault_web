import Link from "next/link";
import { AppStoreButton, AppStoreQR } from "@/components/app-store-button";
import { Icon } from "@/components/icon";
import { Container, Eyebrow, Faq, JsonLd } from "@/components/page-parts";
import { PhoneMockup } from "@/components/phone-mockup";
import { comparisons } from "@/content/compare";
import { homeFaq } from "@/content/faq";
import { features } from "@/content/features";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Draw your pattern",
    body: "Pick a pattern on the 3×3 grid. It's turned into a 256-bit encryption key right on your iPhone, and never saved anywhere.",
  },
  {
    title: "Fill your vault",
    body: "Import from Photos or Files, or shoot straight into the Vault Camera. Every file is encrypted the moment it arrives.",
  },
  {
    title: "Lock and it's gone",
    body: "Leave the app and the key is wiped from memory. Without your pattern, what's left on the phone is unreadable.",
  },
];

const securityPoints = [
  "AES-256-GCM encryption for every file, thumbnail and file name",
  "Argon2id key derivation makes each guess slow and expensive",
  "Keys exist only in memory while the vault is open",
  "No account, no analytics SDKs, no ad networks",
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: site.name,
          operatingSystem: "iOS",
          applicationCategory: "UtilitiesApplication",
          description: site.description,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[min(100vh,900px)] items-center overflow-hidden pb-20 pt-[120px]">
        <div className="hero-grid" />
        <div className="hero-lines">
          <span />
          <span />
        </div>
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div className="min-w-0">
              <div className="mb-7 inline-flex flex-wrap items-center gap-3 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-muted">
                {site.rating ? (
                  <>
                    <span className="tracking-[2px] text-highlight">★★★★★</span>
                    <span>
                      <b className="text-ink">{site.rating.score}</b> from {site.rating.count} ratings
                    </span>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-2 text-ink">
                    <Icon name="lock" className="h-4 w-4 text-highlight" /> No account needed
                  </span>
                )}
                <span className="h-1 w-1 rounded-full bg-faint" />
                <span className="text-xs uppercase tracking-[0.08em]">AES-256 · Zero-knowledge</span>
              </div>
              <h1 className="grid gap-1 font-display text-[clamp(2.3rem,5.4vw,3.8rem)] font-bold leading-[0.93] tracking-[-0.035em]">
                <span className="text-balance">
                  Private photos, <em className="not-italic underline decoration-accent decoration-[3px] underline-offset-[6px]">sealed</em>
                </span>
                <span className="text-balance text-accent">by a pattern only you know.</span>
              </h1>
              <p className="mt-8 max-w-[56ch] border-l-2 border-highlight pl-5 text-lg leading-relaxed text-pretty text-muted sm:text-xl">
                {site.name} encrypts your photos, videos and files on your iPhone. <strong className="text-ink">No account. No cloud you can&apos;t control. No way in without you.</strong>
              </p>
              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <AppStoreButton />
                  <AppStoreQR />
                </div>
                <p className="text-sm text-faint">
                  Free download <span className="mx-2 opacity-50">/</span> iPhone &amp; iPad <span className="mx-2 opacity-50">/</span> No ads
                </p>
              </div>
            </div>
            <PhoneMockup />
          </div>
        </Container>
      </section>

      {/* Strip */}
      <section className="strip relative z-10 py-6" aria-label="What we never ask for">
        <Container>
          <ul className="flex flex-col items-center justify-center gap-3 font-display text-lg font-bold uppercase sm:flex-row sm:gap-14">
            {["No accounts", "No email required", "No backdoors"].map((t) => (
              <li key={t} className="strip-item flex items-center">
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="relative py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Eyebrow>Features</Eyebrow>
            <h2 className="text-balance font-display text-[clamp(2.1rem,4.5vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              Encryption that nobody else holds the key to.
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-lg text-pretty text-muted">
              Zero-knowledge means exactly that: we store nothing that could open your vault. Here&apos;s everything built on top of it.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link key={f.slug} href={`/features/${f.slug}`} className="card group flex gap-4 p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
                  <Icon name={f.icon} />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-bold tracking-tight">{f.title}</span>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-faint">
                      {f.tier}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[0.94rem] leading-relaxed text-muted">{f.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-line bg-bg-deep py-28">
        <Container>
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display text-[clamp(2.1rem,4.5vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              Three steps. No sign-up.
            </h2>
          </div>
          <ol className="timeline relative mx-auto max-w-3xl space-y-16">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="diamond absolute left-[2px] top-1 z-10 md:left-1/2 md:-translate-x-1/2" />
                <div className={`md:row-start-1 ${i % 2 ? "md:col-start-2" : "md:text-right"}`}>
                  <span className="font-display text-6xl font-bold leading-none text-highlight/80">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Security */}
      <section id="security" className="border-t border-ink/80 bg-surface py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="min-w-0">
              <Eyebrow>Security model</Eyebrow>
              <h2 className="text-balance font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                If we were hacked tomorrow, your photos would still be safe.
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg text-accent">
                There is no server-side copy of your key, so there&apos;s nothing to leak, subpoena or sell.
              </p>
              <ul className="mt-8 space-y-3.5">
                {securityPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-muted">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/features/security-architecture" className="mt-8 inline-flex items-center gap-2 font-bold text-accent">
                Read the full security design <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="bracket min-w-0 bg-bg p-8 sm:p-10">
              <pre className="overflow-x-auto font-mono text-[0.85rem] leading-[1.85] text-accent">
                <code>{`vault.unlock(pattern)
  ├─ salt      ← device keychain
  ├─ key       = argon2id(pattern, salt)
  │              memory: 64 MiB · passes: 3
  ├─ file_key  = unwrap(key, header)
  └─ plaintext = aes_256_gcm.open(file_key)

vault.lock()
  └─ zeroize(key, file_keys)   // gone`}</code>
              </pre>
            </div>
          </div>
        </Container>
      </section>

      {/* Conviction */}
      <section className="relative overflow-hidden bg-ink py-28 text-bg">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-highlight" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-display text-[clamp(2.3rem,5.5vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em]">
              Someone grabs your phone.
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed opacity-80">
              They know your passcode. Maybe they watched you type it. They open Photos, the Hidden album, your notes. Then they open {site.name}, draw a guess, and see an empty vault that looks completely normal.
            </p>
            <div className="mx-auto my-10 h-px w-24 bg-highlight" />
            <p className="font-display text-xl font-bold">Nothing to find. Nothing to prove.</p>
            <Link href="/features/deniable-vaults" className="btn mt-9 bg-bg text-ink hover:-translate-y-0.5">
              How deniable vaults work
            </Link>
          </div>
        </Container>
      </section>

      {/* Compare */}
      <section className="py-28">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Compare</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                How {site.name} compares
              </h2>
            </div>
            <Link href="/compare" className="btn btn-ghost self-start sm:self-auto">
              See all comparisons
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comparisons.slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="card group flex flex-col p-6">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-highlight">{c.kind}</span>
                <span className="mt-2 font-display text-xl font-bold leading-tight">vs {c.competitor}</span>
                <span className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-muted">{c.summary}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                  Compare <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-bg-deep py-28">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">Frequently asked questions</h2>
          </div>
          <Faq items={homeFaq} />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: homeFaq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }}
          />
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Your phone is shared more than you think. Your vault doesn&apos;t have to be.
          </h2>
          <div className="mt-10 flex justify-center">
            <AppStoreButton />
          </div>
        </Container>
      </section>
    </>
  );
}
