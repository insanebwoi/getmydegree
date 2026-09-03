import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import type { Course } from '../data/site'

type Errors = Partial<Record<'name' | 'phone' | 'email', string>>

/* 16px keeps iOS from zooming the page when a field takes focus. */
const field =
  'mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base outline-none transition-colors placeholder:text-muted/55 focus:border-navy sm:py-3'

/**
 * Applying without leaving the page. Escape closes it, focus starts on the
 * first field and returns to the tile afterwards, and the page behind cannot
 * scroll while it is open.
 */
export function ApplyDialog({ course, onClose }: { course: Course; onClose: () => void }) {
  const first = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [waUrl, setWaUrl] = useState('')

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    first.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      opener?.focus?.()
    }
  }, [onClose])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const question = String(data.get('question') ?? '').trim()

    const next: Errors = {}
    if (name.length < 2) next.name = 'Enter your full name.'
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone))
      next.phone = 'Enter a phone number we can reach you on.'
    if (email && !/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(email))
      next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    setStatus('sending')

    const lines = [
      `🎓 *Course Enquiry: ${course.code}*`,
      `*Program:* ${course.name}`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      email ? `✉️ *Email:* ${email}` : null,
      question ? `📝 *Notes/Questions:* ${question}` : null,
      `━━━━━━━━━━━━━━━━━━`,
      `Sent via GetMyDegree Website`,
    ].filter(Boolean)

    const url = `https://wa.me/918606677828?text=${encodeURIComponent(lines.join('\n'))}`
    setWaUrl(url)

    window.setTimeout(() => {
      setStatus('sent')
      window.open(url, '_blank', 'noopener,noreferrer')
    }, 600)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-title"
      onClick={onClose}
      className="fixed inset-0 z-100 overflow-y-auto overscroll-contain bg-navy-950/70 backdrop-blur-sm"
    >
      <div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-t-[var(--radius-panel)] border border-line bg-white p-5 shadow-[0_30px_80px_-30px_rgba(5,18,41,0.5)] sm:rounded-[var(--radius-panel)] sm:p-7"
        >
          <span
            aria-hidden="true"
            className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line sm:hidden"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-wash hover:text-ink"
          >
            <X size={16} aria-hidden="true" />
          </button>

          {status === 'sent' ? (
            <div role="status" className="py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-md">
                <CheckCircle2 size={28} aria-hidden="true" />
              </span>
              <h2 className="t-h3 mt-5 font-display font-medium text-ink">Enquiry sent!</h2>
              <p className="mt-2 text-base text-muted md:text-sm">
                Redirecting to WhatsApp counselor chat. Our team will assist you with admission details for {course.code}.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white border-transparent"
                  >
                    <span>Open WhatsApp</span>
                  </a>
                )}
                <button type="button" onClick={onClose} className="btn btn-ghost">
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="badge text-xs">{course.years} · UGC recognized</span>
              <h2 id="apply-title" className="t-h3 mt-2.5 pr-12 font-display font-medium">
                Enquire about {course.code}
              </h2>
              <p className="mt-1 text-sm text-muted">{course.name} · Admission &amp; fee guidance</p>

              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-5 grid gap-3.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4"
              >
                <div>
                  <label htmlFor="apply-name" className="text-sm font-medium">
                    Full name
                  </label>
                  <input
                    ref={first}
                    id="apply-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'apply-name-error' : undefined}
                    className={field}
                  />
                  {errors.name && (
                    <p id="apply-name-error" className="mt-1.5 text-sm text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="apply-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'apply-phone-error' : undefined}
                    className={field}
                  />
                  {errors.phone && (
                    <p id="apply-phone-error" className="mt-1.5 text-sm text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-email" className="text-sm font-medium">
                    Email <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="apply-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'apply-email-error' : undefined}
                    className={field}
                  />
                  {errors.email && (
                    <p id="apply-email-error" className="mt-1.5 text-sm text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="apply-question" className="text-sm font-medium">
                    Questions or notes <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="apply-question"
                    name="question"
                    type="text"
                    placeholder="e.g. Credit transfer, fee EMI, syllabus"
                    className={field}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-arrow btn-primary mt-1 justify-center disabled:opacity-60 sm:col-span-2"
                >
                  {status === 'sending' ? 'Submitting enquiry…' : 'Submit enquiry'}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-muted sm:col-span-2">
                  Free consultation · Zero obligation · 100% confidential
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
