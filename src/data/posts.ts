/**
 * Blog index, built from the markdown files in `src/content/posts`.
 *
 * Frontmatter is collected eagerly   it is small and every listing needs it.
 * Article bodies are separate chunks, fetched only for the post being read, so
 * the main bundle stays the same size whether there are four posts or four
 * hundred. During prerendering `postBodies.ssr.ts` seeds every body, because
 * the static HTML must contain the full article.
 */

import { imageSrc } from './images'

const metaModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?meta',
  import: 'meta',
}) as Record<string, PostMeta>

const bodyModules = import.meta.glob('../content/posts/*.md', {
  import: 'html',
}) as Record<string, () => Promise<string>>

type PostMeta = {
  title: string
  excerpt: string
  category: string
  date: string
  /** Set in frontmatter when an article is revised; drives dateModified. */
  updated?: string
  author: string
  cover?: string
  readingMinutes: number
}

export type Post = PostMeta & { slug: string; cover: string }

const slugOf = (path: string) => path.replace(/^.*\/(.+)\.md(\?.*)?$/, '$1')

export const posts: Post[] = Object.entries(metaModules)
  .map(([path, meta]) => {
    const slug = slugOf(path)
    // A cover is whatever file exists at public/images/blog/<slug>.*
    return { ...meta, slug, cover: imageSrc(slug, meta.cover ?? `/images/blog/${slug}.svg`) }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

/** Newest first. */
export const postsByDate = posts

export const categories = [...new Set(posts.map((p) => p.category))].sort()

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

/** Same category first, then most recent. */
export function relatedPosts(slug: string, count = 3) {
  const post = getPost(slug)
  if (!post) return posts.slice(0, count)
  const others = posts.filter((p) => p.slug !== slug)
  const sameTopic = others.filter((p) => p.category === post.category)
  return [...sameTopic, ...others.filter((p) => p.category !== post.category)].slice(0, count)
}

const bodyCache = new Map<string, string>()

/** Server-side seeding, called once by `postBodies.ssr.ts` during prerender. */
export function seedBodies(bodies: Record<string, string>) {
  for (const [slug, html] of Object.entries(bodies)) bodyCache.set(slug, html)
}

/** Synchronous body   populated during prerender, and after `loadBody` runs. */
export function getBody(slug: string): string | undefined {
  return bodyCache.get(slug)
}

/** Fetches one article's chunk and caches it. */
export async function loadBody(slug: string): Promise<string | undefined> {
  const cached = bodyCache.get(slug)
  if (cached) return cached
  const load = bodyModules[`../content/posts/${slug}.md`]
  if (!load) return undefined
  const html = await load()
  bodyCache.set(slug, html)
  return html
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Posts per page on the listing. */
export const PAGE_SIZE = 9
