import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Pause, Play, X } from 'lucide-react'
import { galleryImages } from 'virtual:image-manifest'
import { images } from '../data/images'

/**
 * Until pictures are dropped into public/images/gallery, the strip runs on the
 * photographs the site already has, so the section is never an empty band.
 */
const FALLBACK = [
  images['hero-portrait'].src,
  images['hero-2'].src,
  images['hero-3'].src,
  images['hero-portrait-3'].src,
  images['hero-portrait-2'].src,
]

const source = galleryImages.length > 0 ? galleryImages : FALLBACK

/** Movement past this many pixels counts as a drag, not a click. */
const DRAG_THRESHOLD = 6
/** Pixels per second the strip drifts on its own. */
const DRIFT = 26
/** How far the strip moves per pixel of page scroll. */
const SCROLL_FACTOR = 0.35

export function Gallery() {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const unit = useRef<HTMLUListElement>(null)
  /** Extra offset contributed by dragging, read by the animation loop. */
  const dragOffset = useRef(0)
  /** Distance the pointer travelled, to tell a drag from a click. */
  const moved = useRef(0)

  const [copies, setCopies] = useState(1)
  const [paused, setPaused] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimated(!still.matches)
    sync()
    still.addEventListener('change', sync)
    return () => still.removeEventListener('change', sync)
  }, [])

  /*
    A loop only closes seamlessly if one copy of the set is at least as wide as
    the viewport — otherwise the strip runs out and snaps back in view. With one
    or two pictures it never is, so the set is repeated until it spans the
    screen. Measured rather than assumed, because tile widths vary with each
    photograph's aspect and with the breakpoint.
  */
  useLayoutEffect(() => {
    const measure = () => {
      if (!unit.current || !viewport.current) return
      const perCopy = unit.current.getBoundingClientRect().width / copies
      const needed = viewport.current.getBoundingClientRect().width
      if (perCopy <= 0) return
      // Solved in one pass: stepping up one copy at a time restarts the
      // animation on every step, which resets the offset and reads as frozen.
      const wanted = Math.min(12, Math.max(1, Math.ceil((needed * 1.15) / perCopy)))
      if (wanted !== copies) setCopies(wanted)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [copies])

  /*
    One loop drives everything: the strip drifts on its own, and page scroll
    feeds straight into the same offset, so scrolling moves it too. The offset
    wraps at the width of one set, which is why the seam never shows.
  */
  useEffect(() => {
    if (!animated) return
    const el = track.current
    const list = unit.current
    if (!el || !list) return

    let offset = 0
    let last = performance.now()
    let lastScroll = window.scrollY
    let hovered = false
    let frame = 0

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const scrolled = window.scrollY - lastScroll
      lastScroll = window.scrollY

      const width = list.getBoundingClientRect().width
      if (width > 0) {
        if (!paused && !hovered) offset += DRIFT * dt
        offset += scrolled * SCROLL_FACTOR
        offset += dragOffset.current
        dragOffset.current = 0
        offset = ((offset % width) + width) % width
        el.style.transform = `translate3d(${-offset}px, 0, 0)`
      }
      frame = requestAnimationFrame(step)
    }

    // Captured now: the ref may point elsewhere by the time cleanup runs.
    const frameEl = viewport.current
    const enter = () => (hovered = true)
    const leave = () => (hovered = false)
    frameEl?.addEventListener('pointerenter', enter)
    frameEl?.addEventListener('pointerleave', leave)
    frame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frame)
      frameEl?.removeEventListener('pointerenter', enter)
      frameEl?.removeEventListener('pointerleave', leave)
    }
  }, [animated, paused])

  const set = Array.from({ length: copies }, () => source).flat()

  /*
    Dragging scrubs the strip: the pointer's movement is handed to the same
    offset the drift and the scroll feed, so all three are one motion.

    No pointer capture — capturing on the viewport swallows the click that
    follows, and the pictures would never open. Instead the distance travelled
    is remembered, and a click is suppressed only when the pointer actually
    dragged.
  */
  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!animated || event.button !== 0) return
    let lastX = event.clientX
    moved.current = 0

    const move = (e: PointerEvent) => {
      const dx = e.clientX - lastX
      lastX = e.clientX
      moved.current += Math.abs(dx)
      if (moved.current > DRAG_THRESHOLD) setDragging(true)
      dragOffset.current -= dx
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      setDragging(false)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  /*
    Wheel and trackpad. A sideways gesture — or a wheel with shift held, the
    long-standing convention for horizontal scrolling — moves the strip and is
    consumed. A plain vertical wheel is left alone: hijacking it would trap the
    page, and vertical scrolling already moves the strip anyway.
  */
  useEffect(() => {
    const el = viewport.current
    if (!el || !animated) return

    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      if (!horizontal && !event.shiftKey) return
      event.preventDefault()
      dragOffset.current += horizontal ? event.deltaX : event.deltaY
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [animated])

  /** A drag ends in a click; that click must not open a picture. */
  function onClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (moved.current > DRAG_THRESHOLD) {
      event.preventDefault()
      event.stopPropagation()
      moved.current = 0
    }
  }

  return (
    <div className="relative">
      <div
        ref={viewport}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        className={`gallery-viewport ${animated ? 'is-animated' : ''} ${
          dragging ? 'cursor-grabbing' : animated ? 'cursor-grab' : ''
        }`}
        role="region"
        aria-label="Photographs from our centres and graduates"
      >
        <div ref={track} className="gallery-track">
          {/* The measured set, then a second copy so the wrap is invisible. */}
          <ul ref={unit} className="gallery-set">
            {set.map((src, i) => (
              <Tile key={`a-${i}`} src={src} eager={i < 3} onOpen={() => setPreview(src)} />
            ))}
          </ul>
          {animated && (
            <ul className="gallery-set" aria-hidden="true">
              {set.map((src, i) => (
                <Tile key={`b-${i}`} src={src} eager={false} onOpen={() => setPreview(src)} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {preview && <Preview src={preview} onClose={() => setPreview(null)} />}

      {animated && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume the gallery' : 'Pause the gallery'}
          className="absolute right-3 -bottom-2 grid h-10 w-10 place-items-center rounded-full border border-line bg-white/90 text-ink shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:bg-white sm:right-4"
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}

/**
 * The opened photograph. A dialog rather than a styled div: Escape closes it,
 * focus is sent to the close button and returned to the page afterwards, and
 * the page behind cannot be scrolled while it is open.
 */
function Preview({ src, onClose }: { src: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photograph"
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <img
        src={src}
        alt=""
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
      />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close the photograph"
        className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-navy-950 sm:top-6 sm:right-6"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  )
}

function Tile({ src, eager, onOpen }: { src: string; eager: boolean; onOpen: () => void }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open this photograph"
        className="block overflow-hidden rounded-2xl border border-line"
      >
        <img
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="h-44 w-auto object-cover transition-transform duration-300 hover:scale-[1.03] sm:h-56 lg:h-64"
        />
      </button>
    </li>
  )
}
