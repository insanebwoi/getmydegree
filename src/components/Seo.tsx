import { useEffect } from 'react'
import { canonical, fullTitle, ogImage, type PageMeta } from '../data/meta'
import { site } from '../data/site'

type Props = PageMeta & {
  /** JSON-LD structured data for this page. */
  schema?: object
}

function setMeta(attr: 'name' | 'property', key: string, value: string | undefined) {
  const selector = `meta[${attr}="${key}"]`
  const existing = document.head.querySelector<HTMLMetaElement>(selector)
  if (value === undefined) {
    existing?.remove()
    return
  }
  const el = existing ?? document.createElement('meta')
  if (!existing) {
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Head management without a dependency. The prerender step writes the same tags
 * statically, so crawlers receive them without executing JavaScript; this keeps
 * them correct across client-side navigation.
 */
export function Seo({ schema, ...meta }: Props) {
  const title = fullTitle(meta)
  const url = canonical(meta)
  const image = ogImage(meta)
  const { description, type = 'website', noindex, publishedTime, modifiedTime, section } = meta

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    )

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:site_name', site.name)
    setMeta('property', 'og:locale', 'en_IN')

    // Article-only tags are removed again when navigating to a normal page.
    setMeta('property', 'article:published_time', type === 'article' ? publishedTime : undefined)
    setMeta('property', 'article:modified_time', type === 'article' ? modifiedTime : undefined)
    setMeta('property', 'article:section', type === 'article' ? section : undefined)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url

    const id = 'page-schema'
    document.getElementById(id)?.remove()
    if (schema) {
      const script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [title, description, url, image, type, noindex, publishedTime, modifiedTime, section, schema])

  return null
}
