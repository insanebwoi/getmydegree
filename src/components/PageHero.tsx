import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Photo } from './Photo'
import type { ImageName } from '../data/images'

type Props = {
  badge: string
  title: ReactNode
  intro: ReactNode
  children?: ReactNode
  /** Fills the panel behind the header. Omit for a plain white panel. */
  image?: ImageName
}

/**
 * Shared inner-page header.
 *
 * With an image it fills the panel, and the words sit on a soft white brush —
 * a blurred wash that fades out at its edges rather than a hard card, so the
 * photograph reads through around it while the type stays on a clean field.
 */
export function PageHero({ badge, title, intro, children, image }: Props) {
  return (
    <section className="shell pt-1 pb-10 sm:pb-14 lg:pb-16">
      <div
        className={`panel relative isolate overflow-hidden px-4 py-11 text-center sm:px-8 sm:py-14 lg:py-20 ${
          image ? 'border-transparent' : ''
        }`}
      >
        {image && (
          <Photo
            name={image}
            rounded="none"
            priority
            className="absolute inset-0 -z-20 h-full w-full object-[50%_35%]"
          />
        )}

        {/*
          The wash the words sit on. Without it the type is at the mercy of
          whatever the photograph does behind it   this page's banner runs from
          near-white sky to a dark navy pillar within the width of one heading,
          which put the h1 at 1.00:1 where it crossed the pillar.
        */}
        {image && (
          <div
            aria-hidden="true"
            className="page-brush-soft absolute top-1/2 left-1/2 -z-10 h-[210%] w-[min(42rem,92%)] -translate-x-1/2 -translate-y-1/2"
          />
        )}

        <div className="relative mx-auto max-w-[min(34rem,84%)] sm:max-w-lg">
          <Reveal>
            <span className="badge">{badge}</span>
            <h1 className="t-h1 mt-4">{title}</h1>
            <p className={`t-body mx-auto mt-4 max-w-xl ${image ? 'text-ink/85' : 'text-muted'}`}>
              {intro}
            </p>
            {children && (
              <div className="mt-7 flex flex-wrap justify-center gap-2.5">{children}</div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
