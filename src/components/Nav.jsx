import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, profile } from '../data/content'
import Magnetic from './ui/Magnetic'
import './Nav.css'

// Colour (data-bg) and the active link are driven from PageEffects as sections pass underneath.
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="nav" data-bg="dark">
      <div className="nav__bar">
        <a href="#hero" className="nav__logo" onClick={() => setMenuOpen(false)}>
          <span className="nav__mark">{profile.initials}</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav__link" data-nav={link.id}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <Magnetic as="a" href="#contact" className="nav__cta mono" data-nav="contact">
            Let&apos;s talk
          </Magnetic>
          <button
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__progress" aria-hidden="true">
        <i />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__mobile"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {[...navLinks, { id: 'contact', label: 'Contact' }].map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                className="nav__mobile-link"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mono nav__mobile-number">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
