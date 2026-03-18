import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/process.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Design & Dialogue',
    body: `Every commission begins with a conversation. We listen to how you live, what you need, and what you dream of. Technical drawings follow \u2014 hand-drawn on the same linen paper Sanjay\u2019s mentor used.`,
    img: '/images/process-1.png',
    alt: 'Architectural sketches for a bespoke furniture commission',
  },
  {
    num: '02',
    title: 'Material Selection',
    body: 'We visit the timber yard together. Sanjay hand-selects each plank, matching figure, grain, and colour to the vision. Only British-grown hardwoods — walnut, oak, cherry, ash.',
    img: '/images/process-2.png',
    alt: 'Craftsman selecting a walnut slab at the timber yard',
  },
  {
    num: '03',
    title: 'Joinery & Form',
    body: 'Not a screw or spline of biscuit joint will be found here. Every joint is cut and fitted by hand — through-mortise-and-tenon, hand-cut dovetails, drawbored pegs. The wood breathes; the joint holds.',
    img: '/images/process-3.png',
    alt: 'Craftsman using a hand plane on oak',
  },
  {
    num: '04',
    title: 'Finishing',
    body: 'A finish is not decoration — it is protection, reverence, and warmth. Sanjay uses only pure tung oil, rubbed in thin coats over days. The final surface is buff-polished by hand with beeswax.',
    img: '/images/process-4.png',
    alt: 'Applying oil finish to a walnut surface',
  },
  {
    num: '05',
    title: 'Delivery & Legacy',
    body: 'Each piece is wrapped in blanket and delivered by Sanjay personally. He positions it, levels it, and sits with you a while. Not because protocol demands it — because he wants to see it live.',
    img: '/images/gallery-1.png',
    alt: 'Finished furniture piece in its final home',
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const track   = trackRef.current

      // Only pin-and-scroll on desktop
      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px)', () => {
        const totalScroll = track.scrollWidth - window.innerWidth

        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="process" aria-label="The Making Process">
      {/* Section header */}
      <div className="process__header">
        <div>
          <div className="process__eyebrow">
            <span className="process__eyebrow-line" aria-hidden="true" />
            <span className="process__eyebrow-text caption">How it's made</span>
          </div>
          <h2 className="process__heading display-heading">
            The Five Stages of <em style={{fontStyle:'italic'}}>Making</em>
          </h2>
        </div>
        <span className="process__note caption">Scroll to explore →</span>
      </div>

      {/* Horizontal track */}
      <div className="process__track-wrap" aria-label="Process steps">
        <div ref={trackRef} className="process__track">
          {steps.map((step) => (
            <div key={step.num} className="process__card">
              <div className="process__card-number" aria-hidden="true">
                {step.num}
              </div>
              <h3 className="process__card-title display-heading">{step.title}</h3>
              <p className="process__card-body">{step.body}</p>
              <div className="process__card-image">
                <img src={step.img} alt={step.alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
