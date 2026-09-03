import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { coursesSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Photo } from '../components/Photo'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { BlogSearch } from '../components/BlogSearch'
import { courseHighlights, courses, eligibility, type Course } from '../data/site'

function CourseCard({ course, delay }: { course: Course; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      {/*
        One tile, not a card of stacked panels: the code reads first, the
        degree names it, the field places it, and the duration sits quietly
        beside the code. The whole tile is the link, so nothing has to be
        spent on a button.
      */}
      <Link
        to="/contact"
        aria-label={`Apply for ${course.name}`}
        className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-[var(--shadow-soft)] sm:p-5"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-xl font-semibold tracking-tight text-navy sm:text-2xl">
            {course.code}
          </span>
          <span className="text-[0.6875rem] font-medium text-muted">{course.years}</span>
        </div>

        <h3 className="mt-2.5 font-display text-[0.9375rem] leading-snug font-medium text-ink">
          {course.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{course.field}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-muted">
            <BadgeCheck size={13} className="text-navy" aria-hidden="true" />
            UGC recognized
          </span>
          <ArrowRight
            size={14}
            className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-navy"
            aria-hidden="true"
          />
        </div>
      </Link>
    </Reveal>
  )
}

export default function Courses() {
  const [filter, setFilter] = useState<'ALL' | 'UG' | 'PG'>('ALL')
  const [query, setQuery] = useState('')

  const ug = courses.filter((c) => c.level === 'UG')
  const pg = courses.filter((c) => c.level === 'PG')

  const q = query.trim().toLowerCase()
  const filtered = courses.filter((c) => {
    const matchesLevel = filter === 'ALL' || c.level === filter
    const matchesQuery =
      !q ||
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.field.toLowerCase().includes(q) ||
      c.body.toLowerCase().includes(q)
    return matchesLevel && matchesQuery
  })

  return (
    <>
      <Seo {...pageMeta['/courses']} schema={coursesSchema} />

      <PageHero
        image="courses-banner"
        badge="Accredited degrees"
        title="Recognized programs designed for your career"
        intro="Five undergraduate and four postgraduate programs, built with continuous assessment and flexible schedules for working professionals, gap-year students and career upgraders."
      >
        <Link to="/contact" className="btn btn-primary">
          Get free counseling
        </Link>
        <a href="#all-programs" className="btn btn-ghost">
          View all 9 programs
        </a>
      </PageHero>

      {/* Search and categories share one row; the chips scroll when they outgrow it. */}
      <div id="all-programs" className="shell pb-8">
        <Reveal>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <BlogSearch
              value={query}
              onChange={setQuery}
              placeholder="Search programs…"
              className="lg:w-72 lg:shrink-0"
            />

            <div
              className="chip-row flex gap-2 overflow-x-auto lg:flex-1"
              role="group"
              aria-label="Filter by program category"
            >
              <button
                type="button"
                onClick={() => setFilter('ALL')}
                aria-pressed={filter === 'ALL'}
                className={`badge min-h-10 shrink-0 cursor-pointer ${
                  filter === 'ALL' ? 'border-navy bg-navy text-white' : ''
                }`}
              >
                All programs
              </button>
              <button
                type="button"
                onClick={() => setFilter('UG')}
                aria-pressed={filter === 'UG'}
                className={`badge min-h-10 shrink-0 cursor-pointer ${
                  filter === 'UG' ? 'border-navy bg-navy text-white' : ''
                }`}
              >
                Undergraduate ({ug.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('PG')}
                aria-pressed={filter === 'PG'}
                className={`badge min-h-10 shrink-0 cursor-pointer ${
                  filter === 'PG' ? 'border-navy bg-navy text-white' : ''
                }`}
              >
                Postgraduate ({pg.length})
              </button>
            </div>
          </div>
        </Reveal>

        {/* Result count, announced when the list changes. */}
        <p role="status" className="mt-4 text-base text-muted md:text-sm">
          {filtered.length === 0
            ? 'No programs match that search.'
            : `${filtered.length} program${filtered.length === 1 ? '' : 's'}${
                query ? ` matching “${query.trim()}”` : ''
              }`}
        </p>
      </div>

      {/* Degree Programs Grid */}
      <section className="shell pb-12 sm:pb-16 lg:pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {filtered.map((c, i) => (
              <CourseCard key={c.code} course={c} delay={i * 50} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-navy-50/40 px-6 py-12 text-center">
            <p className="text-base font-medium text-ink">
              No programs found matching &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-xs text-muted">
              Try searching with a different degree name or level.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setFilter('ALL')
              }}
              className="btn btn-ghost mt-4 text-xs"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Eligibility Section */}
      <Section
        badge="Eligibility & Criteria"
        title="Simple admissions, open to all backgrounds"
        intro="No entrance examination, no rigid attendance rules, no age limit. Career gaps are fully supported and credited."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Photo name="courses-2" ratio="4/3" className="lg:aspect-auto lg:h-full" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {eligibility.map((e, i) => (
              <Reveal key={e.level} delay={i * 80} className="h-full">
                <div className="card card-p h-full sm:p-7">
                  <div className="flex items-center gap-2">
                    <span className="badge">For {e.level.toLowerCase()}</span>
                  </div>
                  <ul className="mt-6 space-y-3.5">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
                          <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium text-ink">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Highlights & Accreditations */}
      <Section dark badge="Course highlights" title="Built to deliver legitimate career outcomes">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseHighlights.map((h, i) => (
            <Reveal key={h} delay={i * 60} as="li" className="h-full">
              <div className="card-p flex h-full items-center gap-4 rounded-[var(--radius-card)] border border-white/12 bg-white/5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy-950">
                  <Check size={17} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-medium text-white sm:text-base">
                  {h}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Closing Counseling CTA */}
      <section className="shell pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-24">
        <Reveal>
          <div className="rounded-[var(--radius-panel)] bg-navy px-6 py-12 text-center text-white sm:px-10 lg:px-16 lg:py-16">
            <span className="badge badge-dark">Academic guidance</span>
            <h2 className="t-h1 mx-auto mt-4 max-w-2xl">
              Not sure which program matches your background?
            </h2>
            <p className="t-body mx-auto mt-4 max-w-lg text-white/70">
              Speak with an academic counselor. We will assess your previous education and recommend
              the fastest, accredited degree route.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-gold">
                Get free counseling
              </Link>
              <Link to="/about" className="btn btn-ghost-dark">
                Learn about us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
