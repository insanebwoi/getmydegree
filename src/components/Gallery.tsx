import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { galleryImages } from 'virtual:image-manifest'
import { images } from '../data/images'

/**
 * Until pictures are dropped into public/images/gallery, the strip runs on the
 * photographs the site already has, so the section is never an empty band.
 */
type GalleryImage = { src: string; width: number; height: number }

const FALLBACK: GalleryImage[] = (
  ['hero-portrait', 'hero-2', 'hero-3', 'hero-portrait-3', 'hero-portrait-2'] as const
).map((name) => ({
  src: images[name].src,
  width: images[name].width,
  height: images[name].height,
}))

const source = galleryImages.length > 0 ? galleryImages : FALLBACK

/** How strongly a slide shrinks per unit of distance from the centre. */
const TWEEN_FACTOR_BASE = 0.84

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

/**
 * A real momentum-drag carousel (Embla), matched to the poster strip on
 * another of the practice's pages: slides shrink smoothly the further they
 * drift from centre, rather than snapping between fixed positions. The scale
 * is a plain transform written straight to each slide's DOM node from
 * Embla's own scroll/reInit events, so it moves at native scroll frame rate
 * without a React re-render or rAF loop of our own.
 */
export function Gallery() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimated(!still.matches)
    sync()
    still.addEventListener('change', sync)
    return () => still.removeEventListener('change', sync)
  }, [])

  return animated ? <AnimatedGallery /> : <StillGallery />
}

/**
 * How many posters one viewport-height of page scroll carries the row
 * through, while the section is in view.
 */
const SCROLL_LINK_STEPS = 3
/** Largest single step a scroll update is allowed to queue at once, so a big or fast scroll never launches one long, slow-to-settle animation that swallows everything scrolled during it. */
const SCROLL_LINK_MAX_STEP = 2

function AnimatedGallery() {
  const [autoplay] = useState(() => Autoplay({ delay: 2600, stopOnInteraction: false }))
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false, dragFree: false, skipSnaps: false },
    [autoplay],
  )
  const sectionRef = useRef<HTMLDivElement>(null)
  /** Whether the section is anywhere near the viewport, kept by an observer rather than read per scroll event. */
  const inView = useRef(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [paused, setPaused] = useState(false)
  const [canPrev, setCanPrev] = useState(true)
  const [canNext, setCanNext] = useState(true)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((node) => node.querySelector('.gallery-poster-scale') as HTMLElement)
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  /*
    Every slide's closeness to centre drives two things together: a light
    scale pop, and how much colour it keeps. The centred poster sits at full
    scale and full colour; everything else shrinks slightly and fades to
    monochrome, in proportion to how far its snap point sits from the
    current scroll position. Run on Embla's own 'scroll' event, so it's
    written every scroll frame without routing through React state.
  */
  const tweenScale = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = api.internalEngine()
    const scrollProgress = api.scrollProgress()
    const slidesInView = api.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const closeness = clamp(tweenValue, 0, 1)
        const scale = clamp(tweenValue, 0.72, 1)
        const node = tweenNodes.current[slideIndex]
        if (node) {
          node.style.transform = `scale(${scale})`
          node.style.filter = `grayscale(${(1 - closeness) * 100}%)`
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    onSelect()

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('reInit', onSelect)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
      .on('select', onSelect)
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale])

  /*
    Autoplay stays off both while explicitly paused and while the page is
    actively scrolling   scroll is what should be driving the row in that
    moment (see below), and a 2.6s timer firing mid-scroll would fight it.
  */
  const pageScrolling = useRef(false)
  useEffect(() => {
    if (!emblaApi) return
    if (paused || pageScrolling.current) autoplay.stop()
    else autoplay.play()
  }, [emblaApi, paused, autoplay])

  /* Tracks whether the section is anywhere near the viewport, cheaply, without a per-scroll layout read. */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => (inView.current = entry.isIntersecting), {
      rootMargin: '20% 0px',
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  /*
    A linear tie to the page's own scroll: as the section travels through
    the viewport, the row slides a few posters across, animated the same as
    a manual swipe rather than jumping between positions. Moves relative to
    wherever the row currently sits (autoplay's own position included)
    rather than an absolute index computed from scroll alone   recomputing
    from scratch on every scroll would snap the row backward to "undo"
    whatever autoplay had done while the reader was idle.

    Only one animated scrollTo() plays at a time: Embla drops any call that
    arrives before the previous one settles, so firing one per scroll event
    during a fast gesture would collapse down to just the first step and
    stall there. Extra scroll is instead accumulated in `carry` and applied
    as one further step each time the current animation's 'settle' event
    fires, so a quick scroll still keeps advancing all the way through
    rather than stopping after one slide. Only active while the section is
    near the viewport, so scrolling through the rest of the page doesn't
    quietly move it out of view.
  */
  useEffect(() => {
    if (!emblaApi) return

    let ticking = false
    let lastScrollY = window.scrollY
    let carry = 0
    let idleTimer = 0
    // True while a scrollTo() animation from this effect is still playing,
    // so a fast scroll gesture queues up rather than firing overlapping
    // animated calls   Embla drops any scrollTo() that arrives before the
    // one before it has settled, which is what made the row stall after
    // only its first step during a quick scroll.
    let animating = false

    const takeStep = () => {
      const steps = clamp(Math.trunc(carry), -SCROLL_LINK_MAX_STEP, SCROLL_LINK_MAX_STEP)
      if (steps === 0) return false
      carry -= steps
      animating = true
      emblaApi.scrollTo(emblaApi.selectedScrollSnap() + steps)
      return true
    }

    const settled = () => {
      animating = false
      takeStep()
    }
    emblaApi.on('settle', settled)

    const update = () => {
      ticking = false
      const current = window.scrollY
      const scrolled = current - lastScrollY
      lastScrollY = current
      if (scrolled === 0 || !inView.current) return

      const vh = window.innerHeight || 1
      carry += (scrolled / vh) * SCROLL_LINK_STEPS
      if (animating) return
      takeStep()
    }

    const onScroll = () => {
      if (inView.current) {
        pageScrolling.current = true
        autoplay.stop()
        window.clearTimeout(idleTimer)
        idleTimer = window.setTimeout(() => {
          pageScrolling.current = false
          if (!paused) autoplay.play()
        }, 400)
      }

      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idleTimer)
      emblaApi.off('settle', settled)
    }
  }, [emblaApi, autoplay, paused])

  return (
    <div className="relative" ref={sectionRef}>
      <div
        className="gallery-embla"
        role="region"
        aria-label="Photographs from our centres and graduates"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="gallery-embla-viewport" ref={emblaRef}>
          <div className="gallery-embla-container">
            {source.map((image, i) => (
              <div className="gallery-embla-slide" key={i}>
                <Tile image={image} priority={i < 3} onOpen={() => setPreview(image.src)} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous photograph"
          className="gallery-nav gallery-nav-prev"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next photograph"
          className="gallery-nav gallery-nav-next"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {preview && <Preview src={preview} onClose={() => setPreview(null)} />}

      {source.length > 1 && (
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

/** No JS motion (reduced-motion): a plain scrollable row of the same pictures. */
function StillGallery() {
  const [preview, setPreview] = useState<string | null>(null)
  return (
    <div className="relative">
      <div className="gallery-viewport" role="region" aria-label="Photographs from our centres and graduates">
        <ul className="gallery-set">
          {source.map((image, i) => (
            <li key={i} className="shrink-0">
              <Tile image={image} priority={i < 3} onOpen={() => setPreview(image.src)} />
            </li>
          ))}
        </ul>
      </div>
      {preview && <Preview src={preview} onClose={() => setPreview(null)} />}
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

function Tile({
  image,
  priority = false,
  onOpen,
}: {
  image: GalleryImage
  priority?: boolean
  onOpen: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="gallery-poster-scale">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open this photograph"
        className="gallery-poster block overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-soft)]"
      >
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          ref={(el) => {
            // Cache can beat the handler; ask the element directly.
            if (el?.complete && el.naturalWidth > 0) setLoaded(true)
          }}
          className={`photo-fade h-full w-full object-cover ${loaded ? 'is-loaded' : ''}`}
        />
      </button>
    </div>
  )
}
