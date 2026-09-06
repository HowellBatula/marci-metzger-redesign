# Marci Metzger Homes — Full-Stack Documentation

Rebuilt on Next.js, styled to an Awwwards-grade monochrome system modeled on
[360lexingtonave.com](https://360lexingtonave.com). This document is the
single reference for what's installed, why, how the project is laid out,
and exactly what's left to wire up.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Turbopack)
npm run start    # serve the production build
npx eslint .     # lint
```

Requires Node.js 20.9+ (Next.js 16 minimum).

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | React components + built-in image optimization, font self-hosting, and serverless-ready API routes in one project. |
| Language | TypeScript | Type-checked components and API routes. |
| Styling | **Tailwind CSS v4** (CSS-first config — see `src/app/globals.css`'s `@theme` block, no `tailwind.config.ts`) | Design tokens (colors, fonts) defined once, used as both CSS custom properties and Tailwind utility classes. |
| Hosting target | **Vercel serverless** | Zero-config Next.js deploys; API routes become serverless functions automatically. |

> **Next.js 16 note:** this version shipped genuine breaking changes from
> older docs/training data (Turbopack by default, fully-async `params`/
> `searchParams`, `middleware` renamed to `proxy`, stricter `next/image`
> defaults, etc.). If you or an AI agent touch this project later, read
> `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
> before assuming older Next.js patterns still apply.

## Installed packages

| Package | Role |
|---|---|
| `next`, `react`, `react-dom` | Core framework. |
| `gsap` | `ScrollTrigger`-driven scroll reveals (see `src/lib/gsap.ts`, `src/components/ui/Reveal.tsx`). All GSAP plugins, including `SplitText`, are free since the Webflow acquisition — no club license needed if you add more later. |
| `lenis` | Smooth inertial scroll (successor to `@studio-freight/lenis`), matching the reference site's scroll feel. See `src/lib/lenis-provider.tsx`. |
| `motion` | (formerly `framer-motion` — same API, new package name) micro-interactions: the hero's floating "Search Listings" card hover. |
| `lucide-react` | Icon set (menu, close, arrows) — replaces hand-written inline SVGs from the old static site. |
| `clsx`, `tailwind-merge` | `cn()` className helper (`src/lib/cn.ts`). |
| `react-hook-form` | Form state for the search filters and contact form. |
| `zod`, `@hookform/resolvers` | Schema validation for the contact form (email required/valid). |
| `sharp` | Required by `next/image` for production builds off Vercel (Vercel provides it natively, but it's pinned here so `next build` behaves the same locally). |
| `prettier`, `prettier-plugin-tailwindcss` (dev) | Formatting + automatic Tailwind class sorting. |

### Deliberately not installed yet

| Package | For | Why deferred |
|---|---|---|
| `resend` (or `nodemailer`) | Sending contact-form emails | Project decision: ship the UI first, wire up email delivery later. See "Contact form" below for the exact swap-in point. |
| An IDX/RESO SDK (vendor-specific — e.g. IDX Broker, Spark API, Bridge Interactive) | Real MLS listings | Requires you to first obtain a paid vendor account; the search UI is already built against a local dataset with the same shape a real feed would return. |

## Project structure

```
src/
  app/
    layout.tsx        Instrument Sans font, global nav/cookie banner, JSON-LD
    page.tsx           Composes every section in order
    globals.css         Design tokens (@theme), typography scale, reveal/pill/field utility classes
    api/
      listings/route.ts   GET — filters data/listings.json (real, working filter logic)
      contact/route.ts    POST — scaffolded but NOT called from the UI yet
  components/
    nav/           SiteNav (floating pill nav), MobileMenu (full-screen overlay)
    hero/          Hero, HeroExploreCard (floating CTA card)
    sections/      One file per page section (About, TrackRecord/"Get It Sold", Search, Affiliations, Gallery, Services, Contact)
    ui/            Shared primitives: Button, SplitPanel, Reveal, CookieBanner, PageCover, Logo
    footer/        SiteFooter
  lib/
    listings.ts         filterListings() — the MLS swap point (see below)
    gsap.ts             One-time ScrollTrigger registration
    lenis-provider.tsx  Smooth-scroll provider (respects prefers-reduced-motion)
    use-anchor-scroll.ts  Routes in-page hash links through Lenis
    nav-links.ts, social-links.ts, cn.ts
  data/
    listings.json    Placeholder "MLS-ready" dataset
public/
  img/               All 21 photos migrated from the original static site
```

## Design system

Defined once in `src/app/globals.css` under `:root` and `@theme inline`,
then consumed as Tailwind utilities (`bg-dark`, `text-on-dark-muted`,
`bg-accent`, etc.) throughout every component.

- **Typeface:** Instrument Sans only (`next/font/google`), self-hosted, no
  external request at runtime. Matches the reference site's single-family
  system: regular weight even at hero size, tight negative tracking
  (`-0.03em`) doing the "premium" work instead of bold weights.
- **Palette:** near-black `#111213` / white, one brass `--accent` color
  kept for CTA affordance (the reference site has zero accent color, but a
  realtor site needs a clickable-looking action color — see the approved
  project plan for this reasoning).
- **Motifs reused from the reference:** floating pill nav, full-screen
  overlay menu, alternating light/dark full-bleed split panels with giant
  outline ("ghost") numerals (`.ghost-numeral` class), two-up image grid
  with a hover-reveal arrow button.

## The MLS search — how it works today, and how to go live

`src/app/api/listings/route.ts` calls `filterListings()` in
`src/lib/listings.ts`, which filters/sorts `src/data/listings.json`
server-side and returns real, working results — `SearchSection.tsx`
genuinely fetches and renders them, it's not a dead stub.

**To swap in a real feed:** replace the body of `filterListings()` (or the
route handler directly) with a call to your IDX/RESO vendor's API, keeping
the same input shape (`ListingFilters`) and output shape (`Listing[]`).
Nothing in `SearchSection.tsx` needs to change.

## The contact form — UI only, not wired up

Per project decision, the contact form is fully built (validated with
zod + react-hook-form, styled, accessible) but **does not make a network
request**. Submitting it shows the same "not wired to an inbox yet"
message the original static site showed — see `onSubmit` in
`src/components/sections/ContactSection.tsx`.

A matching `POST /api/contact` route already exists at
`src/app/api/contact/route.ts` and currently just logs the payload and
returns a message — it is not called from the UI yet.

**To go live:**

1. `npm install resend`
2. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to `.env.local` (see
   `.env.example`).
3. In `src/app/api/contact/route.ts`, replace the `console.log` with a
   Resend send call.
4. In `ContactSection.tsx`'s `onSubmit`, replace the local `setNote(...)`
   with a `fetch("/api/contact", { method: "POST", body: ... })` call and
   surface the response.

## Verification performed

- `npx tsc --noEmit` — no type errors.
- `npx eslint .` — no errors or warnings.
- `npm run build` — production build succeeds (Turbopack), `/` prerenders
  static, `/api/listings` and `/api/contact` are server-rendered on demand.
- Manual headless-browser pass (desktop + mobile viewports, full scroll):
  no console errors, no failed network requests, GSAP reveals fire
  correctly, the search form round-trips through `/api/listings` and
  renders real result cards, the mobile/full-screen menu opens and closes.

## Deployment (not done yet — do this when ready)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Add any env vars from `.env.example` once the contact form / MLS feed
   are wired up (not required for the current UI-only build).
