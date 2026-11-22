import { useEffect, useRef, useState } from 'react'
import Magnetic from './ui/Magnetic'
import { IconGithub, IconLinkedin, IconMail, IconBadge } from './ui/Icons'
import { labels, profile, sectionNumbers } from '../data/content'
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
  const [copyStatus, setCopyStatus] = useState('idle')
  const timer = useRef(null)
  const time = useLocalTime()

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    let status = 'copied'
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      status = 'failed'
    }
    setCopyStatus(status)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyStatus('idle'), 2200)
  }

  return (
    <section id="contact" className="contact theme-light" data-bg="light">
      <div className="container">
        <span className="eyebrow mono" data-reveal>
          {sectionNumbers.contact} {labels.contact}
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
              <span className="contact__dot" /> {labels.contactStatus}
            </p>
            <p className="contact__time mono">
              {profile.location} · <time>{time}</time> IST
            </p>
          </div>

          <div className="contact__socials" data-reveal>
            {socials.map(({ label, href, Icon }) => {
              const external = href.startsWith('http')
              return (
                <Magnetic
                  key={label}
                  as="a"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="contact__social mono"
                >
                  <Icon /> {label}
                </Magnetic>
              )
            })}
            <span className="contact__copy-wrap">
              <Magnetic as="button" className="contact__social contact__copy mono" onClick={handleCopy}>
                Copy email
              </Magnetic>
              {copyStatus !== 'idle' && (
                <span className="contact__toast mono" role="status" aria-atomic="true">
                  {copyStatus === 'copied' ? 'Copied ✓' : 'Copy failed'}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
