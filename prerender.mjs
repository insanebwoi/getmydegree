/**
 * Static prerender: renders every public route to real HTML   body markup plus
 * per-page head tags and JSON-LD   so crawlers and social scrapers get content
 * without executing JavaScript.
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')
const server = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const { render, prerenderPaths, metaFor, schemaFor, fullTitle, canonical, ogImage, posts, site } = server

const escape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

function headFor(path) {
  const meta = metaFor(path)
  const title = fullTitle(meta)
  const url = canonical(meta)
  const image = ogImage(meta)
  const type = meta.type ?? 'website'
  const robots = meta.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const imgType = image.url.endsWith('.png') ? 'image/png' : image.url.endsWith('.jpg') || image.url.endsWith('.jpeg') ? 'image/jpeg' : 'image/webp'
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    ...(meta.keywords ? [`<meta name="keywords" content="${escape(meta.keywords)}" />`] : []),
    `<link rel="canonical" href="${url}" />`,
    `<link rel="image_src" href="${escape(image.url)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${robots}" />`,
    `<meta name="bingbot" content="${robots}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:image" content="${escape(image.url)}" />`,
    `<meta property="og:image:secure_url" content="${escape(image.url)}" />`,
    `<meta property="og:image:type" content="${imgType}" />`,
    ...(image.width ? [`<meta property="og:image:width" content="${image.width}" />`] : []),
    ...(image.height ? [`<meta property="og:image:height" content="${image.height}" />`] : []),
    ...(meta.imageAlt ? [`<meta property="og:image:alt" content="${escape(meta.imageAlt)}" />`] : []),
    `<meta property="og:site_name" content="Get My Degree" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@get_my_degree" />`,
    `<meta name="twitter:creator" content="@get_my_degree" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${escape(image.url)}" />`,
    ...(meta.imageAlt ? [`<meta name="twitter:image:alt" content="${escape(meta.imageAlt)}" />`] : []),
  ]
  if (type === 'article') {
    if (meta.publishedTime)
      tags.push(`<meta property="article:published_time" content="${escape(meta.publishedTime)}" />`)
    if (meta.modifiedTime)
      tags.push(`<meta property="article:modified_time" content="${escape(meta.modifiedTime)}" />`)
    if (meta.section)
      tags.push(`<meta property="article:section" content="${escape(meta.section)}" />`)
    tags.push(`<meta property="article:author" content="${site.url}/about" />`)
    tags.push(`<meta property="article:publisher" content="${site.url}/" />`)
    if (meta.keywords) {
      for (const tag of meta.keywords.split(',').map((t) => t.trim()).filter(Boolean)) {
        tags.push(`<meta property="article:tag" content="${escape(tag)}" />`)
      }
    }
  }
  return tags.join('\n    ')
}

/**
 * JSON-LD carries no rendering weight, but it is real bytes the HTML parser
 * has to get through   so it is appended at the very end of <head>, after
 * Vite's own injected stylesheet and module script, rather than sitting
 * ahead of them and delaying when the browser discovers the CSS the hero
 * needs to paint.
 */
function schemaTagFor(path) {
  const schema = schemaFor(path)
  if (!schema) return ''
  return `\n    <script id="page-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
}

/**
 * Each page lives in its own chunk, which the entry only requests once it has
 * run. A modulepreload per page lets the browser fetch it alongside the entry
 * instead, so hydration is not held up by a second round trip.
 */
const manifestFile = resolve(root, 'dist/.vite/manifest.json')
const manifest = JSON.parse(readFileSync(manifestFile, 'utf-8'))
const entry = Object.values(manifest).find((chunk) => chunk.isEntry)

function staticImports(key, seen = new Set()) {
  for (const dep of manifest[key]?.imports ?? []) {
    if (seen.has(dep)) continue
    seen.add(dep)
    staticImports(dep, seen)
  }
  return seen
}
const entryChunks = staticImports(entry.src).add(entry.src)

function pageSource(path) {
  if (path === '/') return 'src/pages/Home.tsx'
  if (path === '/404') return 'src/pages/NotFound.tsx'
  if (path.startsWith('/courses/')) return 'src/pages/Course.tsx'
  if (path.startsWith('/universities/')) return 'src/pages/UniversityPage.tsx'
  if (path.startsWith('/blog/')) return 'src/pages/BlogPost.tsx'
  const page = { '/about': 'About', '/courses': 'Courses', '/universities': 'Universities', '/contact': 'Contact', '/blog': 'Blog' }[path]
  return page && `src/pages/${page}.tsx`
}

function preloadTagsFor(path) {
  const src = pageSource(path)
  if (!src || !manifest[src]) return ''
  const keys = [src, ...staticImports(src)].filter((key) => !entryChunks.has(key))
  return keys
    .map((key) => `\n    <link rel="modulepreload" crossorigin href="/${manifest[key].file}">`)
    .join('')
}

for (const path of prerenderPaths) {
  const html = template
    // Replace the template's build-time title/description/canonical with this route's.
    .replace(/<title>[\s\S]*?<\/title>/, '<!--head-->')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/\s*<link rel="canonical"[\s\S]*?\/>/, '')
    .replace(/\s*<link\s+rel="image_src"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+property="og:[\s\S]*?\/>/g, '')
    .replace(/\s*<meta\s+name="robots"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+name="googlebot"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+name="bingbot"[\s\S]*?\/>/, '')
    .replace('<!--head-->', headFor(path))
    .replace('</head>', `${preloadTagsFor(path)}${schemaTagFor(path)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    .replace(/href="tel:([^"]+)"/g, 'href="tel:$1" onclick="return gtag_report_conversion(\'tel:$1\');"')

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
    // The template carries an index directive; a 404 must not keep it.
    .replace(/\s*<meta\s+name="robots"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+property="og:[\s\S]*?\/>/g, '')
    .replace('<!--head-->', `<title>Page not found | GetMyDegree</title>\n    <meta name="robots" content="noindex, follow" />`)
    .replace('</head>', `${preloadTagsFor('/404')}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render('/404')}</div>`)
    .replace(/href="tel:([^"]+)"/g, 'href="tel:$1" onclick="return gtag_report_conversion(\'tel:$1\');"')
  writeFileSync(resolve(root, 'dist/404.html'), html)
  console.log('prerendered 404       → dist/404.html')
}

// Sitemap is generated from the same list, so pages can never drift out of it.
const priority = (path) =>
  path === '/' ? '1.0' : path.startsWith('/blog/') ? '0.9' : path.startsWith('/courses/') ? '0.9' : '0.8'
const changefreq = (path) => (path === '/' || path === '/blog' || path.startsWith('/blog/') ? 'weekly' : 'monthly')
// Articles carry a real lastmod; everything else uses the build date.
const buildDate = new Date().toISOString().slice(0, 10)
const lastmod = (path) => {
  const meta = metaFor(path)
  return (meta.modifiedTime ?? meta.publishedTime ?? buildDate).slice(0, 10)
}
function imageTagFor(path) {
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '')
    const post = posts.find((p) => p.slug === slug)
    if (post && post.cover) {
      const rawCover = post.cover.startsWith('http') ? post.cover : `${site.url}${post.cover}`
      const imgUrl = rawCover.split('?')[0]
      const imgTitle = escape(post.title)
      const imgCaption = escape(post.coverAlt || post.excerpt)
      return `\n    <image:image>\n      <image:loc>${escape(imgUrl)}</image:loc>\n      <image:title>${imgTitle}</image:title>\n      <image:caption>${imgCaption}</image:caption>\n      <image:geo_location>Kerala, India</image:geo_location>\n      <image:license>${site.url}/about</image:license>\n    </image:image>`
    }
  }
  if (path === '/blog') {
    return `\n    <image:image>\n      <image:loc>${site.url}/images/blog/blog-banner.webp</image:loc>\n      <image:title>GetMyDegree Degree Guides &amp; Articles</image:title>\n      <image:caption>Articles, degree advice, and admission guides for working professionals</image:caption>\n      <image:geo_location>Kerala, India</image:geo_location>\n      <image:license>${site.url}/about</image:license>\n    </image:image>`
  }
  if (path === '/') {
    return `\n    <image:image>\n      <image:loc>${site.url}/images/home/hero-portrait.webp</image:loc>\n      <image:title>GetMyDegree Institutions</image:title>\n      <image:caption>Degree completion for working professionals with credit transfer</image:caption>\n      <image:geo_location>Kerala, India</image:geo_location>\n      <image:license>${site.url}/about</image:license>\n    </image:image>`
  }
  return ''
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${prerenderPaths
  .map(
    (path) =>
      `  <url>\n    <loc>${canonical(metaFor(path))}</loc>\n    <lastmod>${lastmod(path)}</lastmod>\n    <changefreq>${changefreq(path)}</changefreq>\n    <priority>${priority(path)}</priority>${imageTagFor(path)}\n  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(resolve(root, 'dist/sitemap.xml'), sitemap)
console.log(`sitemap    → dist/sitemap.xml (${prerenderPaths.length} urls with Google Image Sitemap tags)`)

// Dedicated Google Image Sitemap for Googlebot-Image crawler
{
  const imageEntries = []
  for (const post of posts) {
    if (post.cover) {
      const rawCover = post.cover.startsWith('http') ? post.cover : `${site.url}${post.cover}`
      const cleanImg = rawCover.split('?')[0]
      const postUrl = canonical(metaFor(`/blog/${post.slug}`))
      imageEntries.push(`  <url>
    <loc>${postUrl}</loc>
    <image:image>
      <image:loc>${escape(cleanImg)}</image:loc>
      <image:title>${escape(post.title)}</image:title>
      <image:caption>${escape(post.coverAlt || post.excerpt)}</image:caption>
      <image:geo_location>Kerala, India</image:geo_location>
      <image:license>${site.url}/about</image:license>
    </image:image>
  </url>`)
    }
  }

  // Add primary site sections to image sitemap
  const siteImages = [
    { loc: `${site.url}/blog`, img: `${site.url}/images/blog/blog-banner.webp`, title: 'GetMyDegree Blog & Guides Banner', caption: 'Articles and degree admission guides for working professionals' },
    { loc: `${site.url}/`, img: `${site.url}/images/home/hero-portrait.webp`, title: 'GetMyDegree Professional Degree Completion', caption: 'Editorial portrait of working professional completing UGC recognized degree' },
    { loc: `${site.url}/about`, img: `${site.url}/images/about/about-banner.webp`, title: 'GetMyDegree Thrissur & Malappuram Academic Counselling', caption: 'Academic counselor helping student with credit transfer in Kerala' },
    { loc: `${site.url}/courses`, img: `${site.url}/images/courses/courses-banner.webp`, title: 'GetMyDegree UG & PG Degree Programmes', caption: 'UGC recognized university degree courses in India' },
    { loc: `${site.url}/universities`, img: `${site.url}/images/universities/universities-banner.webp`, title: 'Partner Universities Colonnade', caption: 'Partner universities awarding UGC recognized and accredited degrees' },
  ]
  for (const s of siteImages) {
    imageEntries.push(`  <url>
    <loc>${s.loc}</loc>
    <image:image>
      <image:loc>${escape(s.img)}</image:loc>
      <image:title>${escape(s.title)}</image:title>
      <image:caption>${escape(s.caption)}</image:caption>
      <image:geo_location>Kerala, India</image:geo_location>
      <image:license>${site.url}/about</image:license>
    </image:image>
  </url>`)
  }

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.join('\n')}
</urlset>
`
  writeFileSync(resolve(root, 'dist/image-sitemap.xml'), imageSitemap)
  console.log(`image-sitemap → dist/image-sitemap.xml (${imageEntries.length} images indexed for Google Images)`)
}

/*
  llms.txt lists the guides, and the guides now arrive on a schedule. Rewriting
  the section from the same list the sitemap is built from means it cannot fall
  behind, and an article that has not been released is not advertised.
*/
{
  const path = resolve(root, 'dist/llms.txt')
  const guides = posts
    .map((post) => `- [${post.title}](${canonical(metaFor(`/blog/${post.slug}`))})`)
    .join('\n')
  const text = readFileSync(path, 'utf-8').replace(
    /(## Guides\n\n)[\s\S]*?(\n\n## )/,
    `$1${guides}$2`,
  )
  writeFileSync(path, text)
  console.log(`llms.txt   → dist/llms.txt (${posts.length} guides)`)
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })

// The manifest was only for the prerender; it should not be published.
rmSync(resolve(root, 'dist/.vite'), { recursive: true, force: true })
