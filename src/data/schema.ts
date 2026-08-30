import { centers, courses, site } from './site'
import { posts, postsByDate } from './posts'

/** JSON-LD structured data, one export per route. */

export const homeSchema: object = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.svg`,
      email: site.email,
      telephone: site.phone,
      foundingDate: String(site.established),
      description: site.description,
      sameAs: [site.social.facebook, site.social.twitter, site.social.youtube],
      address: centers.map((c) => ({
        '@type': 'PostalAddress',
        streetAddress: c.address,
        addressLocality: c.city,
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
}

export const aboutSchema: object = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${site.name}`,
  url: `${site.url}/about`,
  description:
    'Since 2021, GetMyDegree Institutions has helped 10,000+ students complete recognized UG and PG degrees through flexible learning pathways.',
  mainEntity: { '@id': `${site.url}/#organization` },
}

export const coursesSchema: object = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UG & PG Programs at GetMyDegree Institutions',
  itemListElement: courses.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: `${c.code} — ${c.name}`,
      description: c.body,
      educationalLevel: c.level === 'UG' ? 'Undergraduate' : 'Postgraduate',
      provider: { '@type': 'EducationalOrganization', name: site.name, url: site.url },
    },
  })),
}

export const contactSchema: object = {
  '@context': 'https://schema.org',
  '@graph': centers.map((c) => ({
    '@type': 'LocalBusiness',
    name: `${site.name} — ${c.city}`,
    url: `${site.url}/contact`,
    telephone: c.phoneHref,
    email: site.email,
    image: `${site.url}/logo.svg`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address,
      addressLocality: c.city,
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  })),
}

export const blogSchema: object = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${site.url}/blog`,
  name: `${site.name} Blog`,
  description:
    'Guidance on UGC recognition, credit transfer, studying while working and degree costs.',
  publisher: { '@id': `${site.url}/#organization` },
  blogPost: postsByDate.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    url: `${site.url}/blog/${post.slug}`,
  })),
}

/** Article schema for one post, used by the detail page and the prerenderer. */
export function postSchema(slug: string): object | undefined {
  const post = posts.find((p) => p.slug === slug)
  if (!post) return undefined
  const url = `${site.url}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.date,
    timeRequired: `PT${post.readingMinutes}M`,
    image: `${site.url}${post.cover}`,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${site.url}/blog` },
  }
}
