import QRCode from "qrcode";
import { getApp, site } from "@/lib/site";

const phoneIcon = (
  <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <path d="M10 18.5h4" />
  </svg>
);

// Swap this for Apple's official badge artwork before launch
// (https://developer.apple.com/app-store/marketing/guidelines/).
export function AppStoreButton({ className = "" }: { className?: string }) {
  const base = `btn shrink-0 whitespace-nowrap !rounded-2xl !px-6 !py-3.5 ${className}`;

  // No listing or public beta yet: say so rather than link nowhere.
  if (!getApp) {
    return (
      <span className={`${base} btn-ghost cursor-default`}>
        {phoneIcon}
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wider opacity-80">Coming soon</span>
          <span className="font-display text-lg">To the App Store</span>
        </span>
      </span>
    );
  }

  return (
    <a href={getApp.href} className={`${base} btn-primary`}>
      {phoneIcon}
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider opacity-80">{getApp.eyebrow}</span>
        <span className="font-display text-lg">{getApp.label}</span>
      </span>
    </a>
  );
}

export async function AppStoreQR() {
  if (!getApp) return null;

  const svg = await QRCode.toString(getApp.href, {
    type: "svg",
    margin: 0,
    color: { dark: "#000000", light: "#00000000" },
  });

  return (
    <div className="hidden items-center gap-4 rounded-2xl border border-line bg-surface p-3 pr-5 sm:flex">
      <div
        className="h-[72px] w-[72px] shrink-0 rounded-lg bg-white p-1.5"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="text-sm leading-snug text-muted">
        <span className="block font-bold text-ink">On a computer?</span>
        Point your iPhone camera at the code to {site.appStoreUrl ? "open the App Store listing" : "join the beta"}.
      </p>
    </div>
  );
}
