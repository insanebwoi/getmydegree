import { chromium } from 'playwright'
const b = await chromium.launch()
for (const [label,w,h] of [['390x844',390,844],['375x812',375,812],['360x740',360,740],['768x1024',768,1024],['1440x900',1440,900]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 })).newPage()
  await p.route('**/*', r => r.request().url().includes('localhost') ? r.continue() : r.abort())
  await p.goto('http://localhost:4502/', { waitUntil: 'load' }); await p.waitForTimeout(1500)
  if (w === 390) await p.screenshot({ path: `${process.argv[2]}/m-full.png` })
  const m = await p.evaluate(() => {
    const hero = document.querySelector('.hero-screen').getBoundingClientRect()
    const img = document.querySelector('.hero-frame').getBoundingClientRect()
    const pips = document.querySelectorAll('.hero-pip').length
    const btn = [...document.querySelectorAll('.btn')].find(e => e.textContent.includes('Book a free'))
    return { hero: Math.round(hero.height), imgPct: Math.round(img.height / hero.height * 100),
             pips, h1: Math.round(parseFloat(getComputedStyle(document.querySelector('h1')).fontSize)),
             ctaBottom: btn ? Math.round(btn.getBoundingClientRect().bottom) : null,
             overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 }
  })
  console.log(`${label}: hero ${m.hero}px (${(m.hero/h).toFixed(2)}× screen) | image covers ${m.imgPct}% | h1 ${m.h1}px | pips ${m.pips} | CTA by ${m.ctaBottom}px ${m.ctaBottom<=h?'✓':'✗'} | overflow ${m.overflow}`)
}
await b.close()
