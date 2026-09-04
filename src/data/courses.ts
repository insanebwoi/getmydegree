import { courses, type Course } from './site'

/**
 * Course detail pages. Everything here is derived from the programme data
 * already in `site.ts` plus the generic admission facts that apply to every
 * programme we place students into. Nothing university-specific, no fees and
 * no recognition claims are asserted per programme, because those vary by
 * university and academic year and are confirmed at counselling.
 */

export const courseSlug = (course: Course) =>
  course.code.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')

export function getCourse(slug: string) {
  return courses.find((c) => courseSlug(c) === slug)
}

/** Same level first, then the rest   used for "related programmes" links. */
export function relatedCourses(slug: string, count = 4) {
  const course = getCourse(slug)
  if (!course) return courses.slice(0, count)
  const others = courses.filter((c) => courseSlug(c) !== slug)
  const sameLevel = others.filter((c) => c.level === course.level)
  return [...sameLevel, ...others.filter((c) => c.level !== course.level)].slice(0, count)
}

/** Who a programme is open to. Kept at the level the site can stand behind. */
export function eligibilityFor(course: Course) {
  return course.level === 'UG'
    ? 'Class 12 (or an equivalent recognized qualification). Students who left an earlier degree partway may be eligible for credit transfer into a later year.'
    : 'A completed bachelor’s degree from a recognized university. The relevant discipline depends on the programme and the university.'
}

export const studyFormat =
  'Distance and online learning, with no attendance requirement and no fixed class hours, so the programme runs alongside full-time work.'

/** Shown as the admission sequence on every course page. */
export const admissionForCourse = [
  'Free counselling call to confirm eligibility and the right programme',
  'Document check   ID, previous marksheets and any earlier degree transcripts',
  'University application prepared and submitted on your behalf',
  'Confirmation of admission and enrolment, with fee instalments arranged',
]

/**
 * Which programmes each guide should point a reader to. Keyed by post slug, so
 * an article about credit transfer leads to the degrees people actually resume,
 * and one about government jobs leads to the degrees those posts ask for.
 */
export const guideCourses: Record<string, { codes: string[]; label: string }> = {
  'credit-transfer-explained': {
    codes: ['B.Com', 'BBA', 'BCA', 'BA'],
    label: 'Degrees students most often resume with transferred credits',
  },
  'is-a-distance-degree-valid-for-government-jobs': {
    codes: ['BA', 'B.Com', 'B.Sc', 'BBA'],
    label: 'Bachelor’s degrees that meet the graduate eligibility bar',
  },
  'studying-while-working-full-time': {
    codes: ['MBA', 'M.Com', 'BBA', 'BCA'],
    label: 'Programmes built to run alongside a full-time job',
  },
  'what-a-degree-costs-and-how-emi-works': {
    codes: ['B.Com', 'BBA', 'MBA', 'MCA'],
    label: 'Programmes to compare on duration and fee structure',
  },
}
