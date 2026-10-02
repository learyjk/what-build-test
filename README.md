# What will you build next?

A Webflow Cloud app for a Webflow University activity. Participants pick a
project direction, submit their choice, and get a reveal — their artifact,
a short description, "what you could build," and a link to a relevant
Webflow Cloud resource — plus shared results that persist after a refresh.

This repository is the **working learner starting point** for the results
visualization activity.

## Stack

- [Astro](https://astro.build) (server output) + `@astrojs/cloudflare` adapter
- Webflow Cloud SQLite (Cloudflare D1) via a `wrangler.json` binding
- No client framework, no auth, no external APIs

## Project structure

- `src/config/choices.ts` — the four project directions and their build artifacts
- `src/config/activity-theme.ts` — the only two settings meant to be edited directly (accent color, reveal effect)
- `src/lib/db.ts` — query logic (aggregate totals, insert a response, tie-aware leader detection)
- `src/pages/api/results.ts` / `submit.ts` — the two server endpoints
- `src/pages/index.astro` — the whole UI, including the results-rendering flow
- `migrations/0001_init.sql` — schema + 24 seeded sample responses
- `learner-resources/results-styles.css` — copy-ready styles for the results visualization activity
- `learner-resources/agent-prompts.md` — copy-ready coding-agent prompt for the activity

## Local development

```bash
npm install
npm run dev
```

That's it. `npm run dev` automatically applies any pending local database
migration first (via a `predev` script), so the schema and the 24 seed
responses are ready the first time you run it — and running it again later
is safe; it won't reapply migrations or duplicate seed data.

Then open the local dev URL and try a submission — the count and leader
label should update, and refreshing the page should keep your choice.

(Optional: `npm run cf-typegen` generates Cloudflare environment types for
editor/type-checking convenience. It isn't required to run or build the app.)

## Deploying

This app is meant to be deployed through the Webflow Cloud dashboard as a
**standalone app** (no existing Webflow site required): import this repository,
choose the branch, name the app, and deploy. Webflow Cloud provisions the D1
database automatically from the `wrangler.json` binding and runs the migration
(including the seed data) on the first deploy.
