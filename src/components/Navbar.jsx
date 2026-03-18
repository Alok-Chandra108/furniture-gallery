import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MagneticButton from './MagneticButton'
import '../styles/navbar.css'

const links = ['Work', 'Process', 'Collection', 'About', 'Commissions']

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => {
      const scrolled = window.scrollY > 60
      nav.classList.toggle('scrolled', scrolled)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav ref={navRef} className="navbar" role="navigation" aria-label="Main Navigation">
      <a href="/" className="navbar__logo" aria-label="Sanjay Kumar home">
        <span className="navbar__logo-mark" aria-hidden="true">SK</span>
        <div className="navbar__logo-text">
          <span>Sanjay Kumar</span>
        </div>
      </a>

      <ul className="navbar__nav">
        {links.map((l) => (
          <li key={l}>
            <button
              className="navbar__nav-link"
              onClick={() => scrollTo(l)}
              aria-label={`Navigate to ${l}`}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      <MagneticButton
        variant="light"
        label="Let's Talk"
        onClick={() => scrollTo('contact')}
        className="navbar__cta"
      />
    </nav>
  )
}
