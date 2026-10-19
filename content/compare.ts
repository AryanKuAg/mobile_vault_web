// Comparison pages.
// IMPORTANT: Third-party apps change often. Before publishing, verify every
// competitor cell against the current App Store listing and set `reviewed`.

export type Cell = "yes" | "no" | "partial" | string;

export type Comparison = {
  slug: string;
  competitor: string;
  kind: "Built-in" | "App" | "App category";
  reviewed: string | null; // e.g. "2026-10" once checked
  summary: string;
  lede: string;
  rows: { label: string; us: Cell; them: Cell }[];
  chooseThem: string[];
  chooseUs: string[];
  body: string;
};

export const comparisons: Comparison[] = [
  {
    slug: "veilbox-vs-apple-hidden-album",
    competitor: "Apple Hidden Album",
    kind: "Built-in",
    reviewed: null,
    summary: "Apple's Hidden album is free and convenient, but it opens with your phone passcode and lives inside Photos.",
    lede: "The Hidden album is already on your iPhone, so why use anything else? It comes down to one question: who else knows your passcode?",
    rows: [
      { label: "Separate secret from your phone passcode", us: "yes", them: "no" },
      { label: "Files encrypted by the app itself", us: "yes", them: "partial" },
      { label: "Decoy or deniable vaults", us: "yes", them: "no" },
      { label: "Kept out of Photos search, Memories and widgets", us: "yes", them: "partial" },
      { label: "Built-in camera that skips the camera roll", us: "yes", them: "no" },
      { label: "Stores documents and any file type", us: "yes", them: "no" },
      { label: "Already installed", us: "no", them: "yes" },
      { label: "Price", us: "Free, optional Pro", them: "Free" },
    ],
    chooseThem: [
      "Nobody else knows your iPhone passcode.",
      "You only want to tuck a few photos out of the main grid.",
      "You'd rather not install another app.",
    ],
    chooseUs: [
      "A partner, child, or coworker knows your passcode or sees you type it.",
      "You need a vault that can't be opened by whoever has your phone unlocked.",
      "You want documents, videos, and notes in the same encrypted place.",
    ],
    body: `
## The passcode problem

The Hidden album is locked with Face ID or your device passcode. That's a reasonable default, but it means anyone who knows your passcode, or can watch you enter it, can open the album. For many people that's exactly the person they want to keep out.

Veilbox uses a separate pattern that has nothing to do with your phone's lock. Knowing the passcode gets someone onto your home screen, and that's all.

## Where your photos actually live

Hidden photos are still part of your Photos library. They sync through iCloud Photos to every device on the account, including a shared family iPad or Mac. Unless Advanced Data Protection is turned on, iCloud Photos uses Apple's standard data protection, which means Apple holds the encryption keys.

Veilbox files are encrypted on your device with a key only your pattern can produce, whether or not you use our [encrypted backup](/features/encrypted-backup).

## The honest take

If your main concern is a stranger scrolling past a photo, the Hidden album may be all you need. If your concern is someone who already has access to your phone, it isn't designed for that. Read more in [Hidden album vs. a photo vault](/guides/hidden-album-vs-photo-vault).
`,
  },
  {
    slug: "veilbox-vs-keepsafe",
    competitor: "Keepsafe",
    kind: "App",
    reviewed: null,
    summary: "Keepsafe is one of the best-known photo vaults. Here's how its account-based approach compares with a no-account design.",
    lede: "Keepsafe has been around for years and has a lot of users. The two apps take different routes: Keepsafe builds around an account and its own cloud, while Veilbox builds around a key only you hold.",
    rows: [
      { label: "Works without an account or email", us: "yes", them: "Check current listing" },
      { label: "Key derived from your secret (zero-knowledge)", us: "yes", them: "Check current listing" },
      { label: "Decoy vault", us: "yes", them: "Premium feature" },
      { label: "Panic erase", us: "yes", them: "Check current listing" },
      { label: "Encrypted cloud backup", us: "iCloud, end-to-end", them: "Own cloud service" },
      { label: "Ads in free tier", us: "no", them: "Check current listing" },
      { label: "Price", us: "Free, optional Pro", them: "Free, Premium subscription" },
    ],
    chooseThem: [
      "You want an account you can recover by email.",
      "You already have years of photos stored in their cloud.",
    ],
    chooseUs: [
      "You don't want an email address tied to your private photos.",
      "You want recovery to depend on a phrase you hold, not a support ticket.",
      "You want a vault that gives no sign of whether hidden vaults exist.",
    ],
    body: `
## Accounts vs. keys

An account-based vault can reset your access if you forget your PIN. That's convenient, and it also means the service has some route back into your vault. A zero-knowledge design like Veilbox can't do that. If you forget your pattern and lose your [recovery phrase](/features/recovery-phrase), nobody can help, but nobody else can get in either.

## Which trade-off is right for you?

Neither approach is wrong. If losing access is your biggest fear, an account with email recovery may suit you. If someone getting access is your biggest fear, a key only you hold is the stronger choice.

## Switching

Export your photos from your current vault to the Files app, import them into Veilbox, and then delete the exported copies. Our guide on [moving between vault apps](/guides/move-photos-between-vault-apps) walks through each step without leaving copies behind.
`,
  },
  {
    slug: "veilbox-vs-private-photo-vault",
    competitor: "Private Photo Vault",
    kind: "App",
    reviewed: null,
    summary: "A long-running vault app with decoy and break-in features. How does it compare on encryption and recovery?",
    lede: "Private Photo Vault popularised features like decoy passwords and break-in reports. Here's how it compares with Veilbox's encryption-first design.",
    rows: [
      { label: "Separate secret from your phone passcode", us: "yes", them: "yes" },
      { label: "Decoy vault", us: "yes", them: "yes" },
      { label: "Unlimited deniable vaults", us: "yes", them: "Check current listing" },
      { label: "Key derived from your secret (zero-knowledge)", us: "yes", them: "Check current listing" },
      { label: "Built-in camera", us: "yes", them: "yes" },
      { label: "Break-in photo of intruder", us: "no", them: "yes" },
      { label: "Price", us: "Free, optional Pro", them: "Free, Pro upgrade" },
    ],
    chooseThem: [
      "You want an intruder photo when someone enters the wrong PIN.",
      "You're used to a PIN pad and prefer not to switch.",
    ],
    chooseUs: [
      "You want any pattern to open a vault, so no attempt is ever visibly wrong.",
      "You want a published encryption design you can read.",
    ],
    body: `
## Why Veilbox doesn't take break-in photos

Break-in photos are a popular feature, and we decided against it on purpose. An intruder photo only works if the app knows an attempt was "wrong," and that same knowledge is what reveals a hidden vault exists. Veilbox's [deniable design](/features/deniable-vaults) never treats an attempt as wrong, so there's nothing to report.

## What to compare yourself

Open each app's settings and look for answers to three questions. What happens if you forget your PIN? Can support reset it? Does the app say how files are encrypted? Clear answers to all three are a good sign in any vault app.
`,
  },
  {
    slug: "veilbox-vs-calculator-vault-apps",
    competitor: "Calculator Vault Apps",
    kind: "App category",
    reviewed: null,
    summary: "Apps that pose as a calculator. The disguise is clever, but what's behind it matters more.",
    lede: "Calculator vaults open when you type a code into what looks like a working calculator. It's a fun trick. The question is how well the files behind it are protected.",
    rows: [
      { label: "Disguise as a utility", us: "Icon and name", them: "Working fake calculator" },
      { label: "Strong, documented encryption", us: "yes", them: "Varies widely" },
      { label: "No ads", us: "yes", them: "Often ad-supported" },
      { label: "No account required", us: "yes", them: "Varies" },
      { label: "Deniable vaults", us: "yes", them: "Rare" },
    ],
    chooseThem: ["The disguise matters more to you than how the files are encrypted."],
    chooseUs: [
      "You want encryption that holds up even if someone finds the app.",
      "You'd rather not have ads and trackers inside your private vault.",
    ],
    body: `
## The disguise isn't the lock

A calculator disguise stops a casual glance. It won't stop someone who searches your App Store purchases, checks Settings → General → iPhone Storage, or sees you use it. When the disguise fails, all that's left is the encryption, and in this category encryption ranges from solid to missing.

## How to check any calculator vault

- Does the listing say how files are encrypted, or only that they're "hidden"?
- Is there an ad SDK? Ads mean third-party code running inside your vault.
- What's the recovery process? Email resets mean the developer can get in.

We wrote a full guide on [spotting a weak calculator vault](/guides/spot-a-weak-calculator-vault). If you like the disguise idea, Veilbox offers [utility-style icons](/features/disguised-icons) with real encryption behind them.
`,
  },
  {
    slug: "veilbox-vs-google-photos-locked-folder",
    competitor: "Google Photos Locked Folder",
    kind: "Built-in",
    reviewed: null,
    summary: "Google's Locked Folder keeps photos out of the main grid, but it's tied to your device lock and your Google account.",
    lede: "If you use Google Photos, Locked Folder is the obvious first choice. Here's what it covers and what it doesn't.",
    rows: [
      { label: "Separate secret from your phone lock", us: "yes", them: "no" },
      { label: "Encrypted with a key only you hold", us: "yes", them: "no" },
      { label: "Decoy vaults", us: "yes", them: "no" },
      { label: "Optional cloud backup", us: "yes", them: "yes" },
      { label: "Stores documents and other files", us: "yes", them: "no" },
      { label: "Price", us: "Free, optional Pro", them: "Free" },
    ],
    chooseThem: ["Nobody else can unlock your phone, and you're already invested in Google Photos."],
    chooseUs: ["You want a secret that's different from your phone lock, and encryption Google can't open."],
    body: `
## Same weak spot as the Hidden album

Locked Folder opens with your device's screen lock. Anyone who knows your passcode, or can use your face while you're asleep, can open it. That's fine for keeping photos out of the shared grid, but it isn't a separate lock.

## Backup and keys

When backup for Locked Folder is turned on, the photos are stored in your Google account. Google's general privacy protections apply, but the keys aren't held by you alone. Veilbox backups are encrypted on your iPhone before upload, using a key derived from your pattern.
`,
  },
  {
    slug: "veilbox-vs-locked-notes",
    competitor: "Locked Notes",
    kind: "Built-in",
    reviewed: null,
    summary: "Apple Notes can lock a note with a password. It works for a few images, but not for a real library.",
    lede: "Locked notes in Apple Notes are end-to-end encrypted and free. They're a good tool for text, and an awkward one for hundreds of photos.",
    rows: [
      { label: "End-to-end encrypted", us: "yes", them: "yes" },
      { label: "Separate secret from your phone passcode", us: "yes", them: "Optional" },
      { label: "Designed for large photo and video libraries", us: "yes", them: "no" },
      { label: "Full-screen viewer and albums", us: "yes", them: "no" },
      { label: "Deniable vaults", us: "yes", them: "no" },
      { label: "Price", us: "Free, optional Pro", them: "Free" },
    ],
    chooseThem: ["You only need to lock a handful of images alongside some text."],
    chooseUs: ["You have more than a few dozen photos or any videos, and want a proper gallery."],
    body: `
## Good for text, clumsy for photos

Locked notes are a solid choice for codes, account details, and a couple of attached images. Past that, the cracks show: no albums, no smooth swiping, and large videos make notes slow. Notes can also use your device passcode as the lock, which brings back the [shared passcode problem](/compare/veilbox-vs-apple-hidden-album).

Read our full write-up: [Is a locked note safe enough?](/guides/is-a-locked-note-safe-enough).
`,
  },
];

export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
