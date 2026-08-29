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
  'From Dropout to Graduate — Your Comeback Starts Here.',
]

export const features = [
  { title: 'No Exam, No Hassle', body: 'Skip the stress of traditional exams with our flexible assessment model.' },
  { title: 'Start in 48 Hours', body: 'Get admitted and begin your degree journey within two days.' },
  { title: 'Flexible EMI Options', body: 'Affordable monthly payments that fit any budget.' },
  { title: 'UGC Recognized', body: 'Degrees valid for government jobs, promotions, and higher studies.' },
]

export const universities = [
  {
    name: 'Rabindranath Tagore University',
    location: 'Madhya Pradesh, Bhopal',
    body: 'UGC recognized private university offering UG, PG and doctoral programs across multiple disciplines.',
    initials: 'RTU',
  },
  {
    name: 'PRIST Deemed University',
    location: 'Tamil Nadu, India',
    body: 'Deemed-to-be University with NAAC accreditation and industry aligned curriculum.',
    initials: 'PU',
  },
  {
    name: 'Marjon University',
    location: 'Cornwall, United Kingdom',
    body: 'UK government recognized university offering globally valid degrees.',
    initials: 'MU',
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
  { name: 'Vishnu P K', role: 'Alumni', quote: 'Completing my degree was the best decision. The support and guidance were excellent.' },
  { name: 'Sarangi Sajith', role: 'Alumni', quote: 'My journey was truly transformative. I gained confidence and real-world skills.' },
  { name: 'Muhammed Shibil', role: 'Alumni', quote: 'A great learning experience with strong career support throughout.' },
  { name: 'Fathima', role: 'Alumni', quote: 'Flexible learning helped me achieve my goals with confidence and clarity.' },
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
  { no: '01', title: 'UGC Recognized Programs', body: 'Every program we offer is delivered through a recognized university partner.' },
  { no: '02', title: 'Fast Admission Process', body: 'Documentation, verification and enrolment completed within 48 hours.' },
  { no: '03', title: 'Affordable Fees', body: 'Transparent pricing with monthly EMI plans and no hidden charges.' },
  { no: '04', title: 'Dedicated Support', body: 'A personal academic counselor stays with you from admission to graduation.' },
  { no: '05', title: 'Flexible Study Options', body: 'Study online, at your own pace, around your job and family commitments.' },
]

export const validity = [
  { title: 'Government Jobs', body: 'Valid for UPSC, PSC, SSC, and all state services.' },
  { title: 'Private Sector', body: 'Recognized by leading employers across industries.' },
  { title: 'Higher Education', body: 'Accepted for masters and doctoral programs worldwide.' },
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
  { code: 'B.Com', name: 'Bachelor of Commerce', field: 'Finance & Accounting', body: 'Build expertise in financial reporting, taxation, and accounting practices.', level: 'UG', years: '3 years' },
  { code: 'BBA', name: 'Bachelor of Business Administration', field: 'Business & Management', body: 'Master business strategy, operations, and modern management principles.', level: 'UG', years: '3 years' },
  { code: 'BCA', name: 'Bachelor of Computer Applications', field: 'IT & Software Development', body: 'Develop programming, systems, and software engineering skills.', level: 'UG', years: '3 years' },
  { code: 'BA', name: 'Bachelor of Arts', field: 'Humanities & Communication', body: 'Sharpen critical thinking, writing, and communication abilities.', level: 'UG', years: '3 years' },
  { code: 'B.Sc', name: 'Bachelor of Science', field: 'Science & Technology', body: 'Pursue specializations across science and emerging technology fields.', level: 'UG', years: '3 years' },
  { code: 'MBA', name: 'Master of Business Administration', field: 'Leadership & Strategy', body: 'Advanced management for senior roles and strategic decision-making.', level: 'PG', years: '2 years' },
  { code: 'MCA', name: 'Master of Computer Applications', field: 'Advanced IT & Programming', body: 'Deep technical mastery for senior software and architecture roles.', level: 'PG', years: '2 years' },
  { code: 'M.Com', name: 'Master of Commerce', field: 'Finance & Analytics', body: 'Specialized commerce with a strong analytics foundation.', level: 'PG', years: '2 years' },
  { code: 'MSW', name: 'Master of Social Work', field: 'Social Work & Development', body: 'Drive change in community development and social services.', level: 'PG', years: '2 years' },
]

export const eligibility = [
  { level: 'Undergraduate', points: ['12th Pass (Recognized Board)', 'Minimum 1-Year Gap'] },
  { level: 'Postgraduate', points: ["Bachelor's Degree", 'Minimum 1-Year Gap'] },
]

export const courseHighlights = [
  'Complete 3-Year Degree Faster',
  'Official Certificates Provided',
  'Valid for Government Jobs',
  'Career Growth & Promotions',
  'Higher Studies (India & Abroad)',
  'Migration & Attestation Support',
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
    body: 'Learn at your own pace around work. Assessment is continuous — no sit-down examination hall.',
    when: '2–3 years',
  },
]

/** Situation → path. Not a sequence, so it carries no numbering. */
export const paths = [
  {
    situation: 'You dropped out',
    answer: 'Credit transfer',
    body: 'Completed semesters are carried across, so you resume rather than restart.',
  },
  {
    situation: 'You are working full time',
    answer: 'Study around the job',
    body: 'No attendance requirement and no fixed class hours. Your employer never has to know.',
  },
  {
    situation: 'You have hit a ceiling',
    answer: 'A recognized degree',
    body: 'The qualification most promotion and salary bands are gated on, completed alongside the job.',
  },
  {
    situation: 'You are sitting for government exams',
    answer: 'UPSC and PSC eligible',
    body: 'Degrees from UGC recognized universities, valid for every major competitive examination.',
  },
]
