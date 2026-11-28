import { useEffect, useId, useState } from 'react'
import { Clock, Phone, X } from 'lucide-react'
import { centers, site } from '../data/site'
import { trackEvent } from '../data/tracking'

/** Seconds of actual reading before the card appears. */
const DELAY_MS = 5000
/** Once closed or used, the card stays away for the rest of the visit. */
const DISMISSED_KEY = 'call-prompt-dismissed'

/** "B.Tech for working professionals in Kerala: eligibility, …" → the part
 *  before the colon, when that part names the topic on its own. */
function shortTopic(title: string) {
  const head = title.split(':')[0].trim()
  return head.length >= 12 ? head : title
}

function wasDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function rememberDismissed() {
  try {
    window.sessionStorage.setItem(DISMISSED_KEY, '1')
  } catch {
    /* Private windows can refuse storage; the card simply may return. */
  }
}

/**
 * A call invitation for someone who is actually reading an article.
 *
 * It appears after five seconds of the page being visible, not on arrival:
 * a reader still on the page by then is interested in the topic, and the
 * card names that topic. It is a small card at the edge of the screen, not a
 * full-screen overlay. Google demotes pages whose mobile content is hidden
 * behind interstitials, and these articles exist to rank.
 *
 * Each branch is a plain `tel:` link, so a tap is counted as a call
 * conversion by the site-wide click tracker in `Layout`. Closing the card,
 * or calling from it, keeps it away for the rest of the visit so it does not
 * follow the reader from article to article.
 */
export function CallPrompt({ topic, slug }: { topic: string; slug: string }) {
  const [open, setOpen] = useState(false)
  const headingId = useId()

  useEffect(() => {
    if (wasDismissed()) return
    // Counts only time the tab is in front of the reader: a page opened in a
    // background tab has not been read.
    let readMs = 0
    let last = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      if (document.visibilityState === 'visible') readMs += now - last
      last = now
      if (readMs >= DELAY_MS) {
        window.clearInterval(timer)
        if (wasDismissed()) return
        setOpen(true)
        trackEvent('call_prompt_shown', { article: slug })
      }
    }, 500)
    return () => window.clearInterval(timer)
  }, [slug])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close('escape')
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  function close(how: string) {
    setOpen(false)
    rememberDismissed()
    trackEvent('call_prompt_closed', { article: slug, how })
  }

  if (!open) return null

  return (
    <aside
      role="dialog"
      aria-labelledby={headingId}
      className="call-prompt fixed inset-x-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[95] rounded-3xl border border-line bg-white p-4 shadow-[0_18px_48px_-14px_rgba(5,18,41,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[23rem] sm:p-5"
    >
      <button
        type="button"
        onClick={() => close('button')}
        aria-label="Close"
        className="absolute top-2.5 right-2.5 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-navy-50 hover:text-navy"
      >
        <X size={16} aria-hidden="true" />
      </button>

      <p className="pr-9 text-xs font-semibold tracking-wide text-gold-700 uppercase">
        Free counselling call
      </p>
      <h2 id={headingId} className="mt-1 pr-6 font-display text-base leading-snug font-semibold text-ink">
        Call us to know this in detail
      </h2>
      {/* The topic on its own line: article titles are long and phrased many
          ways, so they read better quoted than worked into the sentence. */}
      <p className="mt-1.5 line-clamp-2 border-l-2 border-gold pl-2.5 text-sm leading-snug font-medium text-navy">
        {shortTopic(topic)}
      </p>

      <ul className="mt-3.5 grid gap-2">
        {centers.map((center) => (
          <li key={center.branch}>
            <a
              href={`tel:${center.phoneHref}`}
              onClick={() => {
                trackEvent('call_prompt_call', { article: slug, branch: center.branch })
                setOpen(false)
                rememberDismissed()
              }}
              className="group flex min-h-13 items-center gap-3 rounded-2xl bg-navy px-3.5 py-2.5 text-white transition-colors hover:bg-navy-700"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
                <Phone size={15} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold">{center.branch} branch</span>
              <span className="text-sm font-semibold whitespace-nowrap tabular-nums">{center.phone}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <Clock size={13} aria-hidden="true" />
        {site.officeHours} · {site.name}
      </p>
    </aside>
  )
}
