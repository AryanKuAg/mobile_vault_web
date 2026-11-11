// Feature pages. Every claim here should match what the app actually does.
// Edit freely; pages, cards, footer links and the sitemap all read from this list.
// Version 1 is deliberately small. Features held back for later (the duress vault, the camera,
// the share sheet, disguise icons, notes, folders, iPad) redirect to /whats-new until they ship;
// see next.config.ts.

export type Feature = {
  slug: string;
  title: string;
  icon: string;
  tier: "Free" | "Pro" | "Free + Pro";
  summary: string;
  headline: string;
  lede: string;
  body: string;
  faq: { q: string; a: string }[];
};

export const features: Feature[] = [
  {
    slug: "pattern-key",
    title: "Pattern Key",
    icon: "pattern",
    tier: "Free",
    summary: "The pattern you draw is turned into the key that opens your vault. It isn't stored anywhere to compare against.",
    headline: "Your pattern doesn't unlock a door. It is the key.",
    lede: "Most vault apps store your PIN and check it. PrivateRoll never stores your pattern. It turns what you draw into the key that opens your vault, so only the real pattern opens it.",
    body: `
## How a pattern becomes a key

You draw on a 5×5 grid, connecting at least six dots. PrivateRoll reads the exact order of the dots and runs it through PBKDF2-SHA256, 250,000 rounds, together with a random secret that was created on your iPhone and never leaves it. The result unlocks your vault's own random 256-bit key.

Nothing about the pattern is written to disk. There's no hash to steal and no stored answer to compare against. Someone who copies the app's files gets encrypted data, and without the secret kept in this iPhone's Keychain they can't even start guessing patterns on another computer.

## Why the device secret matters

A six-dot pattern on its own has too few possibilities to hold out against a fast computer. Tying the key to a secret that can't leave the phone means a copy of your vault can't be attacked on a computer at all. On the phone, wrong patterns trigger a lockout that grows to 15 minutes.

- **No stored secret.** Your pattern is never saved, hashed or uploaded.
- **Slow by design.** Each guess costs real compute time.
- **Bound to the device.** Copied vault files are useless anywhere else.

## Picking a good pattern

Avoid letters, straight lines and corner-to-corner shapes; they get guessed first. Use more than six dots, change direction a few times, and draw it out of sight. Order matters: the same dots drawn in reverse are a different pattern. To keep people nearby from following it, turn off **Show Pattern While Drawing** in Settings.

> Forgot it anyway? Every vault comes with a [recovery phrase](/features/recovery-phrase) that opens it and lets you choose a new pattern.
`,
    faq: [
      { q: "Can PrivateRoll support reset my pattern?", a: "No. We never have your pattern or anything derived from it. If you forget a pattern, the recovery phrase you saved when you made that vault opens it, on the same iPhone." },
      { q: "How many dots does a pattern need?", a: "At least six on the 5×5 grid, each used once. Longer patterns with a few changes of direction are much harder to guess." },
      { q: "What happens after several wrong patterns?", a: "After five patterns in a row that don't open a vault, unlocking pauses for 30 seconds. Each further miss doubles the pause, up to 15 minutes. Wrong recovery phrases count too." },
    ],
  },
  {
    slug: "recovery-phrase",
    title: "Recovery Phrase",
    icon: "key",
    tier: "Free",
    summary: "Every vault ends its setup with a short phrase. If you forget the pattern, the phrase opens the vault and lets you pick a new one.",
    headline: "Forget the pattern, not your photos.",
    lede: "When you make a vault, PrivateRoll shows you a short phrase, like “the sandy oak whispered lazily from a breezy robin”. Keep it somewhere safe. If the pattern ever slips your mind, the phrase gets you back in.",
    body: `
## How it works

1. Make a vault. The last step shows its recovery phrase. Tap **Copy** or **Download** to save it, then **I have saved it**.
2. Forgot the pattern? On the lock screen, tap **Use recovery phrase** and type the phrase.
3. The vault it belongs to opens, and PrivateRoll asks you to draw a new pattern.

Changing the pattern keeps the phrase working, so you only ever need to save it once.

## Why it's still private

The phrase is shown only on your iPhone, once, when the vault is made. PrivateRoll never stores it and never sends it anywhere: like a pattern, it's turned into a key together with a secret that never leaves the phone, and that key unlocks the vault's own key. A phrase typed on another device opens nothing.

Wrong phrases count toward the same lockout as wrong patterns, so it can't be used to keep guessing.

## Where to keep it

Somewhere you'll find it and other people won't: a password manager, a note in a safe place, or written down at home. Don't keep the only copy inside PrivateRoll.
`,
    faq: [
      { q: "Does the phrase work on a new iPhone?", a: "No. It only works on the iPhone where the vault was made, because the vault is tied to that phone. Before you switch phones, share out anything you want to keep." },
      { q: "I lost the phrase but I remember the pattern. Is that a problem?", a: "Not as long as you remember the pattern. The phrase is only needed if you forget it." },
      { q: "Can I see the phrase again later?", a: "No. It's shown once, when the vault is made, and never stored. That's what keeps anyone else from finding it in the app." },
    ],
  },
  {
    slug: "decoy-vaults",
    title: "A Vault for Each Pattern",
    icon: "mask",
    tier: "Free",
    summary: "Each pattern opens its own vault. PrivateRoll never lists them, so a vault of everyday photos can stand in for the rest.",
    headline: "Show a vault. Keep the others to yourself.",
    lede: "Every pattern you set up opens a separate vault with its own key and its own recovery phrase. The app never lists them or says how many there are, so you can keep an ordinary vault for the moments someone asks to look.",
    body: `
## One app, as many vaults as you need

On the lock screen, draw a pattern that doesn't open any vault yet. PrivateRoll offers to make a new vault for it: draw it again to confirm, save the new vault's recovery phrase, and it opens. Each vault has its own random key and its own recovery phrase, and opening one reveals nothing about the others.

## Where this helps

- **Being asked to unlock.** Open a vault with ordinary photos in it. Nothing on screen points to any other vault.
- **Shared devices.** A partner or roommate who opens the app sees a working vault, not a list.
- **Keeping things apart.** Use separate vaults for documents, personal photos or evidence of a dispute.

## Making a decoy believable

A decoy works best when it looks lived-in. Put real but harmless content in it, like receipts, screenshots or pet photos, and open it now and then.

## What it doesn't hide

PrivateRoll keeps no list of vaults, but it doesn't pretend every pattern is right: a pattern that opens nothing offers to make a new vault, and iOS shows the app's total storage in Settings. Someone with forensic access to the phone's file system could count the encrypted vault folders, though not open them.
`,
    faq: [
      { q: "If I draw my pattern slightly wrong, will I lose my photos?", a: "No. A pattern that opens nothing only offers to make a new vault, and your vaults are untouched. Go back and draw again carefully. A new vault is only made if you draw the new pattern a second time to confirm it." },
      { q: "Is there a limit to how many vaults I can make?", a: "No fixed limit. Each vault only takes up the space of what's inside it." },
      { q: "Can I move items between vaults?", a: "Not directly, because only one vault is open at a time. Share an item out of one vault, for example to Files, then add it to the other." },
    ],
  },
  {
    slug: "security-architecture",
    title: "Security Architecture",
    icon: "shield",
    tier: "Free",
    summary: "AES-256-GCM, a slow key derivation tied to your iPhone, and per-file keys. Here's exactly how your data is protected.",
    headline: "How PrivateRoll protects your files, in detail.",
    lede: "You shouldn't have to take our word for it. Here's the design, written for people who want the specifics.",
    body: `
## The short version

- Your pattern goes through **PBKDF2-SHA256** (250,000 rounds), salted with a random 256-bit secret kept in this iPhone's Keychain. **HKDF** then derives two values from the result: a lookup tag that names the vault's folder, and a wrapping key.
- The wrapping key unlocks the vault's random 256-bit master key. The vault's recovery phrase goes through the same steps and unlocks the same master key.
- Each file gets its own key, derived from the master key and the file's ID.
- Files are encrypted with **AES-256-GCM** in 512 KB chunks. That gives both confidentiality and tamper detection, and lets videos play without a decrypted copy.
- Names, dates, settings and thumbnails are encrypted too. Nothing readable sits beside the ciphertext.

## Key hierarchy

| Layer | What it protects | Where it lives |
| --- | --- | --- |
| Pattern | Everything in one vault | Your memory |
| Recovery phrase | The same vault, if the pattern is forgotten | Wherever you saved it; never stored by the app |
| Device secret | Ties every key to this iPhone | The Keychain, this device only; never synced or backed up |
| Master key | One vault's files and index | Stored wrapped by your pattern's key and by your phrase's key; held in memory only while the vault is open |
| File key | One file | Derived when that file is read |

## While the app is locked

PrivateRoll locks the moment you leave the app. Copies decrypted for viewing or sharing are deleted when it locks. Photos and thumbnails are decrypted in memory, and videos play straight from encrypted storage.

## No copies anywhere else

Vaults are excluded from iCloud and computer backups, and PrivateRoll has no servers. Your files exist on this iPhone only. That also means they can't be restored if the phone is lost, reset or replaced, so keep a copy of anything irreplaceable somewhere else.

## What we can't protect against

Honesty matters here. Encryption doesn't help if:

- someone watches you draw your pattern,
- someone finds your recovery phrase and has your iPhone,
- your phone is compromised by spyware while the vault is open,
- you share files to Photos or another app that doesn't encrypt them.

Read [what zero-knowledge encryption really means](/guides/what-is-zero-knowledge-encryption) for the bigger picture.
`,
    faq: [
      { q: "Which cryptography does PrivateRoll use?", a: "Only Apple's: CryptoKit for AES-GCM and HKDF, CommonCrypto for PBKDF2, and the Keychain for the device secret." },
      { q: "Do you use Apple's Data Protection as well?", a: "Yes. Vault files are also protected by iOS Data Protection, and anything decrypted for viewing or sharing uses the strongest class, Complete Protection." },
    ],
  },
  {
    slug: "everyday-ease",
    title: "Built for Everyday Use",
    icon: "spark",
    tier: "Free",
    summary: "Import from Photos and Files, search, sort, and play videos without waiting. Strong security that still feels like a normal photo app.",
    headline: "Serious encryption. Zero homework.",
    lede: "Security that's annoying to use gets abandoned. PrivateRoll is designed to feel as quick and familiar as a photo app, with everything encrypted underneath.",
    body: `
## Things that just work

- **Import** photos and videos from Photos, and any file from Files, with no limit.
- **Search** by name, and **sort** by date added, date taken, name or size.
- **Select** several items to share or delete at once.
- **Full-screen viewer** with pinch and double-tap zoom, and swiping between items.
- **Videos** that start playing straight from encrypted storage.
- **Any file type**, previewed with Quick Look.
- **What's inside**: each vault's Settings shows how many photos, videos and files it holds and the space they take.

## Your originals

Importing makes an encrypted copy. PrivateRoll doesn't delete anything from Photos or Files, so once an import has finished, delete the originals yourself and empty **Recently Deleted** in Photos.

## Locking

PrivateRoll locks as soon as you leave the app. An import still running at that point stops, so keep the app open until it finishes.

## iPhone only, for now

PrivateRoll is built for iPhone, in portrait, with the same dark look as the lock screen. iPad support is on the [roadmap](/whats-new).
`,
    faq: [
      { q: "Can I import from Google Photos?", a: "Download the photos to your iPhone first, then import them from Photos or Files." },
      { q: "Does PrivateRoll remove photos from my camera roll?", a: "No. Importing copies them into the vault. Delete the originals in Photos afterwards, then empty Recently Deleted so they're really gone." },
    ],
  },
];

export const getFeature = (slug: string) => features.find((f) => f.slug === slug);
