"use client";

import { usePathname } from "next/navigation";

// The home page is a single screen with its own one-line footer, like piqtra.com's, so the full
// footer shows everywhere else.
export function FooterGate({ children }: { children: React.ReactNode }) {
  return usePathname() === "/" ? null : children;
}
