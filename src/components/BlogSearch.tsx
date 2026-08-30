import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'

type Props = {
  /** Controlled use on the listing; omit to navigate to /blog?q= on submit. */
  value?: string
  onChange?: (next: string) => void
  className?: string
  placeholder?: string
}

/**
 * One search field, two behaviours: controlled filtering on the blog listing,
 * or a form that carries the query to the listing from anywhere else.
 */
export function BlogSearch({
  value,
  onChange,
  className = '',
  placeholder = 'Search articles…',
}: Props) {
  const navigate = useNavigate()
  const [local, setLocal] = useState('')
  const controlled = onChange !== undefined
  const current = controlled ? (value ?? '') : local

  function set(next: string) {
    if (controlled) onChange(next)
    else setLocal(next)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (controlled) return
    const q = local.trim()
    navigate(q ? `/blog?q=${encodeURIComponent(q)}` : '/blog')
  }

  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`}>
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <Search
        size={17}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        id="blog-search"
        type="search"
        value={current}
        onChange={(event) => set(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-line bg-white py-3 pr-11 pl-11 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-navy"
      />
      {current && (
        <button
          type="button"
          onClick={() => set('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-wash hover:text-ink"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </form>
  )
}
