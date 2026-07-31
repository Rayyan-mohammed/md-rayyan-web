import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

const INTERACTIVE_SELECTOR = 'a, button, .magnetic, [data-cursor-hover]'
const IDLE_SIZE = 26
const PAD = 10

function labelFor(el) {
  const text = el.innerText?.trim().replace(/\s+/g, ' ')
  if (text) return text.slice(0, 22).toUpperCase()
  const aria = el.getAttribute?.('aria-label')
  if (aria) return aria.slice(0, 22).toUpperCase()
  return el.tagName
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [box, setBox] = useState({ w: IDLE_SIZE, h: IDLE_SIZE, active: false })
  const [label, setLabel] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [pressed, setPressed] = useState(false)

  // precise dot: follows the raw pointer, no smoothing
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  // reticle box: springs toward either the pointer (idle) or a locked element (hover)
  const boxX = useMotionValue(-100)
  const boxY = useMotionValue(-100)
  const springConf = { damping: 24, stiffness: 320, mass: 0.5 }
  const rx = useSpring(boxX, springConf)
  const ry = useSpring(boxY, springConf)
  const rw = useSpring(useMotionValue(IDLE_SIZE), { damping: 26, stiffness: 260 })
  const rh = useSpring(useMotionValue(IDLE_SIZE), { damping: 26, stiffness: 260 })

  const lockedRef = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    rw.set(box.w)
    rh.set(box.h)
  }, [box.w, box.h, rw, rh])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!lockedRef.current) {
          boxX.set(e.clientX)
          boxY.set(e.clientY)
        }
      })
    }

    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE_SELECTOR)
      if (!el) return
      const rect = el.getBoundingClientRect()
      lockedRef.current = true
      boxX.set(rect.left + rect.width / 2)
      boxY.set(rect.top + rect.height / 2)
      setBox({ w: rect.width + PAD * 2, h: rect.height + PAD * 2, active: true })
      setLabel(labelFor(el))
      setConfidence(93 + Math.random() * 6.8)
    }

    const onOut = (e) => {
      const el = e.target.closest?.(INTERACTIVE_SELECTOR)
      if (!el) return
      lockedRef.current = false
      boxX.set(dotX.get())
      boxY.set(dotY.get())
      setBox({ w: IDLE_SIZE, h: IDLE_SIZE, active: false })
      setLabel('')
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, dotX, dotY, boxX, boxY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="cv-cursor-dot"
        style={{ translateX: dotX, translateY: dotY }}
        animate={{ scale: pressed ? 0.5 : box.active ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />

      <motion.div
        className={`cv-reticle ${box.active ? 'cv-reticle--active' : ''} ${pressed ? 'cv-reticle--pressed' : ''}`}
        style={{ translateX: rx, translateY: ry, width: rw, height: rh, x: '-50%', y: '-50%' }}
      >
        <span className="cv-reticle__corner cv-reticle__corner--tl" />
        <span className="cv-reticle__corner cv-reticle__corner--tr" />
        <span className="cv-reticle__corner cv-reticle__corner--bl" />
        <span className="cv-reticle__corner cv-reticle__corner--br" />

        {box.active && (
          <motion.div
            className="cv-reticle__tag mono"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span className="cv-reticle__tag-label">{label}</span>
            <span className="cv-reticle__tag-conf">{confidence.toFixed(1)}%</span>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
