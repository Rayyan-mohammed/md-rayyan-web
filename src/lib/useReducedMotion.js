import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './gsap'

// Reactive wrapper around prefers-reduced-motion for React branches.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReduced(event.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}
