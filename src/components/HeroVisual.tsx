import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { images } from '../data/images'
import { heroSlides } from '../data/site'

const HOLD = 6000

type Props = {
  /** Reports the active slide so the copy can change with the picture. */
  onChange?: (index: number) => void
}

/**
 * The hero photographs. Three frames crossfade on a six-second hold, and each
 * change is reported upward so the headline and copy move with the image.
 *
 * The picture is shown at full strength with nothing washed over it, filling
 * the hero at every size. Legibility comes from the crop rather than a veil:
 * the copy sits on the bright side of the frame, and the object-position is
 * set per breakpoint — pushed as far toward the subject as the measured
 * contrast allows. A narrow portrait crop of a landscape photograph cannot
 * show both the people and a clean field for the words; a portrait-shaped
 * image for small screens would give back both.
 *
 * Cycling stops when the tab is hidden or the hero scrolls away, and never
 * starts under prefers-reduced-motion, where the first slide simply stands. A
 * pause control is provided because WCAG 2.2.2 requires one for motion that
 * starts on its own and runs past five seconds.
 */
export function HeroVisual({ onChange }: Props) {
  const frame = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [mountRest, setMountRest] = useState(false)

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1200))
    idle(() => setMountRest(true))
  }, [])

  useEffect(() => {
    /*
      The sequence runs from lg up.

      Below that there is no room for the pips and the pause button without
      putting a bar over the photograph, and WCAG 2.2.2 will not let content
      move on its own without a way to stop it   the slides carry the headline
      as well as the picture, so this is moving text, not decoration. With no
      control there can be no motion: a phone gets the first slide, still.
    */
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 1024px)')
    const sync = () => setAnimated(!still.matches && wide.matches)
    sync()
    still.addEventListener('change', sync)
    wide.addEventListener('change', sync)
    return () => {
      still.removeEventListener('change', sync)
      wide.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    onChange?.(animated ? index : 0)
  }, [index, animated, onChange])

  useEffect(() => {
    if (!animated || paused) return
    const el = frame.current
    if (!el) return

    let onScreen = true
    const timer = window.setInterval(() => {
      if (document.hidden || !onScreen) return
      setIndex((i) => (i + 1) % heroSlides.length)
    }, HOLD)

    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(el)

    return () => {
      window.clearInterval(timer)
      observer.disconnect()
    }
  }, [animated, paused])

  // Pointer parallax: a few pixels of depth, fine pointers only.
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
  const frames = mountRest ? heroSlides : heroSlides.slice(0, 1)

  return (
    <div
      ref={frame}
      className="group absolute inset-x-0 top-0 bottom-auto h-[var(--hero-band)] -z-10 sm:inset-0 sm:h-auto"
    >
      <div ref={track} className="parallax enter-image absolute inset-0 overflow-hidden">
        <div
          role="img"
          aria-label="Graduates and working professionals who completed their degree with GetMyDegree Institutions"
          className="absolute inset-0"
        >
          {frames.map((slide, i) => (
            <div key={slide.image} className={`hero-frame ${i === active ? 'is-active' : ''}`}>
              <img
                src={images[slide.image].src}
                alt=""
                width={images[slide.image].width}
                height={images[slide.image].height}
                loading="eager"
                decoding={i === 0 ? 'sync' : 'async'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                className="h-full w-full object-cover object-[38%_45%] sm:object-[32%_45%] lg:object-[62%_20%]"
              />
            </div>
          ))}
        </div>

        {animated && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {heroSlides.map((slide, i) => (
                <span key={slide.image} className="hero-pip" data-active={i === active} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume the slide sequence' : 'Pause the slide sequence'}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/70 text-ink opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hover:bg-white focus-visible:opacity-100"
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
    </div>
  )
}
