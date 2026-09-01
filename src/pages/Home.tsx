import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Clock, Phone, Wallet } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { homeSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Photo } from '../components/Photo'
import { HeroVisual } from '../components/HeroVisual'
import { Stats } from '../components/Stats'
import {
  admissionSteps,
  courses,
  mbaModules,
  paths,
  pricing,
  site,
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
  return (
    <>
      <Seo {...pageMeta['/']} schema={homeSchema} />

      {/*
        One composed screen, not a stack of cards: the hero is a full-bleed
        warm band rather than a bordered panel, so the only rounded objects are
        the photograph, the proof card and the trust bar. Everything else is
        held by type, spacing and alignment.
      */}
      <section className="hero-surface -mt-2 lg:-mt-4">
        <div className="shell hero-screen">
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p
                className="enter inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.02em] text-muted"
                style={{ ['--enter-delay' as string]: '60ms' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-navy" aria-hidden="true" />
                Trusted by 10,000+ graduates
              </p>

              <h1
                className="enter t-editorial mt-4 text-ink"
                style={{ ['--enter-delay' as string]: '140ms' }}
              >
                Finish Your Degree,
                <br />
                <span className="rule-accent">Restart Your Career</span>
              </h1>

              <p
                className="enter mt-5 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted sm:text-base lg:text-[1.0625rem]"
                style={{ ['--enter-delay' as string]: '240ms' }}
              >
                Complete a UGC recognized UG or PG degree around your job — no entrance exam, no
                attendance, admission confirmed within 48 hours.
              </p>

              {/* The three objections, pulled out of the paragraph for scanning. */}
              <ul
                className="enter mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] text-muted sm:text-sm"
                style={{ ['--enter-delay' as string]: '300ms' }}
              >
                {['No entrance exam', 'No attendance', 'Admission within 48 hours'].map(
                  (point, i) => (
                    <li key={point} className="flex items-center gap-3">
                      {i > 0 && (
                        <span className="h-1 w-1 rounded-full bg-muted/40" aria-hidden="true" />
                      )}
                      {point}
                    </li>
                  ),
                )}
              </ul>

              <div
                className="enter mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                style={{ ['--enter-delay' as string]: '360ms' }}
              >
                <Link to="/contact" className="btn btn-arrow btn-primary justify-center">
                  Book a free consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/courses" className="btn btn-text justify-center">
                  Explore programs
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>

              <p
                className="enter mt-3.5 text-xs text-muted"
                style={{ ['--enter-delay' as string]: '420ms' }}
              >
                Free guidance · No obligation
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="-mx-[var(--hero-pad)] -mb-[var(--hero-pad-y)] h-[clamp(260px,42vh,340px)] pl-6 lg:mx-0 lg:mb-0 lg:-mr-[var(--hero-pad)] lg:h-[clamp(360px,60vh,540px)] lg:pl-4">
                <HeroVisual />
              </div>
            </div>
          </div>

          {/* Trust bar: three areas, one rule, inside the first screen. */}
          <div className="enter mt-8 lg:mt-6" style={{ ['--enter-delay' as string]: '760ms' }}>
            <div className="hero-trust grid gap-5 rounded-2xl border border-line bg-white/70 px-5 py-4 backdrop-blur-sm sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-0">
              <div className="lg:col-span-6 lg:pr-8">
                <h2 className="text-[0.6875rem] font-medium tracking-[0.16em] text-muted uppercase">
                  Partner universities
                </h2>
                <ul className="mt-2.5 flex flex-wrap items-center gap-x-7 gap-y-2">
                  {universities.map((u) => (
                    <li key={u.name}>
                      {u.logo ? (
                        <img
                          src={u.logo}
                          alt={u.name}
                          loading="lazy"
                          className="h-6 w-auto opacity-65 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                        />
                      ) : (
                        <span className="font-display text-[0.9375rem] leading-tight font-medium text-ink/85">
                          {u.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  Recognized institutions in India and the UK.
                </p>
              </div>

              <div className="border-t border-line pt-4 lg:col-span-3 lg:border-t-0 lg:border-l lg:px-8 lg:pt-0">
                <p className="font-display text-[1.375rem] leading-none font-semibold text-navy">
                  10,000+
                </p>
                <p className="mt-1.5 text-sm font-medium">Graduates placed</p>
                <p className="text-xs text-muted">since 2021</p>
              </div>

              <div className="border-t border-line pt-4 lg:col-span-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-muted uppercase">
                  Counseling, free
                </p>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="action mt-1.5 gap-2 font-display text-[1.0625rem] font-medium text-navy underline-offset-4 hover:underline"
                >
                  <Phone size={14} aria-hidden="true" />
                  {site.phone}
                </a>
                <p className="text-xs text-muted">Mon–Sat · 9am to 7pm</p>
              </div>
            </div>
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
