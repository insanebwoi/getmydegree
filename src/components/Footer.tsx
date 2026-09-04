import { Link } from 'react-router-dom'
import { courseSlug } from '../data/courses'
import { developerHref } from '../data/whatsapp'
import {
  Clock,
  GraduationCap,
  Home,
  Info,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
} from 'lucide-react'
import { centers, courses, site } from '../data/site'
import { FacebookIcon, TwitterIcon, YoutubeIcon } from './SocialIcons'

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Twitter', href: site.social.twitter, Icon: TwitterIcon },
  { label: 'YouTube', href: site.social.youtube, Icon: YoutubeIcon },
]

const heading = 'text-[0.6875rem] font-semibold tracking-[0.16em] text-white/45 uppercase'

/** Each page with the reason to open it. */
const PAGE_LINKS = [
  { to: '/', label: 'Home', hint: 'How finishing your degree works', Icon: Home },
  { to: '/about', label: 'About', hint: 'Who we are, and the record', Icon: Info },
  { to: '/courses', label: 'Courses', hint: 'Nine UG and PG programmes', Icon: GraduationCap },
  {
    to: '/universities',
    label: 'Universities',
    hint: 'Who awards the degree',
    Icon: Landmark,
  },
  { to: '/blog', label: 'Blog', hint: 'Recognition, credit and fees explained', Icon: Newspaper },
  { to: '/contact', label: 'Contact', hint: 'Book a free counseling call', Icon: MessageCircle },
]
const link = 'action text-sm text-white/65 transition-colors hover:text-gold'

export function Footer() {
  return (
    <footer className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-4">
      <div className="shell">
        <div className="rounded-[var(--radius-panel)] bg-navy-950 px-5 py-9 text-white sm:px-8 sm:py-11 lg:px-10 lg:py-12">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 lg:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-2 lg:col-span-4">
              <img
                src="/logo-light.webp"
                alt={site.name}
                width={400}
                height={90}
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

            {/*
              Each page says what it holds, so the column is a way in rather
              than a list of words the reader has already seen in the navbar.
            */}
            {/*
              Three columns that read across: where to go, what to study, how
              to reach us. The programmes are the reason most people open the
              footer, so they sit in the middle at full strength rather than
              wrapping into a band below everything.
            */}
            {/*
              Five destinations the navbar already carries, so on a phone they
              are a single wrapped row rather than five 44px rows costing more
              height than all nine programmes. From lg they return to a column,
              where the space is free.
            */}
            <nav aria-label="Pages" className="lg:col-span-4">
              <h2 className={heading}>Explore</h2>
              <ul className="mt-3.5 flex flex-wrap gap-x-1.5 gap-y-1 lg:mt-4 lg:grid lg:gap-0.5">
                {PAGE_LINKS.map((page) => (
                  <li key={page.to}>
                    <Link
                      to={page.to}
                      className="flex min-h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-white/70 transition-colors hover:border-gold/40 hover:text-gold lg:min-h-0 lg:rounded-none lg:border-0 lg:px-0 lg:py-1.5"
                    >
                      <page.Icon size={14} className="shrink-0 text-gold" aria-hidden="true" />
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/*
              Two columns of programmes, split the way a reader chooses one:
              bachelor's or master's. The code leads because that is what people
              scan for; the full name follows it quietly on the same line.
            */}
            {/*
              All nine in one grid, UG first, the level marked on the entry.
              Splitting the block into two named groups never fit a row: the
              names either collided with the neighbouring group or truncated.
              The code leads, since that is what people scan for.
            */}
            <nav
              aria-label="Degree programmes"
              className="sm:col-span-2 lg:order-last lg:col-span-12 lg:border-t lg:border-white/10 lg:pt-8"
            >
              <h2 className={heading}>Degree programmes</h2>
              <ul className="mt-4 grid grid-cols-5 gap-x-3 gap-y-0.5 sm:grid-cols-2 sm:gap-x-6 lg:gap-x-10 xl:grid-cols-3 xl:gap-x-16">
                {courses.map((course) => (
                  <li key={course.code} className="min-w-0">
                    <Link
                      to={`/courses/${courseSlug(course)}`}
                      className="group flex min-w-0 items-baseline gap-2 rounded-lg py-1.5 text-sm transition-colors hover:text-gold"
                    >
                      <span className="shrink-0 font-medium text-white/85 group-hover:text-gold sm:w-[3.25rem]">
                        {course.code}
                      </span>
                      {/* Anchor text for crawlers at every width; the phone
                          hides it, where it would wrap and pull the two
                          columns out of step. */}
                      <span className="hidden min-w-0 truncate text-white/45 group-hover:text-gold/80 lg:block">
                        {course.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-4">
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
          <div className="mt-9 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-2 sm:gap-8">
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

          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:pr-20 2xl:pr-0">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>UGC recognized · NAAC accredited · AICTE approved</p>
            {/*
              The build credit, on the same rule as the copyright   a line the
              reader can skip, not a claim competing with the accreditations.
            */}
            <p>
              Developed by{' '}
              <a
                href={developerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/70 underline-offset-2 transition-colors hover:text-gold hover:underline"
              >
                Delogen
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
