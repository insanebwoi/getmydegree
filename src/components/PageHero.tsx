import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  badge: string
  title: ReactNode
  intro: ReactNode
  children?: ReactNode
}

/** Shared inner-page hero: the same panel treatment as the home page. */
export function PageHero({ badge, title, intro, children }: Props) {
  return (
    <section className="shell pt-1 pb-10 sm:pb-14 lg:pb-20">
      <div className="panel px-4 py-11 text-center sm:px-8 sm:py-14 lg:py-20">
        <Reveal className="mx-auto max-w-2xl">
          <span className="badge">{badge}</span>
          <h1 className="t-h1 mt-4">{title}</h1>
          <p className="t-body mx-auto mt-4 max-w-xl text-muted">{intro}</p>
          {children && <div className="mt-7 flex flex-wrap justify-center gap-2.5">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}
