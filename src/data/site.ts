/** Single source of truth for all site copy. Edit text here, not in the pages. */

export const site = {
  name: 'GetMyDegree Institutions',
  shortName: 'GetMyDegree',
  url: 'https://getmydegree.in',
  tagline: 'Complete Your Degree. Restart Your Career.',
  description:
    'GetMyDegree Institutions offers flexible, UGC recognized UG & PG degree programs for working professionals, dropouts and gap-year students across India.',
  email: 'hello@getmydegree.in',
  phone: '+91 86066 77828',
  phoneHref: '+918606677828',
  officeHours: 'Mon–Sat · 9am to 7pm',
  established: 2021,
  social: {
    facebook: 'https://facebook.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
  },
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const centers = [
  {
    city: 'Thrissur',
    address: 'Vadanappilly Centre, Beach Road, Labba Building, 1st Floor, Thrissur',
    phone: '86066 77828',
    phoneHref: '+918606677828',
  },
  {
    city: 'Malappuram',
    address: 'Near Tirur Bus Stand, Forza Mall, Malappuram',
    phone: '7356644343',
    phoneHref: '+917356644343',
  },
]

export const heroTicker = [
  'Finish Your Degree. Unlock Your Future.',
  'Restart Your Career Without Starting Over.',
  'No Exams. No Pressure. Just Progress.',
  'From Dropout to Graduate   Your Comeback Starts Here.',
]

export const features = [
  {
    title: 'No Exam, No Hassle',
    body: 'Skip the stress of traditional exams with our flexible assessment model.',
  },
  {
    title: 'Start in 48 Hours',
    body: 'Get admitted and begin your degree journey within two days.',
  },
  { title: 'Flexible EMI Options', body: 'Affordable monthly payments that fit any budget.' },
  {
    title: 'UGC Recognized',
    body: 'Degrees valid for government jobs, promotions, and higher studies.',
  },
]

/** `logo` takes a path such as '/images/logos/rtu.svg' once real artwork
 *  exists; until then the hero sets the institution name as a wordmark. */
export const universities: {
  name: string
  /** URL segment for the university's own page. */
  slug: string
  location: string
  body: string
  logo?: string
  /* The line across the card's foot. UK institutions are outside the UGC and
     UPSC frame, so they carry their own claim rather than a borrowed one. */
  validity: string
  /* Same reason as validity: a UK university is not UGC approved. */
  badge: string
  /** Institution type, as the university itself is constituted. */
  type: string
  /** What the university offers. Levels only   never a programme list we
   *  cannot confirm is running in a given academic year. */
  offers: string[]
  /** Points a counsellor would make on the phone. Nothing here asserts a fee,
   *  an intake date, a ranking or a placement figure. */
  highlights: string[]
}[] = [
  {
    name: 'Rabindranath Tagore University',
    slug: 'rabindranath-tagore-university',
    location: 'Madhya Pradesh, Bhopal',
    body: 'UGC recognized private university offering UG, PG and doctoral programs across multiple disciplines.',
    badge: 'UGC Approved',
    validity: 'Valid for Govt Jobs · UPSC · PSC · Overseas',
    type: 'State private university',
    offers: ['Undergraduate degrees', 'Postgraduate degrees', 'Doctoral programmes'],
    highlights: [
      'Programmes across multiple disciplines, so a change of field at PG level is usually possible',
      'Study without attendance requirements, around a full-time job',
      'Credit transfer considered for semesters already completed elsewhere',
    ],
  },
  {
    name: 'PRIST Deemed University',
    slug: 'prist-deemed-university',
    location: 'Tamil Nadu, India',
    body: 'Deemed-to-be University with NAAC accreditation and industry aligned curriculum.',
    badge: 'UGC Approved',
    validity: 'Valid for Govt Jobs · UPSC · PSC · Overseas',
    type: 'Deemed-to-be university',
    offers: ['Undergraduate degrees', 'Postgraduate degrees'],
    highlights: [
      'NAAC accredited, with an industry aligned curriculum',
      'Suited to working professionals continuing an interrupted degree',
      'Documentation and enrolment handled by your counsellor end to end',
    ],
  },
  {
    name: 'Marjon University',
    slug: 'marjon-university',
    location: 'Cornwall, United Kingdom',
    body: 'UK government recognized university offering globally valid degrees.',
    badge: 'UK Recognized',
    validity: 'Globally Valid · UK Accredited · Career Ready',
    type: 'UK university',
    offers: ['Undergraduate degrees', 'Postgraduate degrees'],
    highlights: [
      'A UK government recognized award, held to UK quality assurance',
      'An option for students who want a degree recognized outside India',
      'Entry requirements and English language criteria are confirmed case by case',
    ],
  },
]

export const solutions = [
  {
    no: '01',
    title: 'Dropped Out?',
    body: 'Continue your education with our credit transfer system and pick up where you left off.',
    cta: 'Start Again',
  },
  {
    no: '02',
    title: 'Working Professional?',
    body: 'Upgrade your qualification without quitting your job or pausing your career.',
    cta: 'Upgrade Now',
  },
  {
    no: '03',
    title: 'No Degree, No Growth?',
    body: 'Unlock better opportunities and higher salaries with a recognized degree.',
    cta: 'Get Your Degree',
  },
  {
    no: '04',
    title: 'Government Job Aspirant?',
    body: 'Our degrees are valid for UPSC, PSC, and all major competitive examinations.',
    cta: 'Learn More',
  },
]

export const mbaModules = [
  'Strategic Management',
  'International Marketing',
  'Leadership & HR',
  'Sustainability & Business',
  'Dissertation Included',
  'Monthly Intakes',
]

export const pricing = [
  { label: 'MBA', price: '$6,000' },
  { label: 'BSc Business', price: '$7,500' },
  { label: 'MA Programs', price: '$6,500' },
  { label: 'Start From', price: '$1,000' },
]

export const testimonials = [
  {
    name: 'Vishnu P K',
    role: 'Alumni',
    quote: 'Completing my degree was the best decision. The support and guidance were excellent.',
  },
  {
    name: 'Sarangi Sajith',
    role: 'Alumni',
    quote: 'My journey was truly transformative. I gained confidence and real-world skills.',
  },
  {
    name: 'Muhammed Shibil',
    role: 'Alumni',
    quote: 'A great learning experience with strong career support throughout.',
  },
  {
    name: 'Fathima',
    role: 'Alumni',
    quote: 'Flexible learning helped me achieve my goals with confidence and clarity.',
  },
]

export const accreditations = [
  'University Verified',
  'Government Approved',
  'UGC Approved',
  'NAAC Accredited',
  'AICTE Approved',
]

export const stats = [
  { value: '10,000+', label: 'Graduates' },
  { value: '2021', label: 'Established' },
  { value: '9+', label: 'UG & PG Programs' },
  { value: '100%', label: 'UGC Recognized' },
]

export const trustPoints = [
  {
    no: '01',
    title: 'UGC Recognized Programs',
    body: 'Every program we offer is delivered through a recognized university partner.',
  },
  {
    no: '02',
    title: 'Fast Admission Process',
    body: 'Documentation, verification and enrolment completed within 48 hours.',
  },
  {
    no: '03',
    title: 'Affordable Fees',
    body: 'Transparent pricing with monthly EMI plans and no hidden charges.',
  },
  {
    no: '04',
    title: 'Dedicated Support',
    body: 'A personal academic counselor stays with you from admission to graduation.',
  },
  {
    no: '05',
    title: 'Flexible Study Options',
    body: 'Study online, at your own pace, around your job and family commitments.',
  },
]

export const validity = [
  {
    title: 'Government Jobs',
    body: 'Meets the graduate eligibility bar for UPSC, PSC and SSC recruitment.',
  },
  { title: 'Private Sector', body: 'A recognized qualification for roles that require a degree.' },
  {
    title: 'Higher Education',
    body: 'Accepted for masters and doctoral admission, subject to each institution’s criteria.',
  },
]

export type Course = {
  code: string
  name: string
  field: string
  body: string
  level: 'UG' | 'PG'
  years: string
}

export const courses: Course[] = [
  {
    code: 'B.Com',
    name: 'Bachelor of Commerce',
    field: 'Finance & Accounting',
    body: 'Build expertise in financial reporting, taxation, and accounting practices.',
    level: 'UG',
    years: '3 years',
  },
  {
    code: 'BBA',
    name: 'Bachelor of Business Administration',
    field: 'Business & Management',
    body: 'Master business strategy, operations, and modern management principles.',
    level: 'UG',
    years: '3 years',
  },
  {
    code: 'BCA',
    name: 'Bachelor of Computer Applications',
    field: 'IT & Software Development',
    body: 'Develop programming, systems, and software engineering skills.',
    level: 'UG',
    years: '3 years',
  },
  {
    code: 'BA',
    name: 'Bachelor of Arts',
    field: 'Humanities & Communication',
    body: 'Sharpen critical thinking, writing, and communication abilities.',
    level: 'UG',
    years: '3 years',
  },
  {
    code: 'B.Sc',
    name: 'Bachelor of Science',
    field: 'Science & Technology',
    body: 'Pursue specializations across science and emerging technology fields.',
    level: 'UG',
    years: '3 years',
  },
  {
    code: 'MBA',
    name: 'Master of Business Administration',
    field: 'Leadership & Strategy',
    body: 'Advanced management for senior roles and strategic decision-making.',
    level: 'PG',
    years: '2 years',
  },
  {
    code: 'MCA',
    name: 'Master of Computer Applications',
    field: 'Advanced IT & Programming',
    body: 'Deep technical mastery for senior software and architecture roles.',
    level: 'PG',
    years: '2 years',
  },
  {
    code: 'M.Com',
    name: 'Master of Commerce',
    field: 'Finance & Analytics',
    body: 'Specialized commerce with a strong analytics foundation.',
    level: 'PG',
    years: '2 years',
  },
  {
    code: 'MSW',
    name: 'Master of Social Work',
    field: 'Social Work & Development',
    body: 'Drive change in community development and social services.',
    level: 'PG',
    years: '2 years',
  },
]

export const eligibility = [
  { level: 'Undergraduate', points: ['12th Pass (Recognized Board)', 'Minimum 1-Year Gap'] },
  { level: 'Postgraduate', points: ["Bachelor's Degree", 'Minimum 1-Year Gap'] },
]

/**
 * What the degree does, each with the line that explains it. `icon` names the
 * mark drawn beside it; the mapping lives with the section that renders them.
 */
export const courseHighlights: { icon: string; title: string; body: string }[] = [
  {
    icon: 'faster',
    title: 'Complete 3-Year Degree Faster',
    body: 'Credit transfer carries your completed semesters across, so you resume rather than restart.',
  },
  {
    icon: 'certificate',
    title: 'Official Certificates Provided',
    body: 'Degree, consolidated marksheet and provisional certificate, issued by the university itself.',
  },
  {
    icon: 'government',
    title: 'Valid for Government Jobs',
    body: 'Accepted for UPSC, PSC, SSC and state services, on the same footing as a regular degree.',
  },
  {
    icon: 'growth',
    title: 'Career Growth & Promotions',
    body: 'The qualification most promotion and salary bands are gated on, completed alongside the job.',
  },
  {
    icon: 'higher',
    title: 'Higher Studies (India & Abroad)',
    body: 'Accepted for master’s and doctoral admission at home and overseas.',
  },
  {
    icon: 'attestation',
    title: 'Migration & Attestation Support',
    body: 'Migration certificates and attestation handled for you, whenever an employer asks.',
  },
]

/** The one true sequence on the site: what actually happens, in order. */
export const admissionSteps = [
  {
    step: '01',
    title: 'Talk to a counselor',
    body: 'A 20-minute call. We map your existing credits, your gap years and your goal to the right program.',
    when: 'Day 0',
  },
  {
    step: '02',
    title: 'Submit documents',
    body: 'Marksheets, ID and photographs. We verify eligibility and confirm credit transfer where it applies.',
    when: 'Day 1',
  },
  {
    step: '03',
    title: 'Enrolment confirmed',
    body: 'The university issues your enrolment number. Fees can be split into monthly instalments from here.',
    when: 'Within 48 hours',
  },
  {
    step: '04',
    title: 'Study and graduate',
    body: 'Learn at your own pace around work. Assessment is continuous   no sit-down examination hall.',
    when: '2–3 years',
  },
]

/** Situation → path. Not a sequence, so it carries no numbering. */
export const paths = [
  {
    situation: 'You dropped out',
    answer: 'Credit transfer',
    to: '/blog/credit-transfer-explained',
    body: 'Completed semesters are carried across, so you resume rather than restart.',
  },
  {
    situation: 'You are working full time',
    answer: 'Study around the job',
    to: '/blog/studying-while-working-full-time',
    body: 'No attendance requirement and no fixed class hours. Your employer never has to know.',
  },
  {
    situation: 'You have hit a ceiling',
    answer: 'A recognized degree',
    to: '/courses',
    body: 'The qualification most promotion and salary bands are gated on, completed alongside the job.',
  },
  {
    situation: 'You are sitting for government exams',
    answer: 'UPSC and PSC eligible',
    to: '/blog/is-a-distance-degree-valid-for-government-jobs',
    body: 'Degrees from UGC recognized universities. Eligibility for a given post follows that exam’s notification.',
  },
]

/**
 * The hero runs as three slides. Each pairs a photograph with the promise that
 * picture makes, so the words change with the image rather than sitting still
 * over a slideshow. The first is what gets prerendered and what search engines
 * and no-JS visitors see.
 */
export type HeroSlide = {
  image: 'hero-portrait' | 'hero-portrait-2' | 'hero-portrait-3'
  headline: [string, string]
  body: string
}

export const heroSlides: HeroSlide[] = [
  {
    image: 'hero-portrait',
    headline: ['Finish Your Degree,', 'Restart Your Career'],
    body: 'Complete a UGC, AICTE & NAAC approved degree from Central and State universities around your job   no entrance exam, no attendance, admission confirmed within 48 hours.',
  },
  {
    image: 'hero-portrait-2',
    headline: ['Study Around Your Job,', 'Not Instead Of It'],
    body: 'No attendance and no fixed class hours. Assessment is continuous, so the work fits into evenings and weekends at whatever pace your week allows.',
  },
  {
    image: 'hero-portrait-3',
    headline: ['A Degree That Counts', 'Where It Matters'],
    body: 'Awarded by Central & State Government, UGC, AICTE and NAAC approved universities in India and the UK   valid for government roles, promotions and further study.',
  },
]
