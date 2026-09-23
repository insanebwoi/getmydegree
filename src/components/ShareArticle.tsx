import { useState } from 'react'
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

  /* `navigator.share` exists in desktop Chrome too, where it opens a sheet
     most people do not recognise, so the system sheet is offered on a coarse
     pointer   a phone or tablet   rather than wherever the API is defined. */
  const canUseSheet =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

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
    Instagram has no share URL. It accepts no link from a web page at all, so
    a button posing as one would do nothing   the honest version copies the
    link and says where to put it. On a phone the system sheet above reaches
    Instagram properly, which is why this is the desktop answer rather than
    the only one.
  */
  async function shareToInstagram() {
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
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: <TwitterIcon size={14} />,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
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
