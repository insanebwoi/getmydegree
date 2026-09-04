import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, University } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { universitiesSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { universities } from '../data/site'

export default function Universities() {
  return (
    <>
      <Seo {...pageMeta['/universities']} schema={universitiesSchema} />

      <PageHero
        badge="Partner universities"
        title="The universities that award your degree"
        intro="We prepare and submit your application; the degree itself is awarded by the university. These are the institutions we place students into."
      />

      <Section align="left">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u, i) => (
            <Reveal key={u.slug} delay={i * 70} className="h-full">
              <li className="h-full">
                <div className="card card-hover card-p relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy">
                        <University size={19} aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-emerald-700">
                        <ShieldCheck size={12} aria-hidden="true" />
                        {u.badge}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-lg font-semibold text-ink sm:text-xl">
                      <Link
                        to={`/universities/${u.slug}`}
                        className="after:absolute after:inset-0 hover:underline"
                      >
                        {u.name}
                      </Link>
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
                      <MapPin size={13} className="shrink-0 text-gold-700" aria-hidden="true" />
                      {u.location}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{u.body}</p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-3.5 text-xs font-medium text-navy">
                    About {u.name.split(' ')[0]}
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Recognition, approval status and the programmes running in a given intake are confirmed in
          writing during counselling, since they vary by university and academic year.
        </p>
      </Section>
    </>
  )
}
