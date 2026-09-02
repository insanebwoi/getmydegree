import { chromium } from 'playwright'
const lum = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
const b = await chromium.launch()
for (const [label, w, h] of [['390x844', 390, 844], ['768x1024', 768, 1024]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })).newPage()
  await p.route('**/*', r => r.request().url().includes('localhost') ? r.continue() : r.abort())
  await p.goto('http://localhost:4501/', { waitUntil: 'load' }); await p.waitForTimeout(1200)
  console.log(`\n${label}:`)
  for (const pos of ['12% 45%', '25% 45%', '32% 45%', '40% 45%', '50% 45%']) {
    await p.evaluate(pos => document.querySelectorAll('.hero-frame img').forEach(i => (i.style.objectPosition = pos)), pos)
    await p.waitForTimeout(120)
    const r = await p.evaluate(() => {
      const para = [...document.querySelectorAll('.hero-screen p')].find(e => e.textContent.includes('Complete a UGC'))
      const b = para.getBoundingClientRect()
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height),
               fg: getComputedStyle(para).color }
    })
    await p.evaluate(() => document.querySelector('.hero-screen').querySelectorAll('h1,p,span,a,li,svg').forEach(e => (e.style.visibility = 'hidden')))
    const shot = (await p.screenshot({ clip: { x: 0, y: 0, width: w, height: h } })).toString('base64')
    const out = await p.evaluate(async ({ shot, r, w, h }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + shot; await img.decode()
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0)
      let min = 999
      for (let dx = 0; dx < r.w; dx += 5) for (let dy = 0; dy < r.h; dy += 5) {
        const d = ctx.getImageData(r.x + dx, r.y + dy, 1, 1).data
        const L = 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]; if (L < min) min = L
      }
      // How much of the frame is "subject" (mid/dark tones) — a proxy for people being in shot
      let dark = 0, total = 0
      for (let x = 0; x < w; x += 8) for (let y = 0; y < h; y += 8) {
        const d = ctx.getImageData(x, y, 1, 1).data
        const L = 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]; total++; if (L < 150) dark++
      }
      return { min: Math.round(min), subject: Math.round(dark / total * 100) }
    }, { shot, r, w, h })
    await p.evaluate(() => document.querySelector('.hero-screen').querySelectorAll('h1,p,span,a,li,svg').forEach(e => (e.style.visibility = '')))
    const fgL = 0.0106 // ink #0e1526
    const bgL = lum(out.min)
    const ratio = (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05)
    console.log(`  ${pos.padEnd(9)} copy contrast ${ratio.toFixed(1)}:1 ${ratio >= 4.5 ? '✓' : '✗'} | subject fills ${String(out.subject).padStart(2)}% of frame`)
  }
  await p.close()
}
await b.close()
