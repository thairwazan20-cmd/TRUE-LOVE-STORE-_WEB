import { useEffect, useState } from 'react'

const REVEAL_TARGETS = [
  '.monthly-promotions h2',
  '.monthly-promotion',
  '.category-showcase__heading',
  '.category-tile',
  '#catalogo .text-center',
  '#catalogo article',
  '#why-title',
  '[aria-labelledby="why-title"] article',
  '.testimonials-section .text-center',
  '.testimonial-card',
  '.collection-intro',
  '.collection-products-heading',
  'footer > div:first-child > *',
].join(', ')

/** Scroll progress bar, reveal-on-scroll animations and back-to-top button. */
export default function PageEnhancements({ routeKey }) {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
      setShowTop(window.scrollY > window.innerHeight * 0.9)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined

    const cleanupTimers = new Set()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target
        element.classList.add('is-revealed')
        observer.unobserve(element)
        const delay = parseInt(element.style.getPropertyValue('--reveal-delay'), 10) || 0
        // Al terminar, se quitan las clases para que los efectos hover originales sigan intactos.
        const timer = window.setTimeout(() => {
          element.classList.remove('reveal', 'is-revealed')
          element.style.removeProperty('--reveal-delay')
          cleanupTimers.delete(timer)
        }, delay + 850)
        cleanupTimers.add(timer)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    const frame = window.requestAnimationFrame(() => {
      const groups = new Map()
      document.querySelectorAll(REVEAL_TARGETS).forEach((element) => {
        if (element.classList.contains('is-revealed')) return
        const siblings = groups.get(element.parentElement) ?? 0
        groups.set(element.parentElement, siblings + 1)
        element.style.setProperty('--reveal-delay', `${Math.min(siblings, 6) * 70}ms`)
        element.classList.add('reveal')
        observer.observe(element)
      })
    })

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      cleanupTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [routeKey])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      <button
        type="button"
        aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`back-to-top ${showTop ? 'is-visible' : ''}`}
        tabIndex={showTop ? 0 : -1}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
      </button>
    </>
  )
}
