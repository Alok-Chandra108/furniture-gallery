import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import '../styles/testimonial.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Testimonial() {
  const sectionRef = useRef(null)
  const quoteRef   = useRef(null)
  const attrRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split quote by words and stagger in
      const split = new SplitText(quoteRef.current, { type: 'words', wordsClass: 'quote-word' })
      gsap.from(split.words, {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 78%',
        },
      })

      // Attribution
      gsap.from(attrRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: attrRef.current,
          start: 'top 84%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="testimonial" aria-label="Client Testimonial">
      <blockquote>
        <p ref={quoteRef} className="testimonial__quote">
          "I have bought many fine things in my life. Sanjay's table is the first
          one that made me catch my breath. It is not furniture — it is a part
          of the family before anyone has sat down."
        </p>
        <footer ref={attrRef} className="testimonial__attribution">
          <div className="testimonial__attribution-line" aria-hidden="true" />
          <cite className="testimonial__name display-heading">
            Lady Catherine Moorfield
          </cite>
          <p className="testimonial__title caption">
            The Ashton Dining Table · Commissioned 2023
          </p>
        </footer>
      </blockquote>
    </section>
  )
}
