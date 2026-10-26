import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { pageMeta } from '../data/meta'
import { centers, site } from '../data/site'

/**
 * Describes what the site actually does with data: the forms open WhatsApp
 * with a prefilled message rather than posting anywhere, and the only tracking
 * is the Google Ads tag and the Meta Pixel loaded from index.html. Keep this in
 * step with those if either changes.
 */
export default function PrivacyPolicy() {
  return (
    <>
      <Seo {...pageMeta['/privacy-policy']} />
      <section className="shell pt-2 pb-16 lg:pb-24">
        <div className="panel px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
          <span className="badge">Last updated 23 October 2026</span>
          <h1 className="mt-4 t-h1">Privacy policy</h1>
          <div className="prose mt-8 max-w-3xl">
            <p>
              This policy explains what {site.legalName} (“{site.name}”, “we”) collects through{' '}
              {site.url.replace('https://', '')}, why, and what you can ask us to do with it.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>What you send us.</strong> The enquiry and counselling forms on this site do
                not store anything on our servers. Submitting one opens WhatsApp with your name,
                phone number and the programme you chose already typed in, and nothing is sent until
                you press send in WhatsApp. Calls and emails reach us directly.
              </li>
              <li>
                <strong>Documents for admission.</strong> If you go ahead with admission, we ask for
                marksheets, identity documents and photographs so the university can verify your
                eligibility and enrol you.
              </li>
              <li>
                <strong>Usage and advertising data.</strong> The site loads the Google Ads tag and
                the Meta Pixel. They use cookies and similar technology to record visits and actions
                such as tapping our phone number, so we can tell which advertising works. Google and
                Meta process that data under their own privacy policies.
              </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To reply to your enquiry and give counselling.</li>
              <li>
                To prepare and submit your application to the university that will award your
                degree, and to follow it through to graduation.
              </li>
              <li>To measure and improve our advertising and this website.</li>
            </ul>
            <p>We do not sell your personal information.</p>

            <h2>Who we share it with</h2>
            <p>
              The university you apply to, which needs your documents to admit you; WhatsApp, Google
              and Meta, as described above; and authorities where the law requires it.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiry conversations are kept while they are useful for following up. Admission
              records are kept for as long as you study with a partner university and for a
              reasonable period afterwards, because fee receipts and documents are often needed again
              at graduation or verification.
            </p>

            <h2>Your choices</h2>
            <ul>
              <li>
                Ask us what we hold about you, or ask us to correct or delete it, by emailing{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </li>
              <li>
                Block or clear cookies in your browser, or turn off personalised ads in your Google
                and Meta account settings.
              </li>
            </ul>

            <h2 id="images">Images on this site</h2>
            <p>
              Our logo, banners and article covers are owned by {site.legalName}. You may show one
              with a link back to the page it appears on. For any other use, such as printing or
              advertising, <Link to="/contact">ask us first</Link>.
            </p>

            <h2>Contact</h2>
            <p>
              {site.legalName}
              {centers.map((c) => (
                <span key={c.city}>
                  <br />
                  {c.address}
                </span>
              ))}
              <br />
              Phone: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              <br />
              Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              Questions about admissions rather than privacy? <Link to="/contact">Contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
