import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { metaFor } from '../data/meta'
import { courseSlug, guideCourses } from '../data/courses'
import { courses } from '../data/site'
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
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <li>
            <Link to="/" className="hover:text-navy">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/blog" className="hover:text-navy">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="line-clamp-1 font-medium text-ink">
            {post.title}
          </li>
        </ol>
      </nav>

      <article>
        {/*
          The cover is shown, not sat behind the title.

          It used to be the background of this header, washed out under the
          words. That reads well for a photograph, and badly for these covers:
          they carry their own headline and artwork, so the wash dimmed the
          picture and the type sat on top of lettering. The heading block now
          stands on the page wash like any other, and the cover follows it at
          full width in its own shape, uncropped.
        */}
        <section className="shell pt-1 pb-7 lg:pb-9">
          <div className="relative isolate px-4 py-10 sm:px-8 sm:py-12 lg:py-14">
            <div
              aria-hidden="true"
              className="page-brush-soft absolute -inset-x-16 -inset-y-10 -z-10 sm:-inset-x-32"
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

        {/* The cover at full width, in its own 16:9, so nothing in the artwork
            is cropped away. */}
        <section className="shell pb-10 lg:pb-14">
          <Reveal>
            <Photo
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              ratio="16/9"
              rounded="panel"
              priority
              className="w-full"
            />
          </Reveal>
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

                <Reveal delay={80} className="mt-11">
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
