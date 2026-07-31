import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { heroMetrics, heroTerminalLines, heroConfusion } from '../../data/content'
import './HeroCards.css'

function MetricsCard() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroMetrics.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="hcard hcard--metrics card"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="hcard__label mono">live_metrics.json</div>
      <div className="hcard__metric-value mono">{heroMetrics[active].value}</div>
      <div className="hcard__metric-name">{heroMetrics[active].label}</div>
      <div className="hcard__dots">
        {heroMetrics.map((m, i) => (
          <span key={m.label} className={`hcard__dot ${i === active ? 'hcard__dot--active' : ''}`} />
        ))}
      </div>
    </motion.div>
  )
}

function TerminalCard() {
  const [shown, setShown] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const timers = heroTerminalLines.map((line, i) =>
      setTimeout(() => setShown(i + 1), line.delay + 200)
    )
    const loop = setTimeout(() => {
      setShown(0)
      setCycle((c) => c + 1)
    }, 5200)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(loop)
    }
  }, [cycle])

  return (
    <motion.div
      className="hcard hcard--terminal card mono"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
    >
      <div className="hcard__dots-row">
        <span className="hcard__tl" />
        <span className="hcard__tl" />
        <span className="hcard__tl" />
      </div>
      <div className="hcard__term-body">
        {heroTerminalLines.slice(0, shown).map((line, i) => (
          <div key={i} className={`hcard__term-line ${line.done ? 'hcard__term-line--done' : ''}`}>
            {line.text}
          </div>
        ))}
        <span className="hcard__cursor" />
      </div>
    </motion.div>
  )
}

function DiagramCard() {
  const { tp, fp, fn, tn } = heroConfusion
  return (
    <motion.div
      className="hcard hcard--diagram card"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
    >
      <div className="hcard__label mono">confusion_matrix</div>
      <div className="hcard__matrix">
        <div className="hcard__cell hcard__cell--pos">
          <span className="mono">{tp}</span>
          <small>TP</small>
        </div>
        <div className="hcard__cell">
          <span className="mono">{fp}</span>
          <small>FP</small>
        </div>
        <div className="hcard__cell">
          <span className="mono">{fn}</span>
          <small>FN</small>
        </div>
        <div className="hcard__cell hcard__cell--pos">
          <span className="mono">{tn}</span>
          <small>TN</small>
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroCards() {
  return (
    <div className="hero-cards">
      <MetricsCard />
      <TerminalCard />
      <DiagramCard />
    </div>
  )
}
