import { motion } from 'framer-motion'
import './SignatureLine.css'

const strands = [
  { d: 'M 1180 -40 C 1020 160, 1160 340, 980 430 S 760 560, 900 900', width: 1.4, delay: 0.4, opacity: 1 },
  { d: 'M 1180 -40 C 1300 200, 1080 260, 1260 480 S 1500 640, 1420 900', width: 1, delay: 0.6, opacity: 0.7 },
  { d: 'M 1180 -40 C 1140 90, 1300 120, 1180 260', width: 0.8, delay: 0.5, opacity: 0.55 },
]

// The site's signature moment: a branching flare of gold light drawing itself across the hero.
export default function SignatureLine() {
  return (
    <svg
      className="signature-line"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sig-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1d78c" stopOpacity="0" />
          <stop offset="12%" stopColor="#f1d78c" stopOpacity="1" />
          <stop offset="55%" stopColor="#d4af37" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9c7a1e" stopOpacity="0" />
        </linearGradient>
        <filter id="sig-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="flare-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e4" stopOpacity="1" />
          <stop offset="35%" stopColor="#f1d78c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {strands.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="none"
          stroke="url(#sig-grad)"
          strokeWidth={s.width}
          strokeLinecap="round"
          filter="url(#sig-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: s.opacity }}
          transition={{
            pathLength: { duration: 2, ease: [0.19, 1, 0.22, 1], delay: s.delay },
            opacity: { duration: 0.5, delay: s.delay },
          }}
        />
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 0.75, 1], scale: [0.6, 1.15, 1, 1.06] }}
        transition={{ duration: 2.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        style={{ transformOrigin: '1180px 0px' }}
      >
        <motion.circle
          cx="1180"
          cy="0"
          r="70"
          fill="url(#flare-core)"
          animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.12, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ transformOrigin: '1180px 0px' }}
        />
      </motion.g>
    </svg>
  )
}
