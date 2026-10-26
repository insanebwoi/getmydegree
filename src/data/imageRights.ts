import { site } from './site'
import { stockCovers } from './stockCovers'

/**
 * The rights fields Google Images reads to show an image as licensable:
 * creator, creditText, copyrightNotice, license and acquireLicensePage.
 *
 * `creator` is a plain Organization with no `@id`, because pointing it at the
 * organization node makes it an EducationalOrganization, which Google rejects
 * for this field.
 */
export type ImageRights = {
  creator: { '@type': 'Organization'; name: string; url: string }
  creditText: string
  copyrightNotice: string
  license: string
  acquireLicensePage: string
}

export const OWN_IMAGE_LICENSE = `${site.url}/privacy-policy#images`

/** Our rights over an image, or nothing for a post still on a stock cover. */
export function imageRights(slug?: string, year: number = new Date().getFullYear()): ImageRights | undefined {
  if (slug && stockCovers.has(slug)) return undefined
  return {
    creator: { '@type': 'Organization', name: site.name, url: site.url },
    creditText: site.name,
    copyrightNotice: `© ${year} ${site.legalName}`,
    license: OWN_IMAGE_LICENSE,
    acquireLicensePage: `${site.url}/contact`,
  }
}
