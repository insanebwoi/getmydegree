import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ContactBar } from './ContactBar'
import { trackConversion, trackPageView, trackedLinkFromEvent } from '../data/tracking'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * The Pixel's own snippet in index.html fires the first PageView   a full
 * document load, same as any static site. This client-side route change is
 * invisible to it, since the SPA never reloads the page, so every navigation
 * after the first fires one here instead.
 */
function PixelPageView() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.fbq?.('track', 'PageView')
  }, [pathname])
  return null
}

/** Same problem as the Pixel, same shape of fix: gtag.js counts the document
 *  load and nothing after it, so each client-side navigation reports itself. */
function AdsPageView() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    /* The page's own <Seo> sets the title in its effect, and effect order is
       not ours to rely on. A task boundary puts this after all of them, so the
       title reported is the new page's and not the one just left. */
    const id = window.setTimeout(() => trackPageView(pathname), 0)
    return () => window.clearTimeout(id)
  }, [pathname])
  return null
}

/**
 * Phone and WhatsApp taps, caught once on the way up rather than wired into
 * every link that exists   and every link added later. Capture phase, so a
 * handler that stops propagation cannot silently cost a conversion.
 */
function ConversionClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const conversion = trackedLinkFromEvent(event.target)
      if (conversion) trackConversion(conversion)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <PixelPageView />
      <AdsPageView />
      <ConversionClicks />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ContactBar />
    </>
  )
}
