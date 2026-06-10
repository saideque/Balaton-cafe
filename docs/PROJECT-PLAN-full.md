# Balaton Cafe — Complete Project Plan (Frontend + Backend)

> Marketing website for **Balaton Cafe**, a modern-minimal lakeside café in Warsaw
> (ul. Jana Nowaka Jeziorańskiego, Gocław, by the Balaton pond).
> Style direction: **modern minimal** — clean whitespace, large food photography,
> elegant typography, calm "slow-living by the lake" mood.

---

## 1. Goals

- A polished, fast, portfolio-quality public website that drives foot traffic.
- Tell the lakeside story; showcase coffee, waffles, cakes & pastries.
- Make it trivial to find: hours, location/map, phone, socials.
- Easy lead capture (contact / event inquiries) and newsletter.
- Bilingual (PL primary / EN secondary) — relevant for a Warsaw venue.
- Architected so **online ordering / reservations** can be added later without a rewrite.

## 2. Information Architecture

Single-page scroll site with anchored sections + a few sub-routes.

| Section | Purpose |
|---|---|
| **Hero** | Lakeside exterior, tagline, primary CTAs (See menu / Find us) |
| **About / Story** | The Balaton-pond setting, the café's character |
| **Menu** | Coffee, waffles, cakes & pastries, cold drinks (category tabs) |
| **Gallery** | Grid of food + ambiance photography |
| **Visit / Location** | Address, embedded map, hours, phone |
| **Contact** | Inquiry form + newsletter signup |
| **Footer** | Socials (IG/FB), hours, copyright, language switch |

Sub-routes: `/menu` (full menu), `/gallery`, `/contact`, `/privacy`. `[locale]` segment for PL/EN.

## 3. Technical Stack

### Frontend
| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router) + React 18 + TypeScript** | SSG/ISR, image optimization, extensible to ordering |
| Styling | **Tailwind CSS** + CSS variables design tokens | Fast, consistent, themeable |
| Animation | **Framer Motion** | Scroll reveals, parallax hero, micro-interactions |
| Images | **next/image** (AVIF/WebP, responsive) | Performance with heavy photography |
| Fonts | **next/font** (e.g. Fraunces display + Inter body) | Editorial feel, zero layout shift |
| i18n | **next-intl** | PL/EN routing + message catalogs |
| Forms | **React Hook Form + Zod** | Validation, type-safe |
| Icons | **lucide-react** | Clean minimal icon set |

### Backend
| Concern | Choice | Why |
|---|---|---|
| Content (menu, gallery, hours) | **Sanity** (headless CMS) | Non-dev staff edit menu/prices/photos; GROQ queries |
| Contact form handler | **Next.js Route Handler** (`/api/contact`) | Serverless on Vercel |
| Transactional email | **Resend** (+ React Email templates) | Inquiry notifications + auto-reply |
| Newsletter | **Mailchimp / Resend Audiences** API | List management |
| Spam protection | **Cloudflare Turnstile** | Privacy-friendly captcha |
| Reservations (phase 2) | Sanity bookings + email, or **Calendly** embed | Defer until needed |
| Online ordering (phase 3) | Headless commerce (e.g. **Snipcart**) or POS integration | Defer; isolated module |
| Maps | **Google Maps Embed API** / Leaflet + OSM | Location section |
| Analytics | **Vercel Analytics** + **Plausible** | Privacy-first metrics |

### Platform / DevOps
- **Hosting:** Vercel (preview deploys per PR, ISR, edge image CDN).
- **CMS hosting:** Sanity managed.
- **Repo / CI:** GitHub + GitHub Actions (lint, typecheck, build) → Vercel deploy.
- **Quality:** ESLint, Prettier, TypeScript strict, Lighthouse CI budget.
- **Domain/DNS:** Cloudflare or registrar; HTTPS via Vercel.

## 4. Data Model (Sanity)

- `menuCategory` { title, order }
- `menuItem` { name, description, price, category→, image, tags[ vegan/new/seasonal ], available }
- `galleryImage` { image, alt, category }
- `siteSettings` { hours[], address, phone, socials[], mapEmbed }
- `page` (about copy, localized fields PL/EN)

## 5. Cross-Cutting

- **SEO:** Metadata API, OpenGraph/Twitter cards, JSON-LD `Restaurant`/`CafeOrCoffeeShop` schema (hours, geo, ratings), sitemap, robots.
- **Performance:** SSG + ISR; target Lighthouse ≥95; lazy media; preloaded hero.
- **Accessibility:** WCAG 2.1 AA — semantic landmarks, focus states, alt text, reduced-motion.
- **Privacy:** GDPR cookie/consent banner (PL law), privacy policy page.
- **Responsive:** mobile-first (most café discovery is mobile).

## 6. Phasing

1. **Phase 1 — Marketing site (this project).** Static/ISR frontend, all sections, contact form, i18n, SEO. *Content can start hard-coded, then move to Sanity.*
2. **Phase 2 — CMS + email.** Wire Sanity, Resend contact handler, Turnstile, newsletter.
3. **Phase 3 — Reservations / ordering.** Add as isolated modules.

## 7. Frontend / Backend Split

- **Frontend (implemented now, with Claude):** see `FRONTEND-PLAN.md`. Self-contained — local typed menu/content data, generated imagery, all sections/animations, form with a stubbed submit endpoint, i18n scaffolding, SEO. No external services required to run.
- **Backend (later / separate track):** Sanity schema + content migration, `/api/contact` with Resend + Turnstile, newsletter integration, reservations/ordering modules, analytics keys, production env/secrets.

The frontend is built against a thin **content interface** (typed data + a `submitContact()` function) so the backend can be slotted in by swapping the data source and the form action — no UI rewrite.
