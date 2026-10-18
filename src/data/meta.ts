import { site } from './site'
import { allPosts } from './posts'
import { courses, universities } from './site'
import { courseSlug } from './courses'
import { ogImageFor } from './images'

export type PageMeta = {
  title: string
  description: string
  path: string
  /** Absolute or root-relative image for OG/Twitter. Falls back to the site card. */
  image?: string
  /** Alt text for the image, passed to og:image:alt and twitter:image:alt */
  imageAlt?: string
  /** og:type. Articles set 'article' so scrapers read the published dates. */
  type?: 'website' | 'article'
  /** Set on pages that must stay out of the index (404, thin filtered views). */
  noindex?: boolean
  /** Article-only, emitted as article:published_time / article:modified_time. */
  publishedTime?: string
  modifiedTime?: string
  section?: string
  keywords?: string
}

/**
 * Per-route head content. Titles lead with the search intent rather than the
 * brand, since the brand is rarely the query   "Home | GetMyDegree" wins
 * nothing. Each is unique, and each description is written to be the snippet.
 */
export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Get My Degree — UGC Recognized Online Degrees & Fast-Track Degree Completion',
    description:
      'Get My Degree: Complete your UGC recognized UG & PG degree with credit transfer for working professionals and dropouts across India.',
    path: '/',
    image: '/images/home/banner.webp',
    keywords:
      'get my degree, getmydegree, get my degree edu, getmydegreeedu, get my degree blog, degree completion, ugc approved online degree, distance degree kerala, credit transfer degree',
  },
  '/about': {
    title: 'About Get My Degree — Academic Counselling & Degree Completion Since 2021',
    description:
      'Guiding students through UGC recognized UG and PG admissions since 2021, with centres in Thrissur and Malappuram. How Get My Degree assesses eligibility and transfers credits.',
    path: '/about',
    keywords: 'about get my degree, get my degree thrissur, get my degree malappuram, getmydegree counsellors',
  },
  '/courses': {
    title: 'Degree Programmes — B.Com, BBA, BCA, MBA | Get My Degree',
    description:
      'UGC recognized UG and PG degree programmes for working professionals at Get My Degree: B.Com, BBA, BCA, BA, B.Sc, MBA, MCA, M.Com and MSW. Compare eligibility and study formats.',
    path: '/courses',
    keywords: 'get my degree courses, get my degree bcom, get my degree mba, get my degree bba, online degree programs',
  },
  '/blog': {
    title: 'Get My Degree Blog — Degree Guides, UGC Recognition & Admissions',
    description:
      'The official Get My Degree blog. Clear, expert guidance on academic credit transfer, UGC DEB degree recognition, government job validity, and flexible degree fees.',
    path: '/blog',
    image: '/images/blog/blog-banner.webp',
    imageAlt: 'Get My Degree Official Blog and Degree Guides',
    keywords:
      'get my degree blog, get my degree, getmydegree, get my degree edu, getmydegreeedu, ugc deb degree guide, credit transfer degree, online degree kerala',
  },
  '/universities': {
    title: 'Partner Universities — UGC Recognized Institutions | Get My Degree',
    description:
      'The accredited universities Get My Degree places students into across India and the UK: RTU, PRIST, Bharathidasan, and Plymouth Marjon. UGC approval confirmed.',
    path: '/universities',
    keywords: 'get my degree partner universities, get my degree ugc universities, rtu bhopal, prist university',
  },
  '/contact': {
    title: 'Contact Get My Degree — Book Free Degree Counselling in Kerala',
    description:
      'Talk to an academic counsellor at Get My Degree about eligibility, credit transfer and university options. Physical centres in Thrissur and Malappuram, Kerala.',
    path: '/contact',
    keywords: 'contact get my degree, get my degree phone number, get my degree thrissur address, get my degree malappuram',
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
  const post = allPosts.find((p) => p.slug === slug)
  if (post) {
    return {
      title: post.seoTitle ?? post.title,
      description: post.excerpt,
      path,
      image: post.cover,
      imageAlt: post.coverAlt ?? post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updated ? new Date(post.updated).toISOString() : post.publishedAt,
      section: post.category,
      keywords: post.keywords ?? `${post.category}, degree completion, online degree, distance education, UGC approved degree, GetMyDegree`,
    }
  }

  return { ...pageMeta['/'], path, noindex: true }
}

/**
 * Titles already carrying the brand are left alone, so no page ends up saying
 * "Get My Degree" twice. Everything else gets the brand suffix.
 */
export function fullTitle(meta: PageMeta) {
  const brand = 'Get My Degree'
  const titleLower = meta.title.toLowerCase()
  if (titleLower.includes('get my degree') || titleLower.includes('getmydegree')) {
    return meta.title
  }
  return `${meta.title} | ${brand}`
}

/** One canonical form: absolute, https, no trailing slash except the root. */
export function canonical(meta: PageMeta) {
  return `${site.url}${meta.path === '/' ? '/' : meta.path.replace(/\/$/, '')}`
}

/**
 * The og:image for this page: an absolute URL, plus its pixel size where
 * known. The default is the hero photograph. A JPEG/PNG file is preferred
 * over whatever format the page itself uses, since WebP/AVIF render
 * unreliably as link-preview images on Facebook, LinkedIn and WhatsApp.
 */
export function ogImage(meta: PageMeta): { url: string; width?: number; height?: number } {
  const path = meta.image ?? '/images/home/hero-portrait.webp'
  if (path.startsWith('http')) {
    /* A remote cover has no file on disk to measure, but it was requested at a
       specific size, so the request itself is the measurement. Without these
       a social card renders blank until the crawler has fetched the image. */
    const query = new URLSearchParams(path.split('?')[1] ?? '')
    const width = Number(query.get('w')) || 1400
    const height = Number(query.get('h')) || 787
    const cleanUrl = path.split('?')[0]
    return { url: cleanUrl, width, height }
  }
  const name = path.replace(/^.*\//, '').replace(/\.[^.]+$/, '')
  const { src, width, height } = ogImageFor(name, path)
  const url = src.startsWith('http') ? src : `${site.url}${src}`
  return { url, width, height }
}
