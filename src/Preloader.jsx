import { useEffect, useState } from 'react'
import redWordmark from './assets/IMAGOTIPO TLS25-25.png'

const MIN_DURATION = 1600
const MAX_DURATION = 4500

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const start = performance.now()
    let pageLoaded = document.readyState === 'complete'
    const markLoaded = () => { pageLoaded = true }
    window.addEventListener('load', markLoaded)
    document.documentElement.classList.add('is-preloading')

    let exitTimer
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - start
      const ready = (pageLoaded && elapsed >= MIN_DURATION) || elapsed >= MAX_DURATION
      setProgress((value) => {
        if (ready) return 100
        const target = pageLoaded ? 96 : 82
        return Math.min(target, value + Math.max(0.6, (target - value) * 0.07))
      })
      if (ready) {
        window.clearInterval(timer)
        exitTimer = window.setTimeout(() => {
          setPhase('leaving')
          document.documentElement.classList.remove('is-preloading')
          exitTimer = window.setTimeout(() => setPhase('done'), 900)
        }, 350)
      }
    }, 40)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(exitTimer)
      window.removeEventListener('load', markLoaded)
      document.documentElement.classList.remove('is-preloading')
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`preloader ${phase === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-live="polite" aria-label="Cargando True Love Store">
      <div className="preloader__glow" aria-hidden="true" />
      <div className="preloader__content">
        <div className="preloader__heart" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3.1 1.8-2 3.3-3.1 5.4-3.1 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21Z" /></svg>
        </div>
        <img src={redWordmark} alt="" className="preloader__logo" />
        <p className="preloader__text">Preparando algo especial para ti</p>
        <div className="preloader__bar" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <span className="preloader__percent">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
