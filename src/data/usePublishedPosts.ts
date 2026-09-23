import { useEffect, useState } from 'react'
import { allPosts, publishedPosts, type Post } from './posts'
import { isPublished, releaseAt } from './postSchedule'

/** The next moment, after `now`, at which some article becomes public. */
function nextRelease(now: number): number | undefined {
  const upcoming = allPosts
    .map((post) => releaseAt(post.date))
    .filter((at) => Number.isFinite(at) && at > now)
    .sort((a, b) => a - b)
  return upcoming[0]
}

/**
 * The live article list, kept current without a reload.
 *
 * The static HTML was rendered by a build and is only as current as that
 * build. This reads the visitor's own clock on mount, which corrects it, and
 * then sets one timer for the next release moment   so a page left open
 * overnight shows tomorrow's article at 8am rather than yesterday's list.
 *
 * The first render deliberately matches what the server rendered, and the
 * correction lands in an effect, because rendering something different during
 * hydration is what produces a mismatch.
 */
export function usePublishedPosts(): Post[] {
  const [live, setLive] = useState<Post[]>(publishedPosts)

  useEffect(() => {
    let timer: number | undefined

    function refresh() {
      const now = Date.now()
      setLive(publishedPosts(now))
      const next = nextRelease(now)
      if (next === undefined) return
      /* setTimeout is a 32-bit signed count of milliseconds, so anything past
         about 24 days overflows and fires immediately. Wake up sooner and
         re-arm instead. */
      const wait = Math.min(next - now + 1000, 2_147_483_647)
      timer = window.setTimeout(refresh, wait)
    }

    refresh()
    return () => window.clearTimeout(timer)
  }, [])

  return live
}

/**
 * Whether one article is public, on the visitor's clock rather than the
 * build's. `undefined` until the effect runs, which is the server's answer and
 * keeps hydration honest.
 */
export function useIsPublished(slug: string | undefined): boolean {
  const [live, setLive] = useState(() => (slug ? isPublished(slug) : false))

  useEffect(() => {
    if (!slug) return
    setLive(isPublished(slug))
    const at = releaseAt(allPosts.find((p) => p.slug === slug)?.date ?? '')
    if (!Number.isFinite(at) || at <= Date.now()) return
    const wait = Math.min(at - Date.now() + 1000, 2_147_483_647)
    const timer = window.setTimeout(() => setLive(isPublished(slug)), wait)
    return () => window.clearTimeout(timer)
  }, [slug])

  return live
}
