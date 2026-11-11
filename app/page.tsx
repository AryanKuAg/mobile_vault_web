import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/page-parts";
import { getApp, homeLinks, site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

type Shot = { src: string; alt: string; caption: string };
type Photo = { shots: Shot[]; holder: "tape" | "pin" | "clip"; r: number; y: number };

// The app's screens, pinned up like polaroids, with a handwritten note under each.
// The screenshots come from scripts/screenshots.sh in the app repo, scaled to 660 × 1434.
const photos: Photo[] = [
  {
    shots: [
      { src: "/screens/04-lock-screen.webp", alt: "The lock screen: a 5 by 5 grid of dots under “Draw your pattern”", caption: "your pattern = your key" },
      { src: "/screens/05-recovery-phrase.webp", alt: "The recovery phrase shown when a vault is made, with Copy and Download buttons", caption: "just in case :)" },
    ],
    holder: "tape",
    r: -1.6,
    y: 8,
  },
  {
    shots: [{ src: "/screens/02-vault.webp", alt: "A vault with six photos, a search field, and buttons for settings, select, sort and lock", caption: "my stuff. my vault." }],
    holder: "pin",
    r: 2.2,
    y: -4,
  },
  {
    shots: [{ src: "/screens/03-viewer.webp", alt: "A photo open full screen in the vault, with share and delete buttons", caption: "only on my screen" }],
    holder: "clip",
    r: -2.4,
    y: 12,
  },
  {
    shots: [{ src: "/screens/06-settings.webp", alt: "Settings: Show Pattern While Drawing, Rate PrivateRoll, Contact Support and Privacy Policy", caption: "hide the line too" }],
    holder: "pin",
    r: 1.6,
    y: 0,
  },
  {
    shots: [{ src: "/screens/01-welcome.webp", alt: "The welcome screen: Pattern Lock, Fully Encrypted, No Cloud and Recovery Phrase", caption: "no cloud. no account." }],
    holder: "tape",
    r: -1.2,
    y: 10,
  },
];

function Holder({ kind }: { kind: Photo["holder"] }) {
  if (kind !== "clip") return <span className={kind} aria-hidden="true" />;
  return (
    <svg className="clip" viewBox="0 0 22 58" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M7 16v28a4 4 0 0 0 8 0V10a6 6 0 0 0-12 0v36a8 8 0 0 0 16 0V20" />
    </svg>
  );
}

function Polaroid({ shot, style, children }: { shot: Shot; style?: React.CSSProperties; children?: React.ReactNode }) {
  return (
    <figure className="polaroid" style={style}>
      <Image src={shot.src} alt={shot.alt} width={660} height={1434} sizes="260px" loading="eager" className="polaroid-photo" />
      <figcaption className="polaroid-caption">{shot.caption}</figcaption>
      {children}
    </figure>
  );
}

function PinnedPhoto({ photo }: { photo: Photo }) {
  const tilt = { "--r": `${photo.r}deg`, "--y": `${photo.y}px` } as React.CSSProperties;
  if (photo.shots.length === 1) {
    return (
      <Polaroid shot={photo.shots[0]} style={tilt}>
        <Holder kind={photo.holder} />
      </Polaroid>
    );
  }
  // Two photos taped up side by side, tilted together.
  return (
    <div className="polaroid-pair relative" style={{ transform: `translateY(${photo.y}px) rotate(${photo.r}deg)` }}>
      {photo.shots.map((shot) => (
        <Polaroid key={shot.src} shot={shot} />
      ))}
      <Holder kind={photo.holder} />
    </div>
  );
}

// Like piqtra's waitlist field: one pill, with the action on the right.
function GetPill() {
  return (
    <div className="get-pill glass w-full max-w-[440px]">
      <Image src="/app-icon.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-[11px] ring-1 ring-white/15" />
      <span className="min-w-0 flex-1 text-left leading-tight">
        <span className="block truncate font-semibold">{site.name}</span>
        <span className="block truncate text-sm text-muted">{getApp ? "Free on the App Store" : "Coming soon to the App Store"}</span>
      </span>
      {getApp ? (
        <a href={getApp.href} className="btn btn-primary shrink-0 !px-5 !py-3 text-[0.95rem]">
          {getApp.short}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </a>
      ) : (
        <span className="btn shrink-0 cursor-default bg-white/10 !px-5 !py-3 text-[0.95rem] text-ink/80">Soon</span>
      )}
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
          ...(site.appStoreUrl ? { installUrl: site.appStoreUrl } : {}),
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
          {photos.map((photo) => (
            <PinnedPhoto key={photo.shots[0].src} photo={photo} />
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
