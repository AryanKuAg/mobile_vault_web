import Link from "next/link";
import { Logo } from "@/components/logo";
import { comparisons } from "@/content/compare";
import { features } from "@/content/features";
import { site } from "@/lib/site";

const company = [
  { href: "/about", label: "About" },
  { href: "/whats-new", label: "What's New" },
  { href: "/support", label: "Support" },
  { href: "/invite", label: "Vault Invite" },
  { href: site.discordUrl, label: "Discord" },
];

const learn = [
  { href: "/guides", label: "Guides" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/tools", label: "Free Tools" },
  { href: "/compare", label: "Comparisons" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-faint">{title}</h2>
      <ul className="space-y-2.5 text-[0.93rem] text-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Encrypted photo and file storage for iPhone. Unlocked by a pattern only you know,
              stored only on devices you own.
            </p>
            <a href={site.appStoreUrl} className="btn btn-primary mt-6 !py-2.5 text-sm">
              Get {site.name}
            </a>
          </div>
          <Column title="Product" links={features.slice(0, 7).map((f) => ({ href: `/features/${f.slug}`, label: f.title }))} />
          <Column title="Compare" links={comparisons.slice(0, 7).map((c) => ({ href: `/compare/${c.slug}`, label: `vs ${c.competitor}` }))} />
          <Column title="Learn" links={learn} />
          <div className="space-y-10">
            <Column title="Company" links={company} />
            <Column title="Legal" links={legal} />
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.company}. All rights reserved.
          </p>
          <p>iPhone and App Store are trademarks of Apple Inc.</p>
        </div>
      </div>
    </footer>
  );
}
