import { useEffect, useRef } from 'react'
import { Photo } from './Photo'

/**
 * The hero photograph and its single floating proof card.
 *
 * The image is anchored to the bottom-right of the hero and bleeds to those
 * edges; a fade on its left dissolves it into the surface so it reads as part
 * of the composition rather than a picture in a box.
 *
 * Pointer movement shifts the image a few pixels and the card slightly further
 * in the opposite direction, which reads as depth. Bound only for fine
 * pointers, and skipped entirely under prefers-reduced-motion.
 */
export function HeroVisual() {
  const frame = useRef<HTMLDivElement>(null)
  const image = useRef<HTMLDivElement>(null)
  const proof = useRef<HTMLDivElement>(null)

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
      if (image.current) image.current.style.transform = `translate3d(${x * 5}px, ${y * 4}px, 0)`
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

  return (
    <div ref={frame} className="relative h-full w-full">
      <div
        ref={image}
        className="parallax enter-image relative h-full w-full overflow-hidden rounded-t-[2rem] rounded-br-[var(--radius-panel)] rounded-bl-[2rem] lg:rounded-tr-[var(--radius-panel)]"
        style={{ ['--enter-delay' as string]: '380ms' }}
      >
        <Photo
          name="hero-portrait"
          rounded="none"
          priority
          className="absolute inset-0 h-full w-full object-[50%_22%] lg:object-[50%_18%]"
        />
        {/* Atmospheric fade into the hero surface on the side facing the copy. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(to_right,var(--color-ivory),transparent)] lg:w-2/5"
        />
      </div>

      {/* The one floating element in the composition. */}
      <div
        ref={proof}
        className="parallax enter absolute bottom-5 -left-3 rounded-2xl border border-line bg-white/92 px-4 py-3.5 shadow-[0_18px_44px_-26px_rgba(5,18,41,0.45)] backdrop-blur-md sm:bottom-7 sm:-left-5 sm:px-5 sm:py-4"
        style={{ ['--enter-delay' as string]: '620ms' }}
      >
        <p className="font-display text-[1.625rem] leading-none font-semibold text-navy sm:text-[1.75rem]">
          10,000+
        </p>
        <p className="mt-1.5 text-sm font-medium">Graduates placed</p>
        <p className="text-xs text-muted">since 2021</p>
      </div>
    </div>
  )
}
