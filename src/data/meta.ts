import { site } from './site'
import { posts } from './posts'

export type PageMeta = { title: string; description: string; path: string }

/** Per-route head content. Shared by <Seo> at runtime and the prerender step. */
export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'GetMyDegree Institutions   Complete Your UG & PG Degree in India',
    description: site.description,
    path: '/',
  },
  '/about': {
    title: 'About Us   Recognized, Flexible Degree Programs',
    description:
      'Since 2021, GetMyDegree Institutions has helped 10,000+ students complete recognized UG and PG degrees through flexible, career-focused learning pathways.',
    path: '/about',
  },
  '/courses': {
    title: 'Courses   UGC Recognized UG & PG Degree Programs',
    description:
      'Explore UGC recognized UG and PG programs   B.Com, BBA, BCA, BA, B.Sc, MBA, MCA, M.Com and MSW   built for working professionals and gap-year students.',
    path: '/courses',
  },
  '/blog': {
    title: 'Blog   Guidance on degrees, admissions and recognition',
    description:
      'Plain guidance on UGC recognition, credit transfer, studying while working and what a degree costs, from the GetMyDegree academic team.',
    path: '/blog',
  },
  '/contact': {
    title: 'Contact   Book a Free Counseling Session',
    description:
      'Speak with GetMyDegree academic experts, request a brochure, or book a free counseling session. Centres in Thrissur and Malappuram, Kerala.',
    path: '/contact',
  },
}

/** Head content for any prerendered path, including individual posts. */
export function metaFor(path: string): PageMeta {
  const fixed = pageMeta[path]
  if (fixed) return fixed
  const slug = path.replace(/^\/blog\//, '')
  const post = posts.find((p) => p.slug === slug)
  if (post) return { title: post.title, description: post.excerpt, path }
  return pageMeta['/']
}

export function fullTitle(meta: PageMeta) {
  return meta.path === '/' ? meta.title : `${meta.title} | ${site.shortName}`
}

export function canonical(meta: PageMeta) {
  return `${site.url}${meta.path === '/' ? '/' : meta.path}`
}
