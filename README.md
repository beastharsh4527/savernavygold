# Saver Health Care — Redesign (Next.js 16)

Full redesign of https://saverhealthcare.com/ — all original content preserved verbatim,
expanded from a single page into 17 routes with GSAP/Lenis/Motion animations and an
interactive 3D globe (R3F).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production / deploy (Vercel)

```bash
npm run build && npm start   # verify locally
```

Import the folder (or its Git repo) into Vercel — framework auto-detects as Next.js, no special settings.
Environment variables (all optional, see `.env.example`):

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_DEMO` | `true` (default) = demo is **noindex** so it never competes with the live client site. Set `false` only on the real production domain. |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | When set, contact/apply/newsletter submissions are emailed via Resend. When empty, **demo mode**: payload is logged server-side (visible in Vercel → Functions logs) and the user still sees success. |

## Where things live

| Path | What |
|---|---|
| `src/content/*.ts` | ALL site copy, numbers, phones, offices — verbatim from the original site. Edit content here only. |
| `src/components/sections/` | Home sections (hero, services pinned scroll, bento specialties, markets panels, process timeline, team, testimonials, apply, contact) |
| `src/components/experience/` | Preloader, custom cursor, scroll progress, magnetic buttons |
| `src/components/globe/` | R3F globe (lazy, ssr:false; static SVG fallback on mobile/reduced-motion). `npm run globe:points` regenerates land dots. |
| `src/app/` | Routes: `/`, about, services(+7 slugs), solutions, specialties, markets(+3 slugs), process, team, contact, apply, 404, sitemap, robots, `/api/contact` |
| `NOTES.md` | Content-fidelity log — data inconsistencies kept verbatim; review with the client |

## Checks already run

- `next build` — 25 pages, zero errors; `eslint .` clean
- Every route 200; zero console/page errors in headless Chrome
- No horizontal overflow at 375 / 768 / 1440
- Clocks are IANA-zone based (DST-safe); forms validated with zod, honeypot + rate limit

Note: photos are hotlinked from Unsplash and the logo from saverhealthcare.com — they need
internet to display (they will on Vercel/local). For production, download them into `/public`
and update the URLs in `src/content/`.
