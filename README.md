# Balaton Cafe — Website (Frontend)

A bilingual (PL/EN) marketing website for **Balaton Cafe**, a lakeside café in
Warsaw (by Jeziorko Balaton). Frontend only — runs with no backend; content is
local & typed, and the contact form posts to a single swappable stub.

**Design direction — Starbucks-inspired:** cream canvas with alternating deep
forest-green sections, gold accents, **Plus Jakarta Sans** display +
**Hanken Grotesk** body, pill CTAs, a split-tile hero with a real photo of the
café, a circular category menu grid (the full real menu with real prices), and
a live Warsaw-time "open now" indicator.

## Stack
- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** (design tokens via CSS variables)
- **Framer Motion 12** (entrance + scroll reveals, reduced-motion aware)
- **next-intl 4** (PL default · EN, locale-prefixed routing via `src/proxy.ts`)
- **next/font** (Plus Jakarta Sans + Hanken Grotesk, `latin-ext` for Polish)
- **lucide-react** icons

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /pl
npm run build    # production build (prerenders /pl and /en)
npm run start    # serve the production build
```
`/` redirects to the visitor's language (`Accept-Language`), defaulting to `/pl`.

## Structure
```
i18n/                routing, navigation, request config (next-intl)
messages/            pl.json · en.json  (UI copy)
src/
  proxy.ts           locale routing (Next 16 renamed "middleware" to "proxy")
  app/[locale]/      layout (fonts, SEO, JSON-LD), page, globals.css, not-found
  app/icon.svg       favicon
  components/        Header, Hero, About, Menu, Gallery, Visit, Footer, …
  content/           site.ts · menu.ts · gallery.ts · photos.ts  (typed data)
  lib/               hours.ts (open/closed logic)
```

## The backend seam
The frontend renders everything from `src/content/*` — swap those modules for
CMS fetchers (see `docs/PROJECT-PLAN-full.md`) and the UI stays unchanged.
There are no client-side network calls; the former contact form was removed.

## Notes
- The hero/gallery lake photo and all menu category photos are **real assets**
  in `public/photos/` (registry: `src/content/photos.ts`). A few gallery/about
  mood shots are still Unsplash stock — swap before production.
- The menu in `src/content/menu.ts` is the **real café menu** transcribed from
  the in-café menu board (April 2024) with real prices in PLN — re-verify
  prices before launch.

See `docs/PROJECT-PLAN-full.md` (full FE+BE plan & stack) and
`docs/FRONTEND-PLAN.md` (this build's scope).
