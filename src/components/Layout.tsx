import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ContactBar } from './ContactBar'

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
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ContactBar />
    </>
  )
}
