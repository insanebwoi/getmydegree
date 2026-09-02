import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { blogSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { BlogSearch } from '../components/BlogSearch'
import { Photo } from '../components/Photo'
import { categories, formatDate, PAGE_SIZE, postsByDate, type Post } from '../data/posts'

function Card({ post, delay }: { post: Post; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="card card-hover h-full overflow-hidden">
        <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
          {/* Decorative: the title follows immediately. */}
          <Photo src={post.cover} alt="" ratio="16/9" rounded="none" />
          <div className="card-p flex flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge">{post.category}</span>
              <span className="text-base text-muted md:text-sm">
                {post.readingMinutes} min read
              </span>
            </div>
            <h2 className="t-h3 mt-3 font-display font-medium">{post.title}</h2>
            <p className="mt-2 flex-1 text-base leading-relaxed text-muted md:text-sm">
              {post.excerpt}
            </p>
            <span className="action mt-4 text-sm font-medium text-navy">
              Read the article
              <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  )
}

export default function Blog() {
  const [params, setParams] = useSearchParams()

  // The prerendered HTML is unfiltered, so the first client render must be too;
  // the query is applied once hydration is done.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const query = mounted ? (params.get('q') ?? '') : ''
  const [category, setCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return postsByDate.filter((post) => {
      if (category && post.category !== category) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      )
    })
  }, [category, query])
  const [lead, ...rest] = filtered
  const shown = rest.slice(0, page * PAGE_SIZE)
  const remaining = rest.length - shown.length

  function choose(next: string | null) {
    setCategory(next)
    setPage(1)
  }

  function search(next: string) {
    setParams(next ? { q: next } : {}, { replace: true })
    setPage(1)
  }

  return (
    <>
      <Seo {...pageMeta['/blog']} schema={blogSchema} />

      <PageHero
        badge="Blog"
        title="Straight answers about degrees, admissions and recognition"
        intro="No sales copy. What we tell students on the phone, written down   so you can check it before you commit to anything."
      />

      {/* Search and categories share one row; the chips scroll when they outgrow it. */}
      <div className="shell pb-8">
        <Reveal>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <BlogSearch value={query} onChange={search} className="lg:w-72 lg:shrink-0" />

            <div
              className="chip-row flex gap-2 overflow-x-auto lg:flex-1"
              role="group"
              aria-label="Filter by category"
            >
              <button
                type="button"
                onClick={() => choose(null)}
                aria-pressed={category === null}
                className={`badge min-h-10 shrink-0 ${category === null ? 'border-navy bg-navy text-white' : ''
                  }`}
              >
                All articles
              </button>
              {categories.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => choose(name)}
                  aria-pressed={category === name}
                  className={`badge min-h-10 shrink-0 ${category === name ? 'border-navy bg-navy text-white' : ''
                    }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Result count, announced when the list changes. */}
        <p role="status" className="mt-4 text-base text-muted md:text-sm">
          {filtered.length === 0
            ? 'No articles match that search.'
            : `${filtered.length} article${filtered.length === 1 ? '' : 's'}${query ? ` matching “${query.trim()}”` : ''
            }`}
        </p>
      </div>

      {lead && (
        <section className="shell pb-12 lg:pb-16">
          <Reveal>
            <article className="card card-hover overflow-hidden">
              <Link to={`/blog/${lead.slug}`} className="grid lg:grid-cols-2">
                <Photo
                  src={lead.cover}
                  alt=""
                  ratio="16/9"
                  rounded="none"
                  priority
                  className="lg:h-full"
                />
                <div className="card-p flex flex-col justify-center lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge">{lead.category}</span>
                    <span className="text-base text-muted md:text-sm">
                      {formatDate(lead.date)} · {lead.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="t-h2 mt-4 font-display font-medium">{lead.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{lead.excerpt}</p>
                  <span className="action mt-5 text-sm font-medium text-navy">
                    Read the article
                    <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>
        </section>
      )}

      <section className="shell pb-16 lg:pb-24">
        {filtered.length === 0 && (
          <Reveal>
            <div className="panel card-p text-center sm:p-10">
              <h2 className="t-h3 font-display font-medium">Nothing matched that</h2>
              <p className="mt-2 text-base text-muted">
                Try a different word, or ask us directly   we answer questions the blog has not
                covered yet.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    search('')
                    choose(null)
                  }}
                  className="btn btn-ghost"
                >
                  Clear filters
                </button>
                <Link to="/contact" className="btn btn-primary">
                  Ask a counselor
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, i) => (
            <Card key={post.slug} post={post} delay={(i % PAGE_SIZE) * 60} />
          ))}
        </div>

        {remaining > 0 && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setPage((p) => p + 1)} className="btn btn-ghost">
              Load {Math.min(remaining, PAGE_SIZE)} more
            </button>
            <p className="mt-3 text-base text-muted md:text-sm">
              Showing {shown.length + 1} of {filtered.length} articles
            </p>
          </div>
        )}
      </section>

      <section className="shell pb-12 sm:pb-16 lg:pb-24">
        <Reveal>
          <div className="card card-p flex flex-col items-center gap-6 text-center sm:p-9 lg:flex-row lg:justify-between lg:p-12 lg:text-left">
            <div className="max-w-xl">
              <h2 className="t-h2">Still have a question we have not written up?</h2>
              <p className="t-body mt-3 text-muted">
                Ask a counselor directly. Twenty minutes, no obligation.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary shrink-0">
              Book a free consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
