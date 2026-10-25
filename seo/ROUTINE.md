# The daily post

This is what the scheduled Claude Code task does each morning. Its saved prompt is only "Follow seo/ROUTINE.md", so changing these steps changes what tomorrow's run does.

Each run publishes **one new post** on privateroll.app, plus at most one improvement to a page that already ranks, picked from what Google Search Console shows people searching for. Do the steps in order. Don't skip a check, and stop rather than publish anything that fails one.

## Rules that always hold

- **One new post a run.** `published` is today's date in UTC (`date -u +%F`), never backdated. The tests allow one post per date.
- **Every fact has a source.** Every number, iOS step or claim about another app comes from a source you opened during this run, and the post names or links it where the claim is made. Apple's own support pages come first for anything about iPhone. If you can't source something, leave it out.
- **Only what ships.** Describe only what the app does today, as `content/features.ts` describes it. The roadmap in `content/changelog.ts` (iCloud backup, sync, shared vaults, a recovery phrase) isn't shipped: never present it as available.
- **The app isn't on the App Store yet.** Don't write "download it now". The page's own call to action handles that.
- **No invented experience.** No "I tested", and no made-up stories, quotes or users.
- **Comparisons stay honest.** Say that we make PrivateRoll, say what the other app does well, and claim nothing about it that its current listing or site doesn't support.
- **Careful with safety topics.** Abuse, stalking and controlling partners need the tone of `content/scenarios.ts`: practical and calm. Point to official help, and never suggest a step that could make someone's situation more dangerous if it were noticed.
- **No tracking.** Don't add analytics, pixels or anything that tracks visitors: the privacy page promises there's none.
- **Answer first.** The first two sentences answer the search; the rest goes deeper.
- **DRY RUN.** If the run's text (the routine-fire-payload block) says DRY RUN, do everything, but in step 7 push to a `claude/` branch and open a pull request instead of pushing to `main`.

## 1. Set up

```sh
npm ci
```

## 2. Read the data

```sh
npm run seo:report
```

It prints numbered buckets, and `seo/report.json` has the full rows. If it says there's no `GSC_KEY`, or every bucket is empty (normal in the first weeks), go to rule 3 in step 3.

Read `seo/log.md` too: it says what earlier runs did. Don't repeat a topic, and don't refresh the same page twice within 14 days.

## 3. Pick today's work

Work down this list. Every run makes one new post (rule 2 or 3), and may also do one refresh (rule 1).

1. **A page ranks, but not at the top** (bucket 1: position 5–20 with 20+ impressions). Improve that page instead of writing a near-copy of it, because a second page for the same search competes with the first.
   - Add a section that answers the query: a `##` heading worded like the search, 120–250 words.
   - If the same query is in bucket 1b, rewrite the title (60 characters at most) and the description (70–170) in the searcher's words.
   - For a blog post, set `updated` to today. For a guide or scenario, set its `updated`.
   - One refresh per run.
2. **A search no page answers** (bucket 2). Write a new post on exactly that question.
   - Skip searches for another company's own name or product (Search Console has shown "cheapotrav airport distance calculator", for example). No post of ours is what they're looking for.
   - First check it really is new: grep the titles and `##` headings in `content/blog/*.ts`, `content/guides.ts`, `content/scenarios.ts`, `content/compare.ts` and `content/features.ts`. If a page already answers it, use rule 1 on that page instead.
   - Link the new post from the page that ranks for the topic, and link back to it.
3. **The backlog.** If rules 1 and 2 gave no new post, take the first unticked item in `seo/backlog.md`.
   - Check its wording with `npm run seo:suggest "<phrase>"` and title the post the way people type it.
   - Tick the item (`[x]`) in the same commit.

## 4. Research

Use WebSearch and WebFetch, preferring primary sources: Apple Support and Apple's platform security guide, other companies' own help pages, standards bodies, and published research. Keep each source's URL, and link it in the text where its claim is made.

## 5. Write the post

Copy the shape of `content/blog/how-to-hide-apps-on-iphone.ts` exactly.

- **File:** `content/blog/<slug>.ts`, exporting `post: BlogPost`.
- **slug:** lowercase words joined by hyphens, close to the main search, six words at most.
- **title and description:** a title of 60 characters at most, unlike any other title on the site (guides and scenarios included), and a description of 70–170 characters.
- **category:** one of `How-to`, `Explainer`, `Security` or `Comparison`.
- **author:**
  - `aryan-kumar` for How-to and Comparison posts.
  - `surya-narayanan` for Explainer and Security posts.
- **related:** 2–3 site paths, such as `/guides/…`, `/features/…`, `/scenarios/…` or `/blog/…`.
- **body:** markdown in a template literal, using only what `lib/markdown.tsx` renders:
  - `##` and `###` headings, paragraphs, `- ` and `1. ` lists, `>` callouts, `|` tables
  - **bold**, *italic*, and `[links](/path)` (or `https://`)
  - No images, code blocks, `####` headings, nested lists or stray asterisks.
  - No backticks or `${` anywhere in the body, since it's a template literal.
- **Length:** 900–1,600 words. Link at least two other pages on the site in the text.
- **Mentioning PrivateRoll:** at most one short section, and only where the app really fits the problem. Link its feature pages, and describe nothing it doesn't do.
- **faq:** 3–5 questions people really ask (`npm run seo:suggest` shows them), each answered in 1–3 sentences.

Then:

- Register the post in `content/blog/index.ts`: add the import, and add the post to the `posts` list.
- Add a sentence that links to it from one related guide, scenario or post, so it isn't an orphan.

## 6. Check

```sh
npm run lint && npx tsc --noEmit && npm test && npm run build
```

Fix whatever fails. If something still fails after two tries, stop:

1. Push the work to `claude/blog-<date>`.
2. Open a pull request titled "Daily post failed its checks: <title>" with the error in its description.
3. End the run.

A broken post must never reach `main`, because Vercel deploys every push to it.

## 7. Publish

Add a line for each change to `seo/log.md`, under the date:

```
- 2026-10-25 | new | /blog/<slug> | "<query>" (<impressions> impressions, position <n>) or backlog | <one line on why>
- 2026-10-25 | refresh | /guides/<slug> | "<query>" | <what changed>
```

Then commit and push:

```sh
git add -A
git commit -m "blog: <title>" -m "<why: the query and its numbers, or the backlog item>"
git push origin HEAD:main
```

On a DRY RUN, push to `claude/blog-<date>` and open a pull request instead.

## 8. After the deploy

A push to `main` deploys on Vercel in a minute or two.

1. Check `https://privateroll.app/blog/<slug>` every 60 seconds until it returns 200, for up to 20 minutes.
2. Tell Bing and the other IndexNow engines: `npm run seo:ping <new URL> <refreshed URL>`.

Google needs no ping: it reads the sitemap, whose lastmod moved. If the page never goes live, say so in the report.

## 9. Report

End with a few lines:

- what went out, and why (the query, its impressions and position, or the backlog item)
- what the checks said
- the live URL
- what IndexNow answered

On Mondays, add the report's 28-day clicks and impressions next to the 28 days before.
