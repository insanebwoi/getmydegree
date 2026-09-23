import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { FacebookIcon } from './SocialIcons'
import { WhatsAppMark } from './WhatsAppMark'
import { site } from '../data/site'

/**
 * The share row at the foot of an article.
 *
 * Deliberately small and placed after the reading rather than beside it: the
 * moment someone knows whether a piece was worth passing on is the moment they
 * finish it.
 *
 * On a phone the system share sheet is offered first, because it reaches the
 * app the reader actually uses. Everywhere else, and wherever the sheet is
 * unavailable, the explicit links are the whole control rather than a fallback
 * bolted underneath.
 */
export function ShareArticle({ slug, title }: { slug: string; title: string }) {
  const url = `${site.url}/blog/${slug}`
  const [copied, setCopied] = useState(false)

  /* `navigator.share` exists in desktop Chrome too, where it opens a sheet
     most people do not recognise, so the system sheet is offered on a coarse
     pointer   a phone or tablet   rather than wherever the API is defined. */
  const canUseSheet =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access is refused in some browsers and over plain http.
      // The link is in the address bar either way, so this needs no fallback.
    }
  }

  async function openSheet() {
    try {
      await navigator.share({ title, url })
    } catch {
      // A cancelled share rejects. That is not an error worth reporting.
    }
  }

  const chip =
    'inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-navy-200 hover:bg-wash'

  return (
    <div className="mt-10 rounded-2xl border border-line bg-wash/60 px-4 py-4 sm:px-5">
      <p className="text-sm font-medium text-ink">
        Found this useful? Send it to someone who needs it.
      </p>
      <p className="mt-1 text-xs text-muted">
        Most people we speak to were told about us by a friend who had already finished.
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        {canUseSheet && (
          <button type="button" onClick={openSheet} className={chip}>
            <Share2 size={14} aria-hidden="true" />
            Share
          </button>
        )}

        {/*
          A share link carries no number, so it opens the reader's own chat
          list rather than a conversation with us. `data-share` marks it as
          such: without that the conversion listener would read every share as
          a lead, and the campaign would optimise toward the wrong thing.
        */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-share="true"
          className={chip}
        >
          <WhatsAppMark className="h-3.5 w-3.5" />
          WhatsApp
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-share="true"
          className={chip}
        >
          <FacebookIcon size={14} />
          Facebook
        </a>

        <button type="button" onClick={copy} className={chip}>
          {copied ? (
            <Check size={14} className="text-emerald-600" aria-hidden="true" />
          ) : (
            <Link2 size={14} aria-hidden="true" />
          )}
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
