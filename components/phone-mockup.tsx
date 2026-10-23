"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Stage = "lock" | "opened" | "vault";

// The app's lock screen and vault, as drawn by the iOS app. The demo pattern is the first one
// from the app's onboarding tour, on the same 4x4 grid (dot indexes 0-15).
const PATTERN = [0, 1, 2, 6, 10, 9, 13];
const SPACING = 40;
const DOT = (i: number) => ({ x: SPACING / 2 + (i % 4) * SPACING, y: SPACING / 2 + Math.floor(i / 4) * SPACING });
const MINT = "#4FE3C1";
const SUCCESS = "#34C759";

const TILES = [
  ["#f6a57c", "#c04a6b"], ["#7cc6f6", "#3d4fb8"], ["#b7f0a8", "#2c8c6c"],
  ["#f3d27a", "#d9693a"], ["#c8a6f7", "#5b3cc4"], ["#8de2d5", "#2a6f8f"],
  ["#f7b2c8", "#8f3d78"], ["#a6b4f7", "#2b2f86"], ["#f9e1a6", "#a2762d"],
  ["#9fe7a4", "#3a7a3d"], ["#f59f9f", "#9a2e2e"], ["#b9dcff", "#4a6aa0"],
  ["#e3c1ff", "#7a3fa6"], ["#ffd2a8", "#b8573a"], ["#a8f0e8", "#2f8576"],
];
const DURATIONS: Record<number, string> = { 2: "0:14", 7: "1:02", 11: "0:37" };

function ShieldLock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mockup-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7DEFD3" />
          <stop offset="1" stopColor={MINT} />
        </linearGradient>
      </defs>
      <path d="M12 2.2 19.6 5.3v6.1c0 4.8-3.2 8.5-7.6 10.4-4.4-1.9-7.6-5.6-7.6-10.4V5.3Z" fill="url(#mockup-shield)" />
      <rect x="8.8" y="11" width="6.4" height="5.2" rx="1.1" fill="#0E1726" />
      <path d="M10.1 11V9.6a1.9 1.9 0 0 1 3.8 0V11" fill="none" stroke="#0E1726" strokeWidth="1.5" />
    </svg>
  );
}

export function PhoneMockup() {
  const [stage, setStage] = useState<Stage>("lock");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the animation and rest on the vault view.
      if (stage !== "vault") t = setTimeout(() => setStage("vault"), 0);
    } else if (stage === "lock") {
      t = step < PATTERN.length
        ? setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 220)
        : setTimeout(() => setStage("opened"), 250);
    } else if (stage === "opened") {
      t = setTimeout(() => setStage("vault"), 650);
    } else {
      t = setTimeout(() => {
        setStep(0);
        setStage("lock");
      }, 4200);
    }
    return () => clearTimeout(t);
  }, [stage, step]);

  const drawn = PATTERN.slice(0, step);
  const color = stage === "opened" ? SUCCESS : MINT;
  const path = drawn.map((d, i) => `${i ? "L" : "M"}${DOT(d).x} ${DOT(d).y}`).join(" ");

  return (
    <div className="phone mx-auto aspect-[9/19] w-full max-w-[300px]" aria-hidden="true">
      <div className="phone-screen h-full w-full text-white">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3.5 text-[0.62rem] font-semibold opacity-80">
          <span>9:41</span>
          <span className="h-[18px] w-[72px] rounded-full bg-black" />
          <span>100%</span>
        </div>

        {/* Lock screen */}
        <div className={`phone-stage lock-gradient flex flex-col items-center px-5 pt-16 ${stage === "vault" ? "opacity-0" : "opacity-100"}`}>
          <ShieldLock className="h-12 w-12" />
          <p className="mt-2 font-display text-[1.65rem] font-bold tracking-tight">{site.name}</p>
          <p className="mt-auto text-[0.92rem] font-semibold">Draw your pattern</p>
          <svg viewBox="0 0 160 160" className="mb-24 mt-5 w-[78%]">
            <path d={path} fill="none" stroke={color} strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {Array.from({ length: 16 }, (_, i) => {
              const on = drawn.includes(i);
              const { x, y } = DOT(i);
              return (
                <g key={i}>
                  {on && <circle cx={x} cy={y} r={11.2} fill={color} fillOpacity="0.22" />}
                  <circle cx={x} cy={y} r={on ? 6 : 3.6} fill={on ? color : "#ffffff"} fillOpacity={on ? 1 : 0.45} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Vault */}
        <div className={`phone-stage flex flex-col bg-black pt-10 ${stage === "vault" ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-between px-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <rect x="5" y="10" width="14" height="10.5" rx="2.5" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </span>
            <span className="flex items-center gap-3.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
          </div>
          <p className="mt-3 px-3 font-display text-[1.6rem] font-bold tracking-tight">{site.name}</p>
          <div className="mt-2 grid flex-1 grid-cols-3 content-start gap-[2px] overflow-hidden">
            {TILES.map(([a, b], i) => (
              <div
                key={i}
                className="relative aspect-square"
                style={{
                  background: `radial-gradient(circle at ${20 + ((i * 37) % 60)}% ${25 + ((i * 53) % 50)}%, ${a}, ${b})`,
                  transition: `opacity .4s ${i * 35}ms, transform .4s ${i * 35}ms`,
                  opacity: stage === "vault" ? 1 : 0,
                  transform: stage === "vault" ? "scale(1)" : "scale(.94)",
                }}
              >
                {DURATIONS[i] && (
                  <span className="absolute bottom-1 right-1.5 flex items-center gap-0.5 text-[0.5rem] font-semibold drop-shadow">
                    <svg viewBox="0 0 10 10" className="h-1.5 w-1.5" fill="currentColor">
                      <path d="M2 1.2v7.6L8.6 5Z" />
                    </svg>
                    {DURATIONS[i]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mx-3 mb-4 mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[0.6rem] text-white/60">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
            Search this vault
          </div>
        </div>
      </div>
    </div>
  );
}
