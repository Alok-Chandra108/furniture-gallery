import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import '../styles/collection.css'

gsap.registerPlugin(ScrollTrigger)

const pieces = [
  {
    name: 'Wharton Cabinet',
    meta: 'White Oak',
    price: 'Price on commission',
    img: '/images/gallery-1.png',
    alt: 'White oak Wharton cabinet',
  },
  {
    name: 'Cheswick Armchair',
    meta: 'Oak & Cognac Leather',
    price: 'Price on commission',
    img: '/images/gallery-3.png',
    alt: 'Cheswick armchair in cognac leather',
  },
  {
    name: 'Sable Sideboard',
    meta: 'Ebonized Ash',
    price: 'Price on commission',
    img: '/images/gallery-6.png',
    alt: 'Ebonized ash Sable sideboard',
  },
]

export default function Collection() {
  const sectionRef = useRef(null)
  const heroImgRef = useRef(null)
  const headerRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image subtle parallax
      gsap.fromTo(
        heroImgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      // Header text stagger
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="collection" ref={sectionRef} className="collection" aria-label="The Collection">
      {/* Header */}
      <div ref={headerRef} className="collection__header">
        <h2 className="collection__heading display-heading">
          The <em>Signature</em><br />Collection
        </h2>
        <p className="collection__intro body-text">
          A curated selection of Sanjay's most celebrated works. Each piece is
          available for commission in your choice of timber, leather, and
          brass — made entirely to order, never replicated exactly.
        </p>
      </div>

      {/* Hero full-width image */}
      <div className="collection__hero-img">
        <img
          ref={heroImgRef}
          src="/images/gallery-2.png"
          alt="Ashton Dining Table in sunlit showroom"
          loading="lazy"
        />
      </div>

      {/* Three pieces */}
      <div className="collection__pieces">
        {pieces.map((p) => (
          <article key={p.name} className="collection__piece">
            <div className="collection__piece-img">
              <img src={p.img} alt={p.alt} loading="lazy" />
            </div>
            <h3 className="collection__piece-name display-heading">{p.name}</h3>
            <div className="collection__piece-meta">
              <span className="caption">{p.meta}</span>
              <span className="collection__piece-price caption">{p.price}</span>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: '48px', display:'flex', justifyContent:'center' }}>
        <MagneticButton
          variant="dark"
          label="Begin a Commission"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
        />
      </div>
    </section>
  )
}
