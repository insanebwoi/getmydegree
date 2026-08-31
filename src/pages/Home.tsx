import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, Clock, Wallet } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { homeSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Photo } from '../components/Photo'
import { Stats } from '../components/Stats'
import {
  admissionSteps,
  courses,
  mbaModules,
  paths,
  pricing,
  site,
  startingPoints,
  stats,
  testimonials,
  universities,
} from '../data/site'

const featured = courses.filter((c) => ['BBA', 'BCA', 'MBA', 'MCA'].includes(c.code))

const perks = [
  {
    Icon: BadgeCheck,
    title: 'No entrance exam',
    body: 'Continuous assessment instead of an examination hall.',
  },
  {
    Icon: Clock,
    title: 'Admitted in 48 hours',
    body: 'Documents verified and enrolment confirmed in two days.',
  },
  {
    Icon: Wallet,
    title: 'Monthly instalments',
    body: 'Fees split across the year with no interest.',
  },
  {
    Icon: Building2,
    title: 'UGC recognized',
    body: 'Valid for government jobs, promotions and higher study.',
  },
]

export default function Home() {
  const [choice, setChoice] = useState<string | null>(null)
  const selected = startingPoints.find((p) => p.id === choice) ?? null

  return (
    <>
      <Seo {...pageMeta['/']} schema={homeSchema} />

      {/*
        The hero asks the question a counselor asks first. Choosing an answer
        replaces the default cards with the route for that situation, and
        carries it into the counseling form — so the page does a little of the
        qualifying work before anyone picks up the phone.
      */}
      <section className="shell pt-1 pb-10 sm:pb-14 lg:pb-16">
        <div className="panel relative overflow-hidden px-4 pt-9 pb-5 sm:px-7 sm:pt-11 lg:px-10 lg:pt-12 lg:pb-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
              backgroundSize: '96px 96px',
              maskImage: 'radial-gradient(70% 70% at 30% 40%, #000 30%, transparent 100%)',
            }}
          />

          <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="text-center lg:col-span-6 lg:text-left">
              <Reveal>
                <div className="flex items-center justify-center gap-2.5 lg:justify-start">
                  <ul className="flex -space-x-1.5 sm:-space-x-2">
                    {testimonials.map((t) => (
                      <li
                        key={t.name}
                        className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-navy-50 font-display text-[0.6875rem] font-medium text-navy sm:h-8 sm:w-8 sm:text-xs"
                        aria-hidden="true"
                      >
                        {t.name.charAt(0)}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[0.8125rem] whitespace-nowrap text-muted sm:text-sm">
                    <strong className="font-medium text-ink">10,000+ graduates</strong> since{' '}
                    {site.established}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="t-hero mt-4 sm:mt-5">
                  Where did you <span className="mark">stop?</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted sm:text-base lg:mx-0 lg:text-[1.0625rem]">
                  Tell us where you left off and we will tell you what is left to finish — a UGC
                  recognized degree, completed around your job.
                </p>
              </Reveal>

              {/* The question, as four answers. */}
              <Reveal delay={180}>
                <div
                  role="group"
                  aria-label="Where did you stop?"
                  className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
                >
                  {startingPoints.map((point) => {
                    const isActive = point.id === selected?.id
                    return (
                      <button
                        key={point.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setChoice(isActive ? null : point.id)}
                        className={`badge min-h-11 text-sm transition-colors ${
                          isActive
                            ? 'border-navy bg-navy text-white'
                            : 'hover:border-navy-200 hover:text-ink'
                        }`}
                      >
                        {point.label}
                      </button>
                    )
                  })}
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="relative order-first lg:order-none lg:col-span-6">
              <div className="hero-media -mx-4 -mt-9 sm:-mx-7 sm:-mt-11 lg:mx-0 lg:-mt-12 lg:-mr-10 lg:-mb-8">
                <Photo
                  name="hero-1"
                  ratio="16/9"
                  rounded="none"
                  priority
                  className="max-h-[150px] sm:max-h-[230px] lg:max-h-[430px]"
                />
              </div>

              <div className="float-chip absolute right-4 bottom-2 hidden items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5 lg:flex">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-navy-950">
                  <Clock size={16} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">Admitted in 48 hours</span>
              </div>
            </Reveal>
          </div>

          {/*
            Base of the hero: the answer to whichever chip is selected, or the
            three standing facts when nothing is. The default state is what
            gets prerendered, so crawlers and no-JS visitors see the cards.
          */}
          <div className="relative mt-6 lg:mt-8">
            {selected ? (
              <div role="status" className="card card-p bg-navy-950 text-white sm:p-8">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <p className="text-sm text-gold">{selected.label}</p>
                    <h2 className="t-h3 mt-2 font-display font-medium text-white">
                      {selected.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-sm">
                      {selected.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {selected.facts.map((fact) => (
                        <li key={fact} className="badge badge-dark text-xs">
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2.5 lg:col-span-4 lg:items-end">
                    <Link to={`/contact?start=${selected.id}`} className="btn btn-gold">
                      Book a free consultation
                    </Link>
                    <button
                      type="button"
                      onClick={() => setChoice(null)}
                      className="action text-sm font-medium text-white/70 hover:text-white"
                    >
                      Choose a different answer
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                <Reveal delay={60}>
                  <Link
                    to="/courses"
                    className="card card-hover card-p flex h-full flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="t-h3 font-display font-medium">Awarded by universities</h2>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-muted"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-2 text-base text-muted md:text-sm">
                        Your certificate is issued by a recognized university, not by us.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <ul className="flex -space-x-2">
                        {universities.map((u) => (
                          <li
                            key={u.initials}
                            className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-navy-50 text-xs font-semibold text-navy"
                          >
                            {u.initials}
                          </li>
                        ))}
                      </ul>
                      <span className="text-sm text-muted">India &amp; the UK</span>
                    </div>
                  </Link>
                </Reveal>

                <Reveal delay={120}>
                  <Link
                    to="/courses"
                    className="card card-hover card-p flex h-full flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="t-h3 font-display font-medium">Nine UG &amp; PG programs</h2>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-muted"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-2 text-base text-muted md:text-sm">
                        Commerce, management, technology, humanities and social work.
                      </p>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {['B.Com', 'BBA', 'BCA', 'MBA', 'MCA', '+4'].map((code) => (
                        <li
                          key={code}
                          className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-navy"
                        >
                          {code}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>

                <Reveal delay={180}>
                  <div className="card card-hover card-p flex h-full flex-col justify-between">
                    <div>
                      <h2 className="t-h3 font-display font-medium">Free counseling</h2>
                      <p className="mt-2 text-base text-muted md:text-sm">
                        Twenty minutes with an academic counselor. {site.officeHours}.
                      </p>
                    </div>
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="action mt-4 text-sm font-medium text-navy"
                    >
                      {site.phone}
                      <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Awarding bodies, in the position the reference gives its logo strip. */}
      <div className="shell pb-12 lg:pb-20">
        <Reveal>
          <p className="text-center text-base text-muted md:text-sm">
            Degrees awarded by recognized universities in India and the United Kingdom
          </p>
          <ul className="mt-7 grid gap-4 sm:grid-cols-3">
            {universities.map((u) => (
              <li key={u.name} className="card px-5 py-4 text-center">
                <span className="t-h3 font-display font-medium">{u.name}</span>
                <span className="mt-1 block text-sm text-muted">{u.location}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* About */}
      <Section
        badge="About"
        title="Education built around the life you already have"
        intro="Since 2021 we have helped people who stopped studying — for work, for money, for family — return and finish a degree that employers and government bodies accept."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Photo name="hero-2" className="min-h-60 sm:min-h-72 lg:min-h-full" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="card card-hover card-p h-full">
                  <span className="chip">
                    <p.Icon size={19} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 t-h3 font-display font-medium">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted md:text-sm">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <Stats items={stats} />
        </div>
      </Section>

      {/* Programs */}
      <Section
        badge="Programs"
        title="Recognized UG and PG degrees"
        intro="Nine programs across commerce, management, technology, humanities and social work."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {featured.map((c, i) => (
              <Reveal key={c.code} delay={i * 70}>
                <article className="card card-hover card-p flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-medium text-navy">{c.code}</span>
                    <span className="badge">{c.years}</span>
                  </div>
                  <h3 className="mt-4 t-h3 font-display font-medium">{c.name}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted md:text-sm">
                    {c.body}
                  </p>
                  <Link to="/courses" className="action mt-4 text-sm font-medium text-navy">
                    Programme details
                    <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="lg:col-span-4">
            <div className="card card-p flex h-full flex-col justify-between bg-navy-950 text-white">
              <div>
                <span className="badge badge-dark">All programs</span>
                <h3 className="mt-5 font-display text-2xl font-medium">
                  Five undergraduate and four postgraduate degrees
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/65 md:text-sm">
                  Every one is UGC recognized and assessed continuously — there is no final
                  examination hall to sit in.
                </p>
              </div>
              <Link to="/courses" className="btn btn-gold mt-8 self-start">
                See all nine
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Situations */}
      <Section
        badge="Who this is for"
        title="Four situations we solve every week"
        intro="Most people arrive with one of these. Each has a documented route to a finished degree."
      >
        <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
          <div className="grid gap-3 lg:col-span-7">
            {paths.map((p, i) => (
              <Reveal key={p.situation} delay={i * 70}>
                <div className="card card-hover card-p">
                  <div className="flex items-start gap-3">
                    <span className="dot mt-2" aria-hidden="true" />
                    <div>
                      <h3 className="t-h3 font-display font-medium">{p.situation}</h3>
                      <p className="mt-1.5 text-base leading-relaxed text-muted md:text-sm">
                        {p.body}
                      </p>
                    </div>
                    <span className="badge ml-auto hidden shrink-0 sm:inline-flex">{p.answer}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140} className="lg:col-span-5">
            <Photo name="about-2" ratio="4/3" className="lg:h-full" />
          </Reveal>
        </div>
      </Section>

      {/* Admission process */}
      <Section badge="Working process" title="From first call to enrolment in 48 hours">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((s, i) => (
            <Reveal key={s.step} delay={i * 80} as="li">
              <div className="card card-hover card-p h-full">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 font-display text-sm font-medium text-navy">
                    {s.step}
                  </span>
                  <span className="text-xs font-medium text-gold-700">{s.when}</span>
                </div>
                <h3 className="mt-5 t-h3 font-display font-medium">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted md:text-sm">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* International MBA */}
      <Section badge="International" title="Triple certification MBA, awarded in the UK">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="card card-p h-full sm:p-7 lg:p-9">
              <p className="leading-relaxed text-muted">
                Twelve to eighteen months, monthly intakes, dissertation included. Delivered online
                and payable in instalments.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {mbaModules.map((m) => (
                  <li key={m} className="flex items-center gap-2.5 text-sm">
                    <span className="dot" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary mt-8">
                Start an application
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="card card-p h-full sm:p-7 lg:p-9">
              <h3 className="t-h3 font-display font-medium">Fees</h3>
              <table className="mt-5 w-full text-left">
                <caption className="sr-only">Programme fees in US dollars</caption>
                <tbody>
                  {pricing.map((p) => (
                    <tr key={p.label} className="border-b border-line last:border-0">
                      <th scope="row" className="py-3.5 text-sm font-medium">
                        {p.label}
                      </th>
                      <td className="py-3.5 text-right font-display text-xl font-medium">
                        {p.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-base text-muted md:text-sm">
                Instalment plans on every program. No interest, no processing fee.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Testimonials */}
      <Section badge="Graduates" title="What finishing it changed">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <figure className="card card-hover card-p flex h-full flex-col">
                <blockquote className="flex-1 text-base leading-relaxed md:text-sm">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-50 font-display font-medium text-navy">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="shell pb-12 sm:pb-16 lg:pb-24">
        <Reveal>
          <div className="rounded-[var(--radius-panel)] bg-navy px-5 py-12 text-center text-white sm:px-8 lg:px-12 lg:py-20">
            <span className="badge badge-dark">Free consultation</span>
            <h2 className="t-h1 mx-auto mt-4 max-w-2xl">
              Twenty minutes is enough to know whether this works for you
            </h2>
            <p className="t-body mx-auto mt-4 max-w-lg text-white/70">
              Tell us what you completed and where you stopped. We will map the rest.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              <Link to="/contact" className="btn btn-gold">
                Book a free consultation
              </Link>
              <Link to="/courses" className="btn btn-ghost-dark">
                Browse programs
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
