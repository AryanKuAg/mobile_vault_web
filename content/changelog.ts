// Release notes. Replace these placeholder entries with your real history.
export type Release = { version: string; date: string; title: string; notes: string[] };

export const roadmap = [
  "Mac app with the same pattern unlock",
  "Encrypted albums shared with a partner",
  "Independent security audit, with results published in full",
];

export const releases: Release[] = [
  {
    version: "2.4",
    date: "2026-10-08",
    title: "Folders, faster imports and a new viewer",
    notes: [
      "Nest albums inside folders and drag to reorder",
      "Imports keep running when you switch apps",
      "Rebuilt full-screen viewer with smoother video scrubbing",
    ],
  },
  {
    version: "2.3",
    date: "2026-08-21",
    title: "Panic Pattern",
    notes: [
      "Set a pattern that opens a decoy and can erase chosen vaults",
      "Clearer warnings before any destructive action",
    ],
  },
  {
    version: "2.2",
    date: "2026-07-02",
    title: "Private Sharing links",
    notes: ["Share files through encrypted, expiring links", "Revoke a shared link at any time"],
  },
  {
    version: "2.1",
    date: "2026-05-15",
    title: "Device Sync",
    notes: ["Sync vaults between iPhone and iPad", "Remove lost devices remotely"],
  },
  {
    version: "2.0",
    date: "2026-03-30",
    title: "Encrypted Backup for everyone",
    notes: ["Free users can now back up their main vault", "Resumable restores on new devices"],
  },
  {
    version: "1.0",
    date: "2025-11-12",
    title: "Veilbox launches",
    notes: ["Pattern key encryption", "Deniable vaults", "Vault Camera"],
  },
];
