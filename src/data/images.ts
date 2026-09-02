/**
 * Every photograph on the site, in one place.
 *
 * To use a real photo, drop a file named after the slot into `public/images/`
 *   `hero-1.jpg`, `about-2.png`, `courses-1.webp`. The build resolves each slot
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
  'hero-1': {
    src: '/images/hero-1.svg',
    alt: 'Graduates of GetMyDegree Institutions on campus',
    note: 'Students on campus after graduation',
    width: 1600,
    height: 600,
  },
  'hero-portrait': {
    src: '/images/hero-portrait.svg',
    alt: 'A working professional who completed their degree with GetMyDegree Institutions',
    note: 'Editorial portrait   working professional, 23–30, smart casual',
    width: 1200,
    height: 1500,
  },
  'hero-portrait-2': {
    src: '/images/hero-portrait-2.svg',
    alt: '',
    note: 'Hero set, 2 of 3   studying after work',
    width: 1200,
    height: 1500,
  },
  'hero-portrait-3': {
    src: '/images/hero-portrait-3.svg',
    alt: '',
    note: 'Hero set, 3 of 3   collecting the degree',
    width: 1200,
    height: 1500,
  },
  'hero-3': {
    src: '/images/hero-3.jpg',
    alt: 'A student working through their degree alongside their job',
    note: 'Programmes card',
    width: 1500,
    height: 844,
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
    // Defaults to the study photograph; drop about-2.jpg in to replace it.
    src: '/images/hero-portrait-2.jpg',
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
  'contact-1': {
    src: '/images/contact-1.svg',
    alt: 'The GetMyDegree centre in Malappuram',
    note: 'The Malappuram centre',
    width: 1200,
    height: 750,
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
