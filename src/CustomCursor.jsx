import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, select, label, [role="button"], .category-tile'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dot = dotRef.current
    const ring = ringRef.current
    if (!finePointer || reducedMotion || !dot || !ring) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let frame

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      frame = window.requestAnimationFrame(render)
    }

    const onMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      dot.classList.add('is-visible')
      ring.classList.add('is-visible')
      const target = event.target instanceof Element ? event.target : null
      const isText = target?.closest('input, textarea')
      const isHover = !isText && target?.closest(INTERACTIVE)
      ring.classList.toggle('is-hover', Boolean(isHover))
      dot.classList.toggle('is-hover', Boolean(isHover))
      ring.classList.toggle('is-text', Boolean(isText))
      dot.classList.toggle('is-text', Boolean(isText))
    }
    const onLeave = () => {
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    frame = window.requestAnimationFrame(render)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3.1 1.8-2 3.3-3.1 5.4-3.1 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21Z" /></svg>
      </div>
    </>
  )
}
