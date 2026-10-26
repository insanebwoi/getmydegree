import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { pageMeta } from '../data/meta'
import { creditTransferSchema } from '../data/schema'
import { courseSlug } from '../data/courses'
import { courses, site } from '../data/site'

const transfers = [
  'Passed papers from a UGC recognized university, in the same or a closely related discipline.',
  'Foundation and language papers, which map cleanly across most programmes.',
  'Semesters completed within a reasonable window; most universities look at the last eight to ten years.',
  'Credits already recorded against your Academic Bank of Credits (ABC) ID.',
]

const doesNot = [
  'Backlog papers you never cleared, which carry no credit to transfer.',
  'Study at an institution that was not recognized when you attended.',
  'A change of discipline so wide that no paper maps across, such as engineering into social work.',
]

const documents = [
  'Every semester marksheet you hold (the previous university can issue duplicates of lost ones).',
  'The transfer or migration certificate from your previous institution, if one was issued.',
  'Your Plus Two (12th) certificate.',
  'The course structure or syllabus of what you completed, if you have it.',
  'An identity document and passport photographs.',
]

const steps = [
  {
    title: 'Send what you have',
    body: 'Share your marksheets on WhatsApp or bring them to our Thrissur or Malappuram centre. The first assessment is free.',
  },
  {
    title: 'We map your credits',
    body: 'We compare the papers you passed against the programmes our partner universities run and tell you, in writing, how much of the degree remains and at which university.',
  },
  {
    title: 'You check the university',
    body: 'Before paying anything you get the university name, the programme, its DEB entitlement for your admission year and the full fee, so you can verify them yourself.',
  },
  {
    title: 'Enrol and finish',
    body: 'The university admits you with your completed credits recognized, and you study only the remaining papers, around your job.',
  },
]

const faqs = [
  {
    q: 'Is credit transfer the same as an inter-college transfer?',
    a: 'No. An inter-college transfer moves an active student between colleges of the same university, usually within a semester or two. Credit transfer is for people who stopped studying: the papers you passed are accepted by a different university, which admits you with advanced standing so you do not repeat them.',
  },
  {
    q: 'How much of my degree can I skip?',
    a: 'It depends on how many papers you passed and how closely they match the new programme. Someone who finished two years of a three-year B.Com may only need the final year. We tell you the exact figure after looking at your marksheets.',
  },
  {
    q: 'Will the final degree be valid for government jobs?',
    a: 'The degree is awarded by the university you finish at, not by us. For our Indian partner universities, a degree from a recognized university with a valid DEB entitlement for your programme and admission year is accepted like any other; eligibility for a particular post follows that exam’s notification.',
  },
  {
    q: 'My previous college has closed or lost my records. Can I still transfer?',
    a: 'Usually, if the affiliating university still holds your results. The university, not the college, issues duplicate marksheets and migration certificates. Bring whatever you have and we will tell you what to request.',
  },
]

export default function CreditTransfer() {
  const ug = courses.filter((c) => c.level === 'UG')
  return (
    <>
      <Seo {...pageMeta['/credit-transfer']} schema={creditTransferSchema} />

      <PageHero
        image="credit-transfer-banner"
        badge="Credit transfer"
        title="Complete your discontinued degree with credit transfer"
        intro="Left a degree partway through? The semesters you passed usually still count. We map them to a recognized university so you finish the remaining papers instead of starting again, with counselling in Thrissur and Malappuram, Kerala."
      >
        <Link to="/contact" className="btn btn-primary">
          Get a free credit assessment
        </Link>
        <a href={`tel:${site.phoneHref}`} className="btn btn-ghost">
          Call {site.phone}
        </a>
      </PageHero>

      <Section
        badge="How it works"
        title="What credit transfer means"
        intro="Under the UGC credit framework, papers you completed and passed at a recognized university carry a credit value. A receiving university can accept those credits against equivalent papers in its own programme and admit you with advanced standing, rather than into the first year."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="card card-p h-full">
              <h3 className="t-h3 font-display font-medium">What usually transfers</h3>
              <ul className="mt-4 grid gap-3">
                {transfers.map((t) => (
                  <li key={t} className="flex gap-2.5 text-base text-muted md:text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card card-p h-full">
              <h3 className="t-h3 font-display font-medium">What usually does not</h3>
              <ul className="mt-4 grid gap-3">
                {doesNot.map((t) => (
                  <li key={t} className="flex gap-2.5 text-base text-muted md:text-sm">
                    <X size={18} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section badge="Process" title="From marksheets to enrolment">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <li className="card card-p h-full list-none">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 font-display text-sm font-medium text-navy">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 t-h3 font-display font-medium">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted md:text-sm">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section badge="Documents" title="What to bring to the assessment">
        <Reveal>
          <ul className="card card-p mx-auto grid max-w-3xl gap-3">
            {documents.map((d) => (
              <li key={d} className="flex gap-2.5 text-base text-muted md:text-sm">
                <Check size={18} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        badge="Programmes"
        title="Degrees you can complete"
        intro="Credit transfer is most common at undergraduate level, where people stopped after one or two years."
      >
        <div className="flex flex-wrap justify-center gap-2.5">
          {ug.map((c) => (
            <Link key={c.code} to={`/courses/${courseSlug(c)}`} className="btn btn-ghost">
              {c.code}: {c.name}
            </Link>
          ))}
        </div>
      </Section>

      <Section badge="Questions" title="Credit transfer questions">
        <div className="mx-auto grid max-w-3xl gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="card card-p group">
              <summary className="cursor-pointer font-display text-base font-semibold text-ink">
                {f.q}
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted md:text-sm">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          More detail in our guides to{' '}
          <Link to="/blog/credit-transfer-explained" className="text-navy underline-offset-4 hover:underline">
            what happens to completed credits
          </Link>{' '}
          and the{' '}
          <Link
            to="/blog/academic-bank-of-credits-abc-id-explained"
            className="text-navy underline-offset-4 hover:underline"
          >
            Academic Bank of Credits ID
          </Link>
          . Official sources:{' '}
          <a href="https://www.abc.gov.in/" className="text-navy underline-offset-4 hover:underline">
            ABC portal
          </a>
          ,{' '}
          <a href="https://deb.ugc.ac.in/" className="text-navy underline-offset-4 hover:underline">
            UGC Distance Education Bureau
          </a>
          .
        </p>
      </Section>
    </>
  )
}
