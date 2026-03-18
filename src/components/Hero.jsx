import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import MagneticButton from './MagneticButton'
import '../styles/hero.css'

gsap.registerPlugin(SplitText)

export default function Hero() {
  const sectionRef  = useRef(null)
  const imgRef      = useRef(null)
  const eyebrowRef  = useRef(null)
  const headingRef  = useRef(null)
  const subRef      = useRef(null)
  const actionsRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Image cinematic zoom-out
      tl.from(imgRef.current, {
        scale: 1.12,
        duration: 2.2,
        ease: 'power3.out',
      }, 0)

      // 2. Eyebrow fade in
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, 0.5)

      // 3. SplitText heading character-by-character reveal
      const split = new SplitText(headingRef.current, { type: 'chars,words' })
      tl.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.018,
        duration: 0.9,
        ease: 'expo.out',
      }, 0.6)

      // 4. Sub text
      tl.from(subRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
      }, 1.2)

      // 5. Actions
      tl.from(actionsRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.8,
      }, 1.4)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="hero" aria-label="Hero">
      {/* Background image */}
      <div className="hero__media" aria-hidden="true">
        <img
          ref={imgRef}
          src="/images/hero.png"
          alt="Handcrafted walnut dining table in warm workshop light"
          loading="eager"
        />
      </div>

      {/* Gradient overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        <div className="hero__text">
          <div ref={eyebrowRef} className="hero__eyebrow">
            <span className="hero__eyebrow-line" aria-hidden="true" />
            <span className="hero__eyebrow-text caption">
              Est. 1998 &nbsp;·&nbsp; Oxfordshire, England
            </span>
          </div>

          <h1 ref={headingRef} className="hero__heading display-heading">
            The Art of<br />
            <em>Slow</em><br />
            Making
          </h1>

          <div ref={subRef} className="hero__sub">
            <p>
              Bespoke furniture conceived with rare timbers,
              bound by traditional joinery,<br />and finished by hand.
            </p>
          </div>
        </div>

        <div ref={actionsRef} className="hero__actions">
          <MagneticButton variant="light" label="View Gallery" />
          <span className="hero__scroll-hint caption">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  )
}
