// Release notes, newest first. Add an entry for each version you ship.
export type Release = { version: string; date: string; title: string; notes: string[] };

// Held back from version 1 to keep it small. When one ships, add its feature page back
// (content/features.ts) and remove its redirect from next.config.ts.
export const roadmap = [
  "A duress vault: a pattern that erases every other vault",
  "Add to PrivateRoll from any app's share sheet",
  "A camera that saves straight into the vault",
  "Removing originals from Photos after an import",
  "Folders, filters and encrypted notes",
  "Disguise icons: Calculator, Level, Printer and more",
  "iPad, landscape and a light appearance",
  "Encrypted iCloud backup and restore, and sync between your own devices",
];

export const releases: Release[] = [
  {
    version: "1.0",
    date: "2026-11-11",
    title: "First release",
    notes: [
      "Pattern-key encryption with AES-256-GCM, tied to your iPhone",
      "A vault for each pattern, never listed",
      "A recovery phrase for every vault, in case you forget the pattern",
      "Imports from Photos and Files, search, sort, and streaming video",
      "A lockout that grows after repeated wrong patterns",
    ],
  },
];
