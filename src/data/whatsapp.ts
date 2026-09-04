import { site } from './site'

/** One number, one place. */
export const WHATSAPP_NUMBER = '918606677828'

/**
 * Message templates.
 *
 * No box-drawing rules and no decorative emoji. A line of eighteen `━`
 * characters costs 162 characters once percent-encoded, so two of them took
 * 324 of the 690 characters a filled-in enquiry used   nearly half the URL
 * spent on separators. Long `wa.me` links get truncated by some clients, and
 * the rules arrive as mojibake wherever the font lacks the glyph.
 *
 * WhatsApp's own markup does the same job: `*bold*` for the heading, blank
 * lines for structure. Labels stay plain so the text is readable even where
 * formatting is stripped.
 */
/**
 * A `wa.me` link carries text and nothing else   there is no parameter for an
 * attachment, and no web API that can put a file into someone's draft. What
 * does travel is a link: WhatsApp fetches the page's Open Graph image and
 * renders a preview card above the message, which is the picture the reader
 * actually sees. So the trailing URL is the attachment, and `link` points it
 * at the page the enquiry is about.
 */
function compose(heading: string, rows: (string | null)[], link: string = site.url) {
  const body = rows.filter(Boolean).join('\n')
  return `*${heading}*\n\n${body}\n\n${link}`
}

export function href(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** The plain opener behind the floating button. */
export const generalEnquiry =
  'Hello GetMyDegree, I would like to know more about degree admission and counselling.'

export function courseEnquiry(input: {
  code: string
  name: string
  slug?: string
  fullName: string
  phone: string
  email?: string
  question?: string
}) {
  return compose(
    `Course enquiry: ${input.code}`,
    [
      `Programme: ${input.name}`,
      `Name: ${input.fullName}`,
      `Phone: ${input.phone}`,
      input.email ? `Email: ${input.email}` : null,
      input.question ? `Notes: ${input.question}` : null,
    ],
    input.slug ? `${site.url}/courses/${input.slug}` : site.url,
  )
}

export function counsellingRequest(input: {
  fullName: string
  phone: string
  email: string
  program: string
  message?: string
}) {
  return compose('Counselling request', [
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    `Interested in: ${input.program}`,
    input.message ? `Notes: ${input.message}` : null,
  ])
}

/** Built by the chat panel from the answers the visitor picked. */
export function chatEnquiry(input: { goal: string; level: string; name?: string; phone?: string }) {
  return compose('Enquiry from the website', [
    `Looking for: ${input.goal}`,
    `Situation: ${input.level}`,
    input.name ? `Name: ${input.name}` : null,
    input.phone ? `Phone: ${input.phone}` : null,
  ])
}
