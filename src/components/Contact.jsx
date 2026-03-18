import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import MagneticButton from './MagneticButton'
import '../styles/contact.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Contact() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const infoRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading SplitText
      const split = new SplitText(headingRef.current, { type: 'lines', linesClass: 'line-mask' })
      gsap.from(split.lines, {
        y: '110%',
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      })

      // Info cards
      gsap.from(infoRef.current.children, {
        opacity: 0,
        y: 24,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact" aria-label="Contact">
      <div className="contact__top">
        {/* Left */}
        <div>
          <h2 ref={headingRef} className="contact__heading display-heading">
            Let's Begin<br /><em>Something</em><br />Lasting
          </h2>
          <p className="contact__sub body-text">
            Each commission starts with a conversation. There's no obligation,
            no hard sell — just a chance to dream together about what might be.
          </p>
          <MagneticButton
            variant="accent"
            label="Begin a Commission"
            onClick={() => window.open('mailto:sanjay@sanjaykumar.design')}
          />
        </div>

        {/* Right — info */}
        <div ref={infoRef} className="contact__info">
          <div className="contact__info-group">
            <p className="contact__info-label caption">Email</p>
            <p className="contact__info-value">
              <a href="mailto:sanjay@sanjaykumar.design">
                sanjay@sanjaykumar.design
              </a>
            </p>
          </div>

          <div className="contact__info-group">
            <p className="contact__info-label caption">Studio</p>
            <p className="contact__info-value">
              The Barn, Ashworth Lane<br />
              Chipping Norton<br />
              Oxfordshire, OX7 3EQ
            </p>
          </div>

          <div className="contact__info-group">
            <p className="contact__info-label caption">Instagram</p>
            <p className="contact__info-value">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                @sanjaykumar
              </a>
            </p>
          </div>

          <div className="contact__info-group">
            <p className="contact__info-label caption">Commissions</p>
            <p className="contact__info-value">
              Currently accepting commissions<br />
              <span style={{ fontSize: '13px', color: 'rgba(250,250,248,0.35)' }}>
                6–8 month lead time
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative watermark */}
      <div className="contact__watermark" aria-hidden="true">
        SANJAY KUMAR
      </div>

      {/* Footer bar */}
      <div className="contact__footer">
        <p className="contact__copyright">
          © {new Date().getFullYear()} Sanjay Kumar Studio. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="contact__footer-nav">
            <li><a href="#work">Work</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#collection">Collection</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
