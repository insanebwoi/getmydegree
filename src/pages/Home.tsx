import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Clock,
  GraduationCap,
  Wallet,
} from 'lucide-react'
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

      {/* Hero panel with floating summary cards, mirroring a dashboard surface. */}
      <section className="shell pt-1 pb-10 sm:pb-14 lg:pb-20">
        <div className="panel relative overflow-hidden px-4 pt-11 pb-0 sm:px-7 sm:pt-14 lg:px-10 lg:pt-20">
          {/* Faint guide lines — structure, not decoration. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
              backgroundSize: '96px 96px',
              maskImage: 'radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 100%)',
            }}
          />
          <span className="chip absolute top-10 left-6 hidden lg:grid" aria-hidden="true">
            <GraduationCap size={19} />
          </span>
          <span className="chip absolute top-10 right-6 hidden lg:grid" aria-hidden="true">
            <BadgeCheck size={19} />
          </span>

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="badge">
                <span className="dot bg-gold" /> Trusted by 10,000+ graduates
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="t-hero mt-5">
                Finish Your Degree,
                <br />
                Restart Your Career
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="t-body mx-auto mt-4 max-w-xl text-muted">
                Complete a UGC recognized UG or PG degree around your job — no entrance exam, no
                attendance, admission confirmed within 48 hours.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <Link to="/contact" className="btn btn-primary">
                  Book a free consultation
                </Link>
                <Link to="/courses" className="btn btn-ghost">
                  Explore programs
                </Link>
              </div>
            </Reveal>
          </div>

          {/*
            The photograph bleeds to the panel edges and its top edge is
            feathered into the panel, so the image reads as part of the
            surface rather than a block pasted below it.
          */}
          <div className="relative mt-10 -mb-px sm:mt-12 lg:mt-16">
            <div
              className="-mx-4 sm:-mx-7 lg:-mx-10"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, #000 42%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 42%)',
              }}
            >
              <Photo name="hero-1" ratio="16/6" rounded="none" priority className="min-h-52" />
            </div>

            {/* Cards straddle the image edge. */}
            <div className="relative -mt-14 grid gap-3 pb-5 sm:-mt-20 sm:grid-cols-3 sm:gap-4 lg:-mt-28 lg:pb-8">
              <Reveal delay={80}>
                <div className="card card-hover card-p h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="t-h3 font-display font-medium">Partner universities</h2>
                    <ArrowUpRight size={18} className="text-muted" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-base text-muted md:text-sm">
                    Degrees awarded by three recognized institutions in India and the UK.
                  </p>
                  <div className="mt-5 flex -space-x-2">
                    {universities.map((u) => (
                      <span
                        key={u.initials}
                        className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-navy-50 text-xs font-semibold text-navy"
                      >
                        {u.initials}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="card card-hover card-p h-full text-center">
                  <p className="t-h3 font-display font-medium">Graduates placed</p>
                  <p className="mt-4 font-display text-4xl font-medium text-navy">10,000+</p>
                  <p className="mt-2 text-base text-muted md:text-sm">since {site.established}</p>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="card card-hover card-p flex h-full flex-col justify-between">
                  <div>
                    <p className="t-h3 font-display font-medium">Counseling, free</p>
                    <p className="mt-3 text-base text-muted md:text-sm">
                      Talk to an academic counselor. {site.officeHours}.
                    </p>
                  </div>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="action mt-5 text-sm font-medium text-navy"
                  >
                    {site.phone}
                    <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
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
