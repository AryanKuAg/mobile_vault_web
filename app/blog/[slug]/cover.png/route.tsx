import { ImageResponse } from "next/og";
import { iconShapes } from "@/components/logo";
import { coverSize, getPost, posts } from "@/content/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** A line cut to about `max` characters at a word, so a long one fits the card. */
const clamp = (s: string, max: number) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(" ", max))}…`);

/** The app icon, as plain SVG (the image renderer takes no components inside <svg>). */
function appIcon(size: number) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024">
      <rect width="1024" height="1024" rx="230" fill="#000" />
      <rect x="6" y="6" width="1012" height="1012" rx="224" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="12" />
      <path d={iconShapes.shield} fill="none" stroke="#fff" strokeWidth="49" strokeLinejoin="round" />
      <path d={iconShapes.shackle} fill="none" stroke="#fff" strokeWidth="31" />
      <rect {...iconShapes.body} fill="#fff" />
    </svg>
  );
}

/** The lock screen's 5 × 5 grid of dots, faint, as a backdrop. */
function patternGrid() {
  const dots = Array.from({ length: 25 }, (_, i) => [70 + (i % 5) * 120, 70 + Math.floor(i / 5) * 120]);
  return (
    <svg width="620" height="620" viewBox="0 0 620 620" style={{ position: "absolute", right: -80, top: 5 }}>
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="26" fill="rgba(255,255,255,0.07)" />
      ))}
    </svg>
  );
}

/** A post's share card and cover: its title and line on the app's black, prerendered for every post. */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        color: "#fff",
        backgroundColor: "#000",
        backgroundImage: "radial-gradient(80% 70% at 30% 0%, rgba(255,255,255,0.1), rgba(0,0,0,0) 70%)",
        overflow: "hidden",
      }}
    >
      {patternGrid()}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 980,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {appIcon(76)}
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
            {site.name} · {post.category}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: post.title.length > 40 ? 62 : 80,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2,
            }}
          >
            {post.title}
          </div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.3, color: "rgba(255,255,255,0.62)" }}>
            {clamp(post.description, 120)}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.55)" }}>{new URL(site.url).host}</div>
      </div>
    </div>,
    coverSize,
  );
}
