/**
 * Server-only: loads every article body up front and seeds the shared cache so
 * prerendering can render complete HTML synchronously.
 *
 * Imported solely by `entry-server.tsx`. Keeping the eager glob out of the
 * client module graph is what stops article text being bundled into the main
 * JavaScript chunk — Rollup will not tree-shake an eager `import.meta.glob`.
 */
import { seedBodies } from './posts'

const bodies = import.meta.glob('../content/posts/*.md', {
  eager: true,
  import: 'html',
}) as Record<string, string>

seedBodies(
  Object.fromEntries(
    Object.entries(bodies).map(([path, html]) => [path.replace(/^.*\/(.+)\.md$/, '$1'), html]),
  ),
)
