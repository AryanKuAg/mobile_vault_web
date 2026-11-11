import type { NextConfig } from "next";

// Pages that moved when the site was renamed from Veilbox to PrivateRoll, or that described
// features the app doesn't have yet. Keeps old links and search results working.
const competitors = [
  "apple-hidden-album",
  "keepsafe",
  "private-photo-vault",
  "calculator-vault-apps",
  "google-photos-locked-folder",
  "locked-notes",
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  redirects() {
    return [
      // One address for every page: www and the bare domain both answer, so send www to the bare one.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.privateroll.app" }],
        destination: "https://privateroll.app/:path*",
        permanent: true,
      },
      ...competitors.map((c) => ({
        source: `/compare/veilbox-vs-${c}`,
        destination: `/compare/privateroll-vs-${c}`,
        permanent: true,
      })),
      { source: "/features/deniable-vaults", destination: "/features/decoy-vaults", permanent: true },
      { source: "/features/hidden-vaults", destination: "/features/decoy-vaults", permanent: true },
      // On the roadmap; temporary so the pages can come back when the features ship.
      { source: "/features/panic-pattern", destination: "/whats-new", permanent: false },
      { source: "/features/duress-vault", destination: "/whats-new", permanent: false },
      { source: "/features/vault-camera", destination: "/whats-new", permanent: false },
      { source: "/features/share-sheet", destination: "/whats-new", permanent: false },
      { source: "/features/disguised-icons", destination: "/whats-new", permanent: false },
      { source: "/features/encrypted-backup", destination: "/whats-new", permanent: false },
      { source: "/features/device-sync", destination: "/whats-new", permanent: false },
      { source: "/features/private-sharing", destination: "/whats-new", permanent: false },
      { source: "/invite", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
