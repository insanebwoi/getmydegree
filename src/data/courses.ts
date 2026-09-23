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
  'best-degree-options-for-working-professionals': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes that most often fit around a full-time job',
  },
  'ugc-deb-approval-search-verify-recognition': {
    codes: ['BA', 'B.Com', 'BBA', 'MBA'],
    label: 'Programmes we place students into, at recognized universities',
  },
  'online-degree-admission-deadlines': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes admitting in the current cycle',
  },
  'bba-vs-bcom-for-career-growth': {
    codes: ['BBA', 'B.Com', 'MBA', 'M.Com'],
    label: 'The two pathways, and where each one continues',
  },
  'masters-degree-while-working-full-time': {
    codes: ['MBA', 'M.Com', 'MCA', 'MSW'],
    label: 'Postgraduate programmes built around working hours',
  },
  'ugc-updates-for-online-degree-applicants': {
    codes: ['BA', 'B.Com', 'BBA', 'MBA'],
    label: 'Programmes at universities entitled for distance and online mode',
  },
  'how-to-choose-the-right-online-university': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes to compare across our partner universities',
  },
  'kerala-online-mca-msc-it-programs': {
    codes: ['MCA', 'BCA', 'B.Sc', 'MBA'],
    label: 'Technical programmes for working IT professionals',
  },
  'naac-grades-and-nirf-rankings-explained': {
    codes: ['BA', 'B.Com', 'BBA', 'MBA'],
    label: 'Programmes at accredited partner universities',
  },
  'ai-and-digital-skills-in-degree-curriculums': {
    codes: ['BCA', 'B.Sc', 'MCA', 'MBA'],
    label: 'Programmes carrying data and digital electives',
  },
  'distance-mba-admission-process': {
    codes: ['MBA', 'M.Com', 'MCA', 'BBA'],
    label: 'The MBA, and the programmes most often compared with it',
  },
  'dual-degree-pathways-under-ugc-guidelines': {
    codes: ['B.Com', 'BBA', 'BA', 'MBA'],
    label: 'Programmes commonly taken as the second degree',
  },
  'degrees-for-defence-and-public-sector-employees': {
    codes: ['BA', 'B.Com', 'B.Sc', 'MBA'],
    label: 'Degrees that meet most government eligibility criteria',
  },
  'academic-bank-of-credits-abc-id-explained': {
    codes: ['B.Com', 'BBA', 'BCA', 'BA'],
    label: 'Programmes students most often resume with transferred credits',
  },
  'top-online-masters-for-corporate-careers': {
    codes: ['MBA', 'M.Com', 'MCA', 'MSW'],
    label: 'Postgraduate programmes for corporate progression',
  },
  'degree-admission-cycles-july-and-january': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes open in the current admission cycle',
  },
  'online-vs-distance-degree-modes': {
    codes: ['BA', 'B.Com', 'BBA', 'MCA'],
    label: 'Programmes offered in both modes',
  },
  'degree-requirements-for-executive-promotions': {
    codes: ['BBA', 'B.Com', 'MBA', 'BA'],
    label: 'The fastest recognized routes to a graduate qualification',
  },
  'red-flags-before-enrolling-in-an-online-degree': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes at universities we have verified',
  },
  'balancing-full-time-work-with-an-online-degree': {
    codes: ['B.Com', 'BBA', 'MBA', 'MCA'],
    label: 'Programmes with workloads that survive a full-time job',
  },
  'bsc-vs-bca-for-tech-jobs': {
    codes: ['BCA', 'B.Sc', 'MCA', 'MBA'],
    label: 'The two pathways, and where each one continues',
  },
  'equivalence-of-online-and-campus-degrees': {
    codes: ['BA', 'B.Com', 'BBA', 'MBA'],
    label: 'Degrees awarded by recognized universities',
  },
  'degrees-for-healthcare-and-shift-workers': {
    codes: ['B.Com', 'BA', 'BBA', 'MSW'],
    label: 'Programmes that work around a rotating roster',
  },
  'nri-and-international-students-indian-degrees': {
    codes: ['B.Com', 'BBA', 'MBA', 'MCA'],
    label: 'Programmes most often taken from outside India',
  },
  'degree-fees-instalments-and-emi-options': {
    codes: ['B.Com', 'BBA', 'MBA', 'MCA'],
    label: 'Programmes to compare on duration and fee structure',
  },
  'proctored-exams-and-assessment-models': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes and how each one is assessed',
  },
  'flexible-degree-options-in-kerala': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes we place Kerala students into',
  },
  'pg-diploma-vs-masters-degree': {
    codes: ['MBA', 'M.Com', 'MCA', 'MSW'],
    label: 'Master’s degrees, where only a degree will do',
  },
  'micro-credentials-and-specializations': {
    codes: ['MBA', 'BBA', 'BCA', 'M.Com'],
    label: 'Programmes offering named specialisations',
  },
  'step-by-step-degree-application-guide': {
    codes: ['B.Com', 'BBA', 'BCA', 'MBA'],
    label: 'Programmes to start an application with',
  },
}

/**
 * What each programme actually covers, and where it leads.
 *
 * Without this every course page was the same 459 words with a one-line
 * description swapped in   B.Com and BBA differed by seven words, which is
 * the shape of thin templated content whatever the metadata says. Subjects
 * are the standard core of each degree and careers are the roles they
 * ordinarily lead to; neither asserts a syllabus for a named university,
 * because that varies by institution and academic year.
 */
export const courseDetail: Record<
  string,
  { subjects: string[]; careers: string[]; suits: string }
> = {
  'B.Com': {
    subjects: [
      'Financial accounting',
      'Corporate and business law',
      'Cost and management accounting',
      'Taxation',
      'Auditing',
      'Business economics',
    ],
    careers: [
      'Accountant',
      'Audit assistant',
      'Tax consultant',
      'Banking and finance roles',
      'Further study: M.Com, MBA, CA',
    ],
    suits:
      'People already working in accounts, billing or finance who need the qualification their role is graded against.',
  },
  BBA: {
    subjects: [
      'Principles of management',
      'Marketing',
      'Human resource management',
      'Organisational behaviour',
      'Business statistics',
      'Entrepreneurship',
    ],
    careers: [
      'Team lead and supervisor roles',
      'Sales and marketing',
      'Operations',
      'HR coordination',
      'Further study: MBA',
    ],
    suits:
      'People running a team or a small business who want the management vocabulary and the degree to go with the experience.',
  },
  BCA: {
    subjects: [
      'Programming fundamentals',
      'Data structures',
      'Database management',
      'Operating systems',
      'Web technologies',
      'Software engineering',
    ],
    careers: [
      'Junior developer',
      'Support and QA roles',
      'Database and systems administration',
      'Further study: MCA, MSc IT',
    ],
    suits:
      'People working in IT support or self-taught in code who need a recognized qualification behind the skills.',
  },
  BA: {
    subjects: [
      'Language and literature',
      'Communication',
      'Sociology or political science',
      'History',
      'Psychology',
      'Critical writing',
    ],
    careers: [
      'Government recruitment where a graduate degree is the bar',
      'Teaching after B.Ed',
      'Content and communications',
      'Further study: MA',
    ],
    suits:
      'People whose goal is the graduate qualification itself   most often for a government exam or a promotion band.',
  },
  'B.Sc': {
    subjects: [
      'Core science specialisation',
      'Mathematics',
      'Statistics',
      'Laboratory and practical work',
      'Research method',
      'Computer applications',
    ],
    careers: [
      'Technical and laboratory roles',
      'Government science posts',
      'Teaching after B.Ed',
      'Further study: MSc',
    ],
    suits:
      'People in technical work who need the formal science degree their next role or exam requires.',
  },
  MBA: {
    subjects: [
      'Strategic management',
      'Financial management',
      'Marketing management',
      'Operations and supply chain',
      'Business analytics',
      'Leadership',
    ],
    careers: [
      'Manager and senior manager roles',
      'Business development',
      'Consulting',
      'Promotion into leadership bands',
    ],
    suits:
      'Working professionals with a bachelor’s degree who have hit the ceiling a postgraduate qualification is gating.',
  },
  MCA: {
    subjects: [
      'Advanced programming',
      'Algorithms',
      'Cloud and distributed systems',
      'Machine learning foundations',
      'Software architecture',
      'Project work',
    ],
    careers: [
      'Senior developer',
      'Systems architect',
      'Technical lead',
      'Government IT posts requiring a PG degree',
    ],
    suits:
      'Developers who need a postgraduate qualification for a senior title or a government technical post.',
  },
  'M.Com': {
    subjects: [
      'Advanced accounting',
      'Financial management',
      'Business research',
      'Direct and indirect taxation',
      'Managerial economics',
      'Analytics',
    ],
    careers: ['Senior accountant', 'Finance manager', 'Lecturer after NET', 'Further study: PhD'],
    suits:
      'Commerce graduates in finance roles who want the postgraduate qualification for seniority or teaching.',
  },
  MSW: {
    subjects: [
      'Social work practice',
      'Community organisation',
      'Counselling',
      'Social policy and legislation',
      'Field work',
      'Research method',
    ],
    careers: [
      'NGO and development sector roles',
      'Medical and psychiatric social work',
      'CSR',
      'Government welfare posts',
    ],
    suits:
      'People working in community, welfare or NGO settings who need the professional qualification the sector asks for.',
  },
}
