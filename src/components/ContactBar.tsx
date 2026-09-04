import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { WhatsAppMark } from './WhatsAppMark'
import { ChatPanel } from './ChatPanel'
import { site } from '../data/site'

/**
 * Both ways of reaching a counselor, always within reach.
 *
 * On a phone they sit together as a floating bar centred at the foot of the
 * screen — where a thumb rests, and where a single tap can call or open
 * WhatsApp. From sm the pair returns to a corner button, since a bar across a
 * wide screen would be a banner rather than an aid.
 */
export function ContactBar() {
  const [hovered, setHovered] = useState(false)
  const [past, setPast] = useState(false)
  const [chatting, setChatting] = useState(false)

  /*
    Nothing floats over the hero: the hero already carries both actions, and a
    bar there would cover them. It arrives once the reader has scrolled a
    screen and a half — past the hero, into the page — and leaves again if
    they scroll back up.
  */
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {chatting && <ChatPanel onClose={() => setChatting(false)} />}

      {/* Phones: one bar, two actions. */}
      <nav
        aria-label="Contact us"
        className={`fixed inset-x-0 bottom-0 z-90 flex justify-center px-4 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] transition-all duration-300 sm:hidden ${
          past ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-0.5 rounded-full border border-line bg-white/95 p-0.5 shadow-[0_8px_28px_-10px_rgba(5,18,41,0.4)] backdrop-blur-md">
          <a
            href={`tel:${site.phoneHref}`}
            className="flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.8125rem] font-medium text-navy transition-colors hover:bg-navy-50"
          >
            <Phone size={15} aria-hidden="true" />
            Call
          </a>
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setChatting(true)}
            className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full bg-[#25D366] px-4 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-[#20ba5a]"
          >
            <WhatsAppMark className="h-4.5 w-4.5" />
            WhatsApp
          </button>
        </div>
      </nav>

      {/* From sm: the corner button, as before. */}
      <aside
        aria-label="Contact options"
        className="fixed right-6 bottom-6 z-90 hidden items-center gap-2.5 sm:flex"
      >
        <span
          className={`rounded-full bg-navy-950/90 px-3.5 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-sm transition-all duration-200 ${
            hovered ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-1 opacity-0'
          }`}
        >
          Chat on WhatsApp
        </span>
        <button
          type="button"
          onClick={() => setChatting(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Chat with our counsellor on WhatsApp"
          aria-haspopup="dialog"
          className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-200 hover:scale-105 hover:bg-[#20ba5a]"
        >
          <span
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-25"
            style={{ animationDuration: '3s' }}
            aria-hidden="true"
          />
          <WhatsAppMark className="h-8 w-8 transition-transform duration-200 group-hover:scale-110" />
        </button>
      </aside>
    </>
  )
}
