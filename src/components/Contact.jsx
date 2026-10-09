import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const clock = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function useLocalTime() {
  const [time, setTime] = useState(() => clock.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(clock.format(new Date())), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const time = useLocalTime()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable, nothing to do
    }
  }

  return (
    <section id="contact" className="contact theme-light" data-bg="light">
      <div className="container">
        <span className="eyebrow mono" data-reveal>
          06 Contact
        </span>
        <h2 className="contact__title" data-split>
          Let&apos;s build something worth shipping.
        </h2>

        <div className="contact__links" data-reveal>
          <a href={`mailto:${profile.email}`} className="contact__big contact__mail">
            <span>{profile.email}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
          <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className="contact__big contact__tel">
            <span>{profile.phone}</span>
          </a>
        </div>

        <div className="contact__row">
          <div className="contact__note" data-reveal>
            <p className="contact__status mono">
              <span className="contact__dot" /> Open to internships, collaborations and research
            </p>
            <p className="contact__time mono">
              Hyderabad, IN · <time>{time}</time> IST
            </p>
          </div>

          <div className="contact__socials" data-reveal>
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
            <Magnetic as="button" className="contact__social contact__copy mono" onClick={handleCopy}>
              Copy email
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
          </div>
        </div>
      </div>
    </section>
  )
}
