# privateroll.app

The website for PrivateRoll, the encrypted photo vault for iPhone and iPad. Built with Next.js.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # what Vercel runs on deploy
```

## Where things live

| Path | What's there |
| --- | --- |
| `lib/site.ts` | Name, domain, support email, and the App Store and TestFlight links |
| `content/` | Features, comparisons, guides, scenarios, FAQ and release notes |
| `app/privacy`, `app/terms`, `app/support` | The pages App Store Connect links to |
| `next.config.ts` | Redirects for pages that were renamed or removed |

The app links to `/privacy` and `/support`, so keep those URLs stable.

## Download buttons

While `appStoreUrl` and `testFlightUrl` in `lib/site.ts` are both `null`, every download button
reads "Coming soon". Set `testFlightUrl` to a public TestFlight link to invite beta testers, then
`appStoreUrl` once the app is live.

## Keeping claims honest

Every feature page should describe what the shipping app does. When a roadmap item ships (iCloud
backup, sync, shared vaults), add its page to `content/features.ts` and remove its redirect from
`next.config.ts`.
