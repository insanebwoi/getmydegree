import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
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
        badge="About us"
        title="Your trusted partner for academic success"
        intro={`${site.name} provides flexible, recognized education for people completing, restarting or upgrading their studies — built for the realities of modern life.`}
      >
        <Link to="/contact" className="btn btn-primary">
          Talk to a counselor
        </Link>
        <Link to="/courses" className="btn btn-ghost">
          See programs
        </Link>
      </PageHero>

      <div className="shell pb-16 lg:pb-20">
        <Stats items={stats} />
      </div>

      <Section
        badge="Our mission"
        title="Education that fits your life, not the other way around"
        intro="We understand every journey is different — restarting after a break, upgrading a qualification, or studying alongside a full-time job."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Photo
              alt="Students at a GetMyDegree centre in Kerala"
              caption="Photo: the Thrissur centre"
              className="h-full min-h-72"
            />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6">
            <div className="card h-full p-7 lg:p-9">
              <p className="leading-relaxed text-muted">
                Someone left in the second year of a B.Com for a job abroad. Someone finished twelfth
                and never got the chance. Someone has managed a team for eight years and cannot be
                promoted without a piece of paper.
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                We map what you already completed against what a recognized university will accept,
                then run the admission, the documentation and the follow-through until the degree is
                in your hand.
              </p>
              <Link to="/contact" className="btn btn-primary mt-8">
                Book a free consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        badge="Why students trust us"
        title="Built on results, recognition and real support"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((p, i) => (
            <Reveal key={p.no} delay={i * 70}>
              <article className="card card-hover h-full p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 font-display text-sm font-medium text-navy">
                  {p.no}
                </span>
                <h3 className="mt-5 font-display text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        dark
        badge="100% valid & recognized"
        title="Degrees accepted everywhere it matters"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {validity.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <article className="h-full rounded-[var(--radius-card)] border border-white/12 bg-white/5 p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-navy-950">
                  <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65 md:text-sm">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
