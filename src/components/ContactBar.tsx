import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { site } from '../data/site'

const WHATSAPP_NUMBER = '918606677828'
const WHATSAPP_MESSAGE =
  'Hello GetMyDegree, I would like to know more about degree admission and counseling.'
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M4.868 43.303l2.694-9.835a18.866 18.866 0 0 1-2.52-9.455C5.044 13.454 13.818 4.68 24.679 4.68c5.267.002 10.209 2.054 13.933 5.782a19.58 19.58 0 0 1 5.775 13.923c-.004 10.853-8.775 19.626-19.635 19.626a19.64 19.64 0 0 1-9.394-2.396z"
      />
      <path
        fill="#fff"
        d="M35.176 12.832c-2.98-2.982-6.941-4.625-11.157-4.626-8.704 0-15.783 7.076-15.787 15.774a15.74 15.74 0 0 0 2.109 7.924l-2.237 8.168 8.368-2.195a15.78 15.78 0 0 0 7.541 1.921h.006c8.702 0 15.782-7.077 15.787-15.775a15.68 15.68 0 0 0-4.63-11.191m-11.157 24.26h-.005a13.1 13.1 0 0 1-6.682-1.828l-.48-.285-4.963 1.302 1.325-4.842-.314-.498a13.06 13.06 0 0 1-2.003-6.985c.004-7.217 5.878-13.088 13.102-13.088 3.5.001 6.788 1.366 9.258 3.838a13.01 13.01 0 0 1 3.832 9.265c-.004 7.217-5.878 13.121-13.07 13.121m7.188-9.809c-.394-.198-2.331-1.15-2.692-1.281-.361-.129-.623-.198-.886.198s-1.018 1.281-1.247 1.544-.46.296-.854.099-1.665-.614-3.171-1.956c-1.172-1.045-1.963-2.337-2.195-2.731s-.025-.608.173-.805c.179-.177.394-.46.592-.69.197-.23.263-.395.394-.659s.065-.494-.033-.691c-.099-.198-.886-2.134-1.214-2.921-.32-.767-.645-.663-.886-.675l-.757-.015c-.263 0-.69.099-1.052.494s-1.38 1.347-1.38 3.283 1.413 3.807 1.61 4.071c.197.263 2.78 4.245 6.74 5.954.942.407 1.677.65 2.25.832.945.3 1.806.258 2.487.157.759-.114 2.332-.953 2.661-1.874.329-.922.329-1.71.23-1.874s-.362-.263-.756-.46"
      />
    </svg>
  )
}

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
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-1.5 rounded-full bg-[#25D366] px-4 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-[#20ba5a]"
          >
            <WhatsAppMark className="h-4.5 w-4.5" />
            WhatsApp
          </a>
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
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Chat with our counselor on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-200 hover:scale-105 hover:bg-[#20ba5a]"
        >
          <span
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-25"
            style={{ animationDuration: '3s' }}
            aria-hidden="true"
          />
          <WhatsAppMark className="h-8 w-8 transition-transform duration-200 group-hover:scale-110" />
        </a>
      </aside>
    </>
  )
}
