/**
 * Every photograph on the site, in one place.
 *
 * To use a real photo, drop a file named after the slot into `public/images/`
 *   `hero-1.webp`, `about-2.jpg`, `courses-1.png`. The build resolves each slot
 * to whichever file exists, preferring real formats over the .svg placeholder,
 * so no code change is needed. Cropping is handled by the layout.
 */
import { imageManifest } from 'virtual:image-manifest'

export type ImageSlot = {
  /** Placeholder path; overridden by any real file of the same base name. */
  src: string
  alt: string
  /** Intended subject, shown on the placeholder frame. */
  note: string
  width: number
  height: number
}

const declared = {
  'hero-portrait': {
    src: '/images/home/hero-portrait.webp',
    alt: 'A working professional who completed their degree with GetMyDegree Institutions',
    note: 'Editorial portrait — working professional, 23–30, smart casual',
    width: 1200,
    height: 1500,
  },
  'hero-portrait-2': {
    src: '/images/home/hero-portrait-2.webp',
    alt: '',
    note: 'Hero set, 2 of 3 — studying after work',
    width: 1200,
    height: 1500,
  },
  'hero-portrait-3': {
    src: '/images/home/hero-portrait-3.webp',
    alt: '',
    note: 'Hero set, 3 of 3 — collecting the degree',
    width: 1200,
    height: 1500,
  },
  'hero-3': {
    src: '/images/home/hero-3.webp',
    alt: 'A student working through their degree alongside their job',
    note: 'Programmes card',
    width: 1500,
    height: 844,
  },
  'hero-2': {
    src: '/images/home/hero-2.webp',
    alt: 'An academic counselor talking with a student',
    note: 'Counseling session',
    width: 1200,
    height: 1200,
  },
  'about-banner': {
    src: '/images/about/about-banner.webp',
    alt: 'A counselor talking with a student at the Thrissur centre',
    note: 'About page header banner',
    width: 1500,
    height: 844,
  },
  'about-1': {
    src: '/images/about/about-1.webp',
    alt: 'The GetMyDegree centre in Thrissur',
    note: 'The Thrissur centre',
    width: 1200,
    height: 900,
  },
  situations: {
    src: '/images/home/situations.webp',
    alt: 'A working professional continuing their degree alongside their job',
    note: 'Four situations section',
    width: 1400,
    height: 933,
  },
  'about-3': {
    src: '/images/about/about-3.webp',
    alt: 'A graduate holding their degree certificate',
    note: 'Graduation day',
    width: 1680,
    height: 720,
  },
  'universities-banner': {
    src: '/images/universities/universities-banner.webp',
    alt: 'A university colonnade looking out over a city skyline at first light',
    note: 'Universities page header banner',
    width: 1600,
    height: 900,
  },
  'courses-banner': {
    src: '/images/courses/courses-banner.webp',
    alt: 'Students pursuing university degrees with GetMyDegree',
    note: 'Courses page header banner',
    width: 1500,
    height: 844,
  },
  'courses-2': {
    src: '/images/courses/courses-2.webp',
    alt: 'Marksheets and an enrolment letter on a desk',
    note: 'Enrolment documents',
    width: 1200,
    height: 900,
  },
  'contact-banner': {
    src: '/images/contact/contact-banner.webp',
    alt: 'Academic counselors helping students at GetMyDegree',
    note: 'Contact page header banner',
    width: 1500,
    height: 844,
  },
  'contact-1': {
    src: '/images/contact/contact-1.webp',
    alt: 'The GetMyDegree centre in Malappuram',
    note: 'The Malappuram centre',
    width: 1200,
    height: 750,
  },
  'blog-banner': {
    src: '/images/blog/blog-banner.webp',
    alt: 'Articles, degree advice, and admission guides at GetMyDegree',
    note: 'Blog page header banner',
    width: 1672,
    height: 941,
  },
} satisfies Record<string, ImageSlot>

export type ImageName = keyof typeof declared

/** Resolves a slot to the file that actually exists for it. */
export function imageSrc(name: string, fallback: string) {
  return imageManifest[name] ?? fallback
}

export const images = Object.fromEntries(
  Object.entries(declared).map(([name, slot]) => [
    name,
    { ...slot, src: imageSrc(name, slot.src) },
  ]),
) as typeof declared
