import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 })).newPage()
await p.route('**/*', r => r.request().url().includes('localhost') ? r.continue() : r.abort())
await p.goto('http://localhost:4500/', { waitUntil: 'load' }); await p.waitForTimeout(1200)
// Sample the darkest pixel behind the paragraph for a range of crops.
for (const pos of ['50% 38%','35% 40%','25% 40%','18% 42%','10% 45%','0% 45%']) {
  const r = await p.evaluate((pos) => {
    document.querySelectorAll('.hero-frame img').forEach(i => (i.style.objectPosition = pos))
    const para = [...document.querySelectorAll('.hero-screen p')].find(e => e.textContent.includes('Complete a UGC'))
    return new Promise(res => requestAnimationFrame(() => {
      const b = para.getBoundingClientRect()
      res({ x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) })
    }))
  }, pos)
  await p.evaluate(() => document.querySelectorAll('.hero-screen h1,.hero-screen p,.hero-screen span,.hero-screen a,.hero-screen li').forEach(e => (e.style.visibility = 'hidden')))
  const shot = (await p.screenshot({ clip: { x: 0, y: 0, width: 768, height: 1024 } })).toString('base64')
  const stat = await p.evaluate(async ({ shot, r }) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + shot; await img.decode()
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0)
    let min = 999
    for (let dx = 0; dx < r.w; dx += 6) for (let dy = 0; dy < r.h; dy += 6) {
      const d = ctx.getImageData(r.x + dx, r.y + dy, 1, 1).data
      const L = 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]
      if (L < min) min = L
    }
    return Math.round(min)
  }, { shot, r })
  await p.evaluate(() => document.querySelectorAll('.hero-screen h1,.hero-screen p,.hero-screen span,.hero-screen a,.hero-screen li').forEach(e => (e.style.visibility = '')))
  // muted #626b80 → relative luminance 0.157
  const fg = 0.157, bgL = (v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 })(stat)
  const ratio = (Math.max(fg, bgL) + 0.05) / (Math.min(fg, bgL) + 0.05)
  console.log(`object-position ${pos.padEnd(9)} darkest pixel behind copy: ${String(stat).padStart(3)} → muted text ≈ ${ratio.toFixed(2)}:1 ${ratio >= 4.5 ? '✓' : '✗'}`)
}
await b.close()
