import { chromium } from 'playwright'
const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]) }
const parse = s => {
  s = s.trim()
  let m = s.match(/^rgba?\(([^)]+)\)/); if (m) { const v = m[1].split(/[\s,/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1] }
  m = s.match(/^okl(ch|ab)\(([^)]+)\)/)
  if (m) {
    const isCh = m[1] === 'ch', p = m[2].split(/[\s/]+/).filter(Boolean)
    const L = p[0].endsWith('%') ? parseFloat(p[0]) / 100 : parseFloat(p[0])
    const A = isCh ? parseFloat(p[1]) * Math.cos((parseFloat(p[2]) || 0) * Math.PI / 180) : parseFloat(p[1])
    const B = isCh ? parseFloat(p[1]) * Math.sin((parseFloat(p[2]) || 0) * Math.PI / 180) : parseFloat(p[2])
    const a = p[3] === undefined ? 1 : (p[3].endsWith('%') ? parseFloat(p[3]) / 100 : parseFloat(p[3]))
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3, mm = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3, ss = (L - 0.0894841775 * A - 1.2914855480 * B) ** 3
    const lin = [4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * ss, -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * ss, -0.0041960863 * l - 0.7034186147 * mm + 1.7076147010 * ss]
    const enc = v => { v = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.max(v, 0) ** (1 / 2.4) - 0.055; return Math.min(255, Math.max(0, Math.round(v * 255))) }
    return [enc(lin[0]), enc(lin[1]), enc(lin[2]), a]
  }
  return [0, 0, 0, 1]
}
const comp = (f, bg) => f.slice(0, 3).map((c, i) => c * f[3] + bg[i] * (1 - f[3]))
const b = await chromium.launch()
for (const [label, w, h] of [['390x844', 390, 844], ['360x740', 360, 740], ['768x1024', 768, 1024]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })).newPage()
  await p.route('**/*', r => r.request().url().includes('localhost') ? r.continue() : r.abort())
  await p.goto('http://localhost:4502/', { waitUntil: 'load' }); await p.waitForTimeout(1500)
  const targets = await p.evaluate(() => {
    const hero = document.querySelector('.hero-screen'); const out = []
    for (const el of hero.querySelectorAll('h1,p,span,a,li')) {
      const t = el.textContent?.trim(); if (!t || el.children.length) continue
      let own = false
      for (let n = el; n && n !== hero; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && !/, 0\)$/.test(bg)) { own = true; break }
      }
      if (own) continue
      const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom > innerHeight) continue
      const cs = getComputedStyle(el)
      out.push({ t: t.slice(0, 30), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), color: cs.color, size: parseFloat(cs.fontSize), weight: cs.fontWeight })
    }
    return out
  })
  await p.evaluate(() => document.querySelector('.hero-screen').querySelectorAll('h1,p,span,a,li,svg').forEach(e => e.style.visibility = 'hidden'))
  const shot = (await p.screenshot({ clip: { x: 0, y: 0, width: w, height: h } })).toString('base64')
  const res = await p.evaluate(async ({ shot, targets }) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + shot; await img.decode()
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0)
    return targets.map(t => {
      let worst = null, wl = 999
      for (let dx = 0; dx < t.w; dx += Math.max(2, Math.floor(t.w / 26)))for (let dy = 0; dy < t.h; dy += Math.max(2, Math.floor(t.h / 6))) {
        const d = ctx.getImageData(t.x + dx, t.y + dy, 1, 1).data; const L = 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]
        if (L < wl) { wl = L; worst = [d[0], d[1], d[2]] }
      }
      return { ...t, bg: worst }
    })
  }, { shot, targets })
  const fails = []
  for (const r of res) {
    const fg = comp(parse(r.color), r.bg); const [L1, L2] = [lum(fg), lum(r.bg)]
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
    const large = r.size >= 24 || (r.size >= 18.66 && +r.weight >= 700)
    if (ratio < (large ? 3 : 4.5)) fails.push(`  ${ratio.toFixed(2)}:1 ${r.size}px "${r.t}" over rgb(${r.bg})`)
  }
  console.log(`${label}: ${res.length} runs over the photograph   ${fails.length ? 'FAILS:\n' + fails.join('\n') : 'all pass AA'}`)
  await p.close()
}
await b.close()
