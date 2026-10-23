// Release notes, newest first. Add an entry for each version you ship.
export type Release = { version: string; date: string; title: string; notes: string[] };

export const roadmap = [
  "Encrypted iCloud backup and restore, without giving up the device-bound key",
  "Sync between your own iPhone and iPad",
  "Shared vaults, opened with a recovery phrase",
  "A Home Screen tile with a name you choose, to go with the disguise icons",
];

export const releases: Release[] = [
  {
    version: "1.0",
    date: "2026-10-23",
    title: "First beta",
    notes: [
      "Pattern-key encryption with AES-256-GCM, tied to your device",
      "Decoy vaults and a duress vault",
      "Vault Camera, imports from Photos and Files, and Add to PrivateRoll in the share sheet",
      "Folders, encrypted notes, search and streaming video",
      "Seven disguise icons",
    ],
  },
];
