import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { mainNav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[var(--header-bg)] backdrop-blur-md">
      <div className="relative mx-auto flex h-[74px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-semibold text-muted">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a href={site.appStoreUrl} className="btn btn-primary hidden !py-2.5 !px-5 text-sm sm:inline-flex">
            Get the App
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
