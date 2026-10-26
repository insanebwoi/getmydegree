import { imageRights } from '../data/imageRights'

/**
 * The rights fields for an image marked up with microdata, to sit inside its
 * `itemScope` ImageObject. Google reads microdata images as well as JSON-LD
 * ones, and flags any without a creator and copyright notice.
 */
export function ImageRightsMeta({ slug, year }: { slug?: string; year?: number }) {
  const rights = imageRights(slug, year)
  if (!rights) return null
  return (
    <>
      <span
        hidden
        itemProp="creator"
        itemScope
        itemType={`https://schema.org/${rights.creator['@type']}`}
      >
        <meta itemProp="name" content={rights.creator.name} />
        <link itemProp="url" href={rights.creator.url} />
      </span>
      <meta itemProp="creditText" content={rights.creditText} />
      <meta itemProp="copyrightNotice" content={rights.copyrightNotice} />
      <link itemProp="license" href={rights.license} />
      <link itemProp="acquireLicensePage" href={rights.acquireLicensePage} />
    </>
  )
}
