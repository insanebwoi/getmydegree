import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, basename } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'
import { marked } from 'marked'

/**
 * Maps an image's base name to whatever file actually exists for it, so a
 * placeholder can be replaced by dropping `hero-1.jpg` into public/images
 * with no code change. Real photography wins over the .svg placeholder.
 */
const FORMAT_PRIORITY = ['.avif', '.webp', '.jpg', '.jpeg', '.png', '.svg']

function scanImages(dir: string, urlPrefix: string, out: Record<string, string>) {
  let entries: import('node:fs').Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'gallery') continue
      scanImages(join(dir, entry.name), `${urlPrefix}/${entry.name}`, out)
      continue
    }
    const ext = extname(entry.name).toLowerCase()
    const rank = FORMAT_PRIORITY.indexOf(ext)
    if (rank === -1) continue
    const name = basename(entry.name, ext)
    const existing = out[name]
    if (existing && FORMAT_PRIORITY.indexOf(extname(existing).toLowerCase()) <= rank) continue
    out[name] = `${urlPrefix}/${entry.name}`
  }
}

/**
 * Everything in public/images/gallery, in filename order. Drop a picture in
 * and it joins the gallery — no code change, and the dev server reloads.
 *
 * One entry per picture: a photograph left beside its own .webp would
 * otherwise appear twice, once in each format. Names are encoded, since a
 * filename may contain spaces.
 */
type GalleryImage = { src: string; width: number; height: number }

function scanGallery(dir: string): GalleryImage[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  const best = new Map<string, string>()
  for (const entry of entries) {
    const ext = extname(entry).toLowerCase()
    const rank = FORMAT_PRIORITY.indexOf(ext)
    if (rank === -1) continue
    const name = basename(entry, extname(entry))
    const held = best.get(name)
    if (held && FORMAT_PRIORITY.indexOf(extname(held).toLowerCase()) <= rank) continue
    best.set(name, entry)
  }
  return [...best.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, file]) => {
      const size = imageSize(join(dir, file))
      return {
        src: `/images/gallery/${encodeURIComponent(file)}`,
        width: size?.width ?? 1200,
        height: size?.height ?? 800,
      }
    })
}

/**
 * Intrinsic pixel size straight from the file header   WebP (VP8/VP8L/VP8X),
 * PNG and JPEG. Avoids a dependency for what is a few bytes of parsing, and
 * lets every gallery tile ship width/height so nothing shifts on load.
 */
function imageSize(file: string): { width: number; height: number } | undefined {
  let buf: Buffer
  try {
    buf = readFileSync(file)
  } catch {
    return undefined
  }
  if (buf.length < 32) return undefined

  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (chunk === 'VP8X')
      return {
        width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
        height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
      }
  }
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  if (buf.readUInt16BE(0) === 0xffd8) {
    let off = 2
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) { off++; continue }
      const marker = buf[off + 1]
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) }
      off += 2 + buf.readUInt16BE(off + 2)
    }
  }
  return undefined
}

function imageManifest(): Plugin {
  const virtualId = 'virtual:image-manifest'
  const resolvedId = '\0' + virtualId
  const build = () => {
    const manifest: Record<string, string> = {}
    scanImages(join(process.cwd(), 'public/images'), '/images', manifest)
    return manifest
  }
  return {
    name: 'image-manifest',
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    load: (id) =>
      id === resolvedId
        ? `export const imageManifest = ${JSON.stringify(build())};\n` +
          `export const galleryImages = ${JSON.stringify(scanGallery(join(process.cwd(), 'public/images/gallery')))};`
        : undefined,
    // Picking up a newly added photograph should not need a restart.
    configureServer(server) {
      server.watcher.add(join(process.cwd(), 'public/images'))
      const reload = (file: string) => {
        if (!file.includes('/public/images/')) return
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    },
  }
}

/**
 * Compiles `.md` posts at build time. The markdown parser stays in the build and
 * never reaches the browser.
 *
 * `foo.md?meta` yields only the frontmatter; `foo.md` yields only the compiled
 * body. They must be separate module ids: if one module exported both, a static
 * import of the frontmatter would pull every article body into the main chunk,
 * because Rollup does not split a module that is also imported statically.
 */
function markdownPosts(): Plugin {
  return {
    name: 'markdown-posts',
    enforce: 'pre',
    async transform(code, id) {
      const [file, query] = id.split('?')
      if (!file.endsWith('.md')) return
      const { data, content } = matter(code)

      if (query === 'meta') {
        const words = content.split(/\s+/).filter(Boolean).length
        const meta = { ...data, readingMinutes: Math.max(1, Math.round(words / 200)) }
        return { code: `export const meta = ${JSON.stringify(meta)};`, map: null }
      }

      const html = await marked.parse(content, { async: true, gfm: true })
      return { code: `export const html = ${JSON.stringify(html)};`, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), markdownPosts(), imageManifest()],
})
