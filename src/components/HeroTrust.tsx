import { Headphones, Users } from 'lucide-react'
import { site, universities } from '../data/site'

/**
 * Institutions, the graduate count and a way to talk to someone.
 *
 * Inside the hero from lg, where there is room for it; on smaller screens it
 * is rendered beneath the hero instead, so a phone gets the promise and the
 * actions first and the credibility immediately after.
 */
export function HeroTrust() {
  return (
    <div className="hero-trust grid gap-4 rounded-2xl border border-line bg-white px-4 py-4 shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:gap-x-6 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-0">
      <div className="sm:col-span-2 lg:col-span-6 lg:pr-8">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h2 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-navy uppercase">
            Partner universities
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2 py-0.5 text-[0.6875rem] font-medium text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            Central & State Gov · UGC · AICTE · NAAC Approved
          </span>
        </div>
        <ul className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-3">
          {universities.map((u) => (
            <li key={u.name}>
              {u.logo ? (
                <img
                  src={u.logo}
                  alt={u.name}
                  loading="lazy"
                  className="h-8 w-auto opacity-80 transition hover:opacity-100"
                />
              ) : (
                <span className="font-display text-[0.9375rem] leading-tight font-medium text-ink">
                  {u.name}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-xs text-muted">
          Central and State Government universities in India and recognized UK institutions   all
          100% UGC, AICTE & NAAC approved.
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-line pt-4 sm:border-t-0 sm:pt-0 lg:col-span-3 lg:border-l lg:px-8">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
          <Users size={19} aria-hidden="true" />
        </span>
        <span>
          <span className="block font-display text-[1.375rem] leading-none font-semibold text-navy">
            10,000+
          </span>
          <span className="mt-1 block text-sm font-medium">Graduates placed</span>
          <span className="block text-xs text-muted">since 2021</span>
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-line pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 lg:col-span-3 lg:pl-8">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
          <Headphones size={19} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-medium">Counseling, free</span>
          <a
            href={`tel:${site.phoneHref}`}
            className="action font-display text-[1.0625rem] font-semibold text-navy underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>
          <span className="block text-xs text-muted">Mon–Sat · 9am to 7pm</span>
        </span>
      </div>
    </div>
  )
}
