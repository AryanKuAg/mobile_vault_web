/**
 * Google's autocomplete for a phrase: what people actually type, in their
 * words, which is the wording a title should use. Free and keyless, so it's
 * kept to a handful of requests, a beat apart.
 *
 *   npm run seo:suggest "hide photos" "photo vault"
 *   npm run seo:suggest -- --deep "photo vault"    also "how photo vault", "photo vault a" … "photo vault z"
 */
const args = process.argv.slice(2);
const deep = args[0] === "--deep";
const seeds = deep ? args.slice(1) : args;
if (!seeds.length) throw new Error('Give a phrase or two: npm run seo:suggest "photo vault"');

const pause = () => new Promise((r) => setTimeout(r, 250));

async function suggest(q) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Autocomplete said ${res.status} for "${q}"`);
  const [, list] = await res.json();
  return list;
}

for (const seed of seeds) {
  const asks = deep
    ? [
        seed,
        ...["how", "why", "what", "can", "best", "is"].map((w) => `${w} ${seed}`),
        ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => `${seed} ${c}`),
      ]
    : [seed];
  const found = new Set();
  for (const q of asks) {
    for (const s of await suggest(q)) found.add(s);
    await pause();
  }
  console.log(`## ${seed}\n${[...found].map((s) => `- ${s}`).join("\n")}\n`);
}
