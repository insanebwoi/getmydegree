import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { blogSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { BlogSearch } from '../components/BlogSearch'
import { Photo } from '../components/Photo'
import { categories, formatDate, PAGE_SIZE, type Post } from '../data/posts'
import { usePublishedPosts } from '../data/usePublishedPosts'
import { isPreviewing } from '../data/postSchedule'

function Card({ post, delay }: { post: Post; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article
        className="card card-hover h-full overflow-hidden"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={post.publishedAt} />
        <meta itemProp="author" content={post.author} />
        <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
          <figure className="my-0 overflow-hidden" itemScope itemType="https://schema.org/ImageObject">
            <Photo
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              title={post.coverAlt ?? post.title}
              ratio="16/9"
              rounded="none"
              itemProp="contentUrl"
            />
            <meta itemProp="name" content={post.title} />
            <meta itemProp="caption" content={post.coverAlt ?? post.title} />
          </figure>
          <div className="card-p flex flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge">{post.category}</span>
              <span className="text-base text-muted md:text-sm">
                {post.readingMinutes} min read
              </span>
            </div>
            <h2 className="t-h3 mt-3 font-display font-medium" itemProp="name">
              {post.title}
            </h2>
            <p className="mt-2 flex-1 text-base leading-relaxed text-muted md:text-sm" itemProp="description">
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

  // Published on the visitor's clock, so a tab left open overnight picks up
  // the next morning's article without a reload or a deploy.
  const live = usePublishedPosts()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return live.filter((post) => {
      if (category && post.category !== category) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      )
    })
  }, [category, query, live])
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
      <Seo {...pageMeta['/blog']} noindex={Boolean(query || category)} schema={blogSchema} />

      <nav aria-label="Breadcrumb" className="shell pt-6">
        <ol
          className="flex flex-wrap items-center gap-1.5 text-xs text-muted"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to="/" itemProp="item" className="hover:text-navy">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
            className="font-medium text-ink"
          >
            <span itemProp="name">Get My Degree Blog</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <PageHero
        image="blog-banner"
        badge="Get My Degree Knowledge Base"
        title="Get My Degree Blog — Degree Completion, Credit Transfer & UGC Guides"
        intro="The official educational intelligence desk. Straight, verified answers on UGC-DEB recognition, lateral entry, university approvals, and degree programs for working professionals."
      />

      {/* Only ever rendered by `npm run dev` with the preview switch on. The
          `import.meta.env.DEV` test is what makes the whole block statically
          dead in a production build   gating on the constant alone left this
          markup in the bundle, because a minifier cannot see through the IIFE
          behind it.
          Without it, seeing thirty articles listed is indistinguishable from
          the schedule having broken. */}
      {import.meta.env.DEV && isPreviewing && (
        <div className="shell pb-6">
          <p className="rounded-xl border border-gold/40 bg-gold-50 px-4 py-2.5 text-xs font-medium text-navy">
            Dev preview: every scheduled article is listed, including ones not yet published. Add{' '}
            <code>?preview=off</code> to any URL to see the site as a visitor does.
          </p>
        </div>
      )}

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
                className={`badge min-h-10 shrink-0 ${
                  category === null ? 'border-navy bg-navy text-white' : ''
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
                  className={`badge min-h-10 shrink-0 ${
                    category === name ? 'border-navy bg-navy text-white' : ''
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
            : `${filtered.length} article${filtered.length === 1 ? '' : 's'}${
                query ? ` matching “${query.trim()}”` : ''
              }`}
        </p>
      </div>

      {lead && (
        <section className="shell pb-12 lg:pb-16">
          <Reveal>
            <article
              className="card card-hover overflow-hidden"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <meta itemProp="headline" content={lead.title} />
              <meta itemProp="datePublished" content={lead.publishedAt} />
              <meta itemProp="author" content={lead.author} />
              <Link to={`/blog/${lead.slug}`} className="grid lg:grid-cols-2 lg:items-center">
                {/*
                  The covers carry their own headline, so this one keeps its
                  16:9 shape instead of stretching to the height of the text
                  beside it   filling that height crops the sides, and the
                  first thing lost is the title written into the artwork.

                  The wrapper is what makes that hold: `Photo` is always
                  `h-full`, which against the grid row resolves to the text
                  column's height. Against a plain auto-height parent it
                  resolves to auto, and the aspect ratio decides instead.
                */}
                <figure
                  className="my-0 overflow-hidden lg:self-center"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <Photo
                    src={lead.cover}
                    alt={lead.coverAlt ?? lead.title}
                    title={lead.coverAlt ?? lead.title}
                    ratio="16/9"
                    rounded="none"
                    priority
                    itemProp="contentUrl"
                  />
                  <meta itemProp="name" content={lead.title} />
                  <meta itemProp="caption" content={lead.coverAlt ?? lead.title} />
                </figure>
                <div className="card-p flex flex-col justify-center lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge">{lead.category}</span>
                    <span className="text-base text-muted md:text-sm">
                      {formatDate(lead.date)} · {lead.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="t-h2 mt-4 font-display font-medium" itemProp="name">
                    {lead.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted" itemProp="description">
                    {lead.excerpt}
                  </p>
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
                Try a different word, or ask us directly we answer questions the blog has not
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

      {/* Frequently Asked Questions about Get My Degree */}
      <section className="shell pb-16 lg:pb-24" aria-label="Frequently Asked Questions about Get My Degree">
        <Reveal>
          <div className="card card-p sm:p-9 lg:p-12">
            <div className="flex items-center gap-2">
              <HelpCircle size={22} className="text-gold-600" aria-hidden="true" />
              <h2 className="t-h2 font-display font-medium text-ink">
                Frequently Asked Questions About Get My Degree
              </h2>
            </div>
            <p className="mt-2 text-base text-muted">
              Essential answers on degree validity, UGC approvals, credit transfer, and official portal updates.
            </p>

            <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-wash/30">
              <details className="group p-5 first:rounded-t-2xl [&_summary::-webkit-details-marker]:hidden" open>
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-ink transition-colors hover:text-navy">
                  <span>What is Get My Degree and what is its official website?</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-muted transition-transform group-open:rotate-180">
                    <ChevronDown size={14} aria-hidden="true" />
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-ink/80">
                  <p>
                    <strong>Get My Degree</strong> (GetMyDegree Institutions, established in 2021) is India’s premier higher education advisory platform specializing in UGC-recognized degree completion and credit transfer, providing direct university admissions, syllabus guides, and verified academic counseling.
                  </p>
                </div>
              </details>

              <details className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-ink transition-colors hover:text-navy">
                  <span>Are degrees completed through Get My Degree UGC approved and valid for government jobs?</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-muted transition-transform group-open:rotate-180">
                    <ChevronDown size={14} aria-hidden="true" />
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-ink/80">
                  <p>
                    Yes. All universities partnering with Get My Degree are statutory universities recognized by the University Grants Commission (UGC) under Section 2(f)/12(B) and entitled by the Distance Education Bureau (DEB). Under official UGC and Ministry of Education gazette notifications, these degrees are 100% equivalent to campus degrees for UPSC, Kerala PSC, SSC, Bank exams, and overseas immigration (WES).
                  </p>
                </div>
              </details>

              <details className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-ink transition-colors hover:text-navy">
                  <span>Can discontinued or dropout students complete their degree without starting from year one?</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-muted transition-transform group-open:rotate-180">
                    <ChevronDown size={14} aria-hidden="true" />
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-ink/80">
                  <p>
                    Yes. Under UGC guidelines and the Academic Bank of Credits (ABC ID), students who completed prior college semesters can transfer eligible credits to accredited partner universities. You do not have to repeat passed subjects—you only study and appear for remaining semester requirements through lateral entry.
                  </p>
                </div>
              </details>

              <details className="group p-5 last:rounded-b-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-ink transition-colors hover:text-navy">
                  <span>Where are Get My Degree physical counseling centres located?</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-muted transition-transform group-open:rotate-180">
                    <ChevronDown size={14} aria-hidden="true" />
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-ink/80">
                  <p>
                    Get My Degree maintains full-service academic counseling centres in Kerala at <strong>Thrissur</strong> (Vadanappilly Centre, Beach Road, Labba Building, 1st Floor; Ph: 92076 77828) and <strong>Malappuram</strong> (Near Tirur Bus Stand, Forza Mall; Ph: 73566 44343). We also provide end-to-end digital admissions for students across India.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </Reveal>
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
