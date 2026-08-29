import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { contactSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { centers, courses, site } from '../data/site'


type Errors = Partial<Record<'name' | 'phone' | 'email' | 'program', string>>

const field =
  'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-navy'
const label = 'text-xs font-bold tracking-widest text-navy-950 uppercase'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const program = String(data.get('program') ?? '')

    const next: Errors = {}
    if (name.length < 2) next.name = 'Please enter your full name.'
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) next.phone = 'Enter a valid phone number.'
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(email)) next.email = 'Enter a valid email address.'
    if (!program) next.program = 'Choose the program you are interested in.'

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
    }, 700)
  }

  return (
    <>
      <Seo {...pageMeta['/contact']} schema={contactSchema} />

      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(55% 65% at 82% 18%, rgba(63,111,192,.42) 0%, transparent 60%), radial-gradient(40% 50% at 5% 92%, rgba(251,205,65,.14) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="shell relative">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-light">Get In Touch</p>
            <h1 className="mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.5rem]">
              Let's start your
              <br />
              <span className="text-gold">degree journey.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Speak with our academic experts, request a brochure, or book a free counseling
              session. We'll help you choose the right program in minutes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form */}
          <Reveal>
            <div className="card p-7 sm:p-10">
              <h2 className="text-2xl text-navy-950">Book Free Counseling</h2>
              <p className="mt-2 text-sm text-muted">
                Fill in your details and our team will get back to you shortly.
              </p>

              {status === 'sent' ? (
                <div
                  role="status"
                  className="mt-8 flex flex-col items-center rounded-2xl bg-navy-50 px-6 py-12 text-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-navy-950">
                    <CheckCircle2 size={28} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl text-navy-950">Request received</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted">
                    Thank you. One of our academic counselors will contact you within one working
                    day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn btn-outline mt-7"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>
                      Full Name
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
                      <p id="name-error" className="mt-1.5 text-xs font-semibold text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className={label}>
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
                      <p id="phone-error" className="mt-1.5 text-xs font-semibold text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={label}>
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
                      <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="program" className={label}>
                      Interested Program
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
                        Triple Certification MBA (UK)
                      </option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    {errors.program && (
                      <p id="program-error" className="mt-1.5 text-xs font-semibold text-red-600">
                        {errors.program}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={label}>
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your goals..."
                      className={`${field} resize-y`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-navy justify-center disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
                  >
                    {status === 'sending' ? 'Sending…' : 'Submit Request'}
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Quick connect */}
          <div className="grid content-start gap-6">
            <Reveal delay={100}>
              <div className="card p-7">
                <h2 className="text-xl text-navy-950">Quick Connect</h2>
                <p className="mt-2 text-sm text-muted">
                  Prefer to talk? Reach out directly through any of these channels.
                </p>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
                      <Mail size={17} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.7rem] font-bold tracking-widest text-muted uppercase">
                        Email
                      </span>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-sm font-semibold text-navy-950 hover:text-gold-600"
                      >
                        {site.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
                      <Phone size={17} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.7rem] font-bold tracking-widest text-muted uppercase">
                        Phone
                      </span>
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="text-sm font-semibold text-navy-950 hover:text-gold-600"
                      >
                        {site.phone}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-50 text-navy">
                      <Clock size={17} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.7rem] font-bold tracking-widest text-muted uppercase">
                        Office Hours
                      </span>
                      <span className="text-sm font-semibold text-navy-950">{site.officeHours}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="card bg-navy-950 p-7 text-white">
                <h2 className="text-xl text-white">Visit Our Centers</h2>
                <ul className="mt-6 space-y-6">
                  {centers.map((c) => (
                    <li key={c.city} className="border-l-2 border-gold pl-4">
                      <p className="flex items-center gap-2 font-display font-bold">
                        <MapPin size={15} className="text-gold" aria-hidden="true" />
                        {c.city}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{c.address}</p>
                      <a
                        href={`tel:${c.phoneHref}`}
                        className="mt-2 inline-block text-sm font-semibold text-gold"
                      >
                        {c.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
