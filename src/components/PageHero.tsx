import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = { badge: string; title: ReactNode; intro: ReactNode; children?: ReactNode }

/** Shared inner-page hero: the same panel treatment as the home page. */
export function PageHero({ badge, title, intro, children }: Props) {
  return (
    <section className="shell pt-2 pb-14 lg:pb-20">
      <div className="panel px-5 py-14 text-center sm:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-2xl">
          <span className="badge">{badge}</span>
          <h1 className="mt-5 text-[2.25rem] leading-[1.08] sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">{intro}</p>
          {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}
