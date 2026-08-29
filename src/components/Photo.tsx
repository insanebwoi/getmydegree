type Props = {
  /** Drop a real image at this path in /public to replace the placeholder. */
  src?: string
  alt: string
  caption: string
  className?: string
}

/**
 * Rounded image frame. Until real photography exists it renders a soft
 * navy wash with a caption naming the shot that belongs here.
 */
export function Photo({ src, alt, caption, className = '' }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full rounded-[var(--radius-card)] object-cover ${className}`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex min-h-64 items-end rounded-[var(--radius-card)] border border-line bg-[linear-gradient(150deg,var(--color-navy-50),var(--color-navy-100)_55%,var(--color-gold-100))] p-6 ${className}`}
    >
      <span className="rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-medium text-navy backdrop-blur-sm">
        {caption}
      </span>
    </div>
  )
}
