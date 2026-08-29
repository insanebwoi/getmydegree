import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { postSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Photo } from '../components/Photo'
import { formatDate, getPost, postsByDate, type Block } from '../data/posts'
import NotFound from './NotFound'

function Body({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="t-h2 mt-12 font-display font-medium first:mt-0">{block.text}</h2>
    case 'list':
      return (
        <ul className="mt-6 grid gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="dot mt-2.5" aria-hidden="true" />
              <span className="t-body text-muted">{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="mt-8 border-l-2 border-gold pl-5 font-display text-xl leading-snug lg:text-2xl">
          {block.text}
        </blockquote>
      )
    default:
      return <p className="t-body mt-5 text-muted">{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  // An unknown slug is a 404, not an empty article.
  if (!post) return <NotFound />

  const related = postsByDate.filter((p) => p.slug !== post.slug).slice(0, 3)

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
                  <time dateTime={post.date}>{formatDate(post.date)}</time> ·{' '}
                  {post.readingMinutes} min read
                </span>
              </div>
              <h1 className="t-h1 mt-5">{post.title}</h1>
              <p className="t-body mx-auto mt-5 max-w-2xl text-muted">{post.excerpt}</p>
              <p className="mt-6 text-base text-muted md:text-sm">By {post.author}</p>
            </Reveal>
          </div>
        </section>

        <div className="shell pb-10 lg:pb-14">
          <Reveal>
            <Photo name={post.image} ratio="16/7" rounded="panel" priority />
          </Reveal>
        </div>

        <div className="shell pb-16 lg:pb-24">
          <Reveal className="mx-auto max-w-[68ch]">
            {post.body.map((block, i) => (
              <Body key={i} block={block} />
            ))}
          </Reveal>

          <Reveal delay={80} className="mx-auto mt-14 max-w-[68ch]">
            <div className="card card-p flex flex-col gap-5 bg-navy-950 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
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
      </article>

      <section className="shell pb-16 lg:pb-24">
        <Reveal>
          <h2 className="t-h2 font-display font-medium">More from the blog</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <article className="card card-hover h-full overflow-hidden">
                <Link to={`/blog/${p.slug}`} className="flex h-full flex-col">
                  <Photo name={p.image} ratio="16/9" rounded="none" />
                  <div className="card-p flex flex-1 flex-col">
                    <span className="badge self-start">{p.category}</span>
                    <h3 className="t-h3 mt-3 font-display font-medium">{p.title}</h3>
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
    </>
  )
}
