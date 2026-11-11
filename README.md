# privateroll.app

The website for PrivateRoll, the encrypted photo vault for iPhone. Built with Next.js. The look follows the app: white on black, capsule buttons and a glass pill nav (`app/globals.css`).

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # the blog's checks (Vitest)
npm run build    # what Vercel runs on deploy
```

## Where things live

| Path | What's there |
| --- | --- |
| `lib/site.ts` | Name, domain, support email, and the App Store and TestFlight links |
| `content/` | Features, comparisons, guides, scenarios, FAQ and release notes |
| `content/blog/` | Blog posts, one file each, listed in `content/blog/index.ts` |
| `seo/` | The daily post's instructions (`ROUTINE.md`), its topic backlog and its log |
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

## The blog and the daily post

A post is a file in `content/blog/<slug>.ts` exporting `post`, added to the list in
`content/blog/index.ts`. Its body is markdown in the subset `lib/markdown.tsx` renders. The blog
page, each post's page and cover image (`/blog/<slug>/cover.png`), the RSS feed
(`/blog/feed.xml`) and the sitemap are all built from that list. `npm test` fails if a post is
missing from it, links to a page that doesn't exist, is dated in the future, or has markdown the
parser can't render.

A scheduled Claude Code task (claude.ai/code/routines) publishes one post a day. Its prompt is
just "Follow seo/ROUTINE.md": that file says how it picks the topic from Search Console, how to
write and check the post, and how to publish it.

- `npm run seo:report` reads Search Console (free API) with a service account key in `GSC_KEY` and
  prints what to improve or write next. It reads only Google's data, so the site itself still runs
  no analytics.
- `npm run seo:ping <urls>` tells Bing and the other IndexNow engines about new pages. The key is
  the file in `public/` named after itself.
- `npm run seo:suggest "<phrase>"` shows Google's autocomplete for a phrase.
