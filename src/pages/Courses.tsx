import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { coursesSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { courseHighlights, courses, eligibility, type Course } from '../data/site'

const ug = courses.filter((c) => c.level === 'UG')
const pg = courses.filter((c) => c.level === 'PG')


function CourseCard({ course, delay }: { course: Course; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="card group flex h-full flex-col p-7">
        <h3 className="font-display text-2xl font-extrabold text-navy">{course.code}</h3>
        <p className="mt-1 text-xs font-semibold tracking-wide text-gold-700 uppercase">
          {course.field}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{course.body}</p>
        <p className="mt-6 inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-widest text-navy uppercase">
          <BadgeCheck size={14} className="text-gold-600" aria-hidden="true" />
          UGC Recognized
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-5 text-sm font-bold text-navy transition-colors hover:text-gold-600"
          aria-label={`Apply for ${course.code}`}
        >
          Apply
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </article>
    </Reveal>
  )
}

export default function Courses() {
  return (
    <>
      <Seo {...pageMeta['/courses']} schema={coursesSchema} />

      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(55% 65% at 80% 20%, rgba(63,111,192,.42) 0%, transparent 60%), radial-gradient(40% 50% at 6% 92%, rgba(251,205,65,.14) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="shell relative">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-light">Popular Courses</p>
            <h1 className="mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.5rem]">
              Recognized programs designed for
              <span className="text-gold"> your future.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Choose from a wide selection of UGC recognized undergraduate and postgraduate programs
              — built for working professionals, gap-year students, and lifelong learners.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Undergraduate Programs"
              title="3–Year UG Degrees"
              className="max-w-xl"
            />
            <Reveal delay={80}>
              <Link to="/contact" className="btn btn-outline">
                Explore All
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ug.map((c, i) => (
              <CourseCard key={c.code} course={c} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Postgraduate Programs"
              title="2-Year PG Degrees"
              className="max-w-xl"
            />
            <Reveal delay={80}>
              <Link to="/contact" className="btn btn-navy">
                Enroll Now
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pg.map((c, i) => (
              <CourseCard key={c.code} course={c} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Eligibility"
            title="Simple admissions. Open to all backgrounds."
            body="Ideal for working professionals and gap-year students. We make the entry process clear, fast, and stress-free."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {eligibility.map((e, i) => (
              <Reveal key={e.level} delay={i * 100}>
                <div className="card h-full p-7">
                  <p className="eyebrow">For</p>
                  <h3 className="mt-2 text-xl text-navy-950">{e.level}</h3>
                  <ul className="mt-5 space-y-3">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-gold-600"
                          aria-hidden="true"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white lg:py-28">
        <div className="shell">
          <SectionHeading
            light
            eyebrow="Course Highlights"
            title={
              <>
                Built to deliver real outcomes
                <br />
                <span className="text-gold">— not just certificates.</span>
              </>
            }
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courseHighlights.map((h, i) => (
              <Reveal key={h} delay={i * 70} as="li">
                <div className="flex h-full items-center gap-4 rounded-2xl border border-white/12 bg-white/5 p-6 transition-colors hover:border-gold/50">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy-950">
                    <Check size={17} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="font-display font-bold">{h}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="shell">
          <Reveal className="card flex flex-col items-center gap-6 bg-navy-50 p-10 text-center lg:flex-row lg:justify-between lg:p-14 lg:text-left">
            <div className="max-w-xl">
              <h2 className="text-2xl text-navy-950 sm:text-3xl">
                Not sure which program suits you?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Our academic counselors will help you choose the right path based on your goals and
                background.
              </p>
            </div>
            <Link to="/contact" className="btn btn-navy shrink-0">
              Get Free Counseling
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
