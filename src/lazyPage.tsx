import { lazy, Suspense, type ComponentType } from 'react'

type Loader = () => Promise<{ default: ComponentType }>

export type LazyPage = ComponentType & { preload: () => Promise<void> }

/**
 * A page in its own chunk that still hydrates without a flash. Once `preload`
 * has resolved, the page renders synchronously   exactly what the prerender
 * wrote   so the entry awaits the current route's page before hydrating.
 * Only a later client-side navigation goes through Suspense.
 */
export function lazyPage(load: Loader): LazyPage {
  let loaded: ComponentType | undefined
  let pending: Promise<void> | undefined
  const preload = () =>
    (pending ??= load().then((mod) => {
      loaded = mod.default
    }))
  const Lazy = lazy(() => preload().then(() => ({ default: loaded! })))

  function Page() {
    const Loaded = loaded
    if (Loaded) return <Loaded />
    return (
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    )
  }
  return Object.assign(Page, { preload })
}
