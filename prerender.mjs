/**
 * Static prerender: renders every public route to real HTML — body markup plus
 * per-page head tags and JSON-LD — so crawlers and social scrapers get content
 * without executing JavaScript.
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')
const server = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const { render, prerenderPaths, metaFor, schemaFor, fullTitle, canonical } = server

const escape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function headFor(path) {
  const meta = metaFor(path)
  const title = fullTitle(meta)
  const url = canonical(meta)
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
  ]
  const schema = schemaFor(path)
  if (schema) {
    tags.push(
      `<script id="page-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return tags.join('\n    ')
}

for (const path of prerenderPaths) {
  const html = template
    // Replace the template's build-time title/description/canonical with this route's.
    .replace(/<title>[\s\S]*?<\/title>/, '<!--head-->')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/\s*<link rel="canonical"[\s\S]*?\/>/, '')
    .replace('<!--head-->', headFor(path))
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)

  // Written twice: `about.html` is what flat static hosts (and `vite preview`,
  // whose SPA fallback would otherwise shadow it) resolve `/about` to, while
  // `about/index.html` is what directory-style hosts resolve.
  const targets =
    path === '/' ? ['dist/index.html'] : [`dist${path}.html`, `dist${path}/index.html`]

  for (const target of targets) {
    const file = resolve(root, target)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
  }
  console.log(`prerendered ${path.padEnd(9)} → ${targets.join(', ')}`)
}

// A real 404 document, so unknown URLs are served matching HTML instead of the
// home page's markup (which React would then have to discard and re-render).
{
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, '<!--head-->')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/\s*<link rel="canonical"[\s\S]*?\/>/, '')
    .replace('<!--head-->', `<title>Page not found | ${'GetMyDegree'}</title>\n    <meta name="robots" content="noindex" />`)
    .replace('<div id="root"></div>', `<div id="root">${render('/404')}</div>`)
  writeFileSync(resolve(root, 'dist/404.html'), html)
  console.log('prerendered 404       → dist/404.html')
}

// Sitemap is generated from the same list, so posts can never drift out of it.
const priority = (path) => (path === '/' ? '1.0' : path.startsWith('/blog/') ? '0.7' : '0.8')
const changefreq = (path) => (path === '/' || path === '/blog' ? 'weekly' : 'monthly')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderPaths
  .map(
    (path) =>
      `  <url><loc>${canonical(metaFor(path))}</loc><changefreq>${changefreq(path)}</changefreq><priority>${priority(path)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(resolve(root, 'dist/sitemap.xml'), sitemap)
console.log(`sitemap    → dist/sitemap.xml (${prerenderPaths.length} urls)`)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
