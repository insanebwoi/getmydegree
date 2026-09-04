import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, MapPin, ShieldCheck, University } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { universitiesSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { courses, universities } from '../data/site'
import { courseSlug } from '../data/courses'

export default function Universities() {
  return (
    <>
      <Seo {...pageMeta['/universities']} schema={universitiesSchema} />

      <PageHero
        badge="Partner universities"
        title="The universities that award your degree"
        intro="We prepare and submit your application; the degree itself is awarded by the university. These are the institutions we place students into."
      />

      {/* The shape of the choice, in four numbers, before the cards. */}
      <div className="shell -mt-4 pb-4 sm:-mt-6 lg:-mt-8">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { value: String(universities.length), label: 'Partner universities' },
            { value: '2', label: 'Countries' },
            { value: String(courses.length), label: 'Programmes' },
            { value: 'UG & PG', label: 'Award levels' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div className="card card-p text-center">
                <dt className="font-display text-2xl font-semibold text-navy sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <Section align="left">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u, i) => (
            <Reveal key={u.slug} delay={i * 70} className="h-full">
              <li className="h-full">
                <div className="card card-hover card-p relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy">
                        <University size={19} aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-emerald-700">
                        <ShieldCheck size={12} aria-hidden="true" />
                        {u.badge}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-lg font-semibold text-ink sm:text-xl">
                      <Link
                        to={`/universities/${u.slug}`}
                        className="after:absolute after:inset-0 hover:underline"
                      >
                        {u.name}
                      </Link>
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
                      <MapPin size={13} className="shrink-0 text-gold-700" aria-hidden="true" />
                      {u.location}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{u.body}</p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-3.5 text-xs font-medium text-navy">
                    About {u.name.split(' ')[0]}
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Recognition, approval status and the programmes running in a given intake are confirmed in
          writing during counselling, since they vary by university and academic year.
        </p>
      </Section>

      {/*
        The question behind the page: who actually awards the degree, and what
        our part in it is. Saying it plainly is worth more than another badge.
      */}
      <Section
        badge="How it works"
        title="Who awards the degree"
        intro="We are a counselling and admissions service. The qualification is conferred by the university, and its name is the one on your certificate."
      >
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: 'You and a counsellor',
              body: 'We check what you have already completed, what you are eligible for, and which university suits the outcome you want.',
            },
            {
              step: 'We prepare the application',
              body: 'Documents, verification and the submission to the university are handled for you, including any credit transfer claim.',
            },
            {
              step: 'The university awards',
              body: 'You are enrolled with the university, study to its curriculum, and it confers the degree. We stay with you until you graduate.',
            },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 80} className="h-full">
              <li className="card card-p flex h-full flex-col">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-50 font-display text-sm font-semibold text-navy">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-medium text-ink">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/*
        What a careful applicant should verify for themselves. It invites
        scrutiny, and it is the most useful thing this page can tell someone
        about to commit years and money.
      */}
      <Section
        align="left"
        badge="Before you enrol"
        title="What to check for yourself"
        intro="Any counsellor can make a claim. These are the checks that settle it, and they take a few minutes."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Look the university up on the UGC list',
              body: 'The University Grants Commission publishes the recognized universities in India. Search the name there rather than taking anyone\u2019s word for it.',
            },
            {
              title: 'Check the mode of study is approved',
              body: 'Distance and online programmes are approved separately from the university itself, and that approval is programme-specific and dated.',
            },
            {
              title: 'Read the eligibility on the exam notification',
              body: 'If a government post is the goal, the notification for that recruitment states the qualification it accepts. That document decides it, not us.',
            },
            {
              title: 'Get the fee and the intake in writing',
              body: 'Ask for the total, what it covers, the instalment dates and the academic year it applies to, before you pay anything.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="h-full">
              <li className="card card-p flex h-full gap-3.5">
                <span className="mt-0.5 shrink-0 text-gold-700">
                  <CircleCheck size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-medium text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    {item.body}
                  </span>
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* The programmes, so the page leads somewhere rather than ending. */}
      <Section
        align="left"
        badge="Programmes"
        title="What you can study"
        intro="Nine UG and PG degrees. Which are open at a given university in a given intake is confirmed at counselling."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {courses.map((course, i) => (
            <Reveal key={course.code} delay={i * 40} className="h-full min-w-0">
              <li className="h-full">
                <Link
                  to={`/courses/${courseSlug(course)}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="font-display text-lg font-semibold text-navy">
                    {course.code}
                  </span>
                  <span className="mt-1 text-sm leading-snug text-ink group-hover:underline">
                    {course.name}
                  </span>
                  <span className="mt-auto pt-3 text-xs text-muted">{course.years}</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="card card-p mt-10 flex flex-col items-start gap-5 bg-navy-950 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="t-h3 font-display font-medium">
              Not sure which university fits your case?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
              Send us what you have completed so far and we will tell you which of these you are
              eligible for, and what it would take.
            </p>
          </div>
          <Link to="/contact" className="btn btn-gold shrink-0">
            Book a free consultation
          </Link>
        </div>
      </Section>
    </>
  )
}
