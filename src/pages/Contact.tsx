import { useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { contactSchema } from '../data/schema'
import { counsellingRequest, href } from '../data/whatsapp'
import { Reveal } from '../components/Reveal'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { centers, courses, site, stats } from '../data/site'

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'program', string>>

const field =
  'mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-muted/50 focus:border-navy focus:ring-2 focus:ring-navy/10 sm:py-3'
const labelCls = 'text-xs font-semibold uppercase tracking-wider text-ink/80'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [waUrl, setWaUrl] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const program = String(data.get('program') ?? '')
    const message = String(data.get('message') ?? '').trim()

    const next: Errors = {}
    if (name.length < 2) next.name = 'Enter your full name.'
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) next.phone = 'Enter a valid phone number.'
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(email)) next.email = 'Enter a valid email address.'
    if (!program) next.program = 'Choose a degree program.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    setStatus('sending')

    const url = href(
      counsellingRequest({
        fullName: name,
        phone,
        email,
        program,
        message: message || undefined,
      }),
    )
    setWaUrl(url)

    window.setTimeout(() => {
      setStatus('sent')
      window.open(url, '_blank', 'noopener,noreferrer')
      form.reset()
    }, 600)
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

      {/* Main Form & Centers Section - Aligned with 0 Negative Space */}
      <section id="counseling-form" className="shell pb-12 sm:pb-16 lg:pb-20">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Counseling Form Column */}
          <Reveal className="flex h-full flex-col lg:col-span-7">
            <div className="card card-p flex h-full flex-col justify-between p-6 sm:p-7 lg:p-8">
              <div>
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                  <div>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-navy">
                      Free Consultation · 48h Admission
                    </span>
                    <h2 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">
                      Request academic guidance
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Sparkles size={13} aria-hidden="true" />
                    Zero obligation
                  </span>
                </div>

                {/* Reassurance Guarantees Strip */}
                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Check size={13} strokeWidth={2.5} className="text-emerald-600" />
                    100% UGC Approved
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check size={13} strokeWidth={2.5} className="text-emerald-600" />
                    Continuous Assessment
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check size={13} strokeWidth={2.5} className="text-emerald-600" />
                    Confidential Guidance
                  </span>
                </div>

                {status === 'sent' ? (
                  <div
                    role="status"
                    className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-md">
                      <CheckCircle2 size={28} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-medium text-ink">
                      Request received &amp; redirecting!
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted">
                      Your enquiry has been prepared for WhatsApp. A counselor will connect with you
                      with syllabus and fee details.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white border-transparent"
                        >
                          <MessageCircle size={16} />
                          <span>Open WhatsApp Chat</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="btn btn-ghost"
                      >
                        Send another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-5 grid gap-4 sm:grid-cols-2"
                  >
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
                        <p id="name-error" className="mt-1 text-xs text-red-600">
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
                        <p id="phone-error" className="mt-1 text-xs text-red-600">
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
                        <p id="email-error" className="mt-1 text-xs text-red-600">
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
                        <p id="program-error" className="mt-1 text-xs text-red-600">
                          {errors.program}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelCls}>
                        Where you stopped or current status{' '}
                        <span className="text-muted font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={2}
                        placeholder="For example: completed two years of B.Com in 2020, working full-time since..."
                        className={`${field} resize-none`}
                      />
                    </div>

                    <div className="sm:col-span-2 pt-1">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn btn-arrow btn-primary w-full justify-center sm:w-auto"
                      >
                        <span>
                          {status === 'sending'
                            ? 'Submitting request…'
                            : 'Submit counseling request'}
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                      <p className="mt-2.5 text-xs text-muted">
                        By submitting, you agree to receive academic counseling information via call
                        or WhatsApp.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Bottom Quick Help Bar */}
              <div className="mt-6 border-t border-line/60 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <span>Need urgent assistance?</span>
                <a
                  href={href(
                    'Hello GetMyDegree, I would like urgent academic counselling assistance.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action gap-1 font-semibold text-[#25D366] hover:underline"
                >
                  <MessageCircle size={14} />
                  <span>Chat directly on WhatsApp: +91 86066 77828</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Unified Regional Hubs & Visual Right Column - Seamless 0 Negative Space */}
          <Reveal delay={120} className="flex h-full flex-col lg:col-span-5">
            <div className="card flex h-full flex-col justify-between overflow-hidden bg-navy-950 text-white">
              {/* Top Centers Section */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge badge-dark">Regional Hubs</span>
                  <span className="text-[0.6875rem] font-medium text-white/50">
                    Walk-in verified
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-medium sm:text-2xl text-white">
                  Visit our counseling centers
                </h2>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                  Drop by in person for document verification and direct counseling.
                </p>

                {/* Centers List */}
                <div className="mt-5 space-y-3">
                  {centers.map((c) => (
                    <div
                      key={c.city}
                      className="rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:bg-white/8"
                    >
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1.5 font-display text-sm font-semibold text-white sm:text-base">
                          <MapPin size={15} className="text-gold shrink-0" aria-hidden="true" />
                          {c.city} Centre
                        </p>
                        <a
                          href={`tel:${c.phoneHref}`}
                          className="action inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
                        >
                          <Phone size={11} />
                          <span>Call</span>
                        </a>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-white/75">{c.address}</p>
                      <p className="mt-1.5 text-[0.6875rem] font-medium text-white/50">
                        Ph:{' '}
                        <a href={`tel:${c.phoneHref}`} className="action hover:text-white/80">
                          {c.phone}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Visual Photograph */}
              <div className="relative mx-6 mb-4 overflow-hidden rounded-xl border border-white/10 sm:mx-7">
                <Photo
                  name="contact-1"
                  ratio="16/9"
                  rounded="none"
                  className="h-38 w-full object-cover sm:h-44"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent p-3 text-left">
                  <p className="text-xs font-medium text-white">
                    The GetMyDegree centre in Malappuram
                  </p>
                </div>
              </div>

              {/* Accreditation Guarantee Docked Strip */}
              <div className="border-t border-white/10 bg-white/5 px-6 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold text-navy-950">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">Accreditation Guarantee</p>
                    <p className="text-[0.75rem] text-white/70 leading-snug">
                      All universities are UGC, AICTE &amp; NAAC approved for government roles and
                      higher study.
                    </p>
                  </div>
                </div>
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
