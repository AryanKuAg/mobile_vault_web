import { ImageResponse } from "next/og";
import { coverSize, getPost, posts } from "@/content/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** A line cut to about `max` characters at a word, so a long one fits the card. */
const clamp = (s: string, max: number) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(" ", max))}…`);

/** The vault dial from the app icon, as plain SVG (the image renderer takes no components inside <svg>). */
function dial(size: number) {
  const spokes = [45, 135, 225, 315].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return [512 + Math.cos(a) * 40, 512 + Math.sin(a) * 40, 512 + Math.cos(a) * 150, 512 + Math.sin(a) * 150];
  });
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024">
      <rect width="1024" height="1024" rx="230" fill="#0F1B2D" />
      <rect x="234" y="234" width="556" height="556" rx="74" fill="none" stroke="#fff" strokeWidth="44" />
      <rect x="176" y="290" width="56" height="80" rx="18" fill="#fff" />
      <rect x="176" y="654" width="56" height="80" rx="18" fill="#fff" />
      <circle cx="512" cy="512" r="130" fill="none" stroke="#4FE3C1" strokeWidth="40" />
      {spokes.map(([x1, y1, x2, y2]) => (
        <line key={x2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4FE3C1" strokeWidth="30" />
      ))}
      <circle cx="512" cy="512" r="46" fill="#4FE3C1" />
    </svg>
  );
}

/** A post's share card and cover: its title and line on the app icon's navy, prerendered for every post. */
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
        backgroundImage: "linear-gradient(160deg, #0F1B2D 0%, #0E2A3D 55%, #11465A 100%)",
        overflow: "hidden",
      }}
    >
      <svg width="620" height="620" viewBox="0 0 620 620" style={{ position: "absolute", right: -150, top: 5 }}>
        <circle cx="310" cy="310" r="250" fill="none" stroke="rgba(79,227,193,0.16)" strokeWidth="56" />
        <circle cx="310" cy="310" r="120" fill="none" stroke="rgba(79,227,193,0.1)" strokeWidth="26" />
        <circle cx="310" cy="310" r="40" fill="rgba(79,227,193,0.16)" />
      </svg>
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
          {dial(76)}
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
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.3, color: "rgba(255,255,255,0.72)" }}>
            {clamp(post.description, 120)}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#4FE3C1" }}>{new URL(site.url).host}</div>
      </div>
    </div>,
    coverSize,
  );
}
