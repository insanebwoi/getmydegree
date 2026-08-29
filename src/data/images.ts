/**
 * Every photograph on the site, in one place.
 *
 * Each slot points at a placeholder in `public/images/`. To use a real photo,
 * drop the file into `public/images/` and change the `src` here — e.g.
 * `src: '/images/hero-1.jpg'`. Nothing else needs to change; sizes and
 * cropping are handled by the layout.
 */

export type ImageSlot = {
  src: string
  alt: string
  /** Intended subject, shown on the placeholder frame. */
  note: string
  width: number
  height: number
}

export const images = {
  'hero-1': {
    src: '/images/hero-1.svg',
    alt: 'Graduates of GetMyDegree Institutions on campus',
    note: 'Students on campus after graduation',
    width: 1600,
    height: 600,
  },
  'hero-2': {
    src: '/images/hero-2.svg',
    alt: 'An academic counselor talking with a student',
    note: 'Counseling session',
    width: 1200,
    height: 1200,
  },
  'about-1': {
    src: '/images/about-1.svg',
    alt: 'The GetMyDegree centre in Thrissur',
    note: 'The Thrissur centre',
    width: 1200,
    height: 900,
  },
  'about-2': {
    src: '/images/about-2.svg',
    alt: 'A working professional studying in the evening',
    note: 'Studying after work',
    width: 1200,
    height: 900,
  },
  'about-3': {
    src: '/images/about-3.svg',
    alt: 'A graduate holding their degree certificate',
    note: 'Graduation day',
    width: 1680,
    height: 720,
  },
  'courses-1': {
    src: '/images/courses-1.svg',
    alt: 'A student attending a class session',
    note: 'Class session',
    width: 1680,
    height: 720,
  },
  'courses-2': {
    src: '/images/courses-2.svg',
    alt: 'Marksheets and an enrolment letter on a desk',
    note: 'Enrolment documents',
    width: 1200,
    height: 900,
  },
  'blog-1': {
    src: '/images/blog-1.svg',
    alt: 'University recognition and approval documents',
    note: 'Recognition and approval documents',
    width: 1600,
    height: 900,
  },
  'blog-2': {
    src: '/images/blog-2.svg',
    alt: 'Marksheets laid out for a credit transfer assessment',
    note: 'Marksheets and credit transfer',
    width: 1600,
    height: 900,
  },
  'blog-3': {
    src: '/images/blog-3.svg',
    alt: 'A student studying in the evening after work',
    note: 'Studying alongside a job',
    width: 1600,
    height: 900,
  },
  'blog-4': {
    src: '/images/blog-4.svg',
    alt: 'Planning fees and instalments',
    note: 'Fees and instalment planning',
    width: 1600,
    height: 900,
  },
  'contact-1': {
    src: '/images/contact-1.svg',
    alt: 'The GetMyDegree centre in Malappuram',
    note: 'The Malappuram centre',
    width: 1200,
    height: 750,
  },
} satisfies Record<string, ImageSlot>

export type ImageName = keyof typeof images
