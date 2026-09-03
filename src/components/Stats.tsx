import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from './Reveal'

type Stat = { value: string; label: string }

/**
 * Splits "10,000+" into what comes before the number, the number itself, and
 * what comes after, so the figure can be counted while its punctuation stays
 * put. Whether the source grouped its thousands decides whether the count
 * does — otherwise a year would tick up as "2,021".
 */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const target = Number(digits.replace(/,/g, ''))
  if (!Number.isFinite(target)) return null
  return { prefix, suffix, target, grouped: digits.includes(',') }
}

/**
 * The figures count up as the block is scrolled into view: progress runs from
 * the moment the top edge appears to the point it reaches the middle of the
 * screen, so the numbers are driven by the scroll rather than by a timer.
 *
 * They start at their final value. That is what the prerendered HTML carries
 * and what a visitor without JavaScript reads, and if the block is already on
 * screen at load there is nothing to count — the reset to zero happens only
 * when it is still below the fold, before the browser paints.
 */
function useScrollCount(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(1)
  const latched = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = el.getBoundingClientRect()
    if (box.top > window.innerHeight) setProgress(0)
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      if (latched.current) return
      const box = el.getBoundingClientRect()
      const start = window.innerHeight
      const end = window.innerHeight * 0.45
      const p = (start - box.top) / (start - end)
      const clamped = Math.max(0, Math.min(1, p))
      // Once it completes it stays complete, so scrolling back does not
      // rewind the figures.
      if (clamped >= 1) latched.current = true
      setProgress(clamped)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  return progress
}

export function Stats({ items, dark = false }: { items: Stat[]; dark?: boolean }) {
  const list = useRef<HTMLDListElement>(null)
  const progress = useScrollCount(list)

  return (
    <dl ref={list} className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
      {items.map((s, i) => {
        const parts = parse(s.value)
        const shown = !parts
          ? s.value
          : `${parts.prefix}${
              parts.grouped
                ? Math.round(parts.target * progress).toLocaleString('en-US')
                : Math.round(parts.target * progress)
            }${parts.suffix}`

        return (
          <Reveal key={s.label} delay={i * 70}>
            <div className="text-center">
              <dt className={`text-sm ${dark ? 'text-white/60' : 'text-muted'}`}>{s.label}</dt>
              <dd
                className={`t-stat order-first font-display font-medium tabular-nums ${
                  dark ? 'text-white' : 'text-ink'
                }`}
              >
                {shown}
              </dd>
            </div>
          </Reveal>
        )
      })}
    </dl>
  )
}
