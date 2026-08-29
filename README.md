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

Photography slots use `<Photo>`; until real images exist it renders a soft placeholder naming the
shot that belongs there. Pass `src` to swap in a real file.

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
