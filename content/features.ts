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
    summary: "The pattern you draw is turned into the key that unlocks your vault. It isn't stored anywhere to compare against.",
    headline: "Your pattern doesn't unlock a door. It is the key.",
    lede: "Most vault apps store your PIN and check it. PrivateRoll never stores your pattern. It turns what you draw into the key that unlocks your vault, so only the real pattern opens it.",
    body: `
## How a pattern becomes a key

You draw on a 4×4 grid, connecting at least six dots. PrivateRoll reads the exact order of the dots and runs it through PBKDF2-SHA256, 250,000 rounds, together with a random secret that was created on your device and never leaves it. The result unlocks your vault's own random 256-bit key.

Nothing about the pattern is written to disk. There's no hash to steal and no stored answer to compare against. Someone who copies the app's files gets encrypted data, and without the secret kept in this device's Keychain they can't even start guessing patterns on another computer.

## Why the device secret matters

A six-dot pattern on its own has too few possibilities to hold out against a fast computer. Tying the key to a secret that can't leave the phone means a copy of your vault can't be attacked on a computer at all. On the phone, wrong patterns trigger a lockout that grows to 15 minutes.

- **No stored secret.** Your pattern is never saved, hashed or uploaded.
- **Slow by design.** Each guess costs real compute time.
- **Bound to the device.** Copied vault files are useless anywhere else.

## Picking a good pattern

Avoid letters, straight lines and corner-to-corner shapes; they get guessed first. Use more than six dots, change direction a few times, and draw it out of sight. Order matters: the same dots drawn in reverse are a different pattern.

> Because the pattern is the key, nobody can reset it for you, including us. There's no recovery option, so pick a pattern you'll remember.
`,
    faq: [
      { q: "Can PrivateRoll support reset my pattern?", a: "No. We never have your pattern or anything derived from it. If you forget a pattern, nobody can open that vault." },
      { q: "How many dots does a pattern need?", a: "At least six on the 4×4 grid, each used once. Longer patterns with a few changes of direction are much harder to guess." },
      { q: "What happens after several wrong patterns?", a: "After five patterns that don't open a vault, unlocking pauses for 30 seconds. Each further miss doubles the pause, up to 15 minutes. Wrong patterns drawn in the share sheet count too." },
    ],
  },
  {
    slug: "decoy-vaults",
    title: "Decoy Vaults",
    icon: "mask",
    tier: "Free",
    summary: "Each pattern opens its own vault. PrivateRoll never lists them, so a vault of everyday photos can stand in for the rest.",
    headline: "Show a vault. Keep the others to yourself.",
    lede: "Every pattern you set up opens a separate vault with its own key. The app never lists them or says how many there are, so you can keep an ordinary vault for the moments someone asks to look.",
    body: `
## One app, as many vaults as you need

Draw a pattern that doesn't open anything yet and PrivateRoll offers to create a new vault for it. Each vault has its own random key, its own folders and its own settings, all encrypted inside it. Opening one reveals nothing about the others.

## Where this helps

- **Being asked to unlock.** Open a vault with ordinary photos in it. Nothing on screen points to any other vault.
- **Shared devices.** A partner or roommate who opens the app sees a working vault, not a list.
- **Keeping things apart.** Use separate vaults for documents, personal photos or evidence of a dispute.

## Making a decoy believable

A decoy works best when it looks lived-in. Put real but harmless content in it, like receipts, screenshots or pet photos, and open it now and then. For emergencies, see the [duress vault](/features/duress-vault).

## What it doesn't hide

PrivateRoll keeps no list of vaults, but it doesn't pretend every pattern is right: a pattern that opens nothing says so, and iOS shows the app's total storage in Settings. Someone with forensic access to the phone's file system could count the encrypted vault folders, though not open them.
`,
    faq: [
      { q: "If I draw my pattern slightly wrong, will I lose my photos?", a: "No. A pattern that opens nothing just shows a message, and your vaults are untouched. Draw again carefully. A new vault is only created if you draw the new pattern a second time to confirm it." },
      { q: "Is there a limit to how many vaults I can make?", a: "No fixed limit. Each vault only takes up the space of what's inside it." },
      { q: "Can I move items between vaults?", a: "Not directly, because only one vault is open at a time. Share an item out of one vault, for example to Files, then add it to the other." },
    ],
  },
  {
    slug: "duress-vault",
    title: "Duress Vault",
    icon: "alert",
    tier: "Free",
    summary: "Arm a vault so that drawing its pattern permanently erases every other vault on the device, then opens as normal.",
    headline: "For the moment you can't say no.",
    lede: "A duress vault opens like any other. Behind the scenes, drawing its pattern deletes every other vault on the device, and then it becomes an ordinary vault with nothing left to show it was ever armed.",
    body: `
## How it works

Open the vault you want to use under pressure, go to Settings and choose **Make This a Duress Vault**. Then lock the app. The next time anyone draws that vault's pattern:

1. Every other vault on the device is permanently deleted.
2. The duress vault opens as normal.
3. It goes back to being an ordinary vault, so nothing inside it shows it was a duress vault.

Each vault's key file is deleted first, so its contents are unreadable even if deleting the rest is interrupted.

## Use it carefully

- Erasing is permanent. PrivateRoll keeps no backups, so deleted vaults can't be recovered.
- Put everyday photos in the duress vault before arming it, so it looks like a vault someone actually uses.
- Laws differ between countries. Destroying data during a legal process, such as a border inspection, may be a crime where you are. The duress vault is meant for personal safety, not for obstructing lawful investigations.

## Who it's for

People in controlling relationships, travelers, journalists protecting sources, and anyone who might be pressured to hand over an unlocked phone. If that's you, read our [scenario guides](/scenarios) for broader safety planning, because the app is only one piece of it.
`,
    faq: [
      { q: "Does the duress vault show anything when it erases?", a: "No. Drawing its pattern looks like any other unlock and lands in that vault." },
      { q: "Can I undo an erase?", a: "No. The deleted vaults' keys are gone, and PrivateRoll has no backup to restore from." },
    ],
  },
  {
    slug: "vault-camera",
    title: "Vault Camera",
    icon: "camera",
    tier: "Free",
    summary: "Take photos and videos straight into the vault. They never touch your camera roll, iCloud Photos or Memories.",
    headline: "Some photos should never hit your camera roll.",
    lede: "Shots taken from inside PrivateRoll are encrypted into your vault the moment you keep them. They're never saved to Photos, so they never sync, turn up in Memories or get suggested later.",
    body: `
## Why skip the camera roll

Photos taken with the regular Camera app get indexed, analyzed for faces and text, added to Memories, shown in widgets and often synced to every device on your Apple account. Moving them into a vault later still leaves a window where all of that has already happened.

Taking the shot from inside PrivateRoll skips that window. Choose **+ → Take Photo or Video**, and what you capture goes straight into the folder you're in.

## Good to know

- Photos and videos, with the front and back cameras and the standard iOS camera controls.
- Photos are saved without location data.
- Nothing is written to your photo library at any point.

## Good uses

Passports and driver's licenses, medical documents, insurance photos after an accident, receipts for a dispute, or any personal photo you'd rather not see in "On This Day."
`,
    faq: [
      { q: "Does the camera need access to my photo library?", a: "No. It needs camera access, and microphone access for sound in videos. Captures go into the vault, not into Photos." },
      { q: "Can I get a photo back out later?", a: "Yes. Share it from the vault to save it, send it or open it in another app." },
    ],
  },
  {
    slug: "share-sheet",
    title: "Add from Any App",
    icon: "share",
    tier: "Free",
    summary: "Send photos and files to PrivateRoll from any app's share sheet. Draw a vault's pattern and they're encrypted straight into it.",
    headline: "Save it to the vault without opening the vault.",
    lede: "Looking at a photo in Messages or a PDF in Mail? Tap Share, choose Add to PrivateRoll, and draw the pattern of the vault it belongs in.",
    body: `
## How it works

1. In any app, tap **Share** and choose **Add to PrivateRoll**.
2. Draw the pattern of the vault the items belong in.
3. Each item is encrypted straight into that vault and appears the next time you open it.

One share can carry up to 100 photos or files, or 20 videos.

## Private by design

The share sheet never shows what's in your vaults or how many there are. It only checks the pattern you draw, and wrong patterns count toward the same lockout as the app, so it can't be used to keep guessing.

Sharing makes a copy. If you don't want the original left where it was, delete it from the app you shared it from.
`,
    faq: [
      { q: "Do I need to open PrivateRoll first?", a: "No. The share sheet works on its own, and the app adds the items to the vault the next time you unlock it." },
    ],
  },
  {
    slug: "disguised-icons",
    title: "Disguised Icons",
    icon: "grid",
    tier: "Free",
    summary: "Swap the Home Screen icon for a calculator, a level or another plain utility, so the app doesn't draw attention.",
    headline: "Nobody asks about an app they don't notice.",
    lede: "Pick an alternate icon so PrivateRoll blends into your Home Screen. It's not a security feature by itself, but it means fewer questions.",
    body: `
## Pick a look

**Settings → App Icon** offers seven utility-style icons: Calculator, Level, Printer, Units, Sound Meter, Network and Device Info. Switch at any time, or go back to the PrivateRoll icon. iOS shows a short confirmation whenever the icon changes.

## What an icon can and can't do

An alternate icon reduces casual attention. The name under it still says PrivateRoll, and the app still appears by name in Settings and storage lists. That's fine, because the real protection is the [encryption](/features/security-architecture). The icon just keeps curious people from tapping in the first place.

## Pair it with iOS features

- Move PrivateRoll off the Home Screen and keep it in the App Library.
- Use **Require Face ID** on the app (iOS 18 and later) as an extra outer lock.
- Turn off PrivateRoll in Siri suggestions so it doesn't appear in search.
`,
    faq: [
      { q: "Does the calculator icon actually calculate?", a: "No. It only changes the icon. Tapping it opens PrivateRoll's pattern screen." },
      { q: "Can I change the app's name too?", a: "No. iOS doesn't let apps rename themselves, so the label stays PrivateRoll." },
    ],
  },
  {
    slug: "security-architecture",
    title: "Security Architecture",
    icon: "shield",
    tier: "Free",
    summary: "AES-256-GCM, a slow key derivation tied to your device, and per-file keys. Here's exactly how your data is protected.",
    headline: "How PrivateRoll protects your files, in detail.",
    lede: "You shouldn't have to take our word for it. Here's the design, written for people who want the specifics.",
    body: `
## The short version

- Your pattern goes through **PBKDF2-SHA256** (250,000 rounds), salted with a random 256-bit secret kept in this device's Keychain. **HKDF** then derives two values from the result: a lookup tag that names the vault's folder, and a wrapping key.
- The wrapping key unlocks the vault's random 256-bit master key.
- Each file gets its own key, derived from the master key and the file's ID.
- Files are encrypted with **AES-256-GCM** in 512 KB chunks. That gives both confidentiality and tamper detection, and lets videos play without a decrypted copy.
- Names, folders, dates, settings and thumbnails are encrypted too. Nothing readable sits beside the ciphertext.

## Key hierarchy

| Layer | What it protects | Where it lives |
| --- | --- | --- |
| Pattern | Everything | Your memory |
| Device secret | Ties every key to this device | The Keychain, this device only; never synced or backed up |
| Master key | One vault's files and index | Stored wrapped by your pattern's key; held in memory only while the vault is open |
| File key | One file | Derived when that file is read |

## While the app is locked

PrivateRoll locks the moment you leave the app, and the app switcher shows a cover instead of your vault. Copies decrypted for viewing or sharing are deleted when it locks. Photos and thumbnails are decrypted in memory, and videos play straight from encrypted storage.

## No copies anywhere else

Vaults are excluded from iCloud and computer backups, and PrivateRoll has no servers. Your files exist on this device only. That also means they can't be restored if the device is lost, reset or replaced, so keep a copy of anything irreplaceable somewhere else.

## What we can't protect against

Honesty matters here. Encryption doesn't help if:

- someone watches you draw your pattern,
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
    summary: "Import in bulk, sort into folders, search, and play videos without waiting. Strong security that still feels like a normal photo app.",
    headline: "Serious encryption. Zero homework.",
    lede: "Security that's annoying to use gets abandoned. PrivateRoll is designed to feel as quick and familiar as a photo app, with everything encrypted underneath.",
    body: `
## Things that just work

- **Bulk import** from Photos, Files and the camera, plus drag and drop from other apps.
- **Remove originals** after an import, if you choose. Photos keeps them in Recently Deleted for 30 days.
- **Folders** up to eight levels deep, sorted by date, name or size, or in your own order by dragging.
- **Search** across the whole vault, and filters for photos, videos, files and notes.
- **Full-screen viewer** with pinch and double-tap zoom, and arrow keys on iPad.
- **Videos** that start playing straight from encrypted storage.
- **Encrypted notes** with find and replace, word count and adjustable text size.
- **Any file type**, previewed with Quick Look.

## Locking

PrivateRoll locks as soon as you leave the app. An import still running at that point stops, so keep the app open until the progress banner finishes.

## iPhone and iPad

PrivateRoll runs on both. Each device has its own vaults, because every vault is tied to the device it was created on.
`,
    faq: [
      { q: "Can I import from Google Photos?", a: "Download the photos to your iPhone first, then import them from Photos or Files." },
      { q: "Does PrivateRoll remove photos from my camera roll?", a: "Only if you choose to. After an import it offers to remove the originals; iOS asks you to confirm, and they then sit in Recently Deleted for 30 days unless you empty it. Removing originals needs full Photos access." },
    ],
  },
];

export const getFeature = (slug: string) => features.find((f) => f.slug === slug);
