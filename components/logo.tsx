import { site } from "@/lib/site";

// The app icon: a white shield and padlock on black, traced from the iOS icon on a 1024 canvas.
// Plain shapes only, so the blog's image renderer can draw it too.
export const iconShapes = {
  shield:
    "M512 238 L306 314 Q291 320 291 336 L291 558 Q291 690 512 789 Q733 690 733 558 L733 336 Q733 320 718 314 Z",
  shackle: "M447 468 L447 420 A65.5 65.5 0 0 1 578 420 L578 468",
  body: { x: 406, y: 465, width: 214, height: 182, rx: 28 },
} as const;

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-hidden="true">
      <rect width="1024" height="1024" rx="230" fill="#000" />
      <rect x="4" y="4" width="1016" height="1016" rx="226" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="8" />
      <path d={iconShapes.shield} fill="none" stroke="#fff" strokeWidth="49" strokeLinejoin="round" />
      <path d={iconShapes.shackle} fill="none" stroke="#fff" strokeWidth="31" />
      <rect {...iconShapes.body} fill="#fff" />
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
