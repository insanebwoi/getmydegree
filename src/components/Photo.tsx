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
}

/**
 * Rounded image frame. The source comes from the single registry in
 * `src/data/images.ts`, so swapping a placeholder for a real photograph is a
 * one-line change.
 */
export function Photo({
  name,
  src,
  alt,
  className = '',
  ratio,
  priority = false,
  rounded = 'card',
}: Props) {
  const registered = name ? images[name] : undefined
  const image = {
    src: src ?? registered?.src ?? '',
    alt: alt ?? registered?.alt ?? '',
    width: registered?.width ?? 1600,
    height: registered?.height ?? 900,
  }
  return (
    <img
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
      } ${className}`}
    />
  )
}
