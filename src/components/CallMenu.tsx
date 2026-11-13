import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Clock, Phone, X } from 'lucide-react'
import { centers, site } from '../data/site'

type Position = { top?: number; bottom?: number; left: number; width: number }

/** Room the panel needs below its trigger before it opens upwards instead. */
const PANEL_HEIGHT = 250
/** Matches the page's own side gutter on phones. */
const GUTTER = 16
const PANEL_WIDTH = 340
/** Below this width the panel spans the screen. Tailwind's `sm`. */
const SHEET_BELOW = 640

/**
 * A call button that asks which branch first.
 *
 * Each branch answers its own phone, so a single number sent every caller to
 * Thrissur. The trigger is still a real `tel:` link to the main line   with no
 * JavaScript, or before hydration, it simply dials   and once the app is
 * running a tap opens a small panel with one row per branch instead.
 *
 * The trigger is marked `data-call-chooser`, which keeps it out of the call
 * conversion count (see `trackedLinkFromEvent`) and out of the inline
 * `gtag_report_conversion` handler the prerender adds to phone links. Only a
 * tap on a branch row counts as a call.
 */
export function CallMenu({ className, children }: { className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<Position | null>(null)
  const trigger = useRef<HTMLAnchorElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const id = useId()

  /* Fixed to the viewport and drawn in a portal, so no ancestor's overflow or
     stacking can clip it   the triggers live in the navbar, the footer and a
     floating bar. Flipped above the trigger when there is no room below.

     Width comes from clientWidth, not innerWidth: innerWidth counts the
     scrollbar, which pushed the panel off-centre. On a phone the panel spans
     the screen between equal gutters, like a sheet. Wider, it is centred
     under a trigger near the middle of the screen (the hero buttons), and
     otherwise lines up with the trigger's outer edge   its right edge for
     the navbar number, its left edge for one on the left   so it never
     hangs off to one side. */
  const place = useCallback(() => {
    const el = trigger.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const viewport = document.documentElement.clientWidth
    const narrow = viewport < SHEET_BELOW
    const width = narrow ? viewport - GUTTER * 2 : Math.min(PANEL_WIDTH, viewport - GUTTER * 2)
    const centre = r.left + r.width / 2
    const preferred = narrow
      ? GUTTER
      : Math.abs(centre - viewport / 2) < viewport * 0.15
        ? centre - width / 2 // a centred button, such as a hero CTA
        : centre > viewport / 2
          ? r.right - width
          : r.left
    const left = Math.min(Math.max(GUTTER, preferred), viewport - width - GUTTER)
    const roomBelow = window.innerHeight - r.bottom
    setPos(
      roomBelow < PANEL_HEIGHT && r.top > roomBelow
        ? { bottom: window.innerHeight - r.top + 8, left, width }
        : { top: r.bottom + 8, left, width },
    )
  }, [])

  const close = useCallback((refocus = false) => {
    setOpen(false)
    if (refocus) trigger.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLElement>('a')?.focus()

    function onPointer(event: PointerEvent) {
      const target = event.target as Node
      if (panel.current?.contains(target) || trigger.current?.contains(target)) return
      close()
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close(true)
    }
    let frame = 0
    function onMove() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(place)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onMove, { passive: true })
    window.addEventListener('resize', onMove)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onMove)
      window.removeEventListener('resize', onMove)
    }
  }, [open, place, close])

  return (
    <>
      {/* data-call-chooser must stay directly before href: the prerender
          matches that pair to leave this link's click to React. */}
      <a
        data-call-chooser="true"
        href={`tel:${site.phoneHref}`}
        ref={trigger}
        onClick={(event) => {
          event.preventDefault()
          if (open) return close()
          place()
          setOpen(true)
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className={className}
      >
        {children}
      </a>

      {open &&
        pos &&
        createPortal(
          <div
            ref={panel}
            id={id}
            role="dialog"
            aria-label="Choose a branch to call"
            style={{ top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width }}
            className="call-menu fixed z-100 rounded-3xl border border-line bg-white p-2.5 text-left shadow-[0_18px_48px_-16px_rgba(5,18,41,0.45)]"
          >
            {/*
              One inset for everything: the heading, the hours line, the phone
              icons and the numbers all sit 13px inside the panel's padding
              (a row's 1px border plus its 12px padding), and the close
              button is pulled out so its icon, not its hit area, meets the
              numbers' right edge.
            */}
            <div className="flex items-center justify-between gap-2 py-1 pr-[3px] pl-[13px]">
              <p className="font-display text-base font-semibold text-ink">Call a branch</p>
              <button
                type="button"
                onClick={() => close(true)}
                aria-label="Close"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-navy-50 hover:text-navy"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <ul className="grid gap-2">
              {centers.map((center) => (
                <li key={center.branch}>
                  <a
                    href={`tel:${center.phoneHref}`}
                    onClick={() => close()}
                    className="group flex min-h-16 items-center gap-3 rounded-2xl border border-line px-3 py-3 transition-colors hover:border-navy-200 hover:bg-navy-50 focus-visible:border-navy"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white transition-transform group-hover:scale-105">
                      <Phone size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-tight font-semibold text-ink">
                        {center.branch} branch
                      </span>
                      <span className="mt-0.5 block truncate text-xs leading-tight text-muted">
                        {center.locality}, {center.city}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-sm font-semibold whitespace-nowrap text-navy tabular-nums">
                      {center.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="flex items-center gap-1.5 pt-2.5 pr-[13px] pb-1 pl-[13px] text-xs text-muted">
              <Clock size={13} aria-hidden="true" />
              {site.officeHours}
            </p>
          </div>,
          document.body,
        )}
    </>
  )
}
