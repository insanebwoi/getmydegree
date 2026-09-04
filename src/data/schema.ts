import { centers, courses, site, universities } from './site'
import { posts, postsByDate } from './posts'
import { courseSlug, eligibilityFor, studyFormat } from './courses'

/**
 * JSON-LD structured data. Every node is anchored with an @id so pages can
 * reference the organization and website rather than restating them, and
 * nothing here asserts a fact the site cannot support: no ratings, no reviews,
 * no accreditation bodies, no fees, no graduate counts.
 */

const ORG = `${site.url}/#organization`
const WEBSITE = `${site.url}/#website`

const organization = {
  '@type': 'EducationalOrganization',
  '@id': ORG,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: { '@type': 'ImageObject', url: `${site.url}/logo.webp` },
  image: `${site.url}/logo.webp`,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.established),
  description: site.description,
  areaServed: { '@type': 'Country', name: 'India' },
  address: centers.map((c) => ({
    '@type': 'PostalAddress',
    streetAddress: c.address,
    addressLocality: c.city,
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  })),
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE,
  url: site.url,
  name: site.name,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG },
}

/** Breadcrumbs for any page below the root. */
export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path === '/' ? '/' : crumb.path}`,
    })),
  }
}

/** Wraps page-specific nodes with the shared organization and website. */
function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': [organization, website, ...nodes] }
}

export const homeSchema: object = graph({
  '@type': 'WebPage',
  '@id': `${site.url}/#webpage`,
  url: `${site.url}/`,
  name: site.name,
  description: site.description,
  isPartOf: { '@id': WEBSITE },
  about: { '@id': ORG },
})

export const aboutSchema: object = graph(
  {
    '@type': 'AboutPage',
    '@id': `${site.url}/about#webpage`,
    url: `${site.url}/about`,
    name: `About ${site.name}`,
    description:
      'How GetMyDegree Institutions guides students through UG and PG admissions, credit transfer and graduation.',
    isPartOf: { '@id': WEBSITE },
    mainEntity: { '@id': ORG },
  },
  breadcrumb([{ name: 'About', path: '/about' }]),
)

export const coursesSchema: object = graph(
  {
    '@type': 'CollectionPage',
    '@id': `${site.url}/courses#webpage`,
    url: `${site.url}/courses`,
    name: 'UG & PG Degree Programmes',
    isPartOf: { '@id': WEBSITE },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: courses.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${site.url}/courses/${courseSlug(c)}`,
        name: `${c.code} — ${c.name}`,
      })),
    },
  },
  breadcrumb([{ name: 'Courses', path: '/courses' }]),
)

/** One programme. Duration and level are real; recognition and fees are not
 *  asserted, because they depend on the partner university and the year. */
export function courseSchema(slug: string): object | undefined {
  const course = courses.find((c) => courseSlug(c) === slug)
  if (!course) return undefined
  const url = `${site.url}/courses/${slug}`
  const years = Number(course.years.match(/\d+/)?.[0] ?? 0)
  return graph(
    {
      '@type': 'Course',
      '@id': `${url}#course`,
      url,
      name: `${course.code} — ${course.name}`,
      description: course.body,
      educationalLevel: course.level === 'UG' ? 'Undergraduate' : 'Postgraduate',
      educationalCredentialAwarded: course.name,
      about: course.field,
      inLanguage: 'en',
      provider: { '@id': ORG },
      coursePrerequisites: eligibilityFor(course),
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: `P${years}Y`,
        description: studyFormat,
      },
    },
    breadcrumb([
      { name: 'Courses', path: '/courses' },
      { name: course.code, path: `/courses/${slug}` },
    ]),
  )
}

export const universitiesSchema: object = graph(
  {
    '@type': 'CollectionPage',
    '@id': `${site.url}/universities#webpage`,
    url: `${site.url}/universities`,
    name: 'Partner universities',
    isPartOf: { '@id': WEBSITE },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: universities.map((u, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${site.url}/universities/${u.slug}`,
        name: u.name,
      })),
    },
  },
  breadcrumb([{ name: 'Universities', path: '/universities' }]),
)

/** One partner university. Only what the site states about it: name, place,
 *  and how it is constituted   no ratings, rankings, fees or founding dates. */
export function universitySchema(slug: string): object | undefined {
  const university = universities.find((u) => u.slug === slug)
  if (!university) return undefined
  const url = `${site.url}/universities/${slug}`
  const [region, city] = university.location.split(',').map((part) => part.trim())
  return graph(
    {
      '@type': 'CollegeOrUniversity',
      '@id': `${url}#university`,
      url,
      name: university.name,
      description: university.body,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city ?? region,
        addressRegion: region,
        addressCountry: university.location.includes('Kingdom') ? 'GB' : 'IN',
      },
    },
    breadcrumb([
      { name: 'Universities', path: '/universities' },
      { name: university.name, path: `/universities/${slug}` },
    ]),
  )
}

export const contactSchema: object = graph(
  {
    '@type': 'ContactPage',
    '@id': `${site.url}/contact#webpage`,
    url: `${site.url}/contact`,
    name: `Contact ${site.name}`,
    isPartOf: { '@id': WEBSITE },
    about: { '@id': ORG },
  },
  ...centers.map((c) => ({
    '@type': 'LocalBusiness',
    '@id': `${site.url}/contact#${c.city.toLowerCase()}`,
    name: `${site.name} — ${c.city}`,
    url: `${site.url}/contact`,
    telephone: c.phoneHref,
    email: site.email,
    image: `${site.url}/logo.webp`,
    parentOrganization: { '@id': ORG },
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
  breadcrumb([{ name: 'Contact', path: '/contact' }]),
)

export const blogSchema: object = graph(
  {
    '@type': 'Blog',
    '@id': `${site.url}/blog#blog`,
    url: `${site.url}/blog`,
    name: `${site.name} degree guides`,
    description:
      'Guidance on credit transfer, degree recognition, studying while working and course fees.',
    isPartOf: { '@id': WEBSITE },
    publisher: { '@id': ORG },
    blogPost: postsByDate.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${site.url}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { '@type': 'Organization', '@id': ORG, name: post.author },
      url: `${site.url}/blog/${post.slug}`,
    })),
  },
  breadcrumb([{ name: 'Blog', path: '/blog' }]),
)

/** Article schema for one post, used by the detail page and the prerenderer. */
export function postSchema(slug: string): object | undefined {
  const post = posts.find((p) => p.slug === slug)
  if (!post) return undefined
  const url = `${site.url}/blog/${post.slug}`
  return graph(
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      headline: post.title,
      description: post.excerpt,
      articleSection: post.category,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      timeRequired: `PT${post.readingMinutes}M`,
      image: `${site.url}${post.cover}`,
      inLanguage: 'en-IN',
      author: { '@type': 'Organization', '@id': ORG, name: post.author },
      publisher: { '@id': ORG },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${site.url}/blog#blog` },
    },
    {
      '@type': 'Blog',
      '@id': `${site.url}/blog#blog`,
      url: `${site.url}/blog`,
      name: `${site.name} degree guides`,
    },
    breadcrumb([
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  )
}
