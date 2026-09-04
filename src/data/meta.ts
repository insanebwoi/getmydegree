import { site } from './site'
import { posts } from './posts'
import { courses, universities } from './site'
import { courseSlug } from './courses'

export type PageMeta = {
  title: string
  description: string
  path: string
  /** Absolute or root-relative image for OG/Twitter. Falls back to the site card. */
  image?: string
  /** og:type. Articles set 'article' so scrapers read the published dates. */
  type?: 'website' | 'article'
  /** Set on pages that must stay out of the index (404, thin filtered views). */
  noindex?: boolean
  /** Article-only, emitted as article:published_time / article:modified_time. */
  publishedTime?: string
  modifiedTime?: string
  section?: string
}

/**
 * Per-route head content. Titles lead with the search intent rather than the
 * brand, since the brand is rarely the query   "Home | GetMyDegree" wins
 * nothing. Each is unique, and each description is written to be the snippet.
 */
export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Complete Your UG or PG Degree While Working',
    description:
      'Finish an unfinished degree or start a new UG or PG programme around your job. Credit transfer for completed semesters, flexible study, free counselling.',
    path: '/',
  },
  '/about': {
    title: 'About Us — Degree Counselling Since 2021',
    description:
      'Guiding students through UG and PG admissions since 2021, with centres in Thrissur and Malappuram. How we assess eligibility and transfer credits.',
    path: '/about',
  },
  '/courses': {
    title: 'UG & PG Degree Programmes — B.Com, BBA, BCA, MBA',
    description:
      'Nine UG and PG programmes for working professionals: B.Com, BBA, BCA, BA, B.Sc, MBA, MCA, M.Com and MSW. Compare duration, eligibility and study format.',
    path: '/courses',
  },
  '/blog': {
    title: 'Degree Guides — Credit Transfer & Recognition',
    description:
      'Plain guidance on credit transfer, degree recognition, government-job eligibility and course fees, from the GetMyDegree academic team.',
    path: '/blog',
  },
  '/universities': {
    title: 'Partner Universities — Where Your Degree Is Awarded',
    description:
      'The universities GetMyDegree places students into, in India and the United Kingdom. What each offers, where it is based, and how recognition is confirmed.',
    path: '/universities',
  },
  '/contact': {
    title: 'Book Free Degree Counselling — Thrissur & Malappuram',
    description:
      'Talk to an academic counsellor about eligibility, credit transfer and programme options. Centres in Thrissur and Malappuram, Kerala.',
    path: '/contact',
  },
}

/** Head content for any prerendered path, including posts and course pages. */
export function metaFor(path: string): PageMeta {
  const fixed = pageMeta[path]
  if (fixed) return fixed

  if (path.startsWith('/courses/')) {
    const slug = path.replace('/courses/', '')
    const course = courses.find((c) => courseSlug(c) === slug)
    if (course) {
      const level = course.level === 'UG' ? 'Undergraduate' : 'Postgraduate'
      return {
        title: `${course.code} Degree Online — ${course.name}`,
        description: `${course.code} (${course.name}): a ${course.years} ${level.toLowerCase()} programme in ${course.field}, studied around full-time work. Eligibility, format and admission steps.`,
        path,
      }
    }
  }

  if (path.startsWith('/universities/')) {
    const slug = path.replace('/universities/', '')
    const university = universities.find((u) => u.slug === slug)
    if (university) {
      return {
        title: `${university.name} — Degrees & Admission`,
        description: `${university.type} in ${university.location}. What it offers, who can apply, and the programmes GetMyDegree places students into. Recognition confirmed at counselling.`,
        path,
      }
    }
  }

  const slug = path.replace(/^\/blog\//, '')
  const post = posts.find((p) => p.slug === slug)
  if (post) {
    return {
      title: post.seoTitle ?? post.title,
      description: post.excerpt,
      path,
      image: post.cover,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.category,
    }
  }

  return { ...pageMeta['/'], path, noindex: true }
}

/**
 * Titles already carrying the brand are left alone, so no page ends up saying
 * "GetMyDegree" twice. Everything else gets the short brand suffix.
 */
export function fullTitle(meta: PageMeta) {
  return meta.title.includes(site.shortName) ? meta.title : `${meta.title} | ${site.shortName}`
}

/** One canonical form: absolute, https, no trailing slash except the root. */
export function canonical(meta: PageMeta) {
  return `${site.url}${meta.path === '/' ? '/' : meta.path.replace(/\/$/, '')}`
}

/**
 * Absolute URL for an OG image. The default is the hero photograph   a real
 * asset at 1500x844, close enough to 1.91:1 for every scraper   rather than a
 * separately maintained card that would drift out of date.
 */
export function ogImage(meta: PageMeta) {
  const path = meta.image ?? '/images/home/hero-portrait.webp'
  return path.startsWith('http') ? path : `${site.url}${path}`
}
