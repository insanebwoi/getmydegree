import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { loadBody } from './data/posts'
import { preloadRoute } from './routes'
import './index.css'

// Enables the scroll-reveal styles. Without JS the content simply stays visible.
document.documentElement.classList.add('js')

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

function start() {
  // Prerendered HTML is hydrated; a plain dev/SPA load renders from scratch.
  if (container.hasChildNodes()) {
    hydrateRoot(container, tree)
  } else {
    createRoot(container).render(tree)
  }
}

// The page's own chunk, and on an article URL its body, load before hydrating
// so the first client render matches the prerendered HTML. Other pages never
// download article text.
const { pathname } = window.location
const match = pathname.match(/^\/blog\/([^/]+)\/?$/)
Promise.all([preloadRoute(pathname), match ? loadBody(match[1]) : undefined])
  .catch(() => undefined)
  .then(start)
