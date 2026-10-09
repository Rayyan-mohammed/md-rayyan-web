import { gsap, ScrollTrigger, SplitText } from './gsap'
import { fontsReady } from './boot'

// Split `el` into masked lines once fonts are in; re-splits on resize. Returns a cleanup fn.
export function maskLines(el, onSplit) {
  let split = null
  let dead = false
  fontsReady.then(() => {
    if (dead || !el.isConnected) return
    split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        onSplit(self.lines, self)
      },
    })
  })
  return () => {
    dead = true
    split?.revert()
  }
}

// Lines slide up out of their masks the first time the element scrolls into view.
export function splitReveal(el, { start = 'top 88%', stagger = 0.1, duration = 1.25 } = {}) {
  let played = false
  let st = null
  const off = maskLines(el, (lines) => {
    gsap.set(el, { visibility: 'visible' })
    if (played) {
      gsap.set(lines, { yPercent: 0 })
      return
    }
    gsap.set(lines, { yPercent: 115 })
    st?.kill()
    st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        played = true
        gsap.to(lines, { yPercent: 0, duration, stagger, ease: 'expo.out' })
      },
    })
  })
  return () => {
    st?.kill()
    off()
  }
}
