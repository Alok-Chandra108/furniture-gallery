import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import '../styles/manifesto.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Manifesto() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const bodyRef     = useRef(null)
  const signRef     = useRef(null)
  const imgWrapRef  = useRef(null)
  const imgInnerRef = useRef(null)
  const revealRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Heading SplitText line-by-line ---
      const headSplit = new SplitText(headingRef.current, { type: 'lines', linesClass: 'line-mask' })
      gsap.from(headSplit.lines, {
        y: '110%',
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 82%',
        },
      })

      // --- Body paragraphs line-by-line ---
      const paras = bodyRef.current.querySelectorAll('p')
      paras.forEach((p) => {
        const split = new SplitText(p, { type: 'lines', linesClass: 'line-mask' })
        gsap.from(split.lines, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 86%',
          },
        })
      })

      // --- Signature ---
      gsap.from(signRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: signRef.current,
          start: 'top 88%',
        },
      })

      // --- Image clip-path reveal ---
      gsap.to(revealRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: 'top 75%',
        },
      })

      // --- Image inner parallax ---
      gsap.fromTo(
        imgInnerRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="manifesto" aria-label="About">
      {/* Text column */}
      <div className="manifesto__text">
        <div className="manifesto__label">
          <span className="accent-line" aria-hidden="true" />
          <span className="caption">About the Maker</span>
        </div>

        <h2 ref={headingRef} className="manifesto__heading display-heading">
          Craft that<br />
          outlasts <em>trends</em>
        </h2>

        <div ref={bodyRef} className="manifesto__body">
          <p>
            For over two decades, Sanjay Kumar has worked in silence \u2014 in a
            converted barn on the edge of the Cotswolds, surrounded by hand
            tools, timber shavings, and the unhurried rhythm of the seasons.
            Each piece takes weeks, sometimes months, to complete.
          </p>
          <p>
            He sources only the finest English hardwoods — walnut, oak, and
            cherry from sustainable woodland — and pairs them with hand-stitched
            leathers and patinated brass. No piece is ever rushed. No corner
            is ever hidden from view.
          </p>
          <p>
            What emerges is furniture that carries its maker's fingerprints in
            every carefully-cut mortise, every hand-applied coat of oil. These
            are not objects. They are heirlooms in the making.
          </p>
        </div>

        <div ref={signRef} className="manifesto__signature">
          <span className="manifesto__signature-name">Sanjay Kumar</span>
          <span className="manifesto__signature-title caption">Master Furniture Maker · Oxfordshire</span>
        </div>
      </div>

      {/* Image column */}
      <div ref={imgWrapRef} className="manifesto__image-wrap">
        {/* Reveal overlay */}
        <div ref={revealRef} className="manifesto__image-reveal" aria-hidden="true" />

        {/* Parallax inner */}
        <div ref={imgInnerRef} className="manifesto__image-inner">
          <img
            src="/images/manifesto.png"
            alt="Sanjay Kumar's hands resting on a raw walnut slab"
            loading="lazy"
          />
        </div>

        {/* Year badge */}
        <div className="manifesto__year-badge" aria-hidden="true">
          <span>Est.<br />1998</span>
        </div>
      </div>
    </section>
  )
}
