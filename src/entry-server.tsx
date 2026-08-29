import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import {
  homeSchema,
  aboutSchema,
  coursesSchema,
  contactSchema,
  blogSchema,
  postSchema,
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
  return fixedSchemas[path] ?? postSchema(path.replace(/^\/blog\//, ''))
}

export { metaFor, fullTitle, canonical } from './data/meta'
export { prerenderPaths } from './routes'
