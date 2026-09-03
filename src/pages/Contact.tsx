import { useState, type FormEvent } from 'react'
import { Check, CheckCircle2, Clock, Mail, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { contactSchema } from '../data/schema'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { centers, courses, site, stats } from '../data/site'

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'program', string>>

const field =
  'mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition-all placeholder:text-muted/50 focus:border-navy focus:ring-2 focus:ring-navy/10'
const labelCls = 'text-sm font-medium text-ink'

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
    window.setTimeout(() => {
      setStatus('sent')
      form.reset()
    }, 700)
  }

  const quickChannels = [
    {
      Icon: Phone,
      label: 'Call Direct',
      value: site.phone,
      sub: 'Speak with an academic counselor',
      href: `tel:${site.phoneHref}`,
      highlight: true,
    },
    {
      Icon: Mail,
      label: 'Email Inquiries',
      value: site.email,
      sub: 'Official admission support',
      href: `mailto:${site.email}`,
      highlight: false,
    },
    {
      Icon: Clock,
      label: 'Counseling Hours',
      value: site.officeHours,
      sub: 'Monday to Saturday assistance',
      href: undefined,
      highlight: false,
    },
  ]

  return (
    <>
      <Seo {...pageMeta['/contact']} schema={contactSchema} />

      <PageHero
        image="contact-banner"
        badge="Contact us"
        title="Let's start your degree journey"
        intro="Tell us where you stopped or what program you aspire to complete. Our academic counselors will verify your eligibility, course fees, and fast-track timeline within 24 hours."
      >
        <a href="#counseling-form" className="btn btn-primary">
          Book free counseling
        </a>
        <a href={`tel:${site.phoneHref}`} className="btn btn-ghost">
          Call {site.phone}
        </a>
      </PageHero>

      {/* Quick Contact Cards */}
      <div className="shell -mt-4 pb-8 sm:-mt-6 sm:pb-10 lg:pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {quickChannels.map((q, i) => (
            <Reveal key={q.label} delay={i * 70}>
              <div
                className={`card card-hover flex h-full items-start gap-4 p-5 ${
                  q.highlight ? 'border-navy/20 bg-navy-50/50' : 'bg-white'
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-100/70 text-navy">
                  <q.Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold tracking-wider text-muted uppercase">
                    {q.label}
                  </span>
                  {q.href ? (
                    <a
                      href={q.href}
                      className="action mt-0.5 block truncate text-base font-medium text-navy hover:underline"
                    >
                      {q.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-base font-medium text-ink">{q.value}</p>
                  )}
                  <p className="mt-1 text-xs text-muted">{q.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Main Form & Centers Section */}
      <section id="counseling-form" className="shell grid gap-6 pb-12 sm:pb-16 lg:grid-cols-12 lg:pb-24">
        {/* Counseling Form */}
        <Reveal className="lg:col-span-7">
          <div className="card card-p h-full sm:p-7 lg:p-9">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-5">
              <div>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                  Free Consultation · 48h Admission
                </span>
                <h2 className="mt-1 text-xl font-display font-medium text-ink sm:text-2xl">
                  Request academic guidance
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Sparkles size={13} aria-hidden="true" />
                Zero obligation
              </span>
            </div>

            {/* Reassurance Badges */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted sm:gap-4">
              <span className="inline-flex items-center gap-1">
                <Check size={14} className="text-emerald-600" />
                100% UGC Approved
              </span>
              <span className="inline-flex items-center gap-1">
                <Check size={14} className="text-emerald-600" />
                Continuous Assessment
              </span>
              <span className="inline-flex items-center gap-1">
                <Check size={14} className="text-emerald-600" />
                Confidential Guidance
              </span>
            </div>

            {status === 'sent' ? (
              <div
                role="status"
                className="mt-8 flex flex-col items-center rounded-[var(--radius-card)] border border-emerald-200 bg-emerald-50/60 px-6 py-12 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-md">
                  <CheckCircle2 size={28} aria-hidden="true" />
                </span>
                <h3 className="t-h3 mt-5 font-display font-medium text-ink">Request received successfully</h3>
                <p className="mt-2 max-w-sm text-base text-muted md:text-sm">
                  An academic counselor will call you within one working day ({site.officeHours}). For immediate assistance, call{' '}
                  <a href={`tel:${site.phoneHref}`} className="font-semibold text-navy underline">
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
              <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelCls}>
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={field}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelCls}>
                    Phone number <span className="text-red-600">*</span>
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
                    <p id="phone-error" className="mt-1.5 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelCls}>
                    Email address <span className="text-red-600">*</span>
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
                    <p id="email-error" className="mt-1.5 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="program" className={labelCls}>
                    Interested program <span className="text-red-600">*</span>
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
                      Choose a degree program
                    </option>
                    <optgroup label="Undergraduate Degrees (UG)">
                      {courses
                        .filter((c) => c.level === 'UG')
                        .map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} — {c.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Postgraduate Degrees (PG)">
                      {courses
                        .filter((c) => c.level === 'PG')
                        .map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} — {c.name}
                          </option>
                        ))}
                    </optgroup>
                    <option value="Triple Certification MBA (UK)">
                      Triple certification MBA (UK)
                    </option>
                    <option value="Not sure yet">Not sure yet (Need counseling)</option>
                  </select>
                  {errors.program && (
                    <p id="program-error" className="mt-1.5 text-xs text-red-600">
                      {errors.program}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelCls}>
                    Where you stopped or current status <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="For example: completed two years of B.Com in 2020, working full-time since..."
                    className={`${field} resize-y`}
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    {status === 'sending' ? 'Sending request…' : 'Submit counseling request'}
                  </button>
                  <p className="mt-2.5 text-xs text-muted">
                    By submitting, you agree to receive academic counseling information via call or WhatsApp.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* Centers & Visual Right Column */}
        <div className="grid content-start gap-4 lg:col-span-5">
          {/* Centers Card */}
          <Reveal delay={140}>
            <div className="card card-p bg-navy-950 text-white">
              <div className="flex items-center gap-2">
                <span className="badge badge-dark">Regional Hubs</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-medium sm:text-2xl">
                Visit our counseling centers
              </h2>
              <p className="mt-1.5 text-xs text-white/65 sm:text-sm">
                Drop by in person for document verification and direct counseling.
              </p>

              <div className="mt-6 space-y-5 border-t border-white/10 pt-5">
                {centers.map((c) => (
                  <div key={c.city} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <address className="not-italic">
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 font-display text-base font-semibold text-white">
                          <MapPin size={16} className="text-gold" aria-hidden="true" />
                          {c.city} Centre
                        </p>
                        <a
                          href={`tel:${c.phoneHref}`}
                          className="action gap-1 text-xs font-semibold text-gold hover:underline"
                        >
                          <Phone size={12} />
                          Call
                        </a>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                        {c.address}
                      </p>
                      <p className="mt-2 text-xs font-medium text-white/50">
                        Ph: {c.phone}
                      </p>
                    </address>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Center Visual / Counseling Photo */}
          <Reveal delay={200}>
            <div className="card overflow-hidden">
              <Photo name="contact-1" ratio="16/9" rounded="none" className="h-full w-full object-cover" />
            </div>
          </Reveal>

          {/* Accreditation Quick Callout */}
          <Reveal delay={260}>
            <div className="card card-p flex items-center gap-3.5 bg-navy-50/60 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold text-navy">Accreditation Guarantee</p>
                <p className="text-xs text-muted">
                  All universities are UGC, AICTE & NAAC approved for government roles and higher study.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Numbers Strip */}
      <div className="shell pb-12 sm:pb-16 lg:pb-20">
        <Reveal>
          <div className="card px-5 py-6 sm:px-8 sm:py-8">
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-navy sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}

