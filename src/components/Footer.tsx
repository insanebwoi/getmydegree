import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { centers, nav, site } from '../data/site'
import { FacebookIcon, TwitterIcon, YoutubeIcon } from './SocialIcons'

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Twitter', href: site.social.twitter, Icon: TwitterIcon },
  { label: 'YouTube', href: site.social.youtube, Icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="pb-4">
      <div className="shell">
        <div className="rounded-[var(--radius-panel)] bg-navy-950 px-6 py-14 text-white lg:px-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <img
                src="/logo-light.svg"
                alt={site.name}
                width={180}
                height={34}
                className="h-8 w-auto"
              />
              <p className="mt-5 max-w-xs leading-relaxed text-white/60 md:text-sm">
                Flexible, recognized education for people continuing, restarting or upgrading their
                studies. Established {site.established} in Kerala.
              </p>
              <div className="mt-7 flex gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:bg-gold hover:text-navy-950"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {centers.map((center) => (
              <address key={center.city} className="not-italic lg:col-span-3">
                <h2 className="font-display text-lg font-medium">{center.city}</h2>
                <p className="mt-4 flex gap-2.5 leading-relaxed text-white/60 md:text-sm">
                  <MapPin size={16} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                  {center.address}
                </p>
                <a
                  href={`tel:${center.phoneHref}`}
                  className="action mt-1 gap-2.5 text-sm font-medium text-white hover:text-gold"
                >
                  <Phone size={15} className="text-gold" aria-hidden="true" />
                  {center.phone}
                </a>
              </address>
            ))}

            <div className="lg:col-span-2">
              <h2 className="font-display text-lg font-medium">Pages</h2>
              <ul className="mt-3">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="action text-white/60 hover:text-gold md:text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${site.email}`}
                className="action mt-3 gap-2 text-white/60 hover:text-gold md:text-sm"
              >
                <Mail size={15} className="text-gold" aria-hidden="true" />
                Email us
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-white/60 md:text-sm">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <p>UGC recognized · NAAC accredited · AICTE approved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
