import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  badge?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  align?: 'center' | 'left'
  dark?: boolean
  id?: string
}

/** Standard section rhythm: pill badge, title, optional intro, then content. */
export function Section({
  badge,
  title,
  intro,
  children,
  align = 'center',
  dark = false,
  id,
}: Props) {
  const centered = align === 'center'
  return (
    <section id={id} className={dark ? 'bg-navy-950 text-white' : undefined}>
      <div className="shell py-16 lg:py-24">
        {(badge || title) && (
          <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
            {badge && <span className={`badge ${dark ? 'badge-dark' : ''}`}>{badge}</span>}
            {title && (
              <h2
                className={`mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : ''}`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className={`mt-4 leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}>
                {intro}
              </p>
            )}
          </Reveal>
        )}
        <div className={badge || title ? 'mt-12 lg:mt-14' : undefined}>{children}</div>
      </div>
    </section>
  )
}
