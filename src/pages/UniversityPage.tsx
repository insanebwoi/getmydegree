import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check, GraduationCap, MapPin, University } from 'lucide-react'
import { Seo } from '../components/Seo'
import { metaFor } from '../data/meta'
import { universitySchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { courses, universities } from '../data/site'
import { courseSlug } from '../data/courses'
import NotFound from './NotFound'

export default function UniversityPage() {
  const { slug = '' } = useParams()
  const university = universities.find((u) => u.slug === slug)

  if (!university) return <NotFound />

  const others = universities.filter((u) => u.slug !== slug)

  return (
    <>
      <Seo {...metaFor(`/universities/${slug}`)} schema={universitySchema(slug)} />

      <nav aria-label="Breadcrumb" className="shell pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <li>
            <Link to="/" className="hover:text-navy">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/universities" className="hover:text-navy">
              Universities
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="line-clamp-1 font-medium text-ink">
            {university.name}
          </li>
        </ol>
      </nav>

      {/* Same drawn banner as the course pages   no logo artwork exists yet. */}
      <section className="shell pt-1 pb-10 sm:pb-14 lg:pb-16">
        <div className="course-banner panel relative isolate overflow-hidden border-transparent px-4 py-12 text-center sm:px-8 sm:py-16 lg:py-20">
          <div aria-hidden="true" className="course-grid absolute inset-0 -z-10" />

          <Reveal className="relative mx-auto max-w-2xl">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-navy/10 bg-white/80 text-navy shadow-[0_10px_30px_-14px_rgba(1,58,148,0.5)] backdrop-blur-sm">
              <University size={24} aria-hidden="true" />
            </span>

            <span className="badge mt-5 text-ink/80">{university.type}</span>
            <h1 className="t-h1 mt-4">{university.name}</h1>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-ink/70">
              <MapPin size={14} className="shrink-0 text-gold-700" aria-hidden="true" />
              {university.location}
            </p>
            <p className="t-body mx-auto mt-4 max-w-xl text-ink/80">{university.body}</p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-arrow btn-primary justify-center">
                Ask about admission here
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/courses" className="btn btn-arrow btn-outline-navy justify-center">
                Browse programmes
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Section align="left" title={`Studying at ${university.name}`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card card-p">
            <h2 className="t-h3">What it offers</h2>
            <ul className="mt-4 grid gap-2.5">
              {university.offers.map((offer) => (
                <li key={offer} className="flex items-start gap-2.5 text-sm text-muted">
                  <GraduationCap
                    size={15}
                    className="mt-0.5 shrink-0 text-navy"
                    aria-hidden="true"
                  />
                  {offer}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              Which programmes are open in a given intake, and the recognition that applies to each,
              is confirmed in writing during counselling it varies by academic year.
            </p>
          </div>

          <div className="card card-p">
            <h2 className="t-h3">Why students choose it</h2>
            <ul className="mt-4 grid gap-2.5">
              {university.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check size={15} className="mt-0.5 shrink-0 text-gold-700" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs font-medium text-navy">
              <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
              {university.validity}
            </p>
          </div>
        </div>
      </Section>

      <Section
        align="left"
        title="Programmes you can apply for"
        intro="The degrees we place students into. Availability at this university is confirmed at counselling."
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
      </Section>

      <Section align="left" title="Other partner universities">
        <ul className="grid gap-4 sm:grid-cols-2">
          {others.map((u) => (
            <li key={u.slug}>
              <Link
                to={`/universities/${u.slug}`}
                className="card card-hover card-p flex h-full gap-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy">
                  <University size={19} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-medium text-ink">{u.name}</span>
                  <span className="mt-1 block text-xs text-muted">{u.location}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
