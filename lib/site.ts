// Single source of truth for branding. Change the name here and it updates
// across every page, title, and metadata tag.
export const site = {
  name: "PrivateRoll",
  tagline: "A private place for your photos, videos, files and notes.",
  description:
    "PrivateRoll is an encrypted photo and file vault for iPhone and iPad. Draw a pattern to unlock, keep everything on your device, and never create an account.",
  url: "https://privateroll.app",
  // The App Store listing, once the app is live, e.g. "https://apps.apple.com/app/id1234567890".
  appStoreUrl: null as string | null,
  // A public TestFlight invite (https://testflight.apple.com/join/…), while the app is in beta.
  testFlightUrl: null as string | null,
  supportEmail: "suryanarayanan7798@gmail.com",
  // The name shown in the copyright line and as the contact in the legal pages.
  company: "PrivateRoll",
  copyrightYear: 2026,
  // Set to your real App Store rating, e.g. { score: "4.8", count: "2,100+" }.
  // While null, the hero badge shows security facts instead of stars.
  rating: null as { score: string; count: string } | null,
} as const;

// Where download buttons point: the App Store once live, the public beta before that.
// While both are null the buttons read "Coming soon" and link nowhere.
export const getApp = site.appStoreUrl
  ? { href: site.appStoreUrl, short: `Get ${site.name}`, eyebrow: "Download for iPhone", label: "On the App Store" }
  : site.testFlightUrl
    ? { href: site.testFlightUrl, short: "Join the Beta", eyebrow: "Beta for iPhone", label: "Join on TestFlight" }
    : null;

export const mainNav = [
  { href: "/features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#security", label: "Security" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Tools" },
] as const;
