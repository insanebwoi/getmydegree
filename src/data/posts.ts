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
import { isPublished, scheduleFor } from './postSchedule'

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
  /** Optional shorter title for the <title> tag, where the headline runs long. */
  seoTitle?: string
  excerpt: string
  category: string
  date: string
  /** Set in frontmatter when an article is revised; drives dateModified. */
  updated?: string
  author: string
  cover?: string
  readingMinutes: number
}

export type Post = PostMeta & { slug: string; cover: string; coverAlt?: string }

const slugOf = (path: string) => path.replace(/^.*\/(.+)\.md(\?.*)?$/, '$1')

/**
 * Every article, published or not yet. The schedule is authoritative for the
 * date and the cover where it has a row, so moving a post is one edit in
 * `postSchedule.ts` rather than two in two files.
 */
export const allPosts: Post[] = Object.entries(metaModules)
  .map(([path, meta]) => {
    const slug = slugOf(path)
    const row = scheduleFor(slug)
    // A cover is the scheduled one, else whatever file exists at
    // public/images/blog/<slug>.*, else the placeholder.
    return {
      ...meta,
      slug,
      date: row?.date ?? meta.date,
      cover: row?.image ?? imageSrc(slug, meta.cover ?? `/images/blog/${slug}.svg`),
      coverAlt: row?.alt,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

/** The articles that are live at `now`, newest first. */
export function publishedPosts(now: number = Date.now()): Post[] {
  return allPosts.filter((post) => isPublished(post.slug, now))
}

/**
 * Live at the moment this module was evaluated.
 *
 * That is the right list for prerendering, the sitemap and per-page metadata,
 * all of which are produced by a build and describe that build. Anything
 * rendered in a browser should call `publishedPosts()` instead, so a visitor
 * with the tab open at 8am sees the new article without a deploy.
 */
export const posts: Post[] = publishedPosts()

/** Newest first. */
export const postsByDate = posts

export const categories = [...new Set(allPosts.map((p) => p.category))].sort()

/** Looks through every article, including ones not yet released: a caller that
 *  cares about the difference asks `isPublished` itself. */
export function getPost(slug: string) {
  return allPosts.find((p) => p.slug === slug)
}

export { isPublished } from './postSchedule'

/** Same category first, then most recent. */
export function relatedPosts(slug: string, count = 3, now: number = Date.now()) {
  const live = publishedPosts(now)
  const post = getPost(slug)
  if (!post) return live.slice(0, count)
  const others = live.filter((p) => p.slug !== slug)
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
