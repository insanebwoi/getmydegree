import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { nav, site } from '../data/site'
import { reportPhoneConversion } from '../data/tracking'
import { ApplyDialog } from './ApplyDialog'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  /* B.Tech has its own entry, so on its page the Courses entry stays quiet
     rather than both lighting up. */
  const active = (to: string, isActive: boolean) =>
    isActive && !(to === '/courses' && pathname.startsWith('/courses/btech'))
  const [scrolled, setScrolled] = useState(false)
  const [booking, setBooking] = useState(false)
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
    <>
      {booking && <ApplyDialog onClose={() => setBooking(false)} />}

      <header className="sticky top-0 z-50 pt-2 pb-2 lg:pt-3">
        <div className="shell">
          <div
            className={`flex h-14 items-center justify-between gap-3 rounded-full px-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:h-15 sm:px-4 lg:h-17 lg:px-6 ${
              scrolled || open
                ? 'border border-line/70 bg-white/85 shadow-[var(--shadow-soft)] backdrop-blur-md'
                : 'border border-transparent'
            }`}
          >
            <Link to="/" aria-label={`${site.name}   home`} className="action shrink-0">
              <img
                src="/logo.webp"
                alt={site.name}
                width={400}
                height={90}
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
                    `rounded-full px-4 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors lg:px-2.5 xl:px-3 2xl:px-4 ${
                      active(item.to, isActive) ? 'bg-navy-50 text-navy' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {item.label}
                  {item.to === '/courses/btech' && (
                    <span className="ml-1.5 hidden rounded-full bg-gold xl:inline px-1.5 py-0.5 align-middle text-[0.625rem] font-semibold tracking-wide text-navy-950 uppercase">
                      New
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${site.phoneHref}`}
                onClick={() => reportPhoneConversion(`tel:${site.phoneHref}`)}
                className="action hidden gap-2 rounded-full px-3 text-sm font-medium whitespace-nowrap text-ink md:inline-flex lg:hidden xl:inline-flex"
              >
                <Phone size={15} className="text-navy" aria-hidden="true" />
                {site.phone}
              </a>
              <button
                type="button"
                onClick={() => setBooking(true)}
                aria-haspopup="dialog"
                className="btn btn-primary hidden shrink-0 cursor-pointer text-sm whitespace-nowrap sm:inline-flex"
              >
                Book a call
              </button>
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
                    `rounded-2xl px-4 py-3.5 font-display text-lg font-medium ${
                      active(item.to, isActive) ? 'bg-navy-50 text-navy' : 'text-ink'
                    }`
                  }
                >
                  {item.label}
                  {item.to === '/courses/btech' && (
                    <span className="ml-1.5 rounded-full bg-gold px-1.5 py-0.5 align-middle text-[0.625rem] font-semibold tracking-wide text-navy-950 uppercase">
                      New
                    </span>
                  )}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={() => {
                  close()
                  setBooking(true)
                }}
                aria-haspopup="dialog"
                className="btn btn-primary mt-2 cursor-pointer"
              >
                Book a call
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
