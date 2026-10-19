"use client";

import { useEffect, useState } from "react";

type Stage = "lock" | "unlock" | "vault";

// Dot indexes 0-8 on a 3x3 grid, in the order the demo pattern visits them.
const PATTERN = [3, 1, 5, 4, 7, 8];
const DOT = (i: number) => ({ x: 20 + (i % 3) * 60, y: 20 + Math.floor(i / 3) * 60 });

const TILES = [
  ["#f6a57c", "#c04a6b"], ["#7cc6f6", "#3d4fb8"], ["#b7f0a8", "#2c8c6c"],
  ["#f3d27a", "#d9693a"], ["#c8a6f7", "#5b3cc4"], ["#8de2d5", "#2a6f8f"],
  ["#f7b2c8", "#8f3d78"], ["#a6b4f7", "#2b2f86"], ["#f9e1a6", "#a2762d"],
  ["#9fe7a4", "#3a7a3d"], ["#f59f9f", "#9a2e2e"], ["#b9dcff", "#4a6aa0"],
  ["#e3c1ff", "#7a3fa6"], ["#ffd2a8", "#b8573a"], ["#a8f0e8", "#2f8576"],
];
const DURATIONS: Record<number, string> = { 2: "0:14", 7: "1:02", 11: "0:37" };

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
        ? setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 260)
        : setTimeout(() => setStage("unlock"), 450);
    } else if (stage === "unlock") {
      t = setTimeout(() => setStage("vault"), 900);
    } else if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t = setTimeout(() => {
        setStep(0);
        setStage("lock");
      }, 4200);
    }
    return () => clearTimeout(t);
  }, [stage, step]);

  const drawn = PATTERN.slice(0, step);
  const path = drawn.map((d, i) => `${i ? "L" : "M"}${DOT(d).x} ${DOT(d).y}`).join(" ");

  return (
    <div className="phone mx-auto aspect-[9/19] w-full max-w-[300px]" aria-hidden="true">
      <div className="phone-screen h-full w-full text-white">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3.5 text-[0.62rem] font-semibold opacity-80">
          <span>9:41</span>
          <span className="h-[18px] w-[72px] rounded-full bg-black" />
          <span>100%</span>
        </div>

        {/* Lock */}
        <div className={`phone-stage flex flex-col items-center justify-center gap-8 px-6 ${stage === "lock" ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center">
            <p className="font-display text-lg font-bold">Draw to unlock</p>
            <p className="mt-1 text-xs text-white/55">Any pattern opens a vault</p>
          </div>
          <svg viewBox="0 0 160 160" className="w-[78%]">
            <path d={path} fill="none" stroke="#ff8a8a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {Array.from({ length: 9 }, (_, i) => {
              const on = drawn.includes(i);
              return (
                <circle
                  key={i}
                  cx={DOT(i).x}
                  cy={DOT(i).y}
                  r={on ? 9 : 7}
                  fill={on ? "#c9c0fa" : "#ffffff22"}
                  stroke={on ? "#c9c0fa" : "#ffffff44"}
                  strokeWidth="1.5"
                  style={{ transition: "r .15s, fill .15s" }}
                />
              );
            })}
          </svg>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40">No account · No email</p>
        </div>

        {/* Unlock */}
        <div className={`phone-stage grid place-items-center ${stage === "unlock" ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col items-center gap-3">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#c9c0fa] text-[#1e2138]">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-white/80">Decrypting…</p>
          </div>
        </div>

        {/* Vault */}
        <div className={`phone-stage flex flex-col px-3 pb-4 pt-11 ${stage === "vault" ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-between px-1">
            <p className="font-display text-xl font-bold">Vault</p>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="10" width="14" height="10" rx="2.5" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex gap-1.5 px-1 text-[0.6rem] font-semibold">
            {["All", "Photos", "Videos", "Docs"].map((c, i) => (
              <span key={c} className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-[#c9c0fa] text-[#1e2138]" : "bg-white/10 text-white/70"}`}>
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 px-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/45">Recent · 15 items</p>
          <div className="mt-2 grid flex-1 grid-cols-3 content-start gap-[3px] overflow-hidden rounded-lg">
            {TILES.map(([a, b], i) => (
              <div
                key={i}
                className="relative aspect-square"
                style={{
                  background: `radial-gradient(circle at ${20 + ((i * 37) % 60)}% ${25 + ((i * 53) % 50)}%, ${a}, ${b})`,
                  transition: `opacity .4s ${i * 35}ms, transform .4s ${i * 35}ms`,
                  opacity: stage === "vault" ? 1 : 0,
                  transform: stage === "vault" ? "scale(1)" : "scale(.92)",
                }}
              >
                {DURATIONS[i] && (
                  <span className="absolute bottom-1 left-1 rounded bg-black/55 px-1 text-[0.5rem] font-semibold">{DURATIONS[i]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
