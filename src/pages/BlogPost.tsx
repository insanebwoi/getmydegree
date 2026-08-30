import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { postSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Photo } from '../components/Photo'
import { BlogSearch } from '../components/BlogSearch'
import { formatDate, getBody, getPost, loadBody, relatedPosts } from '../data/posts'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

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

  // An unknown slug is a 404, not an empty article.
  if (!post) return <NotFound />

  const related = relatedPosts(post.slug)

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        schema={postSchema(post.slug)}
      />

      <article>
        <section className="shell pt-1 pb-8 lg:pb-12">
          <div className="panel px-4 py-11 sm:px-8 sm:py-14 lg:py-16">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Link to="/blog" className="action text-sm font-medium text-navy">
                <ArrowLeft size={15} className="mr-1.5" aria-hidden="true" />
                All articles
              </Link>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="badge">{post.category}</span>
                <span className="text-base text-muted md:text-sm">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes}{' '}
                  min read
                </span>
              </div>
              <h1 className="t-h1 mt-5">{post.title}</h1>
              <p className="t-body mx-auto mt-5 max-w-2xl text-muted">{post.excerpt}</p>
              <p className="mt-6 text-base text-muted md:text-sm">By {post.author}</p>
            </Reveal>
          </div>
        </section>

        <div className="shell pb-16 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/*
              The article sits on its own white surface, like every other block
              on the site, rather than directly on the page wash. Its children
              share one measure so the cover, text and CTA align.
            */}
            <div className="lg:col-span-8">
              <div className="panel card-p sm:p-8 lg:p-10 [&>*]:mx-auto [&>*]:max-w-[68ch]">
                <Reveal>
                  <Photo src={post.cover} alt={post.title} ratio="16/9" priority />
                </Reveal>

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
                        {/* Decorative: the title sits right beside it. */}
                        <span className="w-16 shrink-0">
                          <Photo src={p.cover} alt="" ratio="1/1" />
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
