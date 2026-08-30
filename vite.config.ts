import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'
import { marked } from 'marked'

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
  plugins: [react(), tailwindcss(), markdownPosts()],
})
