import type { ReactNode } from 'react'

type Props = {
  items: ReactNode[]
  duration?: number
  className?: string
  separator?: ReactNode
}

/** Infinite horizontal scroller. Items are duplicated once for a seamless loop. */
export function Marquee({ items, duration = 40, className = '', separator }: Props) {
  const loop = [...items, ...items]
  return (
    <div className={`marquee overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
        {loop.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {item}
            {separator ?? <span className="mx-6 text-gold">✦</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
