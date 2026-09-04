import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Clock,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { homeSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Photo } from '../components/Photo'
import { HeroVisual } from '../components/HeroVisual'
import { HeroTrust } from '../components/HeroTrust'
import { Gallery } from '../components/Gallery'
import { Stats } from '../components/Stats'
import { ApplyDialog } from '../components/ApplyDialog'
import {
  admissionSteps,
  courses,
  mbaModules,
  paths,
  pricing,
  heroSlides,
  stats,
  testimonials,
  universities,
  type Course,
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
  const [slide, setSlide] = useState(0)
  const [applying, setApplying] = useState<Course | null>(null)

  return (
    <>
      <Seo {...pageMeta['/']} schema={homeSchema} />

      {applying && <ApplyDialog course={applying} onClose={() => setApplying(null)} />}

      {/*
        Light hero: copy left, photograph right, and the credibility strip as a
        white bar across the base. Brand blue carries the second line, the stat
        card and the primary action; gold marks the three checks and nothing
        else.
      */}
      <section className="shell -mt-1 pb-10 sm:pb-14 lg:pb-16">
        <div className="hero-screen relative isolate overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white">
          <HeroVisual onChange={setSlide} />
          <div className="grid flex-1 items-stretch gap-5 sm:gap-7 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col items-center justify-center pt-[calc(var(--hero-band)-var(--hero-pad-y)+1.25rem)] text-center sm:pt-[calc(var(--hero-band)*0.42)] lg:col-span-7 lg:items-start lg:pt-3 lg:text-left xl:col-span-6">
              <p
                className="enter mt-0 inline-flex items-center gap-2 self-center rounded-full lg:mt-3 lg:self-start border border-line bg-white py-1.5 pr-4 pl-3 text-[0.8125rem] font-medium text-ink shadow-[0_1px_2px_rgba(14,21,38,0.04)]"
                style={{ ['--enter-delay' as string]: '60ms' }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-gold sm:h-2 sm:w-2"
                  aria-hidden="true"
                />
                Trusted by 10,000+ graduates
              </p>

              {/*
                Headline and copy change with the photograph. Both sit in one
                grid cell over an invisible sizer holding all three slides, so
                the box is as tall as the longest and nothing below it moves
                when the slide turns.
              */}
              <div className="relative mt-5 w-full sm:mt-6 lg:mt-14">
                <div aria-hidden="true" className="invisible grid">
                  {heroSlides.map((s) => (
                    <div key={s.image} className="[grid-area:1/1]">
                      <div className="t-editorial">
                        {s.headline[0]}
                        <br />
                        {s.headline[1]}
                      </div>
                      <div className="mt-3 max-w-[34rem] mx-auto lg:mx-0 text-[0.9375rem] leading-relaxed sm:mt-3.5 sm:text-base lg:text-[1.0625rem]">
                        {s.body}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0">
                  {heroSlides.map((s, i) => {
                    const isActive = i === slide
                    return (
                      <div
                        key={s.image}
                        aria-hidden={!isActive}
                        className={`hero-text-frame absolute inset-0 ${isActive ? 'is-active' : ''}`}
                      >
                        {/*
                          Only the slide on screen is the document's heading.
                          All three frames stay mounted so they can crossfade,
                          but rendering three h1 elements would give the page
                          three competing headings.
                        */}
                        {isActive ? (
                          <h1 className="t-editorial text-ink">
                            {s.headline[0]}
                            <br />
                            <span className="text-navy">{s.headline[1]}</span>
                          </h1>
                        ) : (
                          <div className="t-editorial text-ink">
                            {s.headline[0]}
                            <br />
                            <span className="text-navy">{s.headline[1]}</span>
                          </div>
                        )}
                        <p className="mt-3 max-w-[34rem] mx-auto lg:mx-0 text-[0.9375rem] leading-relaxed text-ink sm:mt-3.5 sm:text-base lg:text-[1.0625rem] lg:text-muted">
                          {s.body}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <ul
                className="enter mt-2 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[0.75rem] font-medium text-ink sm:mt-2.5 sm:gap-x-5 sm:text-sm lg:justify-start"
                style={{ ['--enter-delay' as string]: '300ms' }}
              >
                {['No entrance exam', 'No attendance', 'Admission within 48 hours'].map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold text-navy-950 sm:h-5 sm:w-5">
                      <Check
                        size={10}
                        strokeWidth={3.5}
                        className="sm:h-3 sm:w-3"
                        aria-hidden="true"
                      />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div
                className="enter mt-3 flex w-full flex-col items-stretch gap-3 sm:mt-3.5 sm:w-auto sm:flex-row sm:items-center"
                style={{ ['--enter-delay' as string]: '360ms' }}
              >
                <Link to="/contact" className="btn btn-arrow btn-primary justify-center">
                  Book a free consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/courses" className="btn btn-arrow btn-outline-navy justify-center">
                  Explore programs
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/*
              The photograph is behind everything now, so this column carries
              only the proof card   placed over the picture, where the eye lands
              after the headline.
            */}
            <div className="hidden items-end justify-start lg:col-span-5 lg:flex lg:justify-end lg:pb-6 xl:col-span-6">
              <div
                className="enter rounded-2xl bg-navy px-5 py-4 text-white shadow-[0_20px_48px_-24px_rgba(1,58,148,0.65)]"
                style={{ ['--enter-delay' as string]: '620ms' }}
              >
                <span className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white">
                  <GraduationCap size={18} aria-hidden="true" />
                </span>
                <p className="font-display text-[1.625rem] leading-none font-semibold">10,000+</p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-white/85">
                  Graduates placed
                  <br />
                  since 2021
                </p>
              </div>
            </div>
          </div>

          {/* Credibility sits in the hero only where there is room for it. */}
          <div
            className="enter mt-6 hidden lg:block"
            style={{ ['--enter-delay' as string]: '760ms' }}
          >
            <HeroTrust />
          </div>
        </div>
      </section>

      {/* Below the hero on phones and tablets, where it does not cost the
          first screen. */}
      <div className="shell -mt-4 pb-10 sm:pb-14 lg:hidden">
        <HeroTrust />
      </div>

      {/*
        A sideways gallery straight under the hero. The pictures come from
        public/images/gallery — drop one in and it appears here, in filename
        order, with no code change.
      */}
      <section className="pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pb-14">
        <div className="shell">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="t-h2 font-display font-medium">Building Leaders for Tomorrow</h2>
            <p className="t-body mt-3 text-muted">
              Where knowledge, skills, and success come together
            </p>
          </Reveal>
        </div>
        <Reveal delay={80} className="mt-8 lg:mt-10">
          <Gallery />
        </Reveal>
      </section>

      {/* Awarding bodies & University Partners Section */}
      <section className="shell pb-10 sm:pb-14 lg:pb-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="badge">Accredited degree programs</span>
          <h2 className="t-h1 mt-3">State &amp; Central Government Universities</h2>
          <p className="t-body mt-2.5 text-navy font-medium sm:text-lg">
            3-Year Distance &amp; Regular Degree Programs
          </p>
          <p className="mt-2 text-sm text-muted">
            Degrees awarded by UGC, AICTE &amp; NAAC recognized universities in India and accredited
            institutions in the United Kingdom — 100% valid for government roles, promotions and
            higher education.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10">
          {universities.map((u, i) => (
            <Reveal key={u.name} delay={i * 70} className="h-full">
              <div className="card card-hover card-p flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 font-display text-sm font-bold text-navy">
                      {u.initials}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-emerald-700">
                      <ShieldCheck size={12} />
                      {u.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-ink sm:text-xl">
                    {u.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
                    <MapPin size={13} className="text-gold-700 shrink-0" />
                    {u.location}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{u.body}</p>
                </div>

                <div className="mt-5 border-t border-line pt-3.5 text-center">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-navy">
                    {u.validity}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Feature Highlights Strip & Explore CTA */}
        <Reveal delay={140} className="mt-6 flex flex-col items-center gap-5 sm:mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 rounded-2xl border border-line bg-navy-50/50 px-5 py-3.5 text-center text-xs font-medium text-navy sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              100% UGC, AICTE &amp; NAAC Approved
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Continuous Assessment — No Exam Hall
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Direct Admission Within 48 Hours
            </span>
          </div>

          <Link to="/courses" className="btn btn-primary inline-flex items-center gap-2">
            <span>Explore all programs</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* About */}
      <Section
        badge="About"
        title="Education built around the life you already have"
        intro="Since 2021 we have helped people who stopped studying   for work, for money, for family   return and finish a degree that employers and government bodies accept."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Photo name="hero-2" className="min-h-60 sm:min-h-72 lg:min-h-full" />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="card card-hover h-full px-4 py-3.5">
                  <span className="chip">
                    <p.Icon size={16} aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-[0.9375rem] font-display font-semibold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{p.body}</p>
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
                  <button
                    type="button"
                    onClick={() => setApplying(c)}
                    className="action mt-4 inline-flex items-center text-sm font-medium text-navy cursor-pointer text-left hover:underline"
                    aria-label={`Enquire about ${c.name}`}
                  >
                    <span>Enquire now</span>
                    <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="lg:col-span-4">
            <div className="card card-p flex h-full flex-col justify-center bg-navy-950 text-white">
              <div>
                <span className="badge badge-dark">All programs</span>
                <h3 className="mt-5 font-display text-2xl font-medium">
                  Five undergraduate and four postgraduate degrees
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/65 md:text-sm">
                  Every one is UGC recognized and assessed continuously there is no final
                  examination hall to sit in.
                </p>
                {/*
                  A fixed height, not an aspect ratio: this card shares a grid
                  row with the programme cards, and a ratio-driven height
                  overflowed the row so the button sat on the picture.
                */}
                {/*
                  The action sits on the picture, so the card ends on the image
                  rather than below it. A gradient at the foot keeps the button
                  legible whatever the photograph is doing behind it.
                */}
                <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-white/10">
                  <Photo name="hero-3" rounded="none" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(5,18,41,0.55),transparent)]"
                  />
                  <Link to="/courses" className="btn btn-gold absolute bottom-4 left-4">
                    See all nine
                  </Link>
                </div>
              </div>
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
        <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
          <div className="grid gap-3 lg:col-span-7">
            {paths.map((p, i) => (
              <Reveal key={p.situation} delay={i * 70}>
                {/*
                  The route is the answer to the situation, so it leads rather
                  than trailing behind it — and it is no longer hidden on the
                  screens where most of this audience reads. The whole card is
                  the link, which costs no extra height.
                */}
                <Link
                  to={p.to}
                  className="card card-hover card-p group flex h-full items-start gap-4"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-50 font-display text-sm font-medium text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="t-h3 font-display font-medium text-ink">{p.situation}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold-700">
                        {p.answer}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-base leading-relaxed text-muted md:text-sm">
                      {p.body}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="mt-1 hidden shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-navy sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="lg:col-span-5">
            <div className="relative h-full">
              <Photo name="situations" ratio="4/3" className="lg:aspect-auto lg:h-full" />
              <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-white/92 px-4 py-3 backdrop-blur-md">
                <p className="text-sm font-medium">Not sure which one you are?</p>
                <p className="mt-0.5 text-xs text-muted">
                  A counselor will map it in twenty minutes, free.
                </p>
              </div>
            </div>
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
