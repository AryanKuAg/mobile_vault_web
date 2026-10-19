import { site } from "@/lib/site";

// A 3x3 dot grid with a pattern stroke: the unlock gesture as a mark.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  const dots = [8, 20, 32];
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--accent)" />
      <path
        d="M8 8 L20 20 L32 8 M20 20 L20 32 L32 32"
        fill="none"
        stroke="var(--highlight)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {dots.flatMap((y) =>
        dots.map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="var(--accent-ink)" />
        )),
      )}
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight">{site.name}</span>
    </span>
  );
}
