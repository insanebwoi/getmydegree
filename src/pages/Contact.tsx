import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { contactSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { useSearchParams } from 'react-router-dom'
import { centers, courses, site, startingPoints } from '../data/site'

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'program', string>>

const field =
  'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/55 focus:border-navy'
const labelCls = 'text-sm font-medium'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [params] = useSearchParams()

  // Someone who answered "where did you stop?" on the home page arrives with
  // that context; fill it in so they do not type it again. Applied after mount
  // so the first render still matches the prerendered HTML.
  useEffect(() => {
    const start = startingPoints.find((point) => point.id === params.get('start'))
    if (start) setMessage(start.message)
  }, [params])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const program = String(data.get('program') ?? '')

    const next: Errors = {}
    if (name.length < 2) next.name = 'Enter your full name.'
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone))
      next.phone = 'Enter a phone number we can reach you on.'
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(email)) next.email = 'Enter an email address.'
    if (!program) next.program = 'Choose the program you want to discuss.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    setStatus('sending')
    // TODO: replace with the real endpoint (Formspree / Web3Forms / own API).
    window.setTimeout(() => {
      setStatus('sent')
      form.reset()
      setMessage('')
    }, 700)
  }

  const quick = [
    {
      Icon: Mail,
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      Icon: Phone,
      label: 'Phone',
      value: site.phone,
      href: `tel:${site.phoneHref}`,
    },
    { Icon: Clock, label: 'Office hours', value: site.officeHours },
  ]

  return (
    <>
      <Seo {...pageMeta['/contact']} schema={contactSchema} />

      <PageHero
        badge="Get in touch"
        title="Let's start your degree journey"
        intro="Tell us what you completed and where you stopped. We will come back with the programs you are eligible for, what they cost and how long they take."
      />

      <section className="shell grid gap-4 pb-12 sm:pb-16 lg:grid-cols-12 lg:pb-24">
        <Reveal className="lg:col-span-7">
          <div className="card card-p h-full sm:p-7 lg:p-9">
            <h2 className="t-h2 font-display font-medium">Book free counseling</h2>
            <p className="mt-2 text-base text-muted md:text-sm">
              Fill in your details and our team will get back to you within one working day.
            </p>

            {status === 'sent' ? (
              <div
                role="status"
                className="mt-8 flex flex-col items-center rounded-[var(--radius-card)] bg-navy-50 px-6 py-12 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-navy-950">
                  <CheckCircle2 size={26} aria-hidden="true" />
                </span>
                <h3 className="t-h3 mt-5 font-display font-medium">Request received</h3>
                <p className="mt-2 max-w-sm text-base text-muted md:text-sm">
                  A counselor will call you within one working day, between 9am and 7pm. If it is
                  urgent, ring{' '}
                  <a href={`tel:${site.phoneHref}`} className="font-medium text-navy underline">
                    {site.phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn btn-ghost mt-7"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelCls}>
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={field}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={field}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-2 text-sm text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={field}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="program" className={labelCls}>
                    Interested program
                  </label>
                  <select
                    id="program"
                    name="program"
                    defaultValue=""
                    aria-invalid={Boolean(errors.program)}
                    aria-describedby={errors.program ? 'program-error' : undefined}
                    className={field}
                  >
                    <option value="" disabled>
                      Choose a program
                    </option>
                    <optgroup label="Undergraduate">
                      {courses
                        .filter((c) => c.level === 'UG')
                        .map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} — {c.field}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Postgraduate">
                      {courses
                        .filter((c) => c.level === 'PG')
                        .map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} — {c.field}
                          </option>
                        ))}
                    </optgroup>
                    <option value="Triple Certification MBA (UK)">
                      Triple certification MBA (UK)
                    </option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  {errors.program && (
                    <p id="program-error" className="mt-2 text-sm text-red-700">
                      {errors.program}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelCls}>
                    Where you stopped <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="For example: completed two years of B.Com in 2019, working since."
                    className={`${field} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
                >
                  {status === 'sending' ? 'Sending…' : 'Submit request'}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="grid content-start gap-4 lg:col-span-5">
          <Reveal delay={100}>
            <div className="card card-p">
              <h2 className="t-h3 font-display font-medium">Quick connect</h2>
              <p className="mt-2 text-base text-muted md:text-sm">
                Prefer to talk? Reach us directly through any of these.
              </p>
              <ul className="mt-6 grid gap-4">
                {quick.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="chip">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{label}</span>
                      {href ? (
                        <a
                          href={href}
                          className="action text-sm font-medium break-all hover:text-navy"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-base font-medium md:text-sm">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <Photo name="contact-1" ratio="16/10" />
          </Reveal>

          <Reveal delay={240}>
            <div className="card card-p bg-navy-950 text-white">
              <h2 className="t-h3 font-display font-medium">Visit our centers</h2>
              <ul className="mt-6 grid gap-6">
                {centers.map((c) => (
                  <li key={c.city}>
                    <address className="not-italic">
                      <p className="flex items-center gap-2 font-display font-medium">
                        <MapPin size={15} className="text-gold" aria-hidden="true" />
                        {c.city}
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-white/60 md:text-sm">
                        {c.address}
                      </p>
                      <a
                        href={`tel:${c.phoneHref}`}
                        className="action text-sm font-medium text-gold hover:underline"
                      >
                        {c.phone}
                      </a>
                    </address>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
