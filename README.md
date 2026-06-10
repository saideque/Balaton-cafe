# Balaton Cafe — Website (Frontend)

A bilingual (PL/EN) marketing website for **Balaton Cafe**, a modern-minimal
lakeside café in Warsaw (by Jeziorko Balaton). Frontend only — runs with no
backend; content is local & typed, and the contact form posts to a single
swappable stub.

**Design direction — "Lakeside Editorial":** warm paper canvas, espresso ink,
lake-sage + terracotta accents, **Fraunces** display serif + **Hanken Grotesk**
body, editorial section numbering, paper grain, staggered scroll reveals, and a
live Warsaw-time "open now" indicator.

## Stack
- **Next.js 14** (App Router) · **TypeScript** (strict)
- **Tailwind CSS** (design tokens via CSS variables)
- **Framer Motion** (entrance + scroll reveals, reduced-motion aware)
- **next-intl** (PL default · EN, locale-prefixed routing + middleware)
- **next/font** (Fraunces + Hanken Grotesk, `latin-ext` for Polish)
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
  middleware.ts      locale routing (must live in src/ with the app)
  app/[locale]/      layout (fonts, SEO, JSON-LD), page, globals.css, not-found
  components/        Header, Hero, About, Menu, Gallery, Visit, Contact, Footer, …
  content/           site.ts · menu.ts · gallery.ts  (typed, bilingual data)
  lib/               contact.ts (submit stub) · hours.ts (open/closed logic)
public/images/       generated photography
```

## The backend seam
The frontend talks to the backend through two narrow boundaries, so the backend
(Sanity CMS + Resend email, etc. — see `docs/PROJECT-PLAN-full.md`) can be added
without touching the UI:

1. **Content** — everything renders from `src/content/*`. Swap these for CMS fetchers.
2. **Contact** — `submitContact()` / `subscribeNewsletter()` in `src/lib/contact.ts`
   are the only network calls. Swap their bodies for a real `/api` route.

## Notes
- The photographs in `public/images/` are **AI-generated representations** in the
  café's style (created with Higgsfield), not actual photos of the venue. Replace
  with real photography for production.
- Menu, hours, address and prices in `src/content/` are illustrative — confirm
  against the real café before launch.

See `docs/PROJECT-PLAN-full.md` (full FE+BE plan & stack) and
`docs/FRONTEND-PLAN.md` (this build's scope).
