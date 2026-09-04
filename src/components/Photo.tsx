import { useEffect, useRef, useState } from 'react'
import { images, type ImageName } from '../data/images'

type Props = {
  /** A registry slot, or pass `src`/`alt` for content-owned images. */
  name?: ImageName
  src?: string
  alt?: string
  className?: string
  /** Aspect ratio applied to the frame, e.g. "4/3". Omit to fill the parent. */
  ratio?: string
  /** Above-the-fold images should load eagerly. */
  priority?: boolean
  rounded?: 'card' | 'panel' | 'none'
  /** Opt out of the fade, for images that are already part of a moving set. */
  animate?: boolean
}

/**
 * Rounded image frame. The source comes from the single registry in
 * `src/data/images.ts`, so swapping a placeholder for a real photograph is a
 * one-line change.
 *
 * The photograph fades up as it decodes rather than appearing in one frame.
 * The state is driven by the element's own `complete` flag as well as the load
 * event, because an image served from cache can finish before React attaches
 * the handler   miss that and the picture stays invisible for good.
 */
export function Photo({
  name,
  src,
  alt,
  className = '',
  ratio,
  priority = false,
  rounded = 'card',
  animate = true,
}: Props) {
  const registered = name ? images[name] : undefined
  const image = {
    src: src ?? registered?.src ?? '',
    alt: alt ?? registered?.alt ?? '',
    width: registered?.width ?? 1600,
    height: registered?.height ?? 900,
  }

  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!animate) return
    const el = ref.current
    if (!el) return
    // Already decoded (cache, or prerendered HTML hydrating over it).
    if (el.complete && el.naturalWidth > 0) {
      setLoaded(true)
      return
    }
    const done = () => setLoaded(true)
    el.addEventListener('load', done)
    // A broken file must not leave a permanent blank where a picture was.
    el.addEventListener('error', done)
    return () => {
      el.removeEventListener('load', done)
      el.removeEventListener('error', done)
    }
  }, [animate, image.src])

  return (
    <img
      ref={ref}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`h-full w-full bg-navy-50 object-cover ${
        rounded === 'none'
          ? ''
          : rounded === 'panel'
            ? 'rounded-[var(--radius-panel)]'
            : 'rounded-[var(--radius-card)]'
      } ${animate ? `photo-in ${loaded ? 'is-loaded' : ''}` : ''} ${className}`}
    />
  )
}
