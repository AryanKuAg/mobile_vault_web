"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pillNav } from "@/lib/site";

// A floating glass pill, like the app's Liquid Glass bars: the home page and the pages App Store
// Connect links to. Everything else is in the footer.
export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex shrink-0 justify-center px-4 pt-4 pb-2">
      <nav aria-label="Main" className="glass rounded-full p-1">
        <ul className="flex items-center text-[0.93rem]">
          {pillNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 font-medium transition sm:px-4 ${
                    active ? "bg-white/12 text-ink" : "text-muted hover:text-ink"
                  } ${item.href === "/" ? "font-semibold" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
