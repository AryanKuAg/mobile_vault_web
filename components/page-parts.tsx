import Link from "next/link";
import { AppStoreButton } from "@/components/app-store-button";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-highlight">
      <span className="h-px w-6 bg-highlight" />
      {children}
    </p>
  );
}

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-faint">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {c.href ? (
              <Link href={c.href} className="hover:text-accent">
                {c.label}
              </Link>
            ) : (
              <span className="text-muted" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-[128px] sm:pb-20">
      <div className="hero-grid" />
      <Container className="relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl text-balance font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[0.98] tracking-[-0.035em]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl border-l-2 border-highlight pl-5 text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {lede}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Your photos deserve a lock that actually locks.",
  body = `${site.name} is free to download. No account, no email, no tracking. Just a pattern only you know.`,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-accent py-20 text-accent-ink">
      <div className="hero-lines opacity-60">
        <span />
        <span />
      </div>
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.5vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.03em]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg opacity-85">{body}</p>
        <div className="mt-9 flex justify-center">
          <a
            href={site.appStoreUrl}
            className="btn !rounded-2xl bg-accent-ink !px-7 !py-4 font-display text-lg text-accent hover:-translate-y-0.5"
          >
            Download {site.name}
          </a>
        </div>
      </Container>
    </section>
  );
}

export function LinkCard({
  href,
  title,
  body,
  icon,
  meta,
}: {
  href: string;
  title: string;
  body: string;
  icon?: string;
  meta?: string;
}) {
  return (
    <Link href={href} className="card group flex flex-col p-6">
      {icon && (
        <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
          <Icon name={icon} />
        </span>
      )}
      {meta && <span className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-highlight">{meta}</span>}
      <h3 className="font-display text-lg font-bold leading-snug tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{body}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
        Read more
        <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function Related({ title = "Keep reading", links }: { title?: string; links: { href: string; label: string }[] }) {
  if (!links.length) return null;
  return (
    <aside className="mt-16 rounded-3xl border border-line bg-surface p-7">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-start gap-2 py-1 text-muted hover:text-accent">
              <Icon name="arrow" className="mt-1 h-4 w-4 shrink-0 text-highlight" />
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function InlineCta() {
  return (
    <div className="mt-14 flex flex-col items-start gap-5 rounded-3xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-xl font-bold">Try {site.name} free</p>
        <p className="mt-1 text-muted">Encrypted on your iPhone. No account required.</p>
      </div>
      <AppStoreButton />
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
      {items.map((item) => (
        <details key={item.q} className="faq group">
          <summary className="flex items-center justify-between gap-6 px-6 py-5 font-display text-lg font-bold">
            {item.q}
            <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-accent">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="px-6 pb-6 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
