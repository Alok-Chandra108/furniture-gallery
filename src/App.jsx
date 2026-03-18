import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Collection from './components/Collection'
import Testimonial from './components/Testimonial'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Init Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP's ticker
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove()
    }
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Gallery />
        <Process />
        <Collection />
        <Testimonial />
        <Contact />
      </main>
    </>
  )
}
