import Link from "next/link";
import { Container } from "@/components/page-parts";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-28 pt-20">
      <div className="hero-glow" />
      <div className="hero-grid" />
      <Container className="relative text-center">
        <p className="font-display text-[clamp(5rem,16vw,9rem)] font-bold leading-none tracking-[-0.05em] text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">This page is locked away. Or it never existed.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/features" className="btn btn-ghost">Features</Link>
          <Link href="/guides" className="btn btn-ghost">Guides</Link>
        </div>
      </Container>
    </section>
  );
}
