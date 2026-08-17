import { chromium } from 'playwright'
import { mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

/* Renders scene.html to a PNG sequence by seeking the GSAP timeline
   frame by frame. Seeking beats real-time capture: every frame lands
   exactly where it should regardless of how slow the render is, so the
   output is deterministic and reproducible. */

const here = dirname(fileURLToPath(import.meta.url))
const FPS = 24
const OUT = resolve(here, 'frames')
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
p.on('pageerror', (e) => console.error('PAGEERROR', e.message))
await p.goto('file://' + resolve(here, 'scene.html'))
await p.waitForFunction(() => !!window.__tl)
// Returning the FontFaceSet itself is unserialisable and hangs the call.
await p.evaluate(() => document.fonts.ready.then(() => true))

const dur = await p.evaluate(() => window.__dur)
const total = Math.floor(dur * FPS)
console.log(`duración ${dur}s · ${total} cuadros @ ${FPS}fps`)

for (let f = 0; f < total; f++) {
  // Braces matter: time() returns the timeline, and serialising that hangs.
  await p.evaluate((t) => {
    window.__tl.time(t)
  }, f / FPS)
  await p.screenshot({
    path: `${OUT}/f${String(f).padStart(5, '0')}.jpg`,
    type: 'jpeg',
    quality: 92,
    clip: { x: 0, y: 0, width: 1280, height: 720 },
  })
  if (f % 200 === 0) console.log(`  ${f}/${total}`)
}
console.log(`\n${total} cuadros listos`)
await b.close()
