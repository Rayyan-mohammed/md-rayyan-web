import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis = null
let tick = null

export const getLenis = () => lenis

export function initSmooth() {
  if (lenis || prefersReducedMotion()) return
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
}

export function destroySmooth() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
  tick = null
}

export function stopScroll() {
  lenis?.stop()
  if (!lenis) document.documentElement.style.overflow = 'hidden'
}

export function startScroll() {
  lenis?.start()
  document.documentElement.style.overflow = ''
}

export function scrollToTarget(target, opts = {}) {
  const duration = opts.duration ?? 1.7
  if (lenis) {
    lenis.scrollTo(target, { duration, offset: opts.offset ?? 0, easing: (t) => 1 - Math.pow(1 - t, 4) })
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (typeof target === 'number') window.scrollTo(0, target)
    else el?.scrollIntoView()
  }
}
