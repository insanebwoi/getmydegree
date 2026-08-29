import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
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
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
