"use client";

import { useState, useSyncExternalStore } from "react";
import { Panel } from "./shared";

const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  digits: "23456789",
  symbols: "!@#$%^&*-_=+?",
};

// Short, common, unambiguous words. Entropy per word is log2(WORDS.length).
const WORDS =
  "acorn alarm amber angle apple apron arrow atlas attic badge bagel baker bamboo banjo barn basil beach beard bench berry bison blade blank blaze blimp bloom board boat bonus booth brass bread brick bridge brook brush bucket bugle cabin cable cactus camel candle canoe canyon cargo carpet castle cedar chalk charm cherry chess chimney cider cinema circus citrus clamp cliff clock cloud clover coast cobra cocoa comet coral cotton cougar crane crater crayon creek cricket crown cubic cycle daisy delta denim desert diary dingo dolphin donkey dragon drift drum eagle easel echo elbow ember engine falcon feather fence ferry fiddle flame flask flute forest fossil fox frost galaxy garden gecko ginger glacier globe goose grape gravel guitar hammer harbor hazel hedge helmet heron honey hornet igloo island ivory jacket jaguar jelly jungle kayak kettle kiwi koala ladder lagoon lantern lemon lily lizard llama lobster locket lotus magnet mango maple marble meadow melon meteor mirror mitten moose mosaic motor mural nectar needle nest noodle nutmeg oasis ocean olive onion orbit otter owl paddle panda paper parrot pasta peach pebble pepper piano pickle pigeon pillow pine pirate planet plum pocket poet polar pony poppy prism pulse puzzle quartz quill rabbit radar radio raven reef ribbon river robot rocket rose rover saddle salmon satin scarf scout shadow shell sierra silver sketch sled snail socket sonar spice spider spoon squid stamp storm sugar summit sunset swan table tango temple thistle thunder tiger timber toast topaz tower tulip tundra turtle twig umbrella valley velvet violet violin walnut walrus wander willow window winter wizard wombat yarn yeti zebra zephyr zinc".split(" ");

function randomInt(max: number) {
  // Rejection sampling avoids modulo bias.
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % max;
}

type Kind = "password" | "passphrase";
type Settings = {
  kind: Kind;
  length: number;
  words: number;
  opts: Record<keyof typeof SETS, boolean>;
};

const DEFAULTS: Settings = {
  kind: "password",
  length: 20,
  words: 6,
  opts: { lower: true, upper: true, digits: true, symbols: true },
};

const poolFor = (opts: Settings["opts"]) =>
  (Object.keys(SETS) as (keyof typeof SETS)[]).filter((k) => opts[k]).map((k) => SETS[k]).join("");

function make(s: Settings) {
  if (s.kind === "passphrase") return Array.from({ length: s.words }, () => WORDS[randomInt(WORDS.length)]).join("-");
  const pool = poolFor(s.opts);
  return pool ? Array.from({ length: s.length }, () => pool[randomInt(pool.length)]).join("") : "";
}

const noop = () => () => {};

// Random output can't match between server and client render, so the
// generator only mounts in the browser.
export function PasswordGeneratorTool() {
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  return isClient ? <Generator /> : <Panel className="h-[420px] animate-pulse">{null}</Panel>;
}

function Generator() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [value, setValue] = useState(() => make(DEFAULTS));
  const [copied, setCopied] = useState(false);
  const { kind, length, words, opts } = settings;

  function update(patch: Partial<Settings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    setValue(make(next));
    setCopied(false);
  }
  const generate = () => update({});
  const setKind = (k: Kind) => update({ kind: k });
  const setLength = (n: number) => update({ length: n });
  const setWords = (n: number) => update({ words: n });
  const setOpts = (o: Settings["opts"]) => update({ opts: o });

  const pool = poolFor(opts);
  const bits = Math.floor(
    kind === "password" ? length * Math.log2(pool.length || 1) : words * Math.log2(new Set(WORDS).size),
  );

  const strength = bits >= 100 ? "Excellent" : bits >= 70 ? "Strong" : bits >= 50 ? "Fair" : "Weak";

  return (
    <Panel className="space-y-6">
      <div className="inline-flex rounded-full border border-line bg-bg p-1">
        {(["password", "passphrase"] as Kind[]).map((k) => (
          <button key={k} type="button" onClick={() => setKind(k)} className={`rounded-full px-4 py-1.5 text-sm font-bold capitalize ${kind === k ? "bg-accent text-accent-ink" : "text-muted"}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-bg p-5">
        <p className="break-all font-mono text-xl leading-relaxed sm:text-2xl" aria-live="polite">{value}</p>
        <p className="mt-3 text-sm text-faint">
          ≈ {bits} bits of entropy · <span className={bits >= 70 ? "font-bold text-accent" : "font-bold text-highlight"}>{strength}</span>
        </p>
      </div>

      {kind === "password" ? (
        <>
          <label className="block">
            <span className="mb-2 flex justify-between text-sm font-semibold text-muted">
              Length <span className="text-ink">{length}</span>
            </span>
            <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full accent-accent" />
          </label>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {(Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
              <label key={k} className="flex items-center gap-2 text-sm font-semibold capitalize text-muted">
                <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="h-4 w-4 accent-accent" />
                {k === "lower" ? "Lowercase" : k === "upper" ? "Uppercase" : k}
              </label>
            ))}
          </div>
        </>
      ) : (
        <label className="block">
          <span className="mb-2 flex justify-between text-sm font-semibold text-muted">
            Words <span className="text-ink">{words}</span>
          </span>
          <input type="range" min={4} max={12} value={words} onChange={(e) => setWords(+e.target.value)} className="w-full accent-accent" />
        </label>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            setCopied(true);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={generate}>Generate another</button>
      </div>
    </Panel>
  );
}
