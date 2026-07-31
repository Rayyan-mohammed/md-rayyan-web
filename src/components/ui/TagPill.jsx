import { motion } from 'framer-motion'

export default function TagPill({ children, delay = 0 }) {
  return (
    <motion.span
      className="chip"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}
