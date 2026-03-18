import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/gallery.css'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { id: 1, src: '/images/gallery-1.png', name: 'Wharton Cabinet', meta: 'White Oak · 2024' },
  { id: 2, src: '/images/gallery-2.png', name: 'Ashton Dining Table', meta: 'Walnut · 2023' },
  { id: 3, src: '/images/gallery-3.png', name: 'Cheswick Armchair', meta: 'Oak & Leather · 2024' },
  { id: 4, src: '/images/gallery-4.png', name: 'Mortise Detail', meta: 'Joinery Study · 2022' },
  { id: 5, src: '/images/gallery-5.png', name: 'Briar Side Tables', meta: 'Cherry · 2023' },
  { id: 6, src: '/images/gallery-6.png', name: 'Sable Sideboard', meta: 'Ebonized Ash · 2024' },
  { id: 7, src: '/images/manifesto.png', name: 'The Maker\'s Hand', meta: 'Archive · 2020' },
  { id: 8, src: '/images/gallery-5.png', name: 'Fernshaw Chair', meta: 'English Oak · 2022' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const itemRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, i) => {
        if (!item) return

        const reveal   = item.querySelector('.gallery__reveal')
        const imgInner = item.querySelector('.gallery__img-inner')

        if (!reveal || !imgInner) return

        // Stagger each reveal slightly differently for organic feel
        const delay = (i % 3) * 0.12

        // Clip-path reveal — scale overlay from bottom to top
        gsap.to(reveal, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 1.2,
          ease: 'expo.inOut',
          delay,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        })

        // Inner parallax
        gsap.fromTo(
          imgInner,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="gallery" aria-label="Gallery">
      {/* Header */}
      <div className="gallery__header">
        <h2 className="gallery__heading display-heading">
          Selected<br /><em style={{fontStyle:'italic', color:'var(--accent)'}}>Works</em>
        </h2>
        <span className="gallery__count caption">
          {String(items.length).padStart(2, '0')} Pieces
        </span>
      </div>

      {/* Grid */}
      <div className="gallery__grid">
        {items.map((item, i) => (
          <article
            key={item.id}
            ref={(el) => (itemRefs.current[i] = el)}
            className={`gallery__item gallery__item--${i + 1}`}
            aria-label={item.name}
          >
            {/* Clip-path reveal overlay */}
            <div className="gallery__reveal" aria-hidden="true" />

            {/* Parallax image container */}
            <div className="gallery__img-inner">
              <img
                src={item.src}
                alt={item.name}
                loading="lazy"
              />
            </div>

            {/* Caption — appears on hover via CSS */}
            <div className="gallery__caption">
              <span className="gallery__caption-name">{item.name}</span>
              <span className="gallery__caption-meta caption">{item.meta}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
