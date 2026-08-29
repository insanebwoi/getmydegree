import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  light = false,
  className = '',
}: Props) {
  return (
    <Reveal
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] ${light ? 'text-white' : 'text-navy-950'}`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-base leading-relaxed ${light ? 'text-white/70' : 'text-muted'}`}>
          {body}
        </p>
      )}
    </Reveal>
  )
}
