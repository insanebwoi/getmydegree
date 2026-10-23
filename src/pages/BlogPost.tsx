import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react'
import { Seo } from '../components/Seo'
import { metaFor } from '../data/meta'
import { courseSlug, guideCourses } from '../data/courses'
import { courses, site } from '../data/site'
import { postSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Photo } from '../components/Photo'
import { BlogSearch } from '../components/BlogSearch'
import { ShareArticle } from '../components/ShareArticle'
import { formatDate, getBody, getPost, loadBody, relatedPosts } from '../data/posts'
import { useIsPublished } from '../data/usePublishedPosts'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined
  const released = useIsPublished(slug)

  // Bodies live in their own chunk. It is preloaded before hydration, so this
  // is already populated on first render; the effect only covers client-side
  // navigation from the listing.
  const [body, setBody] = useState(() => (slug ? getBody(slug) : undefined))

  useEffect(() => {
    if (!slug || body) return
    let live = true
    loadBody(slug).then((html) => {
      if (live) setBody(html)
    })
    return () => {
      live = false
    }
  }, [slug, body])

  // An unknown slug is a 404, not an empty article   and so is one whose
  // release moment has not arrived, which keeps a guessed URL from reading
  // tomorrow's article today.
  if (!post || !released) return <NotFound />

  const related = relatedPosts(post.slug)
  // Programmes this guide should hand the reader next.
  const clusterSpec = guideCourses[post.slug]
  const cluster = clusterSpec && {
    label: clusterSpec.label,
    courses: clusterSpec.codes
      .map((code) => courses.find((c) => c.code === code))
      .filter((c): c is (typeof courses)[number] => Boolean(c)),
  }

  return (
    <>
      <Seo {...metaFor(`/blog/${post.slug}`)} schema={postSchema(post.slug)} />

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
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to="/blog" itemProp="item" className="hover:text-navy">
              <span itemProp="name">Blog</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              itemProp="item"
              className="hover:text-navy"
            >
              <span itemProp="name">{post.category}</span>
            </Link>
            <meta itemProp="position" content="3" />
          </li>
          <li aria-hidden="true">/</li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
            className="line-clamp-1 font-medium text-ink"
          >
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="4" />
          </li>
        </ol>
      </nav>

      <article itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={post.excerpt} />
        <meta itemProp="datePublished" content={post.publishedAt} />
        <meta
          itemProp="dateModified"
          content={post.updated ? new Date(post.updated).toISOString() : post.publishedAt}
        />
        <meta itemProp="author" content={post.author} />
        {/*
          The header keeps its banner, but not the article's own cover.

          Using the cover here was what buried it: these covers carry their
          own headline and artwork, and the wash that makes a heading legible
          dimmed the picture while the page's type sat over lettering. The
          shared blog banner has no words in it, so it takes the wash the way
          a header photograph is supposed to   and the article's cover is left
          to open the content, at full size, where it can actually be read.
        */}
        <section className="shell pt-1 pb-7 lg:pb-9">
          <div className="panel relative isolate overflow-hidden border-transparent px-4 py-11 sm:px-8 sm:py-14 lg:py-16">
            <Photo
              name="blog-banner"
              rounded="none"
              priority
              className="absolute inset-0 -z-20 h-full w-full object-[50%_35%]"
            />
            {/* The wash hugs the text block rather than the panel edge. */}
            <div
              aria-hidden="true"
              className="page-brush-soft absolute -inset-x-16 -inset-y-16 -z-10 sm:-inset-x-32 sm:-inset-y-24"
            />

            <Reveal className="relative mx-auto max-w-3xl text-center">
              <Link to="/blog" className="action text-sm font-medium text-navy">
                <ArrowLeft size={15} className="mr-1.5" aria-hidden="true" />
                All articles
              </Link>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="badge">{post.category}</span>
                <span className="text-base text-ink/75 md:text-sm">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes}{' '}
                  min read
                </span>
              </div>
              <h1 className="t-h1 mt-5">{post.title}</h1>
              <p className="t-body mx-auto mt-5 max-w-2xl text-ink/85">{post.excerpt}</p>
              <p className="mt-6 text-base text-ink/75 md:text-sm">By {post.author}</p>
            </Reveal>
          </div>
        </section>

        <div className="shell pb-16 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/*
              The article sits on its own white surface, like every other block
              on the site, rather than directly on the page wash. Its children
              share one measure so the text and CTA align.
            */}
            <div className="lg:col-span-8">
              <div className="panel card-p sm:p-8 lg:p-10 [&>*]:mx-auto [&>*]:max-w-[68ch]">
                {/* The cover opens the article itself, on the same surface and
                    the same measure as the text, rather than floating above it
                    as a banner. Its own 16:9, so none of the artwork is lost. */}
                <figure
                  className="my-0 overflow-hidden rounded-2xl border border-line/60 bg-navy-950/5 shadow-xs"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <Photo
                    src={post.cover}
                    alt={post.coverAlt ?? post.title}
                    title={post.coverAlt ?? post.title}
                    ratio="16/9"
                    rounded="card"
                    priority
                    className="w-full"
                    itemProp="contentUrl"
                  />
                  <meta itemProp="name" content={post.title} />
                  <meta itemProp="caption" content={post.coverAlt ?? post.title} />
                  <meta itemProp="description" content={post.excerpt} />
                  <meta itemProp="license" content={`${site.url}/about`} />
                  <meta itemProp="acquireLicensePage" content={`${site.url}/contact`} />
                  <meta itemProp="creditText" content="GetMyDegree Academic Guides" />
                  <meta itemProp="width" content="1400" />
                  <meta itemProp="height" content="787" />
                </figure>

                {/* Key Guide Takeaways block for Google Featured Snippets and instant reader orientation */}
                <div className="mt-8 rounded-2xl border border-gold-300/40 bg-gold-50/50 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-800">
                    <CheckCircle2 size={16} className="text-gold-600" aria-hidden="true" />
                    <span>Key Guide Takeaways</span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-ink/90">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gold-200/50 pt-3 text-xs text-muted">
                    <span>
                      By <strong>{post.author}</strong>
                    </span>
                    <span>•</span>
                    <span>Updated: {formatDate(post.updated ?? post.date)}</span>
                  </div>
                </div>

                {body ? (
                  <div
                    className="prose mt-9"
                    // Content is authored in this repo and compiled at build time.
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                ) : (
                  <div className="mt-9" aria-busy="true">
                    <span className="sr-only">Loading article…</span>
                    {[92, 100, 84, 96, 70].map((w, i) => (
                      <div
                        key={i}
                        className="mt-4 h-4 animate-pulse rounded bg-line"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                )}

                {/* Visible FAQ Accordion Section for Google Rich FAQ Snippets */}
                {post.faqs && post.faqs.length > 0 && (
                  <section
                    className="mt-12 border-t border-line pt-10"
                    aria-label="Frequently Asked Questions"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle size={20} className="text-gold-600" aria-hidden="true" />
                      <h2 className="t-h2 font-display font-medium text-ink">
                        Frequently Asked Questions
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      Direct answers to common questions on this topic according to current academic
                      guidelines.
                    </p>
                    <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-wash/40">
                      {post.faqs.map((faq, i) => (
                        <details
                          key={i}
                          className="group p-5 first:rounded-t-2xl last:rounded-b-2xl [&_summary::-webkit-details-marker]:hidden"
                          open={i === 0}
                        >
                          <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-ink transition-colors hover:text-navy">
                            <span>{faq.question}</span>
                            <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-muted transition-transform group-open:rotate-180">
                              <ChevronDown size={14} aria-hidden="true" />
                            </span>
                          </summary>
                          <div className="mt-3 text-sm leading-relaxed text-ink/80">
                            <p>{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                )}

                {cluster && cluster.courses.length > 0 && (
                  <Reveal delay={60} className="mt-11">
                    <div className="card card-p">
                      <h2 className="t-h3">{cluster.label}</h2>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {cluster.courses.map((c) => (
                          <li key={c.code}>
                            <Link
                              to={`/courses/${courseSlug(c)}`}
                              className="flex items-baseline gap-2 rounded-xl p-2 transition-colors hover:bg-wash"
                            >
                              <span className="font-display text-sm font-semibold text-navy">
                                {c.code}
                              </span>
                              <span className="text-sm text-muted">
                                {c.name} · {c.years}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}

                <Reveal delay={60}>
                  <ShareArticle slug={post.slug} title={post.title} excerpt={post.excerpt} />
                </Reveal>

                <Reveal delay={80} className="mt-10">
                  <div className="card card-p flex flex-col gap-5 bg-navy-950 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
                    <div>
                      <h2 className="t-h3 font-display font-medium">
                        Want this checked for your own case?
                      </h2>
                      <p className="mt-2 text-base text-white/65 md:text-sm">
                        Send us your marksheets and we will tell you exactly where you stand.
                      </p>
                    </div>
                    <Link to="/contact" className="btn btn-gold shrink-0">
                      Book a free consultation
                    </Link>
                  </div>
                </Reveal>

                {/* Get My Degree Authoritative Knowledge Box */}
                <div className="mt-8 rounded-2xl border border-navy/15 bg-navy-50/50 p-6">
                  <div className="flex items-center gap-2">
                    <span className="badge border-navy/30 bg-navy/10 text-navy font-semibold">Official Knowledge Base</span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-semibold text-navy">
                    About Get My Degree
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/85">
                    <strong>Get My Degree</strong> is India&rsquo;s dedicated higher education counselling and degree completion institution, guiding working professionals and discontinued students toward UGC-DEB recognized degrees. Read our <Link to="/blog/get-my-degree-official-guide" className="font-semibold text-navy underline decoration-gold hover:text-navy-800">Get My Degree Official Guide to Degree Completion</Link> or verify <Link to="/blog/get-my-degree-reviews-validity-guide" className="font-semibold text-navy underline decoration-gold hover:text-navy-800">Get My Degree Reviews &amp; Validity</Link>.
                  </p>
                </div>
              </div>
            </div>

            {/* Related reading, in its own panel alongside the article */}
            <aside className="lg:col-span-4">
              <div className="panel p-4 sm:p-5 lg:sticky lg:top-28">
                <h2 className="font-display text-lg font-medium">More from the blog</h2>
                <ul className="mt-4 grid gap-1.5">
                  {related.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 70} as="li">
                      <Link
                        to={`/blog/${p.slug}`}
                        className="flex gap-3 rounded-2xl p-2 transition-colors hover:bg-wash"
                      >
                        <span className="w-16 shrink-0">
                          <Photo src={p.cover} alt={p.coverAlt ?? p.title} ratio="1/1" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col justify-center">
                          <span className="text-xs font-medium text-gold-700">{p.category}</span>
                          <span className="mt-0.5 font-display text-sm leading-snug font-medium">
                            {p.title}
                          </span>
                          <span className="mt-0.5 text-xs text-muted">
                            {p.readingMinutes} min read
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>

                <Link
                  to="/blog"
                  className="action mt-2 border-t border-line pt-3 text-sm font-medium text-navy"
                >
                  All articles
                  <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
                </Link>

                {/* Search from the article; the query is carried to the listing. */}
                <div className="mt-4 border-t border-line pt-4">
                  <p className="text-base font-medium md:text-sm">Search the blog</p>
                  <BlogSearch className="mt-3" placeholder="Search articles…" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
