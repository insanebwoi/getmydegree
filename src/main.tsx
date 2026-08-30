import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { loadBody } from './data/posts'
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

// On an article URL the body lives in its own chunk. Fetch it before hydrating
// so the first client render matches the prerendered HTML; every other page
// starts immediately and never downloads article text.
const match = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/)
if (match) {
  loadBody(match[1])
    .catch(() => undefined)
    .then(start)
} else {
  start()
}
