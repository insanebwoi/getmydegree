import { useEffect } from 'react'
import { canonical, fullTitle, type PageMeta } from '../data/meta'

type Props = PageMeta & {
  /** JSON-LD structured data for this page. */
  schema?: object
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Head management without a dependency. The prerender step writes the same tags
 * statically, so crawlers receive them without executing JavaScript.
 */
export function Seo({ schema, ...meta }: Props) {
  const title = fullTitle(meta)
  const url = canonical(meta)
  const { description } = meta

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

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
  }, [title, description, url, schema])

  return null
}
