import { profile } from '../data/content'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner mono">
        <span>© {new Date().getFullYear()} {profile.name}. Crafted with intention.</span>
        <a href="#hero">Back to top ↑</a>
      </div>
    </footer>
  )
}
