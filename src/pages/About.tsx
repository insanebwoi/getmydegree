import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { aboutSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { site, stats, trustPoints, validity } from '../data/site'


export default function About() {
  return (
    <>
      <Seo {...pageMeta['/about']} schema={aboutSchema} />

      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(55% 65% at 85% 15%, rgba(63,111,192,.4) 0%, transparent 60%), radial-gradient(40% 50% at 5% 95%, rgba(251,205,65,.14) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="shell relative">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-light">Get In Touch</p>
            <h1 className="mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.5rem]">
              Your trusted partner for
              <br />
              <span className="text-gold">academic success.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {site.name} provides flexible, recognized education solutions to help you complete,
              restart, or upgrade your academic journey — built for the realities of modern life.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-bold tracking-widest text-white/50 uppercase">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-4xl font-extrabold text-gold lg:text-5xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Our Mission"
            title={
              <>
                Education that fits your life — <span className="text-navy">not the other way around.</span>
              </>
            }
          />
          <Reveal delay={120} className="space-y-5 text-base leading-relaxed text-muted lg:pt-16">
            <p>
              We understand every journey is different. That's why we offer customized education
              pathways — whether you're restarting after a break, upgrading your qualifications, or
              continuing your studies alongside a full-time job.
            </p>
            <p>
              With a network of recognized universities, career-focused programs, and a flexible
              learning structure, we make sure your degree opens real doors.
            </p>
            <Link to="/courses" className="btn btn-navy mt-2">
              Explore Programs
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Why Students Trust Us"
            title={
              <>
                Built on results, recognition,
                <br />
                and real support.
              </>
            }
            body="Thousands of professionals and students choose GetMyDegree because we deliver on every promise — from admissions to graduation."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {trustPoints.map((p, i) => (
              <Reveal key={p.no} delay={i * 70} as="li">
                <div className="group flex flex-col gap-3 bg-white p-7 transition-colors hover:bg-navy-50 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                  <span className="font-display text-2xl font-extrabold text-navy-200 transition-colors group-hover:text-gold sm:w-16">
                    {p.no}
                  </span>
                  <h3 className="text-lg text-navy-950 sm:w-72 sm:shrink-0">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="100% Valid & Recognized"
            title={
              <>
                Degrees accepted everywhere
                <br />
                it matters.
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {validity.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <article className="card h-full p-8 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold text-navy-950">
                    <Check size={22} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl text-navy-950">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
