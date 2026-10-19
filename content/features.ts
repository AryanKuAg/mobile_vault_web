// Feature pages. Every claim here should match what the app actually does.
// Edit freely; pages, cards, footer links and the sitemap all read from this list.

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
    summary: "The pattern you draw is the key itself. It isn't checked against a stored copy. It decrypts your vault.",
    headline: "Your pattern doesn't unlock a door. It is the key.",
    lede: "Most vault apps store your PIN and compare against it. Veilbox never stores your pattern at all. It turns what you draw into the encryption key, so the vault only opens with the real thing.",
    body: `
## How a pattern becomes a key

When you draw on the 3×3 grid, Veilbox reads the exact sequence of dots you touched. That sequence goes through a key-derivation function (a deliberately slow algorithm designed to make guessing expensive) together with a random salt that lives on your device. The output is a 256-bit key used to unlock your vault.

Nothing about the pattern is written to disk. There is no hash to steal and no "correct answer" sitting in a database waiting to be compared. If someone copies the app's data off your phone, they get ciphertext and a salt, nothing more.

## Why this matters more than it sounds

A lot of photo-locker apps put a lock screen in front of files that are stored normally. Bypass the screen (with a backup extraction tool, a jailbreak, or a bug) and the photos are right there. With Veilbox there's nothing behind the screen to reach: without the key, the files are unreadable noise.

- **No stored secret.** Your pattern is never saved, hashed, or uploaded.
- **Slow by design.** Each guess costs real compute time, so brute-forcing every pattern is impractical.
- **Longer is stronger.** Patterns can use all nine dots and revisit directions, and every extra dot multiplies the number of possibilities.

## Picking a good pattern

Avoid the shapes everyone draws: letters, a simple L, a Z, or a full square. Start from a dot other than the top-left corner, change direction at least twice, and use six or more dots. If you want even more strength, add a [Recovery Phrase](/features/recovery-phrase) as a second factor.

> Because the pattern is the key, nobody can reset it for you, including us. Set up a recovery phrase when you create the vault.
`,
    faq: [
      { q: "Can Veilbox support reset my pattern?", a: "No. We never have your pattern or anything derived from it, so there's nothing on our side to reset. A recovery phrase is the only backup route." },
      { q: "How many dots does a pattern need?", a: "The minimum is four, but we recommend six or more with at least two changes of direction." },
      { q: "Is a pattern weaker than a passcode?", a: "A short pattern is weaker than a long passcode. A long, irregular pattern combined with a slow key-derivation function holds up well, and you can add a recovery phrase for extra strength." },
    ],
  },
  {
    slug: "recovery-phrase",
    title: "Recovery Phrase",
    icon: "phrase",
    tier: "Free",
    summary: "A set of random words that can rebuild your key if you ever forget your pattern. Write it down once and keep it offline.",
    headline: "Forget your pattern. Keep your photos.",
    lede: "When you create a vault, Veilbox generates a list of random words. Together they can rebuild access to that vault on any device, without involving us.",
    body: `
## What the phrase does

The recovery phrase is a second, independent way to derive your vault key. It's generated on your device from a cryptographically secure random source and shown to you exactly once. Veilbox doesn't keep a copy, and it's never sent anywhere.

If you forget your pattern, or move to a new iPhone and restore from an [encrypted backup](/features/encrypted-backup), you enter the words and set a new pattern. Your files stay as they are; only the way you unlock them changes.

## Storing it well

- Write it on paper. Screenshots end up in your camera roll and your cloud photo library, which is exactly where you don't want them.
- Keep it somewhere physically separate from your phone, like a drawer at home, a safe, or with a trusted person.
- Don't type it into a notes app, an email, or a password manager you share with anyone.

## What happens if you lose both

If you lose both your pattern and your phrase, the vault can't be opened. That isn't a policy we chose; it's how real encryption works. A service that can recover your files without either secret also holds a way in for itself, and potentially for anyone who compromises it.

> Think of the phrase like the spare key to a safe. You'll probably never use it, but you'll be very glad it exists if you need it.
`,
    faq: [
      { q: "Can I see my phrase again later?", a: "You can re-display it from Settings after unlocking with your pattern. We recommend checking that your written copy matches." },
      { q: "Is every vault's phrase different?", a: "Yes. Each vault, including hidden ones, has its own independent phrase." },
      { q: "Can I use the phrase instead of a pattern every day?", a: "You can, but it's slower to type and easier to shoulder-surf. Most people keep it as a backup only." },
    ],
  },
  {
    slug: "deniable-vaults",
    title: "Deniable Vaults",
    icon: "mask",
    tier: "Free",
    summary: "Every pattern opens a vault. A wrong pattern doesn't show an error, so nobody can tell whether more is hidden.",
    headline: "There's no wrong answer, and that's the point.",
    lede: "Draw any pattern and Veilbox opens a vault. A pattern that has never been used opens a fresh, empty one. To anyone watching, every attempt looks like success.",
    body: `
## Why there's no error message

A typical lock screen says "incorrect password." That message tells an observer two things: there's something behind the lock, and they haven't found it yet. Veilbox skips that message entirely.

Each pattern derives its own key. If the key matches an existing vault, that vault opens. If it doesn't, you see an empty vault, ready to be filled. From the outside, a real vault and an empty one look exactly the same.

## Where this helps

- **Pressure situations.** If someone insists you unlock the app, you can open a vault with ordinary photos in it. Nothing on screen suggests that other vaults exist.
- **Shared devices.** A partner or roommate who opens the app sees a working vault, not a challenge to solve.
- **No count to reveal.** Veilbox doesn't keep a list of how many vaults exist. The storage format is designed so that the number of vaults can't be read from the files.

## Making it believable

A decoy vault works best when it looks lived-in. Put real but harmless content in it, like receipts, screenshots, or pet photos, and open it now and then. Combine it with [Hidden Vaults](/features/hidden-vaults) for the things that matter and a [Panic Pattern](/features/panic-pattern) for emergencies.
`,
    faq: [
      { q: "If I mistype my pattern, will I think my photos are gone?", a: "You'll see an empty vault, which can be startling the first time. Just lock and draw again carefully. Your real vault is untouched." },
      { q: "Can someone tell how much storage hidden vaults use?", a: "Veilbox pads its storage to make that harder, but iOS shows total app size. Keep a reasonable amount of content in your decoy vault so the size looks normal." },
    ],
  },
  {
    slug: "hidden-vaults",
    title: "Hidden Vaults",
    icon: "layers",
    tier: "Pro",
    summary: "Keep separate vaults behind separate patterns, each with its own key, for work, family, health, or anything else.",
    headline: "One app. As many vaults as you need.",
    lede: "Give each part of your life its own vault and its own pattern. They're encrypted separately, so opening one reveals nothing about the others.",
    body: `
## Separate keys, separate worlds

Every hidden vault is derived from its own pattern and protected by its own key. They don't share a master password or a list. Unlocking your "Work" vault gives zero information about whether a "Medical" or "Personal" vault exists.

## Ideas for organizing

- **Everyday vault:** IDs, receipts, and documents you open often.
- **Private vault:** personal photos and videos you'd never want on a shared screen.
- **Evidence vault:** screenshots and records for a dispute, kept apart from everything else.
- **Decoy vault:** believable, harmless content for when you're asked to unlock. See [Deniable Vaults](/features/deniable-vaults).

## Moving things between vaults

To move a file you need to have both vaults open in the same session, which means you need both patterns. There's no shortcut that links vaults together, because a link would itself be evidence that more than one exists.

> Hidden vaults are part of Veilbox Pro. Your free vault stays fully encrypted forever, and Pro adds more vaults and more storage options.
`,
    faq: [
      { q: "Is there a limit to how many hidden vaults I can make?", a: "There's no fixed limit in Pro. Each vault only takes up the space of the files inside it." },
      { q: "Can I name my vaults?", a: "Yes. Names are stored inside each vault's encrypted data, so they're only visible once that vault is open." },
    ],
  },
  {
    slug: "panic-pattern",
    title: "Panic Pattern",
    icon: "alert",
    tier: "Pro",
    summary: "Set a pattern that, when drawn, quietly opens a decoy and can permanently erase chosen vaults.",
    headline: "For the moment you can't say no.",
    lede: "A panic pattern looks like any other unlock. Behind the scenes it can open a safe decoy and erase the vaults you've marked, with no confirmation dialog and no trace on screen.",
    body: `
## How it works

You choose a pattern and decide what it does. The options are:

1. **Open a decoy:** show a chosen vault with harmless content.
2. **Erase and open:** permanently destroy the encryption keys for selected vaults, then show the decoy.

Erasing keys is fast, because Veilbox doesn't need to overwrite every file. Without the key, the encrypted files are unrecoverable, and the space is reclaimed in the background.

## Use it carefully

This is a serious tool, so a few warnings:

- Erasure is permanent. Unless the vault also exists in an [encrypted backup](/features/encrypted-backup) you can still reach, those files are gone.
- Choose a pattern you won't draw by accident, but can draw under stress.
- Laws differ between countries. Destroying data during a legal process may be illegal where you are. The panic pattern is meant for personal safety situations, not for obstructing lawful investigations.

## Who it's for

People in controlling relationships, travelers crossing borders, journalists protecting sources, and anyone who might be pressured to hand over an unlocked phone. If that's you, read our [scenario guides](/scenarios) for broader safety planning, because the app is only one piece of it.
`,
    faq: [
      { q: "Does the panic pattern show any animation or message?", a: "No. It behaves exactly like a normal unlock and lands on your decoy vault." },
      { q: "Can I undo an erase?", a: "Not on the device. If you keep encrypted backups somewhere you control, you can restore from those with your recovery phrase." },
    ],
  },
  {
    slug: "encrypted-backup",
    title: "Encrypted Backup",
    icon: "cloud",
    tier: "Free + Pro",
    summary: "Back up to iCloud in encrypted form. Apple stores the data but can't read it, and neither can we.",
    headline: "Backed up to iCloud. Unreadable to iCloud.",
    lede: "Losing your phone shouldn't mean losing your vault. Veilbox encrypts every file on your device before it's uploaded, so the copy in iCloud is as locked as the original.",
    body: `
## What gets uploaded

Veilbox writes encrypted file chunks to your private iCloud container. Before anything leaves your iPhone it's encrypted with your vault key. Apple sees opaque blobs of random-looking data, with no file names, no thumbnails, and no dates.

## Restoring on a new phone

1. Install Veilbox on the new device and sign in to the same Apple account.
2. Draw your pattern, or enter your [recovery phrase](/features/recovery-phrase).
3. Veilbox finds the matching backup and starts downloading and decrypting it.

Restores are resumable. If you lose connection halfway through, the restore picks up where it left off.

## Free vs. Pro

- **Free:** back up your main vault.
- **Pro:** back up every hidden vault, with automatic background backup.

## Turning it off

You can disable backup at any time and delete the uploaded data from inside the app. Some people prefer a vault that exists in exactly one place. That's a valid choice, as long as you accept that losing the phone means losing the files.
`,
    faq: [
      { q: "Does this use my iCloud storage?", a: "Yes. Backups count against your Apple account's storage quota." },
      { q: "Does Advanced Data Protection matter?", a: "Veilbox encrypts files itself, so the backup is protected either way. Turning on Advanced Data Protection still improves the rest of your iCloud data." },
      { q: "Can Veilbox see my backups?", a: "No. They live in your iCloud account, encrypted with a key only your pattern or phrase can produce." },
    ],
  },
  {
    slug: "private-sharing",
    title: "Private Sharing",
    icon: "share",
    tier: "Pro",
    summary: "Send a photo or file through an encrypted, expiring link. The key travels in the link and never reaches a server.",
    headline: "Share one photo without handing over your camera roll.",
    lede: "Pick files, set an expiry, and send a link. The recipient opens it in a browser and the decryption happens on their device, never on ours.",
    body: `
## How the link stays private

When you share, Veilbox encrypts a copy of the selected files with a fresh, one-time key and uploads the ciphertext. The key is added to the part of the link after the \`#\`. Browsers never send that part to a server, so our servers only ever store data they can't open.

## Controls you get

- **Expiry:** one hour, one day, one week, or after the first view.
- **Download limits:** allow viewing only, or allow saving.
- **Revoke anytime:** delete the shared copy from the server immediately.

## Sharing with another Veilbox user

If the person you're sending to uses Veilbox too, send a [Vault Invite](/invite) instead. Files land directly in their vault, encrypted end to end, and never appear in their Photos app.

> Remember that anyone you share with can take a screenshot. Encryption protects files in transit and at rest, but it can't control the other person's screen.
`,
    faq: [
      { q: "Does the recipient need the app?", a: "No. Links open in any modern browser. Vault Invites need the app on both sides." },
      { q: "What happens after a link expires?", a: "The encrypted copy is deleted from the server, and the link stops working permanently." },
    ],
  },
  {
    slug: "device-sync",
    title: "Device Sync",
    icon: "sync",
    tier: "Pro",
    summary: "Keep your vault in step across iPhone and iPad. Changes sync as encrypted data, never as readable files.",
    headline: "Your vault on every device you own.",
    lede: "Add a photo on your iPhone and it shows up on your iPad. Sync uses the same end-to-end encryption as backup, so nothing readable ever passes through the cloud.",
    body: `
## What syncs

Files, albums, notes, and vault names all sync. Each device decrypts locally after you unlock it with your pattern. A device that's never been unlocked holds only encrypted data.

## Adding a device

1. Install Veilbox on your iPad or second iPhone.
2. Unlock with the same pattern.
3. Veilbox pulls down the encrypted vault and starts syncing.

## Removing a device

Lost an iPad? From any other unlocked device, open **Settings → Devices** and remove it. The next time it connects, it deletes its local copy. Because the vault data was never readable without your pattern, a lost device that stays offline is still locked.

## Conflict handling

If you edit the same item on two devices while offline, Veilbox keeps both versions and lets you choose. It never silently overwrites one with the other.
`,
    faq: [
      { q: "Does sync work with Mac?", a: "Not yet. iPhone and iPad are supported today." },
      { q: "Does each device need Pro?", a: "Pro is tied to your Apple account, so it carries over to devices signed in with the same account." },
    ],
  },
  {
    slug: "vault-camera",
    title: "Vault Camera",
    icon: "camera",
    tier: "Free",
    summary: "Take photos and videos straight into the vault. They never touch your camera roll, iCloud Photos, or Memories.",
    headline: "Some photos should never hit your camera roll.",
    lede: "The built-in camera encrypts each shot the moment it's captured. It's ideal for IDs, documents, and anything you don't want synced, suggested, or surfaced later.",
    body: `
## Why skip the camera roll

Photos taken with the regular Camera app get indexed, analysed for faces and text, added to Memories, shown in widgets and suggestions, and often synced to every device on your Apple account. Moving them into a vault later still leaves a window where all of that has already happened.

The Vault Camera skips that window. Each photo is encrypted in memory and written straight into your vault.

## What's included

- Photo and video capture, front and back cameras
- Flash, zoom, and focus controls
- A document mode with edge detection for IDs and paperwork
- **Location stripping by default.** GPS coordinates aren't saved unless you turn them on.

## Good uses

Passports and driver's licences, medical documents, insurance photos after an accident, receipts for a dispute, or any personal photo you'd rather not see in "On This Day."
`,
    faq: [
      { q: "Is the quality lower than the normal camera?", a: "Photos are captured at full resolution. Some Apple-only processing modes, like Cinematic video, aren't available to third-party apps." },
      { q: "Can I export Vault Camera photos later?", a: "Yes. You can export or share any file, and exports remove location data by default." },
    ],
  },
  {
    slug: "disguised-icons",
    title: "Disguised Icons",
    icon: "grid",
    tier: "Free + Pro",
    summary: "Swap the home-screen icon for a calculator, notes, weather, or a plain design that doesn't draw attention.",
    headline: "Nobody asks about an app they don't notice.",
    lede: "Choose an alternate icon and name so Veilbox blends into your home screen. It's not a security feature by itself, but it means fewer questions.",
    body: `
## Pick a look

Veilbox comes with a set of alternate icons: a few neutral abstract designs on the free plan, and utility-style looks such as a calculator, notes, compass, or weather in Pro. You can change it any time from Settings.

## What an icon can and can't do

An alternate icon reduces casual attention. It doesn't hide the app from someone who goes looking: the real name still appears in Settings, App Store purchases, and storage lists. That's fine, because the real protection is the [encryption](/features/security-architecture). The icon just keeps curious people from tapping in the first place.

## Pair it with iOS features

- Move Veilbox off the home screen and keep it in the App Library.
- Use **Require Face ID** on the app (iOS 18 and later) as an extra outer lock.
- Turn off Veilbox in Siri suggestions so it doesn't appear in search.
`,
    faq: [
      { q: "Does the calculator icon actually calculate?", a: "No. It changes only the icon and name. We don't fake a working calculator, because that adds complexity without adding security." },
    ],
  },
  {
    slug: "security-architecture",
    title: "Security Architecture",
    icon: "shield",
    tier: "Free",
    summary: "AES-256-GCM, a slow key-derivation function, and per-file keys. Here's exactly how your data is protected.",
    headline: "How Veilbox protects your files, in detail.",
    lede: "You shouldn't have to take our word for it. Here's the design, written for people who want the specifics.",
    body: `
## The short version

- Your pattern (or phrase) plus a device salt goes through **Argon2id** to derive a 256-bit vault key.
- Each file gets its own random 256-bit file key.
- Files are encrypted with **AES-256-GCM**, which gives both confidentiality and tamper detection.
- File keys are wrapped with the vault key and stored with the encrypted file.
- Names, dates, albums, and thumbnails are encrypted too. Nothing readable sits beside the ciphertext.

## Key hierarchy

| Layer | What it protects | Where it lives |
| --- | --- | --- |
| Pattern / phrase | Everything | Your memory and your paper backup |
| Vault key | File keys and vault metadata | Derived when you unlock, held in memory only |
| File key | One file | Wrapped by the vault key, stored with the file |

## While the app is locked

When Veilbox locks, whether you press the lock button, switch apps, or the timer runs out, the vault key is wiped from memory. File keys exist only while a file is open. Thumbnails are decrypted into memory, not to disk.

## What we can't protect against

Honesty matters here. Encryption doesn't help if:

- someone watches you draw your pattern,
- your phone is compromised by spyware while the vault is open,
- you export files to Photos or another app that doesn't encrypt them.

Read [what zero-knowledge encryption really means](/guides/what-is-zero-knowledge-encryption) for the bigger picture.
`,
    faq: [
      { q: "Is the code open source?", a: "Not currently. We publish this design document and plan to commission an independent audit." },
      { q: "Do you use Apple's Data Protection as well?", a: "Yes. Veilbox files are also stored with iOS's strongest file protection class, as an extra layer under our own encryption." },
    ],
  },
  {
    slug: "everyday-ease",
    title: "Built for Everyday Use",
    icon: "spark",
    tier: "Free",
    summary: "Import in bulk, search, sort into albums, swipe through videos. Strong security that still feels like a normal photo app.",
    headline: "Serious encryption. Zero homework.",
    lede: "Security that's annoying to use gets abandoned. Veilbox is designed to feel as quick and familiar as the Photos app, with everything encrypted underneath.",
    body: `
## Things that just work

- **Bulk import** from Photos, Files, or the share sheet, with a progress bar that survives switching apps.
- **Delete originals** after import, with a clear reminder about Recently Deleted.
- **Albums and folders** with drag-to-reorder.
- **Full-screen viewer** with pinch, swipe, and video scrubbing.
- **Encrypted notes** next to your files for codes, details, and context.
- **Search** by album, type, and date, all done on your device.

## Fast, even with big libraries

Thumbnails are generated once, encrypted, and cached. Opening a vault with thousands of items takes about as long as opening a regular album.

## Locking on your terms

Lock immediately when you leave the app, after a set time, or when you place your phone face down. Whatever you choose, the [vault key is wiped from memory](/features/security-architecture) the moment Veilbox locks.
`,
    faq: [
      { q: "Can I import from Google Photos?", a: "Download the photos to your iPhone first, then import them from Photos or Files." },
      { q: "Does Veilbox remove photos from my camera roll?", a: "Only if you choose to. iOS will ask you to confirm, and the photos then sit in Recently Deleted for up to 30 days unless you empty it." },
    ],
  },
];

export const getFeature = (slug: string) => features.find((f) => f.slug === slug);
