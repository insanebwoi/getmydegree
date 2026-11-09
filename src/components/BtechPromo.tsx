import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Clock, GraduationCap } from 'lucide-react'
import { Reveal } from './Reveal'

const points = [
  { Icon: BadgeCheck, text: 'AICTE-approved, the same degree as full time' },
  { Icon: Clock, text: 'Evening and weekend classes, keep your job' },
  { Icon: GraduationCap, text: 'Diploma holders join the second year' },
]

/**
 * The B.Tech, set apart from the other programmes. It is the one degree here
 * that is not studied by distance, so it needs its own sentence of explanation
 * wherever it is promoted, and the band links both to the programme and to
 * the guide that answers "is a distance B.Tech valid?".
 */
export function BtechPromo({ className = '' }: { className?: string }) {
  return (
    <section className={`shell ${className}`} aria-labelledby="btech-promo-heading">
      <Reveal>
        <div className="card relative isolate overflow-hidden bg-navy-950 p-6 text-white sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
          />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy-950">
                New programme
              </span>
              <h2 id="btech-promo-heading" className="t-h2 mt-4 font-display font-medium">
                B.Tech for working professionals in Kerala
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-sm">
                Searching for a distance B.Tech? Engineering cannot be studied by distance in India,
                but you can still earn a valid B.Tech without leaving your job: an AICTE-approved
                programme with classes outside working hours. We check your eligibility and place
                you.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/courses/btech" className="btn btn-gold justify-center">
                  Explore the B.Tech
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/blog/distance-btech-kerala" className="btn btn-ghost-dark justify-center">
                  Is a distance B.Tech valid?
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 lg:col-span-5">
              {points.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
                >
                  <Icon size={18} className="shrink-0 text-gold" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
