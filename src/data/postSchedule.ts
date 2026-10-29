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
 * Our own covers, served from this site under /images/covers. Each has a
 * .jpg twin beside the .webp: the page shows the WebP, while link previews
 * (WhatsApp, Facebook, LinkedIn) get the JPEG, which they render reliably.
 * They used to come from a jsDelivr mirror of a separate repository, which
 * went down and took every cover and blog link preview with it.
 */
const cover = (name: string) => `/images/covers/${name}.webp`

export const schedule: ScheduledPost[] = [
  {
    day: 1,
    slug: 'best-degree-options-for-working-professionals',
    date: '2026-09-15',
    image: cover('best-degree-options-for-working-professionals'),
    alt: 'Working professional planning UGC approved online and distance degree qualification options at office desk — GetMyDegree career guide',
  },
  {
    day: 2,
    slug: 'ugc-deb-approval-search-verify-recognition',
    date: '2026-09-16',
    image: cover('ugc-deb-approval-search-verify-recognition'),
    alt: 'Verifying university UGC DEB distance education bureau recognition status on official portal laptop screen — GetMyDegree guide',
  },
  {
    day: 3,
    slug: 'online-degree-admission-deadlines',
    date: '2026-09-17',
    image: cover('online-degree-admission-deadlines'),
    alt: 'University academic calendar showing July and January online degree admission cycles and enrolment deadlines',
  },
  {
    day: 4,
    slug: 'bba-vs-bcom-for-career-growth',
    date: '2026-09-18',
    image: cover('bba-vs-bcom-for-career-growth'),
    alt: 'Comparing BBA vs B.Com degree career opportunities, salary scope, and corporate management pathways',
  },
  {
    day: 5,
    slug: 'masters-degree-while-working-full-time',
    date: '2026-09-19',
    image: cover('masters-degree-while-working-full-time'),
    alt: 'Professional studying for online master degree on laptop after work hours without career interruption',
  },
  {
    day: 6,
    slug: 'ugc-updates-for-online-degree-applicants',
    date: '2026-09-20',
    image: cover('ugc-updates-for-online-degree-applicants'),
    alt: 'Reviewing official UGC regulations and statutory notifications for online and distance degree applicants',
  },
  {
    day: 7,
    slug: 'how-to-choose-the-right-online-university',
    date: '2026-09-21',
    image: cover('how-to-choose-the-right-online-university'),
    alt: 'Comparing accredited online universities side by side for NAAC grade, UGC approval, and placement support',
  },
  {
    day: 8,
    slug: 'kerala-online-mca-msc-it-programs',
    date: '2026-09-22',
    image: cover('kerala-online-mca-msc-it-programs'),
    alt: 'Software engineer pursuing online MCA or MSc IT degree program in Kerala for IT job promotion',
  },
  {
    day: 9,
    slug: 'naac-grades-and-nirf-rankings-explained',
    date: '2026-09-23',
    image: cover('naac-grades-and-nirf-rankings-explained'),
    alt: 'Evaluating university NAAC A++ accreditation certificate and NIRF ranking metrics for degree credibility',
  },
  {
    day: 10,
    slug: 'ai-and-digital-skills-in-degree-curriculums',
    date: '2026-09-24',
    image: cover('ai-and-digital-skills-in-degree-curriculums'),
    alt: 'Online university degree curriculum featuring AI, data science, and modern digital technology electives',
  },
  {
    day: 11,
    slug: 'distance-mba-admission-process',
    date: '2026-09-25',
    image: cover('distance-mba-admission-process'),
    alt: 'MBA applicant organizing application documents, marksheets, and eligibility proofs for distance admission',
  },
  {
    day: 12,
    slug: 'dual-degree-pathways-under-ugc-guidelines',
    date: '2026-09-26',
    image: cover('dual-degree-pathways-under-ugc-guidelines'),
    alt: 'Pursuing two degrees simultaneously under official UGC dual degree guidelines and regulatory norms',
  },
  {
    day: 13,
    slug: 'degrees-for-defence-and-public-sector-employees',
    date: '2026-09-27',
    image: cover('degrees-for-defence-and-public-sector-employees'),
    alt: 'Defence personnel and PSU employee studying for government recognized degree for departmental promotions',
  },
  {
    day: 14,
    slug: 'academic-bank-of-credits-abc-id-explained',
    date: '2026-09-28',
    image: cover('academic-bank-of-credits-abc-id-explained'),
    alt: 'Registering for Academic Bank of Credits ABC ID online account on DigiLocker for university credit transfer',
  },
  {
    day: 15,
    slug: 'top-online-masters-for-corporate-careers',
    date: '2026-09-29',
    image: cover('top-online-masters-for-corporate-careers'),
    alt: 'Corporate professional reviewing postgraduate master degree options including MBA, M.Com, and MCA',
  },
  {
    day: 16,
    slug: 'degree-admission-cycles-july-and-january',
    date: '2026-09-30',
    image: cover('degree-admission-cycles-july-and-january'),
    alt: 'University campus session commencement for biannual July and January degree admission cycles in India',
  },
  {
    day: 17,
    slug: 'online-vs-distance-degree-modes',
    date: '2026-10-01',
    image: cover('online-vs-distance-degree-modes'),
    alt: 'Comparing online learning vs open distance education degree modes, LMS portals, and exam formats',
  },
  {
    day: 18,
    slug: 'degree-requirements-for-executive-promotions',
    date: '2026-10-02',
    image: cover('degree-requirements-for-executive-promotions'),
    alt: 'Corporate management team meeting highlighting executive degree qualification requirements for promotion',
  },
  {
    day: 19,
    slug: 'red-flags-before-enrolling-in-an-online-degree',
    date: '2026-10-03',
    image: cover('red-flags-before-enrolling-in-an-online-degree'),
    alt: 'Reviewing university admission fine print and avoiding unaccredited fake degree fraud red flags',
  },
  {
    day: 21,
    slug: 'bsc-vs-bca-for-tech-jobs',
    date: '2026-10-05',
    image: cover('bsc-vs-bca-for-tech-jobs'),
    alt: 'Software developer analyzing B.Sc Computer Science vs BCA degree curriculums for software engineering careers',
  },
  {
    day: 22,
    slug: 'equivalence-of-online-and-campus-degrees',
    date: '2026-10-06',
    image: cover('equivalence-of-online-and-campus-degrees'),
    alt: 'UGC official equivalence gazette notification establishing online degrees equal to regular campus degrees',
  },
  {
    day: 23,
    slug: 'degrees-for-healthcare-and-shift-workers',
    date: '2026-10-07',
    image: cover('degrees-for-healthcare-and-shift-workers'),
    alt: 'Healthcare shift worker studying flexible online degree modules between hospital shifts',
  },
  {
    day: 24,
    slug: 'nri-and-international-students-indian-degrees',
    date: '2026-10-08',
    image: cover('nri-and-international-students-indian-degrees'),
    alt: 'NRI international student preparing verification documents for Indian university online degree admission',
  },
  {
    day: 26,
    slug: 'proctored-exams-and-assessment-models',
    date: '2026-10-10',
    image: cover('proctored-exams-and-assessment-models'),
    alt: 'Online degree student taking remotely proctored semester examination with webcam AI monitoring',
  },
  {
    day: 27,
    slug: 'flexible-degree-options-in-kerala',
    date: '2026-10-11',
    image: cover('flexible-degree-options-in-kerala'),
    alt: 'Student in Kerala completing flexible university degree with local academic counselling in Thrissur and Malappuram',
  },
  {
    day: 28,
    slug: 'pg-diploma-vs-masters-degree',
    date: '2026-10-12',
    image: cover('pg-diploma-vs-masters-degree'),
    alt: 'Evaluating differences between postgraduate PG diploma and full university master degree for jobs and higher study',
  },
  {
    day: 29,
    slug: 'micro-credentials-and-specializations',
    date: '2026-10-13',
    image: cover('micro-credentials-and-specializations'),
    alt: 'Selecting specialized industry micro-credentials and elective certifications alongside university degree',
  },
  {
    day: 30,
    slug: 'step-by-step-degree-application-guide',
    date: '2026-10-14',
    image: cover('step-by-step-degree-application-guide'),
    alt: 'Step-by-step university online degree application form submission, document upload, and admission confirmation',
  },
  {
    day: 31,
    slug: 'get-my-degree-official-guide',
    date: '2026-10-17',
    image: '/images/blog/get-my-degree-official-guide.jpg',
    alt: 'Academic counsellor in Kerala assisting student with UGC approved degree completion and credit transfer at Get My Degree office',
  },
  {
    day: 32,
    slug: 'get-my-degree-reviews-validity-guide',
    date: '2026-10-17',
    image: '/images/blog/get-my-degree-reviews-validity-guide.jpg',
    alt: 'Graduate holding UGC accredited degree certificate and marksheet verifying Get My Degree validity for government jobs',
  },
  {
    day: 33,
    slug: 'credit-transfer-degree-kerala',
    date: '2026-10-24',
    image: cover('credit-transfer-degree-kerala'),
    alt: 'Laptop and notes on a wooden desk while planning a degree credit transfer in Kerala',
  },
  {
    day: 34,
    slug: 'complete-discontinued-degree-kerala',
    date: '2026-10-25',
    image: cover('complete-discontinued-degree-kerala'),
    alt: 'Get My Degree cover: student thinking about five ways to complete a discontinued degree in Kerala — re-admission, credit transfer, distance and online mode, lateral entry and university guidelines',
  },
  {
    day: 35,
    slug: 'distance-education-thrissur',
    date: '2026-10-26',
    image: cover('distance-education-thrissur'),
    alt: 'Get My Degree cover: distance education in Thrissur — courses, fees and how to apply, with Vadakkunnathan temple and BA, B.Com, BBA, MA, M.Com and MBA books',
  },
  {
    day: 36,
    slug: 'distance-education-malappuram',
    date: '2026-10-27',
    image: cover('distance-education-malappuram'),
    alt: 'Get My Degree cover: distance education in Malappuram (Tirur) complete guide — student overlooking the river at Tirur with UG and PG courses, fees and application process',
  },
  {
    day: 37,
    slug: 'bharathidasan-university-distance-education',
    date: '2026-10-28',
    image: cover('bharathidasan-university-distance-education'),
    alt: 'Get My Degree cover: Bharathidasan University distance education 2026 — courses offered, fee structure, admission process and important dates, with the university gate',
  },
  {
    day: 38,
    slug: 'prist-university-online-degree',
    date: '2026-10-29',
    image: cover('prist-university-online-degree'),
    alt: 'Get My Degree cover: PRIST University online degree — is it valid? Courses and admission, with the PRIST deemed-to-be university building',
  },
  {
    day: 39,
    slug: 'rabindranath-tagore-university-distance-degree',
    date: '2026-10-30',
    image: cover('rabindranath-tagore-university-distance-degree'),
    alt: 'Get My Degree cover: Rabindranath Tagore University (RNTU) distance degree full review — courses offered, fees, admission process and whether it is valid',
  },
  {
    day: 40,
    slug: 'marjon-university-uk-mba-kerala',
    date: '2026-10-31',
    image: cover('marjon-university-uk-mba-kerala'),
    alt: 'Get My Degree cover: a UK MBA from Kerala — the Plymouth Marjon University online MBA explained, with fees, duration and how to apply',
  },
  {
    day: 41,
    slug: 'online-mba-kerala-working-professionals',
    date: '2026-11-01',
    image: cover('online-mba-kerala-working-professionals'),
    alt: 'Get My Degree cover: online MBA in Kerala for working professionals — fees, eligibility, universities and admission process',
  },
  {
    day: 42,
    slug: 'distance-bcom-kerala',
    date: '2026-11-02',
    image: cover('distance-bcom-kerala'),
    alt: 'Get My Degree cover: distance B.Com in Kerala — subjects such as accounting, economics and finance, fees and jobs after the degree',
  },
  {
    day: 43,
    slug: 'online-bca-kerala',
    date: '2026-11-03',
    image: cover('online-bca-kerala'),
    alt: 'Get My Degree cover: online BCA in Kerala — syllabus covering programming, databases, web development and networks, fees and career scope',
  },
  {
    day: 44,
    slug: 'distance-msw-kerala',
    date: '2026-11-04',
    image: cover('distance-msw-kerala'),
    alt: 'Group of women sitting together, for a guide to the distance MSW and social work careers',
  },
  {
    day: 45,
    slug: 'distance-ba-kerala-psc',
    date: '2026-11-05',
    image: cover('distance-ba-kerala-psc'),
    alt: 'Person reading a newspaper at a table while preparing for Kerala PSC with a distance BA',
  },
  {
    day: 46,
    slug: 'distance-degree-valid-kerala-psc',
    date: '2026-11-06',
    image: cover('distance-degree-valid-kerala-psc'),
    alt: 'Get My Degree cover: is a distance degree valid for Kerala PSC — 2026 rules, recognized universities and eligible courses',
  },
  {
    day: 47,
    slug: 'online-degree-valid-gulf-jobs',
    date: '2026-11-07',
    image: cover('online-degree-valid-gulf-jobs'),
    alt: 'Get My Degree cover: is an online degree valid for Gulf jobs — attestation and country-wise requirements for UAE, Saudi Arabia and Qatar',
  },
  {
    day: 48,
    slug: 'degree-attestation-gulf',
    date: '2026-11-08',
    image: cover('degree-attestation-gulf'),
    alt: 'Get My Degree cover: degree attestation and apostille for the Gulf step by step — document verification, home department and MEA attestation, apostille',
  },
  {
    day: 49,
    slug: 'lateral-entry-degree',
    date: '2026-11-09',
    image: cover('lateral-entry-degree'),
    alt: 'Get My Degree cover: lateral entry to the 2nd or 3rd year of a degree — student climbing steps marked 1st, 2nd and 3rd year',
  },
  {
    day: 50,
    slug: 'degree-with-supplementary-papers',
    date: '2026-11-10',
    image: cover('degree-with-supplementary-papers'),
    alt: 'Get My Degree cover: failed subjects or supplementary papers pending — step-by-step guide to still completing your degree',
  },
  {
    day: 51,
    slug: 'degree-after-long-gap',
    date: '2026-11-11',
    image: cover('degree-after-long-gap'),
    alt: 'Get My Degree cover: a degree after a 10-year gap — who can apply, eligible courses, documents and admission process',
  },
  {
    day: 52,
    slug: 'degree-after-plus-two-working',
    date: '2026-11-12',
    image: cover('degree-after-plus-two-working'),
    alt: 'Get My Degree cover: a degree after Plus Two for working people in Kerala — flexible study options while working',
  },
  {
    day: 53,
    slug: 'spot-fake-degree-provider',
    date: '2026-11-13',
    image: cover('spot-fake-degree-provider'),
    alt: 'Get My Degree cover: how to spot a fake degree provider — magnifying glass over a certificate and 10 checks before you pay',
  },
  {
    day: 54,
    slug: 'credit-transfer-vs-lateral-entry',
    date: '2026-11-14',
    image: cover('credit-transfer-vs-lateral-entry'),
    alt: 'Get My Degree cover: credit transfer vs lateral entry vs fresh admission — three roads with signs, which one is right for you',
  },
  {
    day: 55,
    slug: 'online-vs-regular-mba',
    date: '2026-11-15',
    image: cover('online-vs-regular-mba'),
    alt: 'Get My Degree cover: online MBA vs regular MBA for Kerala professionals — comparing flexibility, cost, campus experience and networking',
  },
  {
    day: 56,
    slug: 'mcom-vs-mba',
    date: '2026-11-16',
    image: cover('mcom-vs-mba'),
    alt: 'Get My Degree cover: M.Com vs MBA for accountants — course comparison, career scope, fees and duration',
  },
  {
    day: 57,
    slug: 'government-jobs-distance-degree-kerala',
    date: '2026-11-17',
    image: cover('government-jobs-distance-degree-kerala'),
    alt: 'Kerala house among green trees, for a guide to government jobs with a distance degree',
  },
  {
    day: 58,
    slug: 'degree-for-gulf-returnees',
    date: '2026-11-18',
    image: cover('degree-for-gulf-returnees'),
    alt: 'Get My Degree cover: a degree for Gulf returnees — restart your career in Kerala, a returnee at the airport arrivals gate',
  },
  {
    day: 59,
    slug: 'degree-for-housewives-kerala',
    date: '2026-11-19',
    image: cover('degree-for-housewives-kerala'),
    alt: 'Get My Degree cover: degree completion for homemakers and women returning after a career break, studying from home in Kerala',
  },
  {
    day: 60,
    slug: 'degree-for-kerala-government-employees',
    date: '2026-11-20',
    image: cover('degree-for-kerala-government-employees'),
    alt: 'Get My Degree cover: a degree for police, KSRTC and Kerala government employees — promotion guide, with staff outside the Secretariat',
  },
  {
    day: 61,
    slug: 'dropout-to-graduate-success-story',
    date: '2026-11-21',
    image: cover('dropout-to-graduate-success-story'),
    alt: 'Get My Degree cover: from dropout to graduate — the same student before, stressed after dropping out, and after, holding a degree',
  },
  {
    day: 62,
    slug: 'distance-degree-faq-kerala',
    date: '2026-11-22',
    image: cover('distance-degree-faq-kerala'),
    alt: 'Get My Degree cover: 25 questions Kerala students ask about distance degrees — validity, UGC approved universities, fees, studying while working and government jobs',
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
