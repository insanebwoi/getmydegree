import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { Seo } from "../components/Seo";
import { pageMeta } from "../data/meta";
import { coursesSchema } from "../data/schema";
import { Reveal } from "../components/Reveal";
import { Photo } from "../components/Photo";
import { Section } from "../components/Section";
import { PageHero } from "../components/PageHero";
import {
  courseHighlights,
  courses,
  eligibility,
  type Course,
} from "../data/site";

const ug = courses.filter((c) => c.level === "UG");
const pg = courses.filter((c) => c.level === "PG");

function CourseCard({ course, delay }: { course: Course; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="card card-hover card-p flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-medium text-navy">
            {course.code}
          </span>
          <span className="badge">{course.years}</span>
        </div>
        <h3 className="t-h3 mt-4 font-display font-medium">{course.name}</h3>
        <p className="mt-1 text-base font-medium text-gold-700 md:text-sm">
          {course.field}
        </p>
        <p className="mt-3 flex-1 text-base leading-relaxed text-muted md:text-sm">
          {course.body}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
            <BadgeCheck size={14} className="text-navy" aria-hidden="true" />
            UGC recognized
          </span>
          <Link
            to="/contact"
            className="action text-sm font-medium text-navy"
            aria-label={`Apply for ${course.name}`}
          >
            Apply
            <ArrowRight size={15} className="ml-1.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export default function Courses() {
  return (
    <>
      <Seo {...pageMeta["/courses"]} schema={coursesSchema} />

      <PageHero
        badge="Popular courses"
        title="Recognized programs designed for your future"
        intro="Five undergraduate and four postgraduate programs, built for working professionals, gap-year students and lifelong learners."
      >
        <Link to="/contact" className="btn btn-primary">
          Get free counseling
        </Link>
      </PageHero>

      <div className="shell pb-12 lg:pb-20">
        <Reveal>
          <Photo name="courses-1" ratio="21/9" rounded="panel" priority />
        </Reveal>
      </div>

      <Section badge="Undergraduate" title="Three-year UG degrees">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ug.map((c, i) => (
            <CourseCard key={c.code} course={c} delay={i * 70} />
          ))}
        </div>
      </Section>

      <Section badge="Postgraduate" title="Two-year PG degrees">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pg.map((c, i) => (
            <CourseCard key={c.code} course={c} delay={i * 70} />
          ))}
        </div>
      </Section>

      <Section
        badge="Eligibility"
        title="Simple admissions, open to all backgrounds"
        intro="No entrance test, no interview, no age limit. A gap of a year or more is expected, not penalised."
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Photo
              name="courses-2"
              ratio="4/3"
              className="lg:aspect-auto lg:h-full"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {eligibility.map((e, i) => (
              <Reveal key={e.level} delay={i * 80}>
                <div className="card card-p h-full sm:p-7">
                  <span className="badge">For {e.level.toLowerCase()}</span>
                  <ul className="mt-6 grid gap-3">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
                          <Check
                            size={14}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="t-h3 font-display font-medium">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        dark
        badge="Course highlights"
        title="Built to deliver real outcomes"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseHighlights.map((h, i) => (
            <Reveal key={h} delay={i * 60} as="li">
              <div className="card-p flex h-full items-center gap-4 rounded-[var(--radius-card)] border border-white/12 bg-white/5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy-950">
                  <Check size={17} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="font-display font-medium">{h}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <section className="shell pb-12 sm:pb-16 lg:pb-24">
        <Reveal>
          <div className="card card-p flex flex-col items-center gap-6 text-center sm:p-9 lg:flex-row lg:justify-between lg:p-12 lg:text-left">
            <div className="max-w-xl">
              <h2 className="t-h2">Not sure which program suits you?</h2>
              <p className="t-body mt-3 text-muted">
                Our academic counselors will help you choose based on your goals
                and background.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary shrink-0">
              Get free counseling
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
