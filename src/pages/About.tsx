import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { aboutSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Stats } from '../components/Stats'
import { site, stats, trustPoints, validity } from '../data/site'

export default function About() {
  return (
    <>
      <Seo {...pageMeta['/about']} schema={aboutSchema} />

      <PageHero
        image="about-banner"
        badge="About us"
        title="Your trusted partner for academic success"
        intro={`${site.name} provides flexible, recognized education for people completing, restarting or upgrading their studies   built for the realities of modern life.`}
      >
        <Link to="/contact" className="btn btn-primary">
          Talk to a counselor
        </Link>
        <Link to="/courses" className="btn btn-ghost">
          See programs
        </Link>
      </PageHero>

      <Section
        badge="Our mission"
        title="Education that fits your life, not the other way around"
        intro="We understand every journey is different   restarting after a break, upgrading a qualification, or studying alongside a full-time job."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Photo name="about-1" ratio="4/3" className="lg:aspect-auto lg:h-full" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6">
            <div className="card card-p flex h-full flex-col justify-between sm:p-7 lg:p-8">
              <div>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                  Real Journeys · Recognized Solutions
                </span>
                <h3 className="mt-2 text-xl font-display font-medium text-ink sm:text-2xl">
                  Turn your past education and work experience into an accredited degree.
                </h3>

                {/* 3 Relatable Scenarios */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-navy-50/40 p-3 sm:p-3.5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-100/70 text-navy font-semibold text-xs">
                      01
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Discontinued College / Credit Transfer</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted sm:text-[0.8125rem]">
                        Left during 1st or 2nd year for a job or personal reasons? We help you transfer existing credits without restarting from scratch.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-navy-50/40 p-3 sm:p-3.5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-100/70 text-navy font-semibold text-xs">
                      02
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Working Professionals Needing Promotions</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted sm:text-[0.8125rem]">
                        Years of solid work experience, but hitting a ceiling without a degree certificate? Earn a UGC-approved degree without quitting your job.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-navy-50/40 p-3 sm:p-3.5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-100/70 text-navy font-semibold text-xs">
                      03
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Long Education Gap After 12th</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted sm:text-[0.8125rem]">
                        Completed higher secondary years ago? Re-enter higher education smoothly with regular assessment and no strict attendance requirements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Solution Promise */}
                <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3.5 text-xs leading-relaxed text-ink/80 sm:text-[0.8125rem]">
                  <strong className="font-semibold text-navy">How we help:</strong> We map what you have already completed against approved university criteria, handle all paperwork and enrolment within 48 hours, and guide you through continuous assessments until graduation.
                </div>
              </div>

              <div className="mt-6 pt-2">
                <Link to="/contact" className="btn btn-primary inline-flex items-center gap-2">
                  <span>Book a free consultation</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <Reveal>
            <div className="card px-5 py-6 sm:px-8 sm:py-8">
              <Stats items={stats} />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section badge="Why students trust us" title="Built on results, recognition and real support">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((p, i) => (
            <Reveal key={p.no} delay={i * 70} className="h-full">
              <article className="card card-hover card-p h-full">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 font-display text-sm font-medium text-navy">
                  {p.no}
                </span>
                <h3 className="mt-5 t-h3 font-display font-medium">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted md:text-sm">{p.body}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={trustPoints.length * 70} className="h-full">
            <div className="card card-hover relative h-full min-h-[160px] overflow-hidden">
              <Photo
                name="about-3"
                rounded="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section badge="100% valid & recognized" title="Degrees accepted everywhere it matters" dark>
        <div className="grid gap-4 md:grid-cols-3">
          {validity.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <article className="card-p h-full rounded-[var(--radius-card)] border border-white/12 bg-white/5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-navy-950">
                  <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className="t-h3 mt-5 font-display font-medium">{v.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/65 md:text-sm">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      {/* Closing call, matching the home page. */}
      <section className="shell pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <Reveal>
          <div className="rounded-[var(--radius-panel)] bg-navy px-5 py-12 text-center text-white sm:px-8 lg:px-12 lg:py-16">
            <span className="badge badge-dark">Free consultation</span>
            <h2 className="t-h1 mx-auto mt-4 max-w-2xl">
              Tell us where you stopped. We will tell you what it takes to finish.
            </h2>
            <p className="t-body mx-auto mt-4 max-w-lg text-white/70">
              Twenty minutes with an academic counselor. {site.officeHours}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <Link to="/contact" className="btn btn-gold">
                Book a free consultation
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn btn-ghost-dark">
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
