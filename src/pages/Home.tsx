import { Link } from 'react-router-dom'
import { ArrowRight, Check, GraduationCap, Sparkles } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { homeSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Marquee } from '../components/Marquee'
import { SectionHeading } from '../components/SectionHeading'
import {
  accreditations,
  features,
  heroTicker,
  mbaModules,
  pricing,
  site,
  solutions,
  testimonials,
  universities,
} from '../data/site'


export default function Home() {
  return (
    <>
      <Seo {...pageMeta['/']} schema={homeSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(60% 70% at 78% 18%, rgba(63,111,192,.45) 0%, transparent 60%), radial-gradient(45% 55% at 8% 90%, rgba(251,205,65,.16) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="shell relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-gold">
                <Sparkles size={14} aria-hidden="true" />
                Trusted by 10,000+ Graduates
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-6xl">
                Complete Your Degree.
                <br />
                <span className="text-gold">Restart Your Career.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Career stuck? Start again with confidence. Since {site.established}, we've helped
                students and professionals complete their UG &amp; PG degrees through flexible
                learning systems — study anytime, anywhere, without disrupting your life.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/courses" className="btn btn-gold">
                  Explore Programs
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn btn-ghost">
                  Free Consultation
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold text-navy-950">
                <GraduationCap size={30} aria-hidden="true" />
              </div>
              <p className="mt-6 font-display text-2xl font-extrabold leading-tight">
                Your degree, on your schedule.
              </p>
              <ul className="mt-6 space-y-3.5">
                {features.map((f) => (
                  <li key={f.title} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f.title}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-xs tracking-wide text-white/50 uppercase">Graduates</dt>
                  <dd className="font-display text-2xl font-extrabold text-gold">10,000+</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-white/50 uppercase">Admission in</dt>
                  <dd className="font-display text-2xl font-extrabold text-gold">48 hrs</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="relative border-y border-white/10 bg-navy-900 py-4">
          <Marquee
            duration={45}
            items={heroTicker.map((t) => (
              <span key={t} className="font-display text-sm font-bold text-white/80 sm:text-base">
                {t}
              </span>
            ))}
          />
        </div>
      </section>

      {/* Intro + features */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              eyebrow="Building Leaders for Tomorrow"
              title={
                <>
                  Empowering learners to achieve{' '}
                  <span className="text-navy">academic and career success.</span>
                </>
              }
              body="With over a decade of experience, we understand every journey is different. We offer customized education pathways — whether you're restarting, upgrading, or continuing your studies."
            />
            <Reveal delay={120} className="grid gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="card p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-50 text-navy">
                    <Check size={18} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg text-navy-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="bg-bg py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Partner Universities"
            title={
              <>
                Recognized institutions.
                <br />
                Globally valid degrees.
              </>
            }
            body="We partner with UGC recognized Indian universities and accredited international institutions so your qualification is respected wherever you go."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {universities.map((u, i) => (
              <Reveal key={u.name} delay={i * 100}>
                <article className="card flex h-full flex-col p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy font-display text-sm font-extrabold text-gold">
                    {u.initials}
                  </span>
                  <h3 className="mt-6 text-xl text-navy-950">{u.name}</h3>
                  <p className="mt-1.5 text-xs font-semibold tracking-wide text-gold-700 uppercase">
                    {u.location}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{u.body}</p>
                  <Link
                    to="/courses"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy transition-colors hover:text-gold-600"
                  >
                    View Programs
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="We Solve Real Career Problems"
            title={
              <>
                Whatever your situation, we
                <br />
                have a path forward.
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s, i) => (
              <Reveal key={s.no} delay={i * 90}>
                <article className="card group flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow">Solution</span>
                    <span className="font-display text-3xl font-extrabold text-navy-100 transition-colors group-hover:text-gold">
                      {s.no}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl text-navy-950">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy transition-colors hover:text-gold-600"
                  >
                    {s.cta}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* International program */}
      <section className="bg-navy-950 py-20 text-white lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              light
              eyebrow="International Program"
              title={
                <>
                  Triple Certification
                  <br />
                  MBA <span className="text-gold">(UK)</span>
                </>
              }
              body="A globally recognized MBA designed for future leaders. 12–18 months, monthly intakes, EMI available."
            />
            <Reveal delay={120}>
              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {mbaModules.map((m) => (
                  <li key={m} className="flex items-center gap-2.5 text-sm text-white/80">
                    <Check size={15} strokeWidth={3} className="shrink-0 text-gold" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-gold mt-10">
                Start Your Application
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={160} className="grid gap-4 sm:grid-cols-2">
            {pricing.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-white/12 bg-white/5 p-6 transition-colors hover:border-gold/50"
              >
                <p className="text-xs font-bold tracking-widest text-white/50 uppercase">{p.label}</p>
                <p className="mt-3 font-display text-3xl font-extrabold text-gold">{p.price}</p>
                <p className="mt-1 text-xs text-white/50">EMI Available</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Success Stories"
            title={
              <>
                Real journeys. Real
                <br />
                transformations.
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="card flex h-full flex-col p-7">
                  <span className="font-display text-5xl leading-none text-gold" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display font-extrabold text-gold">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-navy-950">{t.name}</span>
                      <span className="block text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation marquee */}
      <section className="bg-gold py-5" aria-label="Accreditations">
        <Marquee
          duration={35}
          items={accreditations.map((a) => (
            <span
              key={a}
              className="font-display text-sm font-extrabold tracking-widest text-navy-950 uppercase"
            >
              {a}
            </span>
          ))}
          separator={<span className="mx-8 text-navy-950/40">✦</span>}
        />
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 text-white lg:py-24">
        <div className="shell flex flex-col items-center gap-8 text-center">
          <Reveal>
            <p className="eyebrow eyebrow-light">100% Valid &amp; Recognized Degrees</p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Ready to Transform Your Career?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Speak with our academic experts and secure your seat today.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn btn-gold">
              Book a Counseling Session
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/courses" className="btn btn-ghost">
              Browse Courses
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
