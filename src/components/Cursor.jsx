import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // quickTo for silky performance
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.1, ease: 'power3' })
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    /* Expand cursor on interactive elements */
    const expand = () => ring.classList.add('expanded')
    const shrink = () => ring.classList.remove('expanded')

    const targets = document.querySelectorAll('a, button, [data-cursor-hover]')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    window.addEventListener('mousemove', onMove)

    // Re-bind if DOM changes (MutationObserver for dynamically added elements)
    const observer = new MutationObserver(() => {
      const newTargets = document.querySelectorAll('a, button, [data-cursor-hover]')
      newTargets.forEach((el) => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', shrink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
