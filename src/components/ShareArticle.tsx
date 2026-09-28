import { useState, type MouseEvent } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from './SocialIcons'
import { WhatsAppMark } from './WhatsAppMark'
import { articleShare, shareHref } from '../data/whatsapp'
import { site } from '../data/site'

/**
 * The share row at the foot of an article.
 *
 * Deliberately small and placed after the reading rather than beside it: the
 * moment someone knows whether a piece was worth passing on is the moment they
 * finish it.
 *
 * On a phone the system share sheet is offered first, because it reaches the
 * app the reader actually uses   including the ones with no web share URL at
 * all. Everywhere else the explicit links are the whole control rather than a
 * fallback bolted underneath.
 */
export function ShareArticle({
  slug,
  title,
  excerpt,
}: {
  slug: string
  title: string
  excerpt: string
}) {
  const url = `${site.url}/blog/${slug}`
  const [copied, setCopied] = useState<'link' | 'instagram' | null>(null)

  const hasSheet = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  /* `navigator.share` exists in desktop Chrome too, where it opens a sheet
     most people do not recognise, so the sheet is offered up front on a
     coarse pointer   a phone or tablet   rather than wherever the API is
     defined. Instagram still uses it everywhere it exists, because for
     Instagram it is the only thing that works at all. */
  const canUseSheet =
    hasSheet && typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  /*
    Share targets belong in a dialog, not a background tab.

    Opened with `target="_blank"` these land behind the current page on some
    setups, which reads as the button having done nothing   the single most
    common reason a share row looks broken. A named, sized window puts the
    dialog in front. The anchor keeps its `href` so the browser's own
    behaviours still work: middle-click, ctrl-click, copy link address, and
    the case where a popup blocker refuses us, which falls back to a tab.
  */
  function openShare(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const w = 620
    const h = 660
    const left = window.screenX + Math.max(0, (window.outerWidth - w) / 2)
    const top = window.screenY + Math.max(0, (window.outerHeight - h) / 2)
    const opened = window.open(
      href,
      'gmd-share',
      `popup=yes,width=${w},height=${h},left=${Math.round(left)},top=${Math.round(top)}`,
    )
    if (opened) opened.focus()
    else window.open(href, '_blank', 'noopener,noreferrer')
  }

  async function copy(as: 'link' | 'instagram') {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(as)
      window.setTimeout(() => setCopied(null), 2500)
      return true
    } catch {
      // Clipboard access is refused in some browsers and over plain http.
      // The link is in the address bar either way, so this needs no fallback.
      return false
    }
  }

  async function openSheet() {
    try {
      await navigator.share({ title, text: excerpt, url })
    } catch {
      // A cancelled share rejects. That is not an error worth reporting.
    }
  }

  /*
    Instagram publishes no share URL   it accepts no link from a web page at
    all, so a button posing as one can only pretend. Where the system share
    sheet exists it lists Instagram as a target and genuinely hands the link
    over, so that is tried first. Everywhere else the honest fallback is to
    copy the link and say where to put it.
  */
  async function shareToInstagram() {
    if (hasSheet) {
      try {
        await navigator.share({ title, text: excerpt, url })
        return
      } catch {
        // Cancelled, or refused by the browser. Fall through to the copy.
      }
    }
    await copy('instagram')
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
  }

  const chip =
    'inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-navy-200 hover:bg-wash'

  /* The link goes last in every one of these, because that is what the
     platform reads to build its preview card. */
  const links = [
    {
      label: 'WhatsApp',
      href: shareHref(articleShare({ title, excerpt, url })),
      icon: <WhatsAppMark className="h-3.5 w-3.5" />,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <FacebookIcon size={14} />,
    },
    {
      label: 'X',
      href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: <TwitterIcon size={14} />,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(excerpt)}`,
      icon: <LinkedInIcon size={14} />,
    },
  ]

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
          A share link carries no number and opens the reader's own chat list
          rather than a conversation with us. `data-share` marks it as such:
          without that the conversion listener would read every share as a
          lead, and the campaign would optimise toward the wrong thing.
        */}
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-share="true"
            className={chip}
            aria-label={`Share this article on ${link.label}`}
            onClick={(event) => openShare(event, link.href)}
          >
            {link.icon}
            {link.label}
          </a>
        ))}

        <button
          type="button"
          onClick={shareToInstagram}
          className={chip}
          aria-label="Copy this article's link to paste into Instagram"
        >
          <InstagramIcon size={14} />
          {copied === 'instagram' ? 'Copied — paste it in' : 'Instagram'}
        </button>

        <button type="button" onClick={() => copy('link')} className={chip}>
          {copied === 'link' ? (
            <Check size={14} className="text-emerald-600" aria-hidden="true" />
          ) : (
            <Link2 size={14} aria-hidden="true" />
          )}
          {copied === 'link' ? 'Link copied' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
