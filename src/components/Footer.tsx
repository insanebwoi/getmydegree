import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { centers, courses, nav, site } from '../data/site'
import { FacebookIcon, TwitterIcon, YoutubeIcon } from './SocialIcons'

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Twitter', href: site.social.twitter, Icon: TwitterIcon },
  { label: 'YouTube', href: site.social.youtube, Icon: YoutubeIcon },
]

const heading = 'text-[0.6875rem] font-semibold tracking-[0.16em] text-white/45 uppercase'
const link = 'action text-sm text-white/65 transition-colors hover:text-gold'

export function Footer() {
  return (
    <footer className="pb-4">
      <div className="shell">
        <div className="rounded-[var(--radius-panel)] bg-navy-950 px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid gap-9 sm:grid-cols-2 sm:gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-4">
              <img
                src="/logo-light.svg"
                alt={site.name}
                width={180}
                height={34}
                className="h-7 w-auto sm:h-8"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Flexible, recognized education for people continuing, restarting or upgrading their
                studies. Established {site.established} in Kerala.
              </p>
              <div className="mt-6 flex gap-2">
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

            {/* The programmes themselves, which the footer never listed. */}
            <nav aria-label="Programs" className="lg:col-span-3">
              <h2 className={heading}>Programs</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-0.5">
                {courses.map((course) => (
                  <li key={course.code}>
                    <Link to="/courses" className={link}>
                      {course.code}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Pages" className="lg:col-span-2">
              <h2 className={heading}>Pages</h2>
              <ul className="mt-4 grid gap-0.5">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h2 className={heading}>Get in touch</h2>
              <ul className="mt-4 grid gap-0.5">
                <li>
                  <a href={`tel:${site.phoneHref}`} className={`${link} gap-2.5`}>
                    <Phone size={15} className="shrink-0 text-gold" aria-hidden="true" />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className={`${link} gap-2.5 break-all`}>
                    <Mail size={15} className="shrink-0 text-gold" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 py-2 text-sm text-white/60">
                  <Clock size={15} className="shrink-0 text-gold" aria-hidden="true" />
                  {site.officeHours}
                </li>
              </ul>
              <Link to="/contact" className="btn btn-gold mt-4 text-sm">
                Book a free consultation
              </Link>
            </div>
          </div>

          {/* The centres, on their own rule: an address is not a nav link. */}
          <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 sm:gap-8">
            {centers.map((center) => (
              <address key={center.city} className="flex gap-3 not-italic">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-gold">
                  <MapPin size={16} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-medium">{center.city}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/60">
                    {center.address}
                  </span>
                  <a
                    href={`tel:${center.phoneHref}`}
                    className="action text-sm font-medium text-white transition-colors hover:text-gold"
                  >
                    {center.phone}
                  </a>
                </span>
              </address>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>UGC recognized · NAAC accredited · AICTE approved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
