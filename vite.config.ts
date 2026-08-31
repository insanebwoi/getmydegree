import { readdirSync } from 'node:fs'
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
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const entry of entries) {
    const ext = extname(entry).toLowerCase()
    const rank = FORMAT_PRIORITY.indexOf(ext)
    if (rank === -1) continue
    const name = basename(entry, ext)
    const existing = out[name]
    if (existing && FORMAT_PRIORITY.indexOf(extname(existing).toLowerCase()) <= rank) continue
    out[name] = `${urlPrefix}/${entry}`
  }
}

function imageManifest(): Plugin {
  const virtualId = 'virtual:image-manifest'
  const resolvedId = '\0' + virtualId
  const build = () => {
    const manifest: Record<string, string> = {}
    scanImages(join(process.cwd(), 'public/images'), '/images', manifest)
    scanImages(join(process.cwd(), 'public/images/blog'), '/images/blog', manifest)
    return manifest
  }
  return {
    name: 'image-manifest',
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    load: (id) =>
      id === resolvedId ? `export const imageManifest = ${JSON.stringify(build())};` : undefined,
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
