# GetMyDegree Institutions

Marketing site for GetMyDegree Institutions   React 19 + TypeScript + Vite 8, styled with
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
  data/site.ts      all site copy   edit text here, not in the pages
  data/meta.ts      per-route <title>/description/canonical
  data/schema.ts    JSON-LD, one export per route
  components/       Layout, Navbar, Footer, Seo, Reveal, Marquee, SectionHeading
  data/posts.ts     blog articles   typed content blocks, no markdown parser
  pages/            Home, About, Courses, Blog, BlogPost, Contact, NotFound
  entry-server.tsx  SSR entry used only by the prerender step
prerender.mjs       renders each route to dist/<route>.html + dist/<route>/index.html,
                    plus dist/404.html and a generated dist/sitemap.xml
```

## Design system

Soft card system (bento-style): neutral `--color-wash` page, white cards, 20–32px radii, quiet
shadows. Tokens live in `src/index.css`:

- `navy` `#013a94` (plus `navy-50…950`)   primary buttons, active nav, dark panels, footer
- `gold` `#fbcd41`   the single highlight: badge dots, dark-panel CTAs, footer accents
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
feathered into the surface with a gradient mask, and the three summary cards straddle it   so the
photograph reads as part of the section rather than a banner stacked below it.

Each slot currently points at a labelled placeholder in `public/images/`, drawn at that slot's own
aspect ratio, stating the intended subject and the recommended dimensions. **To use a real photo:** drop the file into
`public/images/` and change that slot's `src`   e.g. `src: '/images/hero-1.jpg'`. Nothing else
changes; cropping, aspect ratio and lazy-loading are handled by the layout.

## SEO

- Every route is prerendered: real `<h1>`, body copy, per-page title/description/canonical,
  Open Graph, Twitter card and JSON-LD in the static `<head>`   no JS execution needed.
- `public/robots.txt` is static; **`sitemap.xml` is generated at build** from the same route list
  that drives prerendering, so a new blog post can never be missing from it.
- A real `dist/404.html` is prerendered, so unknown URLs get matching markup rather than the home
  page's HTML (which React would otherwise discard and re-render).
- Scroll-reveal animation is gated on a `.js` class, so content stays visible without JS.

**Before going live**, update `site.url` in `src/data/site.ts` and the domain in
`public/robots.txt` / `public/sitemap.xml` if the site is not served from `getmydegree.in`.

## Brand assets

`public/logo.svg` (dark-on-light), `public/logo-light.svg` (footer/dark backgrounds) and
`public/favicon.svg` are **placeholders**. Replace the files at those paths with the real
artwork   no code changes needed.

## Partner university logos

The hero sets each institution's name as a wordmark. To use real artwork, add a `logo` path to that
university in `src/data/site.ts`   e.g. `logo: '/images/logos/rtu.svg'`   and the hero renders it as
a monochrome image instead. No placeholder logos are invented.

## Photographs

Every image is a named slot. **Drop a file named after the slot into `public/images/` and it is
used automatically**   no code change, no path to edit:

```
public/images/hero-1.jpg        replaces the hero-1 placeholder
public/images/about-2.png       replaces about-2
public/images/blog/<slug>.jpg   the cover for that article
```

Resolution order is `.avif`, `.webp`, `.jpg`, `.jpeg`, `.png`, `.svg`, so a real photograph always
beats the `.svg` placeholder. You can delete the placeholder or leave it   it is ignored once a
real file exists. Adding a file during `npm run dev` reloads the page.

**The hero shows three images in sequence.** `hero-portrait`, `hero-portrait-2` and
`hero-portrait-3` crossfade every five seconds   three moments of the same story (working,
studying, graduating). Drop all three at `public/images/hero-portrait{,-2,-3}.jpg`; the set is
listed in `FRAMES` in `src/components/HeroVisual.tsx` and needs no other change.

**The hero portrait is the one image that carries the page.** `hero-portrait` expects an editorial
photograph of a working professional aged 23–30 in smart casual clothing, in a contemporary
interior with soft natural light   not a graduation-cap group shot. Drop it at
`public/images/hero-portrait.jpg` (1200×1500 or larger, 4:5).

Each placeholder frame is labelled with the slot name and the size it expects. Recommended:

| Slot | Used for | Size |
| --- | --- | --- |
| `hero-1` | home hero, blends into the panel | 1600×600, landscape |
| `hero-2` | counseling session, home about block | 1200×1200, square-ish |
| `about-1`, `about-2`, `about-3` | about page and home | 1200×900 / 1680×720 |
| `courses-1`, `courses-2` | courses page | 1680×720 / 1200×900 |
| `contact-1` | contact page | 1200×750 |
| `blog/<slug>` | article cover | 1600×900 |

Export at roughly 2× the displayed width (1600–2000px is plenty), quality ~80. Images are
`loading="lazy"` and `object-cover`, so exact aspect ratios do not matter   the layout crops.

## Blog

Articles are **markdown files in `src/content/posts/`**   one file per post, the filename is the
slug. Frontmatter carries the metadata:

```markdown
---
title: "How to get your migration certificate"
excerpt: "One sentence   used as the meta description and the listing excerpt."
category: Admissions
date: 2026-09-02
author: "GetMyDegree Academic Team"
cover: /images/blog/how-to-get-your-migration-certificate.svg
---

Body in ordinary markdown. Headings, lists, quotes, links, bold.
```

Add a file and everything follows: the listing card, the `/blog/<slug>` route, reading time
(computed from word count), the prerendered HTML, `BlogPosting` JSON-LD, the sitemap entry, and
the related-articles sidebar on other posts. Covers follow the convention
`public/images/blog/<slug>.svg|jpg`.

### How it scales

Markdown is compiled at build time by a small Vite plugin, so **no parser reaches the browser**.
`foo.md?meta` yields only the frontmatter and `foo.md` only the compiled body   deliberately
separate module ids, because a single module exporting both would drag every article body into
the main bundle. The result:

- the main bundle contains **no article text** at any post count;
- each article is its own ~2KB chunk, fetched only when that article is opened;
- `src/main.tsx` preloads the current article's chunk *before* hydrating, so the first client
  render matches the prerendered HTML;
- `src/data/postBodies.ssr.ts` (server-only) seeds every body for prerendering.

The listing has search (also reachable as `/blog?q=…`, and from the search box in each article's
sidebar), category filters that scroll horizontally when they outgrow the row, and a load-more
pager at `PAGE_SIZE` per page.

## Contact form

`src/pages/Contact.tsx` validates client-side and shows the success state, but the submit
handler is a stub (see the `TODO`). Wire it to Formspree, Web3Forms or your own endpoint.

## Deploy

Static host, publish directory `dist/`. `public/_redirects` (Netlify) and `vercel.json`
are included; for nginx, `try_files $uri $uri/index.html /index.html;`.
