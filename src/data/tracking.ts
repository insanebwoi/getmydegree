/**
 * Google Ads conversion tracking.
 *
 * The tag itself is in index.html, so it loads on every page including the
 * prerendered ones. This file is the other half: which moments on the site
 * count as a conversion, and what to send when one happens.
 *
 * Nothing here reports a conversion until the labels below are filled in.
 * Installing the tag tells Google Ads a visit happened; only a conversion
 * action created in Google Ads, with its own label, tells it the visit was
 * worth something. Until then every call still fires a plain named event,
 * which is visible in Tag Assistant and to Tag Manager, so the wiring can be
 * verified before the labels exist.
 */

const AW_ID = 'AW-18461138319'

/**
 * Paste the label from each conversion action in Google Ads. It is the part
 * after the slash in the snippet Google shows you: in
 * `send_to: 'AW-18461138319/AbC-D_efGh'` the label is `AbC-D_efGh`.
 *
 * An empty string means that action is not set up yet, and the conversion is
 * simply not sent.
 */
const LABELS: Record<ConversionEvent, string> = {
  /* A tap on a phone number. Worth saying plainly: this records the intent to
     call, not a connected call. Google's own call reporting, or a forwarding
     number, is what distinguishes the two. Keep this one Primary only if you
     accept that gap; otherwise make it Secondary and keep enquiries Primary. */
  phone_call: '',
  /* A completed enquiry form, counted after validation passes and the message
     is handed to WhatsApp   not on every submit attempt. */
  enquiry: '',
  /* A tap on a WhatsApp link that opens a chat. */
  whatsapp: '',
}

export type ConversionEvent = 'phone_call' | 'enquiry' | 'whatsapp'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Report one conversion moment. Safe before gtag.js has loaded, and safe
 *  where an ad blocker removed it entirely. */
export function trackConversion(event: ConversionEvent, params: Record<string, unknown> = {}) {
  const gtag = window.gtag
  if (!gtag) return

  gtag('event', event, params)

  const label = LABELS[event]
  if (label) gtag('event', 'conversion', { send_to: `${AW_ID}/${label}`, ...params })
}

/**
 * A single page's worth of tracking for links we do not own the markup of one
 * by one. Phone and WhatsApp links are written in nine different components;
 * catching the click as it bubbles keeps the measurement in one place and
 * covers any link added later without a second edit.
 */
export function trackedLinkFromEvent(target: EventTarget | null): ConversionEvent | undefined {
  const link = (target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!link) return undefined
  const href = link.getAttribute('href') ?? ''
  if (href.startsWith('tel:')) return 'phone_call'
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return 'whatsapp'
  return undefined
}

/** Route changes in a single-page app never reload the document, so the tag's
 *  own page_view fires once and never again. Same reason the Meta Pixel needs
 *  its own call on navigation. */
export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
