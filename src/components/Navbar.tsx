import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { nav, site } from '../data/site'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  /*
    The bar floats free over the hero. Once the page scrolls it picks up a
    quiet backdrop, because from there it sits over arbitrary content and the
    links have to stay readable.
  */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 pt-2 pb-2 lg:pt-3">
      <div className="shell">
        <div
          className={`flex h-14 items-center justify-between gap-3 rounded-full px-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:h-15 sm:px-4 lg:h-17 lg:px-6 ${scrolled || open
              ? 'border border-line/70 bg-white/85 shadow-[var(--shadow-soft)] backdrop-blur-md'
              : 'border border-transparent'
            }`}
        >
          <Link to="/" aria-label={`${site.name}   home`} className="action shrink-0">
            <img
              src="/logo.svg"
              alt={site.name}
              width={180}
              height={34}
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors ${isActive ? 'bg-navy-50 text-navy' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phoneHref}`}
              className="action hidden gap-2 rounded-full px-3 text-sm font-medium text-ink md:inline-flex"
            >
              <Phone size={15} className="text-navy" aria-hidden="true" />
              {site.phone}
            </a>
            <Link to="/contact" className="btn btn-primary hidden text-sm sm:inline-flex">
              Book a call
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div id="mobile-nav" hidden={!open} className="panel mt-2 overflow-hidden p-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={close}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3.5 font-display text-lg font-medium ${isActive ? 'bg-navy-50 text-navy' : 'text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={close} className="btn btn-primary mt-2">
              Book a call
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
