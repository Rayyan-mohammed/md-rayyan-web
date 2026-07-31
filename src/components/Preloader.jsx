import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content'
import './Preloader.css'

const DURATION = 2000
const SWITCH_AT = 850

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [percent, setPercent] = useState(0)
  const [showName, setShowName] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1)
      setPercent(Math.round(progress * 100))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const switchTimer = setTimeout(() => setShowName(true), SWITCH_AT)
    const timer = setTimeout(() => setVisible(false), DURATION + 150)
    return () => {
      clearTimeout(timer)
      clearTimeout(switchTimer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="preloader__line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          />

          <div className="preloader__mark-wrap">
            <AnimatePresence mode="wait">
              {!showName ? (
                <motion.div
                  key="symbol"
                  className="preloader__mark preloader__mark--symbol mono"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {profile.initials}
                </motion.div>
              ) : (
                <motion.div
                  key="name"
                  className="preloader__mark preloader__mark--name"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {profile.name.toUpperCase()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="preloader__loading mono">Loading — {percent}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
