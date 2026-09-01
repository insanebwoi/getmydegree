import { useEffect, useRef } from 'react'
import { Photo } from './Photo'

/**
 * The hero photograph and its single floating statistic.
 *
 * Pointer movement shifts the image a few pixels and the statistic slightly
 * further, which reads as depth rather than as motion. It is bound only for
 * fine pointers (a mouse), and skipped entirely under prefers-reduced-motion,
 * so touch devices and motion-sensitive visitors get the static composition.
 */
export function HeroPortrait() {
  const frame = useRef<HTMLDivElement>(null)
  const image = useRef<HTMLDivElement>(null)
  const stat = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || still.matches) return

    let ticking = false
    let x = 0
    let y = 0

    const apply = () => {
      ticking = false
      if (image.current) image.current.style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0)`
      if (stat.current) stat.current.style.transform = `translate3d(${x * -9}px, ${y * -6}px, 0)`
    }

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect()
      x = (event.clientX - (box.left + box.width / 2)) / (box.width / 2)
      y = (event.clientY - (box.top + box.height / 2)) / (box.height / 2)
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    const onLeave = () => {
      x = 0
      y = 0
      requestAnimationFrame(apply)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={frame} className="relative mx-auto w-full max-w-[380px] lg:max-w-[400px]">
      {/* Offset rule behind the frame — depth from one line, not a shadow stack. */}
      <div
        aria-hidden="true"
        className="absolute -right-2.5 -bottom-2.5 h-full w-full rounded-[2rem] border border-navy/15 sm:-right-4 sm:-bottom-4"
      />

      <div
        ref={image}
        className="parallax enter-image relative overflow-hidden rounded-[2rem] bg-navy-50 shadow-[0_24px_60px_-32px_rgba(5,18,41,0.45)]"
        style={{ ['--enter-delay' as string]: '380ms' }}
      >
        <Photo name="hero-portrait" ratio="4/5" priority rounded="none" />
      </div>

      {/* The one floating element in the composition. */}
      <div
        ref={stat}
        className="parallax enter absolute -bottom-5 -left-3 rounded-2xl border border-line bg-white/90 px-5 py-4 shadow-[0_18px_40px_-24px_rgba(5,18,41,0.4)] backdrop-blur-md sm:-left-6"
        style={{ ['--enter-delay' as string]: '620ms' }}
      >
        <p className="font-display text-[1.75rem] leading-none font-semibold text-navy">10,000+</p>
        <p className="mt-1.5 text-sm font-medium">Graduates placed</p>
        <p className="text-xs text-muted">since 2021</p>
      </div>
    </div>
  )
}
