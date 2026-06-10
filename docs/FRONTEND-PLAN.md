# Balaton Cafe — Frontend Implementation Plan (to build with Claude)

> Scope: **frontend only.** Self-contained marketing site that runs with no backend.
> All content is local & typed; the contact form calls a stubbed `submitContact()`.
> Backend (Sanity, Resend, ordering) is out of scope — see `PROJECT-PLAN-full.md`.

## Stack (frontend subset)
- Next.js 14 (App Router) + React 18 + **TypeScript (strict)**
- Tailwind CSS + design-token CSS variables
- Framer Motion (scroll reveals, hero parallax, hover micro-interactions)
- next/image, next/font (Fraunces display + Inter body)
- React Hook Form + Zod (contact form, client-side validation only)
- next-intl (PL/EN) — *scaffolded; copy can start PL-only*
- lucide-react icons

## Design language (modern minimal)
- **Palette:** warm off-white `#FAF7F2`, ink `#1C1A17`, muted sage/olive accent `#5E6B52`, soft terracotta highlight `#C77D52`.
- Generous whitespace, large photography, thin rules, restrained motion.
- Type scale with a serif display for headings, clean sans for body.
- Sticky slim header that condenses on scroll; smooth anchor scrolling.

## Assets (already generated, in `assets/images/`)
`hero-lakeside.png` · `waffle.png` · `latte-art.png` · `apple-cake.png` · `interior.png` · `lifestyle.png`

## Build steps
1. **Scaffold** Next.js 14 + TS + Tailwind; design tokens; fonts; base layout; move images into `public/images`.
2. **Content layer** — `src/content/` typed data: `menu.ts` (categories + items + prices), `gallery.ts`, `site.ts` (hours, address, phone, socials, map embed URL). Define `Menu`, `MenuItem`, `SiteSettings` types — the seam the backend later replaces.
3. **Header / nav** — logo wordmark, anchor links, language switch, mobile drawer; scroll-condense behavior.
4. **Hero** — full-bleed lakeside image, headline + tagline, CTAs (See menu / Find us), subtle parallax + scroll cue.
5. **About / Story** — two-column text + interior image, fade-in on scroll.
6. **Menu** — category tabs (Coffee / Waffles / Cakes & Pastries / Cold drinks), item rows with price, food images, tags (new/seasonal).
7. **Gallery** — responsive masonry/grid with hover zoom + lightbox.
8. **Visit / Location** — address, hours table (with open/closed indicator from local time), phone tap-to-call, embedded map.
9. **Contact** — RHF + Zod form (name/email/message), success/error UI, calls `submitContact()` stub (resolves + logs; ready to swap for `/api/contact`). Newsletter input (stub).
10. **Footer** — socials, hours, copyright, back-to-top.
11. **SEO & polish** — Metadata API, OpenGraph, JSON-LD `CafeOrCoffeeShop`, favicon, sitemap/robots, reduced-motion support, responsive QA, Lighthouse pass.

## Definition of done
- `npm run build` clean; TypeScript strict, no errors; ESLint/Prettier clean.
- Runs fully offline (no backend/API keys); contact form shows success via stub.
- Responsive 320px→desktop; Lighthouse ≥95 perf/SEO/best-practices/a11y.
- All 6 generated images integrated; no placeholder/lorem in shipped copy.

## Backend seam (so backend drops in later)
- All page content imported from `src/content/*` (swap for Sanity fetchers).
- `submitContact(data)` in `src/lib/contact.ts` is the single network boundary (swap stub for real route handler).
