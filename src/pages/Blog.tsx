import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { blogSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { formatDate, postsByDate } from '../data/posts'

const [lead, ...rest] = postsByDate

export default function Blog() {
  return (
    <>
      <Seo {...pageMeta['/blog']} schema={blogSchema} />

      <PageHero
        badge="Blog"
        title="Straight answers about degrees, admissions and recognition"
        intro="No sales copy. What we tell students on the phone, written down — so you can check it before you commit to anything."
      />

      {/* Lead article, given the space its length deserves. */}
      <section className="shell pb-12 lg:pb-16">
        <Reveal>
          <article className="card card-hover overflow-hidden">
            <Link to={`/blog/${lead.slug}`} className="grid lg:grid-cols-2">
              <Photo name={lead.image} ratio="16/9" rounded="none" className="lg:h-full" />
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

      <section className="shell pb-16 lg:pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70}>
              <article className="card card-hover h-full overflow-hidden">
                <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
                  <Photo name={post.image} ratio="16/9" rounded="none" />
                  <div className="card-p flex flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge">{post.category}</span>
                      <span className="text-base text-muted md:text-sm">{post.readingMinutes} min read</span>
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
          ))}
        </div>
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
