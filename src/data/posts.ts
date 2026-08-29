import type { ImageName } from './images'

/**
 * Blog content. Each post's body is a list of blocks so the article layout
 * stays typed and consistent — no HTML strings, no markdown parser.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }

export type Post = {
  slug: string
  title: string
  /** Used as the meta description and the listing excerpt. */
  excerpt: string
  category: string
  /** ISO date, published. */
  date: string
  author: string
  readingMinutes: number
  image: ImageName
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'is-a-distance-degree-valid-for-government-jobs',
    title: 'Is a distance degree valid for government jobs in India?',
    excerpt:
      'The short answer is yes — provided the university is UGC recognized and the programme is approved by the DEB. Here is how to check before you enrol.',
    category: 'Recognition',
    date: '2026-08-18',
    author: 'GetMyDegree Academic Team',
    readingMinutes: 6,
    image: 'blog-1',
    body: [
      {
        type: 'p',
        text: 'This is the first question almost every applicant asks us, and it deserves a precise answer rather than a reassuring one. A degree earned through distance or online mode is treated on par with a regular degree for government recruitment — but only when two conditions are met.',
      },
      { type: 'h2', text: 'The two conditions that actually matter' },
      {
        type: 'list',
        items: [
          'The university must be recognized by the University Grants Commission (UGC) — established by an Act of Parliament, a State Act, or notified as a deemed-to-be university.',
          'The specific programme must be approved for distance or online mode by the UGC Distance Education Bureau (DEB) for the academic year in which you enrol.',
        ],
      },
      {
        type: 'p',
        text: 'Both conditions are checkable in public records before you pay a rupee. The UGC publishes the list of recognized universities, and the DEB publishes the list of approved programmes year by year. If a provider cannot show you its entry in both, that is the end of the conversation.',
      },
      { type: 'h2', text: 'What the UGC notification says' },
      {
        type: 'quote',
        text: 'Degrees awarded through open and distance learning or online mode by recognized universities are treated as equivalent to corresponding degrees awarded in conventional mode.',
      },
      {
        type: 'p',
        text: 'In practice this means UPSC, the State Public Service Commissions, SSC, banking recruitment and the railways all accept these degrees for posts where a graduate qualification is the eligibility bar. What they check at document verification is the university and the programme, not the mode of study.',
      },
      { type: 'h2', text: 'Where candidates actually get rejected' },
      {
        type: 'p',
        text: 'Rejections we have seen almost never turn on distance mode itself. They turn on three avoidable things: enrolling with an institution that lost its approval mid-course, a mismatch between the name on the marksheet and the name on the application, and missing migration or provisional certificates at verification.',
      },
      {
        type: 'list',
        items: [
          'Confirm the DEB approval covers the year you enrol, not just an earlier year.',
          'Keep your name identical across the 10th certificate, the degree and the application form.',
          'Collect the provisional certificate, consolidated marksheet and migration certificate at completion, not years later.',
        ],
      },
      { type: 'h2', text: 'Before you enrol' },
      {
        type: 'p',
        text: 'Ask any provider for the university name, the DEB approval reference and the year of approval, then verify them yourself on the UGC and DEB sites. A legitimate counselor will hand these over without hesitation. Every programme we place students into is verified this way before we recommend it.',
      },
    ],
  },
  {
    slug: 'credit-transfer-explained',
    title: 'You completed two years and stopped. What happens to those credits?',
    excerpt:
      'Credit transfer means you resume rather than restart. What carries across, what does not, and the documents you need to make the case.',
    category: 'Admissions',
    date: '2026-08-04',
    author: 'GetMyDegree Academic Team',
    readingMinutes: 5,
    image: 'blog-2',
    body: [
      {
        type: 'p',
        text: 'A large share of the people who call us left a degree partway through — a job abroad came up, fees became impossible, a family situation changed. The assumption is that those completed semesters are gone. Usually they are not.',
      },
      { type: 'h2', text: 'What credit transfer means in practice' },
      {
        type: 'p',
        text: 'Under the UGC credit framework, semesters you completed and passed at a recognized university carry a credit value. A receiving university can accept those credits against equivalent papers in its own programme, admitting you with advanced standing rather than into the first year.',
      },
      {
        type: 'p',
        text: 'The practical effect: someone who finished two years of a three-year B.Com may complete the remaining year rather than repeating all three. That is two years and two years of fees you do not spend again.',
      },
      { type: 'h2', text: 'What usually transfers' },
      {
        type: 'list',
        items: [
          'Passed papers from a UGC recognized university, in the same or a closely related discipline.',
          'Foundation and language papers, which map cleanly across most programmes.',
          'Semesters completed within a reasonable window — most universities look for the last eight to ten years.',
        ],
      },
      { type: 'h2', text: 'What usually does not' },
      {
        type: 'list',
        items: [
          'Backlog papers you never cleared — these have no credit value to transfer.',
          'Study at an institution that was not recognized at the time you attended.',
          'A discipline change so wide that no paper maps across, for example engineering into social work.',
        ],
      },
      { type: 'h2', text: 'The documents that decide it' },
      {
        type: 'p',
        text: 'The assessment is made on paper, so gather these before the conversation: all semester marksheets you hold, the transfer or migration certificate from the previous institution if it was issued, your 12th certificate, and the course structure if you have it. Where a marksheet is lost, the previous university can usually issue a duplicate.',
      },
      {
        type: 'p',
        text: 'Send us what you have and we will map it against the programmes our partner universities run, then tell you exactly how much of the degree remains. That assessment is free and takes about a day.',
      },
    ],
  },
  {
    slug: 'studying-while-working-full-time',
    title: 'How to actually finish a degree while working full time',
    excerpt:
      'Flexible study only works if the plan survives a bad week at work. A realistic weekly structure from students who finished.',
    category: 'Study advice',
    date: '2026-07-21',
    author: 'GetMyDegree Academic Team',
    readingMinutes: 7,
    image: 'blog-3',
    body: [
      {
        type: 'p',
        text: 'Flexibility is the reason people choose this route and the reason some do not finish. When nothing is scheduled, nothing is protected — and the degree loses every negotiation against a deadline at work.',
      },
      { type: 'h2', text: 'Give the degree fixed hours' },
      {
        type: 'p',
        text: 'The students who complete on time treat study like a shift. Six to eight hours a week, placed at specific times, defended the way you would defend a work meeting. Two weekday evenings and one weekend morning is the pattern we see most often.',
      },
      { type: 'h2', text: 'Work backwards from the assessment' },
      {
        type: 'list',
        items: [
          'Write every submission date for the semester into your calendar the week the semester opens.',
          'Set your own deadline five days before each real one — that gap absorbs the week work explodes.',
          'Break each assignment into reading, drafting and revising, and schedule those separately.',
        ],
      },
      { type: 'h2', text: 'Use the commute and the dead time' },
      {
        type: 'p',
        text: 'Reading and lecture material work well in fragments — a bus ride, a lunch break, twenty minutes before bed. Save the continuous blocks for writing, which does not survive interruption. Students routinely cover most of their reading without ever sitting at a desk for it.',
      },
      { type: 'h2', text: 'Tell two people' },
      {
        type: 'p',
        text: 'Tell someone at home and someone at work that you are studying. The first protects your evenings; the second means a manager knows why you left at six on a Thursday. You are not asking permission, only removing the friction of explaining it every week.',
      },
      { type: 'h2', text: 'Expect one bad month' },
      {
        type: 'p',
        text: 'There will be a month where nothing gets done — an illness, a project, a wedding. It is not the end of the degree unless you treat it as one. Contact your counselor early, before a deadline is missed rather than after; extensions and rescheduled submissions are routine when asked for in time.',
      },
      {
        type: 'quote',
        text: 'The people who finish are not the ones with more free time. They are the ones who asked for help in week three instead of week ten.',
      },
    ],
  },
  {
    slug: 'what-a-degree-costs-and-how-emi-works',
    title: 'What a degree actually costs, and how the instalments work',
    excerpt:
      'A plain breakdown of tuition, university and examination fees, what is included, and how monthly payment plans are structured.',
    category: 'Fees',
    date: '2026-07-07',
    author: 'GetMyDegree Academic Team',
    readingMinutes: 4,
    image: 'blog-4',
    body: [
      {
        type: 'p',
        text: 'Fee conversations in this sector are often vague, which is exactly why people get caught out later. Here is how the cost is actually built up, so you can compare any two offers on the same terms.',
      },
      { type: 'h2', text: 'The components' },
      {
        type: 'list',
        items: [
          'University tuition, charged per year or per semester — the largest component.',
          'Registration and enrolment, charged once at admission.',
          'Examination fees, charged per assessment cycle.',
          'Certificate issuance, and where relevant migration and attestation.',
        ],
      },
      {
        type: 'p',
        text: 'When you are quoted a single number, ask which of the four it covers. A tuition-only figure that excludes examination and certificate fees is not comparable to an all-inclusive one.',
      },
      { type: 'h2', text: 'How the instalments work' },
      {
        type: 'p',
        text: 'Our plans divide the annual fee across monthly payments for that academic year. There is no interest and no processing fee — the total across twelve months equals the fee paid upfront. The first instalment is due at enrolment and the rest fall on the same date each month.',
      },
      { type: 'h2', text: 'What we will not do' },
      {
        type: 'p',
        text: 'We do not take payment before you have seen the university name, the programme, the DEB approval and the full fee in writing. If any provider asks you to pay to "block a seat" before showing you those, treat it as a warning rather than urgency.',
      },
      {
        type: 'p',
        text: 'Ask us for a written breakdown for any programme on this site. You will get all four components, the instalment schedule, and what happens if you need to pause — before you commit to anything.',
      },
    ],
  },
]

export const postsByDate = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
