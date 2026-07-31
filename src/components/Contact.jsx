import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import Magnetic from './ui/Magnetic'
import { IconGithub, IconLinkedin, IconMail, IconBadge } from './ui/Icons'
import { profile } from '../data/content'
import './Contact.css'

const socials = [
  { label: 'GitHub', href: profile.github, Icon: IconGithub },
  { label: 'LinkedIn', href: profile.linkedin, Icon: IconLinkedin },
  { label: 'Credly', href: profile.credly, Icon: IconBadge },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: IconMail },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <SectionWrapper id="contact" number="06" title="Contact">
      <motion.h3
        className="contact__cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Let&apos;s build <em className="grad-text">something</em> together.
      </motion.h3>

      <motion.p
        className="contact__subtext"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        Open to opportunities, collaborations, research, and interesting problems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Magnetic as="button" className="contact__email mono" onClick={handleCopy}>
          {profile.email}
          <AnimatePresence>
            {copied && (
              <motion.span
                className="contact__toast mono"
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                Copied ✓
              </motion.span>
            )}
          </AnimatePresence>
        </Magnetic>
      </motion.div>

      <motion.div
        className="contact__socials"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {socials.map(({ label, href, Icon }) => (
          <Magnetic
            key={label}
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social mono"
          >
            <Icon /> {label}
          </Magnetic>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
