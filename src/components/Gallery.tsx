import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { galleryImages } from 'virtual:image-manifest'
import { images } from '../data/images'

/**
 * Until pictures are dropped into public/images/gallery, the strip runs on the
 * photographs the site already has, so the section is never an empty band.
 */
const FALLBACK = [
  images['hero-portrait'].src,
  images['hero-2'].src,
  images['hero-3'].src,
  images['hero-portrait-3'].src,
  images['hero-portrait-2'].src,
]

const shots = galleryImages.length > 0 ? galleryImages : FALLBACK

/**
 * A gallery that scrolls sideways on its own.
 *
 * The track holds the pictures twice and slides by exactly half its width, so
 * the loop is seamless. Only transform animates, which keeps it off the main
 * thread. It pauses on hover, carries a pause control — motion that starts by
 * itself needs one — and under prefers-reduced-motion it does not move at all,
 * becoming a strip the reader scrolls by hand.
 */
export function Gallery() {
  const [paused, setPaused] = useState(false)
  const [animated, setAnimated] = useState(false)
  const track = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimated(!still.matches)
    sync()
    still.addEventListener('change', sync)
    return () => still.removeEventListener('change', sync)
  }, [])

  // Slower on a phone, where the strip is a larger share of the screen.
  const duration = `${Math.max(24, shots.length * 7)}s`

  return (
    <div className="relative">
      <div
        className={`gallery-viewport ${animated ? 'is-animated' : ''}`}
        role="region"
        aria-label="Photographs from our centres and graduates"
      >
        <ul
          ref={track}
          className="gallery-track"
          style={{ ['--gallery-duration' as string]: duration }}
          data-paused={paused || !animated}
        >
          {(animated ? [...shots, ...shots] : shots).map((src, i) => (
            <li key={`${src}-${i}`} className="shrink-0">
              <img
                src={src}
                alt=""
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-44 w-auto rounded-2xl border border-line object-cover sm:h-56 lg:h-64"
              />
            </li>
          ))}
        </ul>
      </div>

      {animated && (
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
