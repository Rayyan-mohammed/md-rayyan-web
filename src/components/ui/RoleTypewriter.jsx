import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../lib/useReducedMotion'
import './RoleTypewriter.css'

const TYPE_SPEED = 55
const DELETE_SPEED = 32
const HOLD_MS = 1500
const BLANK_MS = 400

export default function RoleTypewriter({ roles }) {
  const reduced = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState(() => (reduced ? roles[0] : ''))
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (reduced) {
      setRoleIndex(0)
      setText(roles[0])
      setPhase('typing')
      return
    }

    const current = roles[roleIndex]
    let timer

    if (phase === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED)
      } else {
        timer = setTimeout(() => setPhase('deleting'), HOLD_MS)
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED)
      } else {
        timer = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length)
          setPhase('typing')
        }, BLANK_MS)
      }
    }

    return () => clearTimeout(timer)
  }, [text, phase, roleIndex, roles, reduced])

  return (
    <p className="role-typewriter mono">
      <span className="role-typewriter__dash">—</span>
      <span className="role-typewriter__text">{text}</span>
      <span className="role-typewriter__cursor" aria-hidden="true" />
    </p>
  )
}
