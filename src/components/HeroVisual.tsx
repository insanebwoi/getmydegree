import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { images, type ImageName } from '../data/images'

/** The hero set, in order. Replace the files; this list does not change. */
const FRAMES: ImageName[] = ['hero-portrait', 'hero-portrait-2', 'hero-portrait-3']
const HOLD = 5000

/**
 * The hero photograph — three frames that crossfade — plus one floating proof
 * card.
 *
 * The set advances every five seconds with a 1.2s crossfade, and each frame
 * drifts 4% over its turn so a still photograph does not feel frozen. Cycling
 * stops when the tab is hidden or the hero scrolls out of view, and never
 * starts at all under prefers-reduced-motion, where the first frame simply
 * stands.
 *
 * A pause control is provided because WCAG 2.2.2 requires one for motion that
 * starts automatically and runs for more than five seconds.
 */
export function HeroVisual() {
  const frame = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const proof = useRef<HTMLDivElement>(null)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animated, setAnimated] = useState(false)
  // The later frames are stacked in the viewport, so `loading="lazy"` will not
  // defer them — they are mounted after first paint instead, which keeps the
  // first frame's fetch uncontested.
  const [mountRest, setMountRest] = useState(false)

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1200))
    const id = idle(() => setMountRest(true))
    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id)
    }
  }, [])

  // Cycling is opt-in: it begins only after we know motion is welcome.
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimated(!still.matches)
    sync()
    still.addEventListener('change', sync)
    return () => still.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!animated || paused) return
    const el = frame.current
    if (!el) return

    let timer: number | undefined
    let onScreen = true

    const start = () => {
      window.clearInterval(timer)
      timer = window.setInterval(() => {
        if (document.hidden || !onScreen) return
        setIndex((i) => (i + 1) % FRAMES.length)
      }, HOLD)
    }

    // Off-screen or backgrounded work is wasted work.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    start()

    return () => {
      window.clearInterval(timer)
      observer.disconnect()
    }
  }, [animated, paused])

  // Pointer parallax: the image and the card separate slightly in depth.
  useEffect(() => {
    const el = frame.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || still.matches) return

    let queued = false
    let x = 0
    let y = 0
    const apply = () => {
      queued = false
      if (track.current) track.current.style.transform = `translate3d(${x * 5}px, ${y * 4}px, 0)`
      if (proof.current) proof.current.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`
    }
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect()
      x = (event.clientX - (box.left + box.width / 2)) / (box.width / 2)
      y = (event.clientY - (box.top + box.height / 2)) / (box.height / 2)
      if (!queued) {
        queued = true
        requestAnimationFrame(apply)
      }
    }
    const reset = () => {
      x = 0
      y = 0
      requestAnimationFrame(apply)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [])

  const active = animated ? index : 0

  return (
    <div ref={frame} className="group relative h-full w-full">
      <div
        ref={track}
        className="parallax enter-image relative h-full w-full overflow-hidden rounded-t-[2rem] rounded-br-[var(--radius-panel)] rounded-bl-[2rem] lg:rounded-tr-[var(--radius-panel)]"
        style={{ ['--enter-delay' as string]: '380ms' }}
      >
        {/*
          One region, one description — the frames are three moments of the same
          story, so screen readers get a single label rather than three.
        */}
        <div
          role="img"
          aria-label="Graduates and working professionals who completed their degree with GetMyDegree Institutions"
          className="absolute inset-0"
        >
          {(mountRest ? FRAMES : FRAMES.slice(0, 1)).map((name, i) => (
            <div key={name} className={`hero-frame ${i === active ? 'is-active' : ''}`}>
              <img
                src={images[name].src}
                alt=""
                width={images[name].width}
                height={images[name].height}
                loading="eager"
                decoding={i === 0 ? 'sync' : 'async'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                className="h-full w-full object-cover object-[50%_22%] lg:object-[50%_18%]"
              />
            </div>
          ))}
        </div>

        {/* Atmospheric fade into the hero surface on the side facing the copy. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(to_right,var(--color-ivory),transparent)] lg:w-2/5"
        />

        {/* Progress and control, quiet until wanted. */}
        {animated && (
          <div className="absolute right-4 bottom-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {(mountRest ? FRAMES : FRAMES.slice(0, 1)).map((name, i) => (
                <span key={name} className="hero-pip" data-active={i === active} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume the image sequence' : 'Pause the image sequence'}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/25 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hover:bg-white/40 focus-visible:opacity-100"
            >
              {paused ? (
                <Play size={14} aria-hidden="true" />
              ) : (
                <Pause size={14} aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* The one floating element in the composition. */}
      <div
        ref={proof}
        className="parallax enter absolute bottom-6 -left-3 rounded-[1.125rem] border border-line/80 bg-white/94 px-4 py-3 shadow-[0_14px_36px_-22px_rgba(5,18,41,0.4)] backdrop-blur-md sm:bottom-9 sm:-left-6"
        style={{ ['--enter-delay' as string]: '620ms' }}
      >
        <p className="font-display text-[1.5rem] leading-none font-semibold text-navy">10,000+</p>
        <p className="mt-1 text-[0.8125rem] font-medium">Graduates placed</p>
        <p className="text-[0.6875rem] text-muted">since 2021</p>
      </div>
    </div>
  )
}
