import { chromium } from 'playwright'
const b = await chromium.launch()
for (const [label, w, h] of [['iPhone SE 375x667', 375, 667], ['iPhone 390x844', 390, 844],
    ['small 320x568', 320, 568], ['landscape phone 740x360', 740, 360],
    ['tablet 768x1024', 768, 1024], ['laptop 1280x720', 1280, 720], ['desktop 1440x900', 1440, 900]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage()
  await p.route('**/*', r => r.request().url().includes('localhost') ? r.continue() : r.abort())
  await p.goto('http://localhost:4621/courses', { waitUntil: 'load' })
  await p.locator('button[aria-label^="Apply"]').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(400)
  await p.locator('button[aria-label^="Apply"]').first().click(); await p.waitForTimeout(400)
  const m = await p.evaluate(() => {
    const d = document.querySelector('[role="dialog"]')
    // The card is the panel that holds the heading, not the scroll wrapper.
    const card = d.querySelector('h2, [role="status"]').closest('div')
    const r = card.getBoundingClientRect()
    const btn = [...d.querySelectorAll('button')].find(e => e.textContent.includes('Request a call'))
    const br = btn?.getBoundingClientRect()
    return { card: `${Math.round(r.width)}x${Math.round(r.height)}`,
      top: Math.round(r.top), bottom: Math.round(r.bottom), viewport: innerHeight,
      overlayScrolls: d.scrollHeight > d.clientHeight,
      cutOff: (r.bottom > innerHeight + 1 || r.top < -1) && d.scrollHeight <= d.clientHeight,
      ctaVisible: br ? br.bottom <= innerHeight : null,
      scrollable: getComputedStyle(card).overflowY }
  })
  console.log(`${label.padEnd(24)} card ${m.card.padEnd(9)} top ${String(m.top).padStart(4)} bottom ${String(m.bottom).padStart(4)}/${m.viewport} ${m.cutOff ? '✗ CUT OFF' : '✓'} | ${m.overlayScrolls ? 'overlay scrolls ✓' : 'fits ✓'}`)
  await p.close()
}
await b.close()
