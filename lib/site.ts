// Single source of truth for branding. Change the name here and it updates
// across every page, title, and metadata tag.
export const site = {
  name: "PrivateRoll",
  tagline: "A private place for your photos, videos and files.",
  description:
    "PrivateRoll is an encrypted photo and file vault for iPhone. Draw a pattern to open it, keep everything on your device, and never create an account.",
  url: "https://privateroll.app",
  // The App Store listing (Apple ID 6826489330 in App Store Connect). Apple answers this address
  // once the app is released; set it to null to show "Coming soon" instead.
  appStoreUrl: "https://apps.apple.com/app/id6826489330" as string | null,
  // A public TestFlight invite (https://testflight.apple.com/join/…), while the app is in beta.
  testFlightUrl: null as string | null,
  supportEmail: "aryanag824@gmail.com",
  // The name shown in the copyright line and as the contact in the legal pages.
  company: "PrivateRoll",
  copyrightYear: 2026,
  // What the app runs on, as the App Store lists it (the app's deployment target).
  requirements: "iPhone with iOS 17 or later",
} as const;

// Where download buttons point: the App Store once live, the public beta before that.
// While both are null the buttons read "Coming soon" and link nowhere.
export const getApp = site.appStoreUrl
  ? { href: site.appStoreUrl, store: true, label: "Download on the App Store" }
  : site.testFlightUrl
    ? { href: site.testFlightUrl, store: false, label: "Join the beta on TestFlight" }
    : null;

// The pill at the top of every page: the pages App Store Connect links to, like piqtra.com's.
export const pillNav = [
  { href: "/", label: site.name },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
] as const;

// The one-line footer on the home page.
export const homeLinks = [
  { href: "/features", label: "Features" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/compare", label: "Compare" },
  { href: "/tools", label: "Free tools" },
] as const;
