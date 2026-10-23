import Link from "next/link";
import { AppStoreButton, AppStoreQR } from "@/components/app-store-button";
import { Icon } from "@/components/icon";
import { Container, Eyebrow, Faq, JsonLd } from "@/components/page-parts";
import { PhoneMockup } from "@/components/phone-mockup";
import { comparisons } from "@/content/compare";
import { homeFaq } from "@/content/faq";
import { features } from "@/content/features";
import { site } from "@/lib/site";

// The same four promises as the app's welcome screen.
const welcome = [
  { icon: "pattern", title: "A pattern, not a password", body: "Draw it to get in. No account, no email." },
  { icon: "lock", title: "Everything encrypted", body: "Photos, videos, files and notes, sealed with AES-256." },
  { icon: "layers", title: "Unlisted vaults", body: "Each pattern opens its own, and none are listed." },
  { icon: "alert", title: "A pattern for emergencies", body: "One pattern can erase every other vault." },
];

// The five pages of the app's onboarding tour.
const tour = [
  {
    title: "Your pattern is the key",
    body: "The shape you draw becomes the encryption key. Draw another shape and another vault opens, sealed off from the rest.",
    href: "/features/pattern-key",
  },
  {
    title: "Nothing to read without it",
    body: `Names, folders and dates are encrypted along with your files. ${site.name} keeps no list of vaults and never shows how many there are.`,
    href: "/features/decoy-vaults",
  },
  {
    title: "A pattern for bad moments",
    body: `Turn any vault into a duress vault. If you're pressured to open ${site.name}, draw its pattern: every other vault is erased and only that one opens.`,
    href: "/features/duress-vault",
  },
  {
    title: "Hide it in plain sight",
    body: `Give ${site.name} the icon of a calculator, a level or a printer. Tapping it still leads to your pattern.`,
    href: "/features/disguised-icons",
  },
  {
    title: "Bound to this device",
    body: "Your keys are made here and kept in this device's Keychain. Copied vault files are useless anywhere else.",
    href: "/features/security-architecture",
  },
];

// The tips the app gives right before you draw your first pattern.
const tips = [
  { icon: "pattern", title: "Pick a shape you'll remember", body: "Practice it a few times before you add anything important." },
  { icon: "mask", title: "Draw it out of sight", body: "Anyone watching over your shoulder could copy it." },
  { icon: "x", title: "Skip the obvious", body: "Letters, straight lines and corner-to-corner shapes get guessed first." },
];

const securityPoints = [
  "AES-256-GCM encryption for every file, thumbnail and file name",
  "PBKDF2 with 250,000 rounds, tied to a secret that never leaves your device",
  "Keys exist only in memory while the vault is open",
  "No account, no servers, no analytics, no ads",
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: site.name,
          operatingSystem: "iOS, iPadOS",
          applicationCategory: "SecurityApplication",
          description: site.description,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[min(100vh,900px)] items-center overflow-hidden pb-20 pt-[120px]">
        <div className="hero-glow" />
        <div className="hero-grid" />
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
                    <Icon name="lock" className="h-4 w-4 text-accent" /> No account needed
                  </span>
                )}
                <span className="h-1 w-1 rounded-full bg-faint" />
                <span className="text-xs uppercase tracking-[0.08em]">AES-256 · On your device</span>
              </div>
              <h1 className="text-balance font-display text-[clamp(2.3rem,5.2vw,3.7rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                A <span className="text-accent">private place</span> for your photos, videos, files and notes.
              </h1>
              <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-pretty text-muted sm:text-xl">
                Draw a pattern to get in. Everything you add is encrypted on your iPhone or iPad with AES-256.{" "}
                <strong className="text-ink">No account. No email. No way in without you.</strong>
              </p>
              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <AppStoreButton />
                  <AppStoreQR />
                </div>
                <p className="text-sm text-faint">
                  Free <span className="mx-2 opacity-50">/</span> iPhone &amp; iPad <span className="mx-2 opacity-50">/</span> No ads
                </p>
              </div>
            </div>
            <PhoneMockup />
          </div>
        </Container>
      </section>

      {/* Welcome */}
      <section aria-label={`Why ${site.name}`} className="relative z-10 -mt-6 pb-24">
        <Container>
          <div className="card grid gap-px overflow-hidden !shadow-none sm:grid-cols-2 lg:grid-cols-4">
            {welcome.map((w) => (
              <div key={w.title} className="flex gap-4 bg-surface p-6">
                <span className="icon-chip shrink-0">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-[1.02rem] font-semibold">{w.title}</span>
                  <span className="mt-1 block text-[0.93rem] leading-relaxed text-muted">{w.body}</span>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works: the app's tour */}
      <section id="how-it-works" className="border-t border-line bg-bg-deep py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-balance font-display text-[clamp(2.1rem,4.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em]">
              Five things to know before your first pattern.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-lg text-pretty text-muted">
              The same short tour {site.name} walks you through when you open it for the first time.
            </p>
          </div>
          <ol className="relative mx-auto max-w-3xl">
            <span className="absolute bottom-6 left-[7px] top-6 w-[3px] rounded-full bg-accent/30" aria-hidden="true" />
            {tour.map((t, i) => (
              <li key={t.title} className="relative flex gap-7 pb-12 last:pb-0">
                <span className="dot relative mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-faint">Step {i + 1}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{t.body}</p>
                  <Link href={t.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Learn more <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Security */}
      <section id="security" className="border-t border-line py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="min-w-0">
              <Eyebrow>Security model</Eyebrow>
              <h2 className="text-balance font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                If someone copied your phone tomorrow, your photos would still be sealed.
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg text-muted">
                There&apos;s no server and no copy of your key anywhere, so there&apos;s nothing to leak, subpoena or sell.
              </p>
              <ul className="mt-8 space-y-3.5">
                {securityPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-muted">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/features/security-architecture" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">
                Read the full security design <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="panel min-w-0 p-8 sm:p-10">
              <pre className="overflow-x-auto font-mono text-[0.85rem] leading-[1.85] text-accent">
                <code>{`vault.unlock(pattern)
  ├─ secret    ← keychain, this device only
  ├─ key       = pbkdf2_sha256(pattern, secret)
  │              rounds: 250,000
  ├─ master    = aes_256_gcm.open(key, header)
  ├─ file_key  = hkdf(master, file_id)
  └─ plaintext = aes_256_gcm.open(file_key)

vault.lock()
  └─ release(master, file_keys)   // gone`}</code>
              </pre>
            </div>
          </div>
        </Container>
      </section>

      {/* No reset button: the warning the app shows before the first pattern */}
      <section className="lock-gradient relative overflow-hidden py-24">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#ff9f0a]/15 text-[#ffb340]">
              <Icon name="alert" className="h-9 w-9" />
            </span>
            <h2 className="mt-6 text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em]">
              There&apos;s no reset button.
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-relaxed text-white/75">
              {site.name} has no account, no email and no recovery key. If you forget a pattern, nobody can open that vault,
              not even the people who make {site.name}.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-[22px] border border-white/10 sm:grid-cols-3">
            {tips.map((t) => (
              <div key={t.title} className="bg-white/[0.06] p-6">
                <Icon name={t.icon} className="h-6 w-6 text-[#4fe3c1]" />
                <p className="mt-3 font-display font-semibold">{t.title}</p>
                <p className="mt-1 text-[0.93rem] leading-relaxed text-white/65">{t.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="relative py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Eyebrow>Features</Eyebrow>
            <h2 className="text-balance font-display text-[clamp(2.1rem,4.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em]">
              Everything in the app.
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-lg text-pretty text-muted">
              Free, with no account and no ads. Here&apos;s what {site.name} does, and exactly how.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Link key={f.slug} href={`/features/${f.slug}`} className="card group flex flex-col gap-4 p-6">
                <span className="icon-chip">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold tracking-tight">{f.title}</span>
                  <span className="mt-1.5 block text-[0.94rem] leading-relaxed text-muted">{f.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Compare */}
      <section className="border-t border-line bg-bg-deep py-28">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Compare</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.03em]">
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
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Compare <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-28">
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
      <section className="relative overflow-hidden border-t border-line py-24">
        <div className="hero-glow" />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em]">
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
