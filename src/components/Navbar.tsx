import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, PhoneCall } from 'lucide-react'
import { nav, site } from '../data/site'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md' : 'bg-white'
      }`}
    >
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Link to="/" aria-label={`${site.name} — home`} className="shrink-0">
          <img src="/logo.svg" alt={site.name} width={190} height={35} className="h-9 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                  isActive ? 'text-navy' : 'text-muted hover:text-navy'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-semibold text-navy md:flex"
          >
            <PhoneCall size={16} className="text-gold-600" aria-hidden="true" />
            {site.phone}
          </a>
          <Link to="/contact" className="btn btn-gold hidden text-sm sm:inline-flex">
            Free Consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={close}
              className={({ isActive }) =>
                `border-b border-line py-4 font-display text-lg font-bold ${
                  isActive ? 'text-navy' : 'text-muted'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={close} className="btn btn-gold mt-5 justify-center">
            Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  )
}
