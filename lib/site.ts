// Single source of truth for branding. Change the name here and it updates
// across every page, title, and metadata tag.
export const site = {
  name: "Veilbox",
  tagline: "The photo vault that only opens for you.",
  description:
    "Veilbox is an encrypted photo and file vault for iPhone. Draw a pattern to unlock, keep everything on your device, and never create an account.",
  url: "https://veilbox.app",
  appStoreUrl: "https://apps.apple.com/app/id0000000000",
  supportEmail: "support@veilbox.app",
  company: "Veilbox Labs LLC",
  copyrightYear: 2026,
  discordUrl: "https://discord.gg/your-invite",
  // Set to your real App Store rating, e.g. { score: "4.8", count: "2,100+" }.
  // While null, the hero badge shows security facts instead of stars.
  rating: null as { score: string; count: string } | null,
} as const;

export const mainNav = [
  { href: "/features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#security", label: "Security" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Tools" },
] as const;
