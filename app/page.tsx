import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreBadge } from "@/components/app-store-button";
import { JsonLd } from "@/components/page-parts";
import { getApp, homeLinks, site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// One photo: an App Store style panel with a headline over the app's screen, and a handwritten
// note under it. Screens come from scripts/screenshots.sh in the app repo, scaled to 660 × 1434.
type Shot = { title: string; screen: string; alt: string; caption: string; tilt: number };
type Print = { shots: Shot[]; holder: "tape" | "pin" | "clip"; r: number; y: number };

const prints: Print[] = [
  {
    shots: [
      { title: "Draw Your Pattern", screen: "04-lock-screen", alt: "The lock screen: a 5 by 5 grid of dots under “Draw your pattern”", caption: "pattern = key", tilt: -3 },
      { title: "Save Your Phrase", screen: "05-recovery-phrase", alt: "The recovery phrase shown when a vault is made, with Copy and Download buttons", caption: "just in case :)", tilt: 3 },
    ],
    holder: "tape",
    r: -1.4,
    y: 8,
  },
  {
    shots: [{ title: "Your Own Private Vault", screen: "02-vault", alt: "A vault with six photos, a search field, and buttons for settings, select, sort and lock", caption: "my stuff. my vault.", tilt: 0 }],
    holder: "pin",
    r: 2,
    y: -4,
  },
  {
    shots: [{ title: "Only On Your Screen", screen: "03-viewer", alt: "A photo open full screen in the vault, with share and delete buttons", caption: "only on my screen", tilt: -4 }],
    holder: "clip",
    r: -2.2,
    y: 12,
  },
  {
    shots: [{ title: "Hide The Line As You Draw", screen: "06-settings", alt: "Settings: Show Pattern While Drawing, Rate PrivateRoll, Contact Support and Privacy Policy", caption: "no peeking", tilt: 3 }],
    holder: "pin",
    r: 1.6,
    y: 0,
  },
  {
    shots: [{ title: "No Cloud. No Account.", screen: "01-welcome", alt: "The welcome screen: Pattern Lock, Fully Encrypted, No Cloud and Recovery Phrase", caption: "stays on my phone", tilt: 0 }],
    holder: "tape",
    r: -1.2,
    y: 10,
  },
];

function Holder({ kind }: { kind: Print["holder"] }) {
  if (kind !== "clip") return <span className={kind} aria-hidden="true" />;
  return (
    <svg className="clip" viewBox="0 0 22 58" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M7 16v28a4 4 0 0 0 8 0V10a6 6 0 0 0-12 0v36a8 8 0 0 0 16 0V20" />
    </svg>
  );
}

function Panel({ shot }: { shot: Shot }) {
  return (
    <span className="shot">
      <span className="shot-title">{shot.title}</span>
      <span className="shot-phone" style={{ "--tilt": `${shot.tilt}deg` } as React.CSSProperties}>
        <Image src={`/screens/${shot.screen}.webp`} alt={shot.alt} width={660} height={1434} sizes="240px" loading="eager" />
      </span>
    </span>
  );
}

function PinnedPrint({ print }: { print: Print }) {
  const tilt = { "--r": `${print.r}deg`, "--y": `${print.y}px` } as React.CSSProperties;
  const [first, second] = print.shots;
  return (
    <figure className="polaroid" style={tilt}>
      <Holder kind={print.holder} />
      {second ? (
        <>
          <span className="shot-pair">
            <Panel shot={first} />
            <Panel shot={second} />
          </span>
          <figcaption className="captions-pair">
            <span className="polaroid-caption">{first.caption}</span>
            <span className="polaroid-caption">{second.caption}</span>
          </figcaption>
        </>
      ) : (
        <>
          <Panel shot={first} />
          <figcaption className="polaroid-caption">{first.caption}</figcaption>
        </>
      )}
    </figure>
  );
}

// Like piqtra's waitlist field: one pill, with the action on the right.
function GetPill() {
  return (
    <div className="get-pill glass w-full max-w-[460px]">
      <Image src="/app-icon.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-[11px] ring-1 ring-white/15" />
      <span className="min-w-0 flex-1 text-left leading-tight">
        <span className="block truncate font-semibold">{site.name}</span>
        <span className="block truncate text-sm text-muted">Free for iPhone</span>
      </span>
      <AppStoreBadge height={44} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="home">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: site.name,
          operatingSystem: "iOS",
          applicationCategory: "MultimediaApplication",
          description: site.description,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          ...(getApp?.store ? { installUrl: getApp.href } : {}),
        }}
      />

      <section className="hero-in relative mt-[clamp(16px,5vh,56px)] px-4 text-center">
        <h1 className="mx-auto max-w-[14ch] text-balance font-display text-[clamp(2.75rem,6.6vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.045em] sm:max-w-none">
          Keep it
          <Image src="/app-icon.png" alt="" width={256} height={256} preload className="title-icon" />
          to yourself.
        </h1>
        <p className="mx-auto mt-[clamp(12px,2.2vh,22px)] max-w-[36em] text-pretty text-[clamp(1.05rem,1.55vw,1.28rem)] leading-snug text-muted">
          An encrypted vault for your photos, videos and files.{" "}
          <span className="sm:block">Draw a pattern to open it. Nothing ever leaves your iPhone.</span>
        </p>
        <div className="mt-[clamp(18px,3.4vh,32px)] flex flex-col items-center gap-3">
          <GetPill />
          <p className="text-[0.82rem] leading-relaxed text-faint">
            No account. No ads. No tracking.
            <br />
            Free · {site.requirements}
          </p>
        </div>
      </section>

      <section aria-label={`${site.name} screens`} className="stage hero-in d1">
        <div className="gallery">
          {prints.map((print) => (
            <PinnedPrint key={print.shots[0].screen} print={print} />
          ))}
        </div>
      </section>

      <footer className="page-foot">
        <span>
          © {site.copyrightYear} {site.name}
        </span>
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        {homeLinks.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </footer>
    </div>
  );
}
