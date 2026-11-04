import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { guidesFor } from '../data/pageGuides'

/** Plain links from a page to the articles written about its subject. */
export function GuideLinks({ path, className = '' }: { path: string; className?: string }) {
  const guides = guidesFor(path)
  if (guides.length === 0) return null
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {guides.map((g) => (
        <Link
          key={g.slug}
          to={`/blog/${g.slug}`}
          className="card card-p card-hover flex items-start gap-3"
        >
          <Check size={16} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
          <span className="text-sm leading-snug text-ink">{g.title}</span>
        </Link>
      ))}
    </div>
  )
}
