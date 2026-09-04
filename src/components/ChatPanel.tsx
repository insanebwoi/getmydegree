import { useEffect, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'
import { chatEnquiry, href } from '../data/whatsapp'
import { site } from '../data/site'
import { WhatsAppMark } from './WhatsAppMark'

/**
 * A short scripted exchange before the handover.
 *
 * Two questions a counsellor always asks anyway, so the message that reaches
 * WhatsApp already says what the person wants   rather than "Hi" and a wait
 * while someone types it out. Nothing is sent from here: the panel composes
 * the text and WhatsApp does the sending, so no message can be attributed to
 * a visitor who did not press the button.
 */

const GOALS = [
  'Finish a degree I stopped',
  'Start a new UG degree',
  'Start a PG degree',
  'Just exploring options',
]

const SITUATIONS = [
  'I am working full time',
  'I have a gap after school',
  'I completed some semesters',
  'Something else',
]

type Turn = { from: 'bot' | 'me'; text: string }

const OPENING: Turn[] = [
  { from: 'bot', text: 'Hi! I can point you to the right programme in a minute.' },
  { from: 'bot', text: 'What are you looking to do?' },
]

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [turns, setTurns] = useState<Turn[]>(OPENING)
  const [step, setStep] = useState<'goal' | 'situation' | 'details' | 'ready'>('goal')
  const [goal, setGoal] = useState('')
  const [situation, setSituation] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [typing, setTyping] = useState(false)

  const panel = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Keep the newest turn in view as the exchange grows. */
  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: 'smooth' })
  }, [turns, typing, step])

  /* The reply lands after a beat, so the exchange reads as a conversation
     rather than the whole script appearing at once. */
  function reply(next: Turn[], nextStep: typeof step) {
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setTurns((t) => [...t, ...next])
      setStep(nextStep)
    }, 550)
  }

  function chooseGoal(choice: string) {
    setGoal(choice)
    setTurns((t) => [...t, { from: 'me', text: choice }])
    reply([{ from: 'bot', text: 'Got it. Which describes you best?' }], 'situation')
  }

  function chooseSituation(choice: string) {
    setSituation(choice)
    setTurns((t) => [...t, { from: 'me', text: choice }])
    reply(
      [
        {
          from: 'bot',
          text: 'Thanks. Add your name and number if you like — then continue on WhatsApp and a counsellor will pick it up.',
        },
      ],
      'details',
    )
  }

  const message = chatEnquiry({
    goal,
    level: situation,
    name: name.trim() || undefined,
    phone: phone.trim() || undefined,
  })

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-navy-950/40 p-0 backdrop-blur-[2px] sm:items-end sm:justify-end sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with GetMyDegree"
        className="flex h-[min(34rem,88svh)] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_24px_70px_-20px_rgba(5,18,41,0.55)] sm:h-[min(36rem,80svh)] sm:w-[23rem] sm:rounded-3xl"
      >
        {/* Header, in WhatsApp's own green so the destination is obvious. */}
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15">
            <WhatsAppMark className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{site.shortName}</span>
            <span className="block text-xs text-white/70">Typically replies within an hour</span>
          </span>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close the chat"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Thread */}
        <div
          ref={thread}
          className="flex-1 space-y-2 overflow-y-auto bg-[#ECE5DD] px-3 py-4"
          aria-live="polite"
        >
          {turns.map((turn, i) => (
            <p
              key={i}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                turn.from === 'bot'
                  ? 'rounded-tl-sm bg-white text-ink'
                  : 'ml-auto rounded-tr-sm bg-[#DCF8C6] text-ink'
              }`}
            >
              {turn.text}
            </p>
          ))}

          {typing && (
            <p className="flex w-14 gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-3 shadow-sm">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted/60"
                  style={{ animationDelay: `${d * 120}ms` }}
                />
              ))}
            </p>
          )}
        </div>

        {/* What the visitor can do next */}
        <div className="border-t border-line bg-white px-3 py-3">
          {step === 'goal' && (
            <ul className="flex flex-wrap gap-1.5">
              {GOALS.map((choice) => (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => chooseGoal(choice)}
                    className="min-h-9 rounded-full border border-navy/15 px-3 text-xs font-medium text-navy transition-colors hover:bg-navy-50"
                  >
                    {choice}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {step === 'situation' && (
            <ul className="flex flex-wrap gap-1.5">
              {SITUATIONS.map((choice) => (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => chooseSituation(choice)}
                    className="min-h-9 rounded-full border border-navy/15 px-3 text-xs font-medium text-navy transition-colors hover:bg-navy-50"
                  >
                    {choice}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {(step === 'details' || step === 'ready') && (
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name (optional)"
                  autoComplete="name"
                  className="min-h-11 w-full rounded-xl border border-line px-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-navy sm:text-sm"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  aria-label="Your phone number (optional)"
                  inputMode="tel"
                  autoComplete="tel"
                  className="min-h-11 w-full rounded-xl border border-line px-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-navy sm:text-sm"
                />
              </div>

              <a
                href={href(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#20ba5a]"
              >
                Send on WhatsApp
                <Send size={15} aria-hidden="true" />
              </a>
              <p className="text-center text-[0.6875rem] leading-snug text-muted">
                Opens WhatsApp with your answers filled in. Nothing is sent until you press send
                there.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
