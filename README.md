# GetMyDegree Institutions

Marketing site for GetMyDegree Institutions — React 19 + TypeScript + Vite 8, styled with
Tailwind v4, prerendered to static HTML for SEO.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck, build, then **prerender every route to static HTML** |
| `npm run build:spa` | Client-only build (no prerender) |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | Oxlint |

## Structure

```
src/
  data/site.ts      all site copy — edit text here, not in the pages
  data/meta.ts      per-route <title>/description/canonical
  data/schema.ts    JSON-LD, one export per route
  components/       Layout, Navbar, Footer, Seo, Reveal, Marquee, SectionHeading
  pages/            Home, About, Courses, Contact, NotFound
  entry-server.tsx  SSR entry used only by the prerender step
prerender.mjs       renders each route to dist/<route>.html + dist/<route>/index.html
```

## Design system

Soft card system (bento-style): neutral `--color-wash` page, white cards, 20–32px radii, quiet
shadows. Tokens live in `src/index.css`:

- `navy` `#013a94` (plus `navy-50…950`) — primary buttons, active nav, dark panels, footer
- `gold` `#fbcd41` — the single highlight: badge dots, dark-panel CTAs, footer accents
- Type: **Outfit** for headings, **Work Sans** for body
- Reusable classes: `.panel`, `.card` / `.card-hover`, `.badge`, `.btn-primary` / `.btn-gold` /
  `.btn-ghost`, `.chip`, `.dot`, `.action` (44px touch target)

### Responsive scale

Content spans the full viewport up to a **1440px** container (`.shell`), with 2–2.5rem gutters on
large screens; beyond 1440px it centres rather than stretching line lengths indefinitely.

Type and section spacing are **fluid** (`clamp()` in `src/index.css`: `.t-hero`, `.t-h1`,
`.t-h2`, `.t-h3`, `.t-stat`, `.section-y`, `.card-p`), so every width from 320px to 1920px lands
on a sensible size rather than jumping at breakpoints. Body copy is 16px on mobile and 14px from
`md` up. Verified clean at 320 / 375 / 414 / 768 / 1024 / 1440 / 1920.

## Images

All photography is registered in **`src/data/images.ts`** and rendered through `<Photo name="…" />`.
Slots: `hero-1`, `hero-2`, `about-1`, `about-2`, `about-3`, `courses-1`, `courses-2`, `contact-1`.

`hero-1` is set into the hero panel itself: it bleeds to the panel edges, its top edge is
feathered into the surface with a gradient mask, and the three summary cards straddle it — so the
photograph reads as part of the section rather than a banner stacked below it.

Each slot currently points at a labelled placeholder in `public/images/`, drawn at that slot's own
aspect ratio, stating the intended subject and the recommended dimensions. **To use a real photo:** drop the file into
`public/images/` and change that slot's `src` — e.g. `src: '/images/hero-1.jpg'`. Nothing else
changes; cropping, aspect ratio and lazy-loading are handled by the layout.

## SEO

- Every route is prerendered: real `<h1>`, body copy, per-page title/description/canonical,
  Open Graph, Twitter card and JSON-LD in the static `<head>` — no JS execution needed.
- `public/robots.txt` and `public/sitemap.xml` list the four public routes.
- Scroll-reveal animation is gated on a `.js` class, so content stays visible without JS.

**Before going live**, update `site.url` in `src/data/site.ts` and the domain in
`public/robots.txt` / `public/sitemap.xml` if the site is not served from `getmydegree.in`.

## Brand assets

`public/logo.svg` (dark-on-light), `public/logo-light.svg` (footer/dark backgrounds) and
`public/favicon.svg` are **placeholders**. Replace the files at those paths with the real
artwork — no code changes needed.

## Contact form

`src/pages/Contact.tsx` validates client-side and shows the success state, but the submit
handler is a stub (see the `TODO`). Wire it to Formspree, Web3Forms or your own endpoint.

## Deploy

Static host, publish directory `dist/`. `public/_redirects` (Netlify) and `vercel.json`
are included; for nginx, `try_files $uri $uri/index.html /index.html;`.
