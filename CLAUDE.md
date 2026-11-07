# CLAUDE.md: yogaveta-website

Read this first in any thread that touches this repo, then `docs/brand.md` and `docs/plan.md`.

## What this is

The website for **Yogaveta** (yogaveta.com): yoga with **Olivia Reardon** in Little Aston,
Shenstone and on retreat. Weekly classes, the **yogaveta +** series (yoga plus a local maker,
one Sunday a month), workshops, private sessions, retreats and a small shop.

It is Olivia's business, not one of Dan's clinics. Dan builds it; **Olivia owns the brand and
signs off every design and every line of copy.** None of the clinical rules from drdanreardon
or Go Metabolic apply here, and nothing on this site mentions Dan's practices.

yogaveta.com is still on **Squarespace**. This repo is the replacement, deployed to a
workers.dev staging address only (no routes in `wrangler.toml`) until launch.

## Stack (same model as gometabolic-website)

- Eleventy 3 (`src/` in, `_site/` out, `_includes/` and `_data/` one level up, Nunjucks).
- Cloudflare **Worker with static assets**. `wrangler.toml`. No `_worker.js` yet: it arrives
  in phase 2 with the admin, bookings (Stripe) and the newsletter sign-up.
- Deploys: GitHub Actions (`.github/workflows/deploy.yml`) on push to main. Needs the repo
  secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- URL shape: no trailing slash, `html_handling = "drop-trailing-slash"`, matched by the
  `canonicalPath` filter. `_headers` and `_redirects` do NOT work here (Pages features).
- Content is data-driven so the phase 2 admin can write it: `_data/season.json` (upcoming),
  `_data/series.json` (yogaveta + editions), `_data/shop.json`, `_data/site.json`
  (details, `staging` flag).
- `site.staging: true` adds `noindex` to every page and the "Staging preview" badge.
  `src/robots.txt` disallows everything. Flip both at launch, not before.
- Styles: tokens at the top of `src/site.css`. Fonts load from Google Fonts for now;
  self-host them (as Go Metabolic does) before launch so a strict CSP is possible.

## Build and check

```
npm install            # first time only
npm run build          # -> _site/
npm start              # local preview with live reload
npm run deploy         # build + wrangler deploy to the workers.dev staging address
```

In Cowork sessions, build in a scratch copy with node_modules symlinked, and screenshot
desktop (1440) and phone (390) before proposing a change.

## Working rules

- Read-only status check first. No edits, builds or commits until Dan says go.
- One branch per change. Claude commits locally; **Dan pushes, opens the PR and merges**.
- Never delete files on Dan's machine.
- Author: `danreardon <drdanreardon@gmail.com>`.

## Copy rules

- **No em dashes anywhere** in site copy, including meta, alt text, llms.txt and footer.
  Rewrite the sentence; never swap in a hyphen. En dashes in numeric ranges are fine.
- Olivia's voice. Lines that carry the brand ("why this pairing", About, the newsletter
  note) are hers, not written for her. Draft only when asked, and mark drafts as drafts.
- Square brackets mean a fact only Olivia can supply. Never fill one with a guess:
  no invented prices, dates, partner names, testimonials or cancellation terms.
- Testimonials word for word, as published by the person, initials or first name only.
- Partner names and logos only with that partner's permission.
- British English.

## Status (Nov 2026)

- Built: homepage v2 ("E" row on the brand concepts canvas), 404, staging setup.
- Not built: event pages, yogaveta + edition pages, basket, shop, About, location pages,
  admin, bookings, newsletter storage, sitemap, llms.txt, schema beyond the basics.
- Open decisions are listed in `docs/plan.md`.
