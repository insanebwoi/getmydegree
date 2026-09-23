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
  /** Cover photograph. An absolute URL is served by that host; a path under
   *  `/images/` is served by us. */
  image: string
  /** The cover's alt text. Written here because the cover lives here. */
  alt: string
}

export const RELEASE_HOUR = 8
/** India Standard Time, as a fixed offset. IST has no daylight saving, so a
 *  fixed offset is exact rather than an approximation. */
export const RELEASE_ZONE = '+05:30'

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`

export const schedule: ScheduledPost[] = [
  {
    day: 1,
    slug: 'best-degree-options-for-working-professionals',
    date: '2026-09-23',
    image: unsplash('photo-1454165804606-c3d57bc86b40'),
    alt: 'A working professional at a desk planning their next qualification',
  },
  {
    day: 2,
    slug: 'ugc-deb-approval-search-verify-recognition',
    date: '2026-09-24',
    image: unsplash('photo-1450101499163-c8848c66ca85'),
    alt: 'Checking a university approval record on a laptop',
  },
  {
    day: 3,
    slug: 'online-degree-admission-deadlines',
    date: '2026-09-25',
    image: unsplash('photo-1506784365847-bbad939e9335'),
    alt: 'A calendar marked with admission dates',
  },
  {
    day: 4,
    slug: 'bba-vs-bcom-for-career-growth',
    date: '2026-09-26',
    image: unsplash('photo-1560250097-0b93528c311a'),
    alt: 'Two career paths being weighed on paper',
  },
  {
    day: 5,
    slug: 'masters-degree-while-working-full-time',
    date: '2026-09-27',
    image: unsplash('photo-1531482615713-2afd69097998'),
    alt: 'Studying at a laptop after work hours',
  },
  {
    day: 6,
    slug: 'ugc-updates-for-online-degree-applicants',
    date: '2026-09-28',
    image: unsplash('photo-1589391886645-d51941baf7fb'),
    alt: 'Reading a regulatory notification',
  },
  {
    day: 7,
    slug: 'how-to-choose-the-right-online-university',
    date: '2026-09-29',
    image: unsplash('photo-1522202176988-66273c2fd55f'),
    alt: 'Comparing universities side by side',
  },
  {
    day: 8,
    slug: 'kerala-online-mca-msc-it-programs',
    date: '2026-09-30',
    image: unsplash('photo-1517245386807-bb43f82c33c4'),
    alt: 'A software professional at work in Kerala',
  },
  {
    day: 9,
    slug: 'naac-grades-and-nirf-rankings-explained',
    date: '2026-10-01',
    image: unsplash('photo-1499750310107-5fef28a66643'),
    alt: 'A university accreditation certificate on a desk',
  },
  {
    day: 10,
    slug: 'ai-and-digital-skills-in-degree-curriculums',
    date: '2026-10-02',
    image: unsplash('photo-1434030216411-0b793f4b4173'),
    alt: 'A data science lecture on screen',
  },
  {
    day: 11,
    slug: 'distance-mba-admission-process',
    date: '2026-10-03',
    image: unsplash('photo-1498243691581-b145c3f54a5a'),
    alt: 'An MBA applicant preparing documents',
  },
  {
    day: 12,
    slug: 'dual-degree-pathways-under-ugc-guidelines',
    date: '2026-10-04',
    image: unsplash('photo-1513258496099-48168024aec0'),
    alt: 'Two degree programmes planned side by side',
  },
  {
    day: 13,
    slug: 'degrees-for-defence-and-public-sector-employees',
    date: '2026-10-05',
    image: unsplash('photo-1503676260728-1c00da094a0b'),
    alt: 'A public sector employee studying for a promotion',
  },
  {
    day: 14,
    slug: 'academic-bank-of-credits-abc-id-explained',
    date: '2026-10-06',
    image: unsplash('photo-1550751827-4bd374c3f58b'),
    alt: 'Registering for an academic credit account online',
  },
  {
    day: 15,
    slug: 'top-online-masters-for-corporate-careers',
    date: '2026-10-07',
    image: unsplash('photo-1509062522246-3755977927d7'),
    alt: 'A corporate professional reviewing postgraduate options',
  },
  {
    day: 16,
    slug: 'degree-admission-cycles-july-and-january',
    date: '2026-10-08',
    image: unsplash('photo-1541339907198-e08756dedf3f'),
    alt: 'A university campus at the start of an academic session',
  },
  {
    day: 17,
    slug: 'online-vs-distance-degree-modes',
    date: '2026-10-09',
    image: unsplash('photo-1427504494785-3a9ca7044f45'),
    alt: 'A learner comparing two study formats',
  },
  {
    day: 18,
    slug: 'degree-requirements-for-executive-promotions',
    date: '2026-10-10',
    image: unsplash('photo-1521737604893-d14cc237f11d'),
    alt: 'A management team in a meeting',
  },
  {
    day: 19,
    slug: 'red-flags-before-enrolling-in-an-online-degree',
    date: '2026-10-11',
    image: unsplash('photo-1496171367470-9ed9a91ea931'),
    alt: 'Reading the fine print on an admission offer',
  },
  {
    day: 20,
    slug: 'balancing-full-time-work-with-an-online-degree',
    date: '2026-10-12',
    image: unsplash('photo-1529070538774-1843cb3265df'),
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
export function isPublished(slug: string, now: number = Date.now()): boolean {
  const row = bySlug.get(slug)
  if (!row) return true
  return releaseAt(row.date) <= now
}
