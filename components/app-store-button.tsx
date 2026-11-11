import { getApp, site } from "@/lib/site";

// Apple's official "Download on the App Store" badge, unmodified, from
// https://developer.apple.com/app-store/marketing/guidelines/ (public/badges). The white one
// matches the app's white buttons on black. Apple asks for at least 40px of height on screen and
// clear space of a quarter of its height around it.
export function AppStoreBadge({ height = 52, className = "" }: { height?: number; className?: string }) {
  if (getApp?.store) {
    return (
      <a href={getApp.href} className={`inline-block shrink-0 transition hover:opacity-85 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- an SVG badge needs no optimizing */}
        <img
          src="/badges/app-store-white.svg"
          alt={`Download ${site.name} on the App Store`}
          width={Math.round(height * 2.9916)}
          height={height}
          style={{ height, width: "auto" }}
        />
      </a>
    );
  }
  // A public beta: a plain button rather than Apple's badge.
  if (getApp) {
    return (
      <a href={getApp.href} className={`btn btn-primary ${className}`}>
        {getApp.label}
      </a>
    );
  }
  return <span className={`btn btn-ghost cursor-default ${className}`}>Coming soon to the App Store</span>;
}

/** Kept under its old name for the pages that already use it. */
export const AppStoreButton = AppStoreBadge;
