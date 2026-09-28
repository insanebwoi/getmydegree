/**
 * The publishing calendar: one row per article, in the order they go live.
 *
 * Kept apart from the articles themselves because these three facts   the day
 * an article appears, the cover it carries, and the order of the run   are a
 * schedule, not content. Editing a date here moves a post without touching a
 * word of it.
 *
 * Nothing is published by a build. Each row carries its own release moment and
 * the site checks the clock, so the thirtieth article appears on the thirtieth
 * morning whether or not anything was deployed in between. `RELEASE_HOUR` and
 * `RELEASE_ZONE` say when: 8am, India time, on the row's date.
 */

export type ScheduledPost = {
  /** Position in the run, 1-based. Only ever used for reading this file. */
  day: number
  /** Matches the markdown file in `src/content/posts`. */
  slug: string
  /** Release date, `YYYY-MM-DD`, interpreted at `RELEASE_HOUR` India time. */
  date: string
  /**
   * Cover photograph, when it comes from somewhere else: an absolute URL is
   * served by that host, a path under `/images/` by us.
   *
   * Leave it out once a real cover exists at `public/images/blog/<slug>.*`.
   * The build then resolves the file itself, preferring avif over webp over
   * jpg and pairing the page's image with the jpg that social cards need   so
   * replacing a stock photograph is a matter of adding the file and deleting
   * this line, with no path to keep in step.
   */
  image?: string
  /** The cover's alt text. Written here because the cover lives here. */
  alt: string
}

export const RELEASE_HOUR = 8
/** India Standard Time, as a fixed offset. IST has no daylight saving, so a
 *  fixed offset is exact rather than an approximation. */
export const RELEASE_ZONE = '+05:30'

/** Covers are cropped to a fixed size rather than left at the source photo's
 *  own aspect. A declared `og:image:width` and `height` is what lets a social
 *  card render immediately instead of after the crawler has fetched the file,
 *  and we can only declare a size we have asked for. */
export const COVER_WIDTH = 1600
export const COVER_HEIGHT = 900

/**
 * Our own covers, served from the `gmd-images` repository over jsDelivr.
 *
 * They live outside this repository so the site stays small and the files
 * cost the site no bandwidth. The `w` and `h` are not instructions to the
 * CDN, which ignores them   they are how `ogImage` learns the size of a
 * remote file it cannot measure, so a social card renders before the image
 * has been fetched.
 */
/*
  Pinned to a commit rather than to `main`.

  jsDelivr caches a branch reference for up to a week, so a replaced image
  goes on being served from the old one   a purge is asked for politely and
  does not reach every edge. A commit is immutable: the CDN can cache it
  forever, and a changed image means a changed URL, which is what we want
  anyway. Bump this after pushing to the images repository.
*/
const CDN =
  'https://cdn.jsdelivr.net/gh/insanebwoi/gmd-images@0cf3be44ff2a52835a2ee59fee15dd541ecb298e/blog'

/** Every cover in that repository is this size, so the suffix below is one
 *  true number rather than a per-file lookup. */
const COVER_FILE_WIDTH = 1400
const COVER_FILE_HEIGHT = 787

const cover = (name: string) => `${CDN}/${name}.webp?w=${COVER_FILE_WIDTH}&h=${COVER_FILE_HEIGHT}`

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${COVER_WIDTH}&h=${COVER_HEIGHT}&q=70`

export const schedule: ScheduledPost[] = [
  {
    day: 1,
    slug: 'best-degree-options-for-working-professionals',
    date: '2026-09-23',
    image: cover('best-degree-options-for-working-professionals'),
    alt: 'A working professional at a desk planning their next qualification',
  },
  {
    day: 2,
    slug: 'ugc-deb-approval-search-verify-recognition',
    date: '2026-09-24',
    image: cover('ugc-deb-approval-search-verify-recognition'),
    alt: 'Checking a university approval record on a laptop',
  },
  {
    day: 3,
    slug: 'online-degree-admission-deadlines',
    date: '2026-09-25',
    image: cover('online-degree-admission-deadlines'),
    alt: 'A calendar marked with admission dates',
  },
  {
    day: 4,
    slug: 'bba-vs-bcom-for-career-growth',
    date: '2026-09-26',
    image: cover('bba-vs-bcom-for-career-growth'),
    alt: 'Two career paths being weighed on paper',
  },
  {
    day: 5,
    slug: 'masters-degree-while-working-full-time',
    date: '2026-09-27',
    image: cover('masters-degree-while-working-full-time'),
    alt: 'Studying at a laptop after work hours',
  },
  {
    day: 6,
    slug: 'ugc-updates-for-online-degree-applicants',
    date: '2026-09-28',
    image: cover('ugc-updates-for-online-degree-applicants'),
    alt: 'Reading a regulatory notification',
  },
  {
    day: 7,
    slug: 'how-to-choose-the-right-online-university',
    date: '2026-09-29',
    image: cover('how-to-choose-the-right-online-university'),
    alt: 'Comparing universities side by side',
  },
  {
    day: 8,
    slug: 'kerala-online-mca-msc-it-programs',
    date: '2026-09-30',
    image: cover('kerala-online-mca-msc-it-programs'),
    alt: 'A software professional at work in Kerala',
  },
  {
    day: 9,
    slug: 'naac-grades-and-nirf-rankings-explained',
    date: '2026-10-01',
    image: cover('naac-grades-and-nirf-rankings-explained'),
    alt: 'A university accreditation certificate on a desk',
  },
  {
    day: 10,
    slug: 'ai-and-digital-skills-in-degree-curriculums',
    date: '2026-10-02',
    image: cover('ai-and-digital-skills-in-degree-curriculums'),
    alt: 'A data science lecture on screen',
  },
  {
    day: 11,
    slug: 'distance-mba-admission-process',
    date: '2026-10-03',
    image: cover('distance-mba-admission-process'),
    alt: 'An MBA applicant preparing documents',
  },
  {
    day: 12,
    slug: 'dual-degree-pathways-under-ugc-guidelines',
    date: '2026-10-04',
    image: cover('dual-degree-pathways-under-ugc-guidelines'),
    alt: 'Two degree programmes planned side by side',
  },
  {
    day: 13,
    slug: 'degrees-for-defence-and-public-sector-employees',
    date: '2026-10-05',
    image: cover('degrees-for-defence-and-public-sector-employees'),
    alt: 'A public sector employee studying for a promotion',
  },
  {
    day: 14,
    slug: 'academic-bank-of-credits-abc-id-explained',
    date: '2026-10-06',
    image: cover('academic-bank-of-credits-abc-id-explained'),
    alt: 'Registering for an academic credit account online',
  },
  {
    day: 15,
    slug: 'top-online-masters-for-corporate-careers',
    date: '2026-10-07',
    image: cover('top-online-masters-for-corporate-careers'),
    alt: 'A corporate professional reviewing postgraduate options',
  },
  {
    day: 16,
    slug: 'degree-admission-cycles-july-and-january',
    date: '2026-10-08',
    image: cover('degree-admission-cycles-july-and-january'),
    alt: 'A university campus at the start of an academic session',
  },
  {
    day: 17,
    slug: 'online-vs-distance-degree-modes',
    date: '2026-10-09',
    image: cover('online-vs-distance-degree-modes'),
    alt: 'A learner comparing two study formats',
  },
  {
    day: 18,
    slug: 'degree-requirements-for-executive-promotions',
    date: '2026-10-10',
    image: cover('degree-requirements-for-executive-promotions'),
    alt: 'A management team in a meeting',
  },
  {
    day: 19,
    slug: 'red-flags-before-enrolling-in-an-online-degree',
    date: '2026-10-11',
    image: cover('red-flags-before-enrolling-in-an-online-degree'),
    alt: 'Reading the fine print on an admission offer',
  },
  {
    day: 20,
    slug: 'balancing-full-time-work-with-an-online-degree',
    date: '2026-10-12',
    image: cover('balancing-full-time-work-with-an-online-degree'),
    alt: 'A weekly study plan beside a work diary',
  },
  {
    day: 21,
    slug: 'bsc-vs-bca-for-tech-jobs',
    date: '2026-10-13',
    image: unsplash('photo-1517048676732-d65bc937f952'),
    alt: 'A developer at work on a software project',
  },
  {
    day: 22,
    slug: 'equivalence-of-online-and-campus-degrees',
    date: '2026-10-14',
    image: unsplash('photo-1552664730-d307ca884978'),
    alt: 'A degree certificate beside an employment file',
  },
  {
    day: 23,
    slug: 'degrees-for-healthcare-and-shift-workers',
    date: '2026-10-15',
    image: unsplash('photo-1600880292203-757bb62b4baf'),
    alt: 'A healthcare worker between shifts',
  },
  {
    day: 24,
    slug: 'nri-and-international-students-indian-degrees',
    date: '2026-10-16',
    image: unsplash('photo-1571260899304-425eee4c7efc'),
    alt: 'An international applicant preparing documents',
  },
  {
    day: 25,
    slug: 'degree-fees-instalments-and-emi-options',
    date: '2026-10-17',
    image: unsplash('photo-1543269865-cbf427effbad'),
    alt: 'Planning education finances at a desk',
  },
  {
    day: 26,
    slug: 'proctored-exams-and-assessment-models',
    date: '2026-10-18',
    image: unsplash('photo-1524178232363-1fb2b075b655'),
    alt: 'A student sitting a remotely proctored examination',
  },
  {
    day: 27,
    slug: 'flexible-degree-options-in-kerala',
    date: '2026-10-19',
    image: unsplash('photo-1541178735493-479c1a27ed24'),
    alt: 'A learner in Kerala studying for a flexible degree',
  },
  {
    day: 28,
    slug: 'pg-diploma-vs-masters-degree',
    date: '2026-10-20',
    image: unsplash('photo-1488190211105-8b0e65b80b4e'),
    alt: 'Comparing a diploma and a degree on paper',
  },
  {
    day: 29,
    slug: 'micro-credentials-and-specializations',
    date: '2026-10-21',
    image: unsplash('photo-1516321318423-f06f85e504b3'),
    alt: 'A specialisation elective being chosen on screen',
  },
  {
    day: 30,
    slug: 'step-by-step-degree-application-guide',
    date: '2026-10-22',
    image: unsplash('photo-1573164713988-8665fc963095'),
    alt: 'An applicant completing a university admission form',
  },
]

const bySlug = new Map(schedule.map((row) => [row.slug, row]))

export function scheduleFor(slug: string): ScheduledPost | undefined {
  return bySlug.get(slug)
}

/**
 * The exact moment a dated article becomes public, as epoch milliseconds.
 *
 * Built as an ISO string with an explicit offset rather than from local parts,
 * so a visitor in London and the build machine in whatever region it runs in
 * both resolve the same instant.
 */
export function releaseAt(date: string): number {
  const hour = String(RELEASE_HOUR).padStart(2, '0')
  return Date.parse(`${date}T${hour}:00:00${RELEASE_ZONE}`)
}

/**
 * Articles with no row in the schedule are the ones written before it existed.
 * They are already public and stay that way.
 */
/** The release moment as a full ISO timestamp, for metadata that should carry
 *  a time rather than a bare date. */
export function releaseIso(date: string): string {
  const at = releaseAt(date)
  return Number.isFinite(at) ? new Date(at).toISOString() : date
}

/**
 * Preview switch, for reading the run before it has been published.
 *
 * `npm run dev` shows every scheduled article, published or not. That is the
 * useful default: nobody running the dev server wants twenty-nine of their
 * own drafts hidden, and a switch you have to remember to turn on is a switch
 * that looks broken when you forget. Add `?preview=off` to any URL to see the
 * listing as a visitor does, and `?preview` to go back.
 *
 * Fenced behind `import.meta.env.DEV`, so the branch is removed entirely from
 * a production build   nothing unlocks the live site. The choice is read once
 * at module load and kept in session storage, because the query string is gone
 * after the first client-side navigation.
 */
const PREVIEW_ALL = (() => {
  if (!import.meta.env.DEV || typeof window === 'undefined') return false
  const KEY = 'preview-schedule'
  try {
    const value = new URLSearchParams(window.location.search).get('preview')
    if (value === 'off') window.sessionStorage.setItem(KEY, 'off')
    else if (value !== null) window.sessionStorage.removeItem(KEY)
    return window.sessionStorage.getItem(KEY) !== 'off'
  } catch {
    // Private windows and blocked storage throw rather than returning null.
    // Unlocked is still the right answer in dev.
    return true
  }
})()

/** True while the dev preview switch is on, for anything that wants to say so. */
export const isPreviewing = PREVIEW_ALL

export function isPublished(slug: string, now: number = Date.now()): boolean {
  if (PREVIEW_ALL) return true
  const row = bySlug.get(slug)
  if (!row) return true
  return releaseAt(row.date) <= now
}
