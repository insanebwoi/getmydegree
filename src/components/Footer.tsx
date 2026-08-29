import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { FacebookIcon, TwitterIcon, YoutubeIcon } from './SocialIcons'
import { centers, nav, site } from '../data/site'

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Twitter', href: site.social.twitter, Icon: TwitterIcon },
  { label: 'YouTube', href: site.social.youtube, Icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <img
            src="/logo-light.svg"
            alt={site.name}
            width={190}
            height={35}
            className="h-9 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            {site.name} offers flexible, recognized education solutions to help you continue,
            restart, or upgrade your studies.
          </p>
        </div>

        {centers.map((center) => (
          <div key={center.city}>
            <h2 className="font-display text-lg font-bold">{center.city}</h2>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed text-white/65">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{center.address}</span>
            </p>
            <a
              href={`tel:${center.phoneHref}`}
              className="mt-3 flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-gold"
            >
              <Phone size={16} className="text-gold" aria-hidden="true" />
              {center.phone}
            </a>
          </div>
        ))}

        <div>
          <h2 className="font-display text-lg font-bold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/65 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-lg font-bold">Social Links</h2>
          <div className="mt-4 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:bg-gold hover:text-navy-950"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="shell py-6 text-center text-xs text-white/50">
          Copyright © {new Date().getFullYear()} All Rights Reserved · {site.name}
        </p>
      </div>
    </footer>
  )
}
