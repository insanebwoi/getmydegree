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
    title: 'Get My Degree — UGC Approved Distance Degrees in Kerala',
    description:
      'Complete your UGC recognized UG & PG degree with credit transfer. Centres in Thrissur and Malappuram, Kerala, for working professionals and dropouts.',
    path: '/',
    image: '/images/home/banner.webp',
    keywords:
      'get my degree, getmydegree, get my degree edu, getmydegreeedu, get my degree blog, degree completion, ugc approved online degree, distance degree kerala, credit transfer degree',
  },
  '/about': {
    title: 'About Get My Degree — Degree Counselling Since 2021',
    description:
      'Degree completion counselling since 2021, with centres in Thrissur and Malappuram. How Get My Degree checks eligibility and transfers your credits.',
    path: '/about',
    keywords: 'about get my degree, get my degree thrissur, get my degree malappuram, getmydegree counsellors',
  },
  '/courses': {
    title: 'Degree Programmes — B.Com, BBA, BCA, MBA | Get My Degree',
    description:
      'Distance and online UG and PG degrees for working professionals: B.Com, BBA, BCA, BA, B.Sc, MBA, MCA, M.Com and MSW. Compare eligibility and formats.',
    path: '/courses',
    keywords: 'get my degree courses, get my degree bcom, get my degree mba, get my degree bba, online degree programs',
  },
  '/blog': {
    title: 'Get My Degree Blog — Distance Degree Guides',
    description:
      'Plain guides on credit transfer, UGC and DEB recognition, government job validity and degree fees, from the Get My Degree counselling team in Kerala.',
    path: '/blog',
    image: '/images/blog/blog-banner.webp',
    imageAlt: 'Get My Degree Official Blog and Degree Guides',
    keywords:
      'get my degree blog, get my degree, getmydegree, get my degree edu, getmydegreeedu, ugc deb degree guide, credit transfer degree, online degree kerala',
  },
  '/universities': {
    title: 'Partner Universities | Get My Degree',
    description:
      'The universities that award your degree: Rabindranath Tagore University, PRIST and Bharathidasan in India, and Marjon University in the UK.',
    path: '/universities',
    keywords: 'get my degree partner universities, get my degree ugc universities, rtu bhopal, prist university',
  },
  '/contact': {
    title: 'Contact Get My Degree — Thrissur & Malappuram',
    description:
      'Talk to an academic counsellor at Get My Degree about eligibility, credit transfer and university options. Physical centres in Thrissur and Malappuram, Kerala.',
    path: '/contact',
    keywords: 'contact get my degree, get my degree phone number, get my degree thrissur address, get my degree malappuram',
  },
  '/credit-transfer': {
    title: 'Credit Transfer Degree in Kerala | Get My Degree',
    description:
      'Left a degree partway through? Carry the semesters you passed to a recognized university and finish only what remains. Free assessment in Thrissur.',
    path: '/credit-transfer',
    image: '/images/credit-transfer/credit-transfer-banner.webp',
    imageAlt: 'Complete your discontinued degree with credit transfer — Get My Degree',
    keywords: 'credit transfer degree kerala, complete discontinued degree, degree credit transfer, lateral entry degree kerala',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Get My Degree',
    description:
      'What Get My Degree collects through this website and during admission, how it is used and shared, and how to ask us to correct or delete it.',
    path: '/privacy-policy',
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
        title: `Distance ${course.code} Degree in Kerala`,
        description: `${course.code} (${course.name}) by distance or online: a ${course.years} ${level.toLowerCase()} programme you study around work. Eligibility and admission.`,
        path,
      }
    }
  }

  if (path.startsWith('/universities/')) {
    const slug = path.replace('/universities/', '')
    const university = universities.find((u) => u.slug === slug)
    if (university) {
      return {
        // The longest name runs the full title past 60 characters, so the
        // qualifier is dropped when it would not fit.
        title:
          university.name.length > 25 ? `${university.name} Admission` : `${university.name} Distance Admission`,
        description: `${university.name}, ${university.address.locality}: what it offers, who can apply, and how to check its recognition for your programme before you enrol.`,
        path,
      }
    }
  }

  const slug = path.replace(/^\/blog\//, '')
  const post = allPosts.find((p) => p.slug === slug)
  if (post) {
    return {
      title: post.seoTitle ?? post.title,
      description: post.description ?? post.excerpt,
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
