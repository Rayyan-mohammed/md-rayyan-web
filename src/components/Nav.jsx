import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { navLinks, profile } from '../data/content'
import { startScroll, stopScroll } from '../lib/smooth'
import Magnetic from './ui/Magnetic'
import './Nav.css'

// Colour (data-bg) and the active link are driven from PageEffects as sections pass underneath.
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const lockedRef = useRef(false)

  const closeMenu = useCallback((restoreFocus = true) => {
    if (lockedRef.current) {
      startScroll()
      lockedRef.current = false
    }
    setMenuOpen(false)
    if (restoreFocus) {
      requestAnimationFrame(() => {
        if (toggleRef.current?.offsetParent !== null) toggleRef.current.focus()
      })
    }
  }, [])

  // lock scrolling, trap focus and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return

    stopScroll()
    lockedRef.current = true
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    metaTheme?.setAttribute('content', '#080705')

    const behind = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean)
    const wasInert = behind.map((el) => el.inert)
    behind.forEach((el) => {
      el.inert = true
    })

    const focusFrame = requestAnimationFrame(() => {
      menuRef.current?.querySelector('.nav__mobile-link')?.focus()
    })

    const focusables = () => {
      const items = []
      if (toggleRef.current) items.push(toggleRef.current)
      items.push(...(menuRef.current?.querySelectorAll('a[href], button:not([disabled])') || []))
      return items
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      behind.forEach((el, i) => {
        el.inert = wasInert[i]
      })
      const navBg = document.querySelector('.nav')?.dataset.bg
      metaTheme?.setAttribute('content', navBg === 'light' ? '#efe9db' : '#0a0a0a')
      if (lockedRef.current) {
        startScroll()
        lockedRef.current = false
      }
    }
  }, [menuOpen, closeMenu])

  // if the viewport grows past the mobile breakpoint the overlay would otherwise be orphaned
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = () => {
      if (mq.matches) closeMenu(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [closeMenu])

  return (
    <header className={`nav ${menuOpen ? 'nav--open' : ''}`} data-bg="dark">
      <div className="nav__bar">
        <a href="#hero" className="nav__logo" onClick={() => closeMenu(false)}>
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
            ref={toggleRef}
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            aria-haspopup="dialog"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__progress" aria-hidden="true">
        <i />
      </div>

      {menuOpen &&
        createPortal(
          <div
            id="nav-mobile-menu"
            className="nav__mobile"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {[...navLinks, { id: 'contact', label: 'Contact' }].map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav__mobile-link"
                style={{ '--i': i }}
                onClick={() => closeMenu(false)}
              >
                <span className="mono nav__mobile-number">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            ))}
          </div>,
          document.body
        )}
    </header>
  )
}
