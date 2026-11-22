import { createElement, useEffect, useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../../lib/gsap'

// Wraps interactive children with a magnetic-pull hover effect.
export default function Magnetic({ children, strength = 0.35, className = '', as = 'div', ...props }) {
  const ref = useRef(null)
  const motion = useRef({ x: null, y: null })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    motion.current.x = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    motion.current.y = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
    return () => gsap.killTweensOf(el)
  }, [])

  const handleMove = (e) => {
    const el = ref.current
    if (!el || !isFinePointer() || prefersReducedMotion()) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    motion.current.x?.(relX * strength)
    motion.current.y?.(relY * strength)
  }

  const reset = () => {
    motion.current.x?.(0)
    motion.current.y?.(0)
  }

  return createElement(
    as,
    {
      ...props,
      ref,
      className: `magnetic ${className}`,
      onMouseMove: handleMove,
      onMouseLeave: reset,
    },
    children
  )
}
