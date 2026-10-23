import { site } from "@/lib/site";

// The app icon: a safe door with a mint dial on navy. Same geometry as the iOS icon
// (scripts/generate_icons.py in the app repo), on a 1024 canvas.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  const spokes = [45, 135, 225, 315].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x1: 512 + Math.cos(a) * 40, y1: 512 + Math.sin(a) * 40, x2: 512 + Math.cos(a) * 150, y2: 512 + Math.sin(a) * 150 };
  });
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="privateroll-icon-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F1B2D" />
          <stop offset="1" stopColor="#11465A" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="230" fill="url(#privateroll-icon-bg)" />
      <rect x="234" y="234" width="556" height="556" rx="74" fill="none" stroke="#fff" strokeWidth="44" />
      <rect x="176" y="290" width="56" height="80" rx="18" fill="#fff" />
      <rect x="176" y="654" width="56" height="80" rx="18" fill="#fff" />
      <circle cx="512" cy="512" r="130" fill="none" stroke="#4FE3C1" strokeWidth="40" />
      {spokes.map((s, i) => (
        <line key={i} {...s} stroke="#4FE3C1" strokeWidth="30" />
      ))}
      <circle cx="512" cy="512" r="46" fill="#4FE3C1" />
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
