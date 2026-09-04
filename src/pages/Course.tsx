import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck, CalendarDays, Check, GraduationCap, Layers } from 'lucide-react'
import { Seo } from '../components/Seo'
import { metaFor } from '../data/meta'
import { courseSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { ApplyDialog } from '../components/ApplyDialog'
import {
  admissionForCourse,
  courseSlug,
  eligibilityFor,
  getCourse,
  relatedCourses,
  studyFormat,
} from '../data/courses'
import { posts } from '../data/posts'
import NotFound from './NotFound'

/** The two guides every programme page should hand a reader next. */
const GUIDE_SLUGS = ['credit-transfer-explained', 'studying-while-working-full-time']

export default function Course() {
  const { slug = '' } = useParams()
  const course = getCourse(slug)
  const [applying, setApplying] = useState(false)

  if (!course) return <NotFound />

  const level = course.level === 'UG' ? 'Undergraduate' : 'Postgraduate'
  const facts = [
    { icon: GraduationCap, label: 'Level', value: `${level} (${course.level})` },
    { icon: CalendarDays, label: 'Duration', value: course.years },
    { icon: Layers, label: 'Field', value: course.field },
    { icon: BadgeCheck, label: 'Study format', value: 'Distance / online, no attendance' },
  ]
  const guides = posts.filter((p) => GUIDE_SLUGS.includes(p.slug))

  return (
    <>
      <Seo {...metaFor(`/courses/${slug}`)} schema={courseSchema(slug)} />
      {applying && <ApplyDialog course={course} onClose={() => setApplying(false)} />}

      {/* Breadcrumbs, matching the BreadcrumbList in the page schema. */}
      <nav aria-label="Breadcrumb" className="shell pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <li>
            <Link to="/" className="hover:text-navy">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/courses" className="hover:text-navy">
              Courses
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {course.code}
          </li>
        </ol>
      </nav>

      {/*
        The banner is drawn, not photographed: brand washes over a masked
        hairline grid, with the programme code set as its own mark. Nine
        programme pages would otherwise mean nine more images to load and
        maintain, for a block that carries no information a photograph could.
      */}
      <section className="shell pt-1 pb-10 sm:pb-14 lg:pb-16">
        <div className="course-banner panel relative isolate overflow-hidden border-transparent px-4 py-12 text-center sm:px-8 sm:py-16 lg:py-20">
          <div aria-hidden="true" className="course-grid absolute inset-0 -z-10" />

          <Reveal className="relative mx-auto max-w-2xl">
            <span className="badge text-ink/80">{level} programme</span>
            <h1 className="t-h1 mt-4">
              {course.code} <span className="text-navy">{course.name}</span>
            </h1>
            <p className="t-body mx-auto mt-4 max-w-xl text-ink/80">{course.body}</p>

            {/* The three facts a reader checks before anything else. */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs font-medium text-ink/75 sm:text-sm">
              {[course.years, course.field, 'No attendance'].map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-navy/10 bg-white/70 px-3 py-1.5 backdrop-blur-sm"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setApplying(true)}
                className="btn btn-arrow btn-primary justify-center"
              >
                Apply for {course.code}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <Link to="/contact" className="btn btn-arrow btn-outline-navy justify-center">
                Ask about eligibility
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Section align="left" title={`What the ${course.code} covers`}>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="card card-p">
              <dt className="flex items-center gap-2 text-xs font-medium text-muted">
                <f.icon size={14} className="text-navy" aria-hidden="true" />
                {f.label}
              </dt>
              <dd className="mt-2 text-sm font-medium text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card card-p">
            <h2 className="t-h3">Who can apply</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{eligibilityFor(course)}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              If you left an earlier degree partway, read{' '}
              <Link to="/blog/credit-transfer-explained" className="link-navy">
                how credit transfer works for completed semesters
              </Link>
              .
            </p>
          </div>

          <div className="card card-p">
            <h2 className="t-h3">How you study</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{studyFormat}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              For a realistic picture of the weekly hours, see{' '}
              <Link to="/blog/studying-while-working-full-time" className="link-navy">
                finishing a degree while working full time
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 card card-p">
          <h2 className="t-h3">Admission process</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {admissionForCourse.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-50 text-xs font-semibold text-navy">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            The awarding university, its recognition status and the fee for a given intake are
            confirmed in writing during counselling, since they vary by programme and academic year.
          </p>
        </div>
      </Section>

      <Section
        align="left"
        title="Related programmes"
        intro="Other degrees students weigh against this one."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {relatedCourses(slug).map((c, i) => (
            <Reveal key={c.code} delay={i * 60} className="h-full min-w-0">
              <li className="h-full">
                <Link
                  to={`/courses/${courseSlug(c)}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="font-display text-lg font-semibold text-navy">{c.code}</span>
                  <span className="mt-1 text-sm leading-snug text-ink group-hover:underline">
                    {c.name}
                  </span>
                  <span className="mt-auto pt-3 text-xs text-muted">
                    {c.years} · {c.field}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              to={`/blog/${g.slug}`}
              className="card card-p card-hover flex items-start gap-3"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
              <span className="text-sm leading-snug text-ink">{g.title}</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
