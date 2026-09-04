import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import './data/postBodies.ssr'
import {
  homeSchema,
  aboutSchema,
  coursesSchema,
  contactSchema,
  blogSchema,
  postSchema,
  courseSchema,
} from './data/schema'

/** Renders one route to HTML for the prerender step. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

const fixedSchemas: Record<string, object> = {
  '/': homeSchema,
  '/about': aboutSchema,
  '/courses': coursesSchema,
  '/blog': blogSchema,
  '/contact': contactSchema,
}

/** JSON-LD written into each prerendered page's <head>. */
export function schemaFor(path: string): object | undefined {
  const fixed = fixedSchemas[path]
  if (fixed) return fixed
  if (path.startsWith('/courses/')) return courseSchema(path.replace('/courses/', ''))
  return postSchema(path.replace(/^\/blog\//, ''))
}

export { metaFor, fullTitle, canonical, ogImage } from './data/meta'
export { prerenderPaths } from './routes'
