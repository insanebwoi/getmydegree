import { centers, courses, site, universities } from './site'
import { imageRights } from './imageRights'
import { ogImageFor } from './images'
import { allPosts, postsByDate } from './posts'
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
  legalName: 'GetMyDegree Institutions',
  alternateName: ['GetMyDegree', 'GetMyDegree Institutions'],
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    '@id': `${site.url}/#logo`,
    url: `${site.url}/logo.webp`,
    contentUrl: `${site.url}/logo.webp`,
    width: 400,
    height: 90,
    caption: 'Get My Degree Official Logo',
    ...imageRights(),
  },
  image: { '@id': `${site.url}/#logo` },
  email: site.email,
  telephone: `+${site.phoneHref.replace(/\D/g, '')}`,
  contactPoint: centers.map((c) => ({
    '@type': 'ContactPoint',
    contactType: 'admissions',
    telephone: `+${c.phoneHref.replace(/\D/g, '')}`,
    areaServed: 'IN',
  })),
  foundingDate: String(site.established),
  description:
    'Get My Degree is India\'s dedicated higher education counselling and degree completion institution providing UGC recognized UG and PG degrees, credit transfer, and flexible online education for working professionals.',
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Higher Education in India',
    'UGC DEB Degree Recognition',
    'Academic Bank of Credits (ABC)',
    'Lateral Entry Degree Completion',
    'Degree Completion for Working Professionals',
    'Online and Distance Education in Kerala',
    'B.Com, BBA, BCA, MBA, MCA Degree Programs',
  ],
  sameAs: Object.values(site.social),
  address: centers.map((c) => ({
    '@type': 'PostalAddress',
    streetAddress: c.address,
    addressLocality: c.locality,
    postalCode: c.postalCode,
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  })),
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE,
  url: site.url,
  name: site.name,
  alternateName: 'GetMyDegree',
  description: 'Official portal of Get My Degree — UGC approved degrees, credit transfer and admissions.',
  inLanguage: 'en-IN',
  publisher: { '@id': ORG },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${site.url}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
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
  return graph(
    {
      '@type': 'CollegeOrUniversity',
      '@id': `${url}#university`,
      url,
      name: university.name,
      description: university.body,
      sameAs: university.website,
      address: {
        '@type': 'PostalAddress',
        addressLocality: university.address.locality,
        addressRegion: university.address.region,
        addressCountry: university.address.country,
      },
    },
    breadcrumb([
      { name: 'Universities', path: '/universities' },
      { name: university.name, path: `/universities/${slug}` },
    ]),
  )
}

export const creditTransferSchema: object = graph(
  {
    '@type': 'Service',
    '@id': `${site.url}/credit-transfer#service`,
    name: 'Degree credit transfer counselling',
    serviceType: 'Degree completion through credit transfer',
    url: `${site.url}/credit-transfer`,
    provider: { '@id': ORG },
    areaServed: [
      { '@type': 'State', name: 'Kerala' },
      { '@type': 'Country', name: 'India' },
    ],
    description:
      'Assessment of semesters already passed at a recognized university, and admission with advanced standing to a partner university so only the remaining papers are studied.',
  },
  breadcrumb([{ name: 'Credit transfer', path: '/credit-transfer' }]),
)

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
      addressLocality: c.locality,
      postalCode: c.postalCode,
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    hasMap: c.map,
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
    name: 'Get My Degree Official Blog & Knowledge Center',
    headline: 'Get My Degree Blog — Academic Credit Transfer, UGC Recognition & Degree Completion',
    description:
      'Official Get My Degree guides on UGC DEB approved degree completion, academic credit transfer (ABC ID), lateral entry, university comparisons, and flexible degree options for working professionals.',
    inLanguage: 'en-IN',
    image: {
      '@type': 'ImageObject',
      url: `${site.url}/images/blog/blog-banner.webp`,
      contentUrl: `${site.url}/images/blog/blog-banner.webp`,
      width: 1600,
      height: 901,
      caption: 'Get My Degree Degree Guides & Articles',
      ...imageRights(),
    },
    isPartOf: { '@id': WEBSITE },
    publisher: { '@id': ORG },
    about: [
      { '@type': 'Thing', name: 'Get My Degree' },
      { '@type': 'Thing', name: 'UGC DEB Degree Recognition' },
      { '@type': 'Thing', name: 'Academic Credit Transfer' },
      { '@type': 'Thing', name: 'Degree Completion for Working Professionals' },
    ],
    blogPost: postsByDate.map((post) => {
      const rawCover = post.cover.startsWith('http') ? post.cover : `${site.url}${post.cover}`
      const coverUrl = rawCover.split('?')[0]
      return {
        '@type': 'BlogPosting',
        '@id': `${site.url}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description ?? post.excerpt,
        image: {
          '@type': 'ImageObject',
          url: coverUrl,
          contentUrl: coverUrl,
          caption: post.coverAlt ?? post.title,
          ...imageRights(post.slug, new Date(post.date).getFullYear()),
        },
        datePublished: post.publishedAt,
        dateModified: post.updated ? new Date(post.updated).toISOString() : post.publishedAt,
        author: { '@id': ORG },
        url: `${site.url}/blog/${post.slug}`,
      }
    }),
  },
  {
    '@type': 'FAQPage',
    '@id': `${site.url}/blog#faq`,
    isPartOf: { '@id': `${site.url}/blog#blog` },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Get My Degree and what is its official website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Get My Degree (operated by GetMyDegree Institutions since 2021) is India\'s premier academic advisory and degree completion institution, providing direct university admissions, syllabus guides, and verified academic counseling.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are degrees completed through Get My Degree UGC approved and valid for government jobs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For the Indian partner universities, yes, provided the university held a valid Distance Education Bureau (DEB) entitlement for the programme in your admission year; eligibility for a given post follows that exam\'s notification. Marjon University is a UK university, so its degrees usually need UGC equivalence for Indian government posts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can college dropouts complete their degree through Get My Degree without starting over?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under UGC guidelines and the Academic Bank of Credits (ABC ID), students who completed prior college semesters can transfer eligible credits to accredited partner universities and complete their bachelor\'s or master\'s degree with lateral entry.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where are Get My Degree physical counseling centres located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Get My Degree has physical counselling centres in Kerala at Thrissur (Vadanappilly Centre, Beach Road) and Malappuram (Near Tirur Bus Stand, Forza Mall), along with digital online counselling nationwide.',
        },
      },
    ],
  },
  breadcrumb([{ name: 'Blog', path: '/blog' }]),
)

/** Article schema for one post, used by the detail page and the prerenderer. */
export function postSchema(slug: string): object | undefined {
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return undefined
  const url = `${site.url}/blog/${post.slug}`
  const rawCover = post.cover.startsWith('http') ? post.cover : `${site.url}${post.cover}`
  const coverUrl = rawCover.split('?')[0]
  const imageId = `${url}#primaryimage`
  const imageAlt = post.coverAlt ?? post.title
  const copyrightYear = new Date(post.date).getFullYear()

  // Google Images reads the rights fields to badge the image as licensable.
  const size = ogImageFor(post.slug, coverUrl)
  const imageObject = {
    '@type': 'ImageObject',
    '@id': imageId,
    url: coverUrl,
    contentUrl: coverUrl,
    caption: imageAlt,
    description: `${post.title} — ${post.excerpt}`,
    name: post.title,
    width: size.width ?? 1600,
    height: size.height ?? 900,
    inLanguage: 'en-IN',
    encodingFormat: coverUrl.endsWith('.jpg') ? 'image/jpeg' : 'image/webp',
    representativeOfPage: true,
    ...imageRights(post.slug, copyrightYear),
  }

  const blogPostingNode: Record<string, unknown> = {
    '@type': ['BlogPosting', 'Article'],
    '@id': `${url}#article`,
    url,
    headline: post.title,
    alternativeHeadline: post.seoTitle ?? post.excerpt,
    description: post.description ?? post.excerpt,
    articleSection: post.category,
    keywords: post.keywords ?? `${post.category}, degree completion, online degree, distance education, UGC DEB recognition, GetMyDegree`,
    wordCount: post.wordCount ?? post.readingMinutes * 200,
    datePublished: post.publishedAt,
    dateModified: post.updated ? new Date(post.updated).toISOString() : post.publishedAt,
    timeRequired: `PT${post.readingMinutes}M`,
    image: { '@id': imageId },
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    copyrightYear,
    copyrightHolder: { '@id': ORG },
    // The team writes as the organization, so the author is that node itself
    // rather than a second record under a different name sharing its @id.
    author: { '@id': ORG },
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': ORG,
      name: site.name,
      url: site.url,
      logo: { '@id': `${site.url}/#logo` },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.t-body', '.prose > p:first-of-type'],
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Working professionals, degree dropouts, working adults seeking UGC-approved degree completion',
    },
    about: [
      { '@type': 'Thing', name: post.category },
      { '@type': 'Thing', name: 'Higher Education in India' },
      { '@type': 'Thing', name: 'UGC DEB Degree Recognition' },
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: post.title,
      description: post.description ?? post.excerpt,
      isPartOf: { '@id': WEBSITE },
      primaryImageOfPage: { '@id': imageId },
      image: { '@id': imageId },
    },
    isPartOf: { '@id': `${site.url}/blog#blog` },
  }

  const nodes: object[] = [
    blogPostingNode,
    imageObject,
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
  ]

  // Add FAQPage structured data if the post has FAQs
  if (post.faqs && post.faqs.length >= 2) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': url },
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    })
  }

  return graph(...nodes)
}
