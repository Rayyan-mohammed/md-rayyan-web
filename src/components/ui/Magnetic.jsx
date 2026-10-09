import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { isFinePointer } from '../../lib/gsap'

// Wraps interactive children with a magnetic-pull hover effect.
export default function Magnetic({ children, strength = 0.35, className = '', as = 'div', ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el || !isFinePointer()) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = motion[as] || motion.div

  return (
    <Comp
      ref={ref}
      className={`magnetic ${className}`}
      style={{ translateX: springX, translateY: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...props}
    >
      {children}
    </Comp>
  )
}
