import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

const INTERACTIVE_SELECTOR = 'a, button, .magnetic, [data-cursor-hover]'
const IDLE_SIZE = 26
const PAD = 10
const POINTER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 861px)'

function labelFor(el) {
  const text = el.innerText?.trim().replace(/\s+/g, ' ')
  if (text) return text.slice(0, 22).toUpperCase()
  const aria = el.getAttribute?.('aria-label')
  if (aria) return aria.slice(0, 22).toUpperCase()
  return el.tagName
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [pressed, setPressed] = useState(false)

  const dotRef = useRef(null)
  const reticleRef = useRef(null)
  const state = useRef({
    px: -100,
    py: -100,
    bx: -100,
    by: -100,
    tx: -100,
    ty: -100,
    w: IDLE_SIZE,
    h: IDLE_SIZE,
    tw: IDLE_SIZE,
    th: IDLE_SIZE,
    locked: false,
    active: false,
    pressed: false,
  })

  useEffect(() => {
    const mq = window.matchMedia(POINTER_QUERY)
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const s = state.current
    document.body.classList.add('has-custom-cursor')
    s.locked = false
    s.active = false
    s.pressed = false
    s.w = IDLE_SIZE
    s.h = IDLE_SIZE
    s.tw = IDLE_SIZE
    s.th = IDLE_SIZE
    setActive(false)
    setPressed(false)
    setLabel('')
    let raf = 0

    const tick = () => {
      // reticle box eases toward the pointer or the hovered element
      s.bx += (s.tx - s.bx) * 0.22
      s.by += (s.ty - s.by) * 0.22
      s.w += (s.tw - s.w) * 0.24
      s.h += (s.th - s.h) * 0.24

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${s.bx - s.w / 2}px, ${s.by - s.h / 2}px, 0)`
        reticleRef.current.style.width = `${s.w}px`
        reticleRef.current.style.height = `${s.h}px`
      }
      if (dotRef.current) {
        const scale = s.pressed ? 0.5 : s.active ? 0 : 1
        dotRef.current.style.transform = `translate3d(${s.px}px, ${s.py}px, 0) scale(${scale})`
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      s.px = e.clientX
      s.py = e.clientY
      if (!s.locked) {
        s.tx = e.clientX
        s.ty = e.clientY
      }
    }

    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE_SELECTOR)
      if (!el) return
      if (e.relatedTarget && el.contains(e.relatedTarget)) return
      const rect = el.getBoundingClientRect()
      s.locked = true
      s.active = true
      s.tx = rect.left + rect.width / 2
      s.ty = rect.top + rect.height / 2
      s.tw = rect.width + PAD * 2
      s.th = rect.height + PAD * 2
      setActive(true)
      setLabel(labelFor(el))
      setConfidence(93 + Math.random() * 6.8)
    }

    const onOut = (e) => {
      const el = e.target.closest?.(INTERACTIVE_SELECTOR)
      if (!el) return
      if (e.relatedTarget && el.contains(e.relatedTarget)) return
      s.locked = false
      s.active = false
      s.tx = s.px
      s.ty = s.py
      s.tw = IDLE_SIZE
      s.th = IDLE_SIZE
      setActive(false)
      setLabel('')
    }

    const onDown = () => {
      s.pressed = true
      setPressed(true)
    }
    const onUp = () => {
      s.pressed = false
      setPressed(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cv-cursor-dot" aria-hidden="true" />

      <div
        ref={reticleRef}
        className={`cv-reticle ${active ? 'cv-reticle--active' : ''} ${pressed ? 'cv-reticle--pressed' : ''}`}
        aria-hidden="true"
      >
        <span className="cv-reticle__corner cv-reticle__corner--tl" />
        <span className="cv-reticle__corner cv-reticle__corner--tr" />
        <span className="cv-reticle__corner cv-reticle__corner--bl" />
        <span className="cv-reticle__corner cv-reticle__corner--br" />

        {active && (
          <div className="cv-reticle__tag mono">
            <span className="cv-reticle__tag-label">{label}</span>
            <span className="cv-reticle__tag-conf">{confidence.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </>
  )
}
