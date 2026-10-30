import { useEffect, useState } from 'react'

const slides = [
  { category: 'Photobooks & Fotolibros', eyebrow: 'FAVORITOS DE LOS CLIENTES', offer: 'RECUERDOS PARA TODA LA VIDA', label: 'Photobook', title: 'Un pedacito de ti, en cada página.', price: 'DESDE S/79', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2200&q=90' },
  { category: 'Cuadros con Realidad Aumentada', eyebrow: 'UN REGALO DIFERENTE', offer: 'PRESENTACIÓN INOLVIDABLE', label: 'Cuadros con Realidad Aumentada', title: 'Más que un cuadro, una experiencia.', price: 'DESDE S/55', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2200&q=90' },
  { category: 'Photobooks & Fotolibros', eyebrow: 'SORPRENDE CON INTENCIÓN', offer: 'PRESENTACIÓN INOLVIDABLE', label: 'Acordeón Book', title: 'El regalo perfecto empieza aquí.', price: 'DESDE S/55', image: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=2200&q=90' },
  { category: 'Scrapbook', eyebrow: 'CREA TU MUNDO DE RECUERDOS', offer: 'DISEÑO PERSONALIZADO', label: 'Scrapbook', title: 'Recuerdos con mucho amor.', price: 'DESDE S/69', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2200&q=90' },
  { category: 'Cuadernos', eyebrow: 'DIFERENTES TEMÁTICAS', offer: 'DISEÑO PERSONALIZADO', label: 'Cuadernos y Agendas', title: 'Un regalo para inspirar su mejor versión', price: 'DESDE S/40', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=2200&q=90' },
]

export default function HeroLanding({ onSelectCategory }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [])

  const changeSlide = (direction) => setActiveIndex((index) => (index + direction + slides.length) % slides.length)

  return (
    <section className="hero-landing relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#1A1A1A] text-white" aria-label="Colecciones destacadas">
      {slides.map((slide, index) => <img key={slide.image} src={slide.image} alt="" aria-hidden="true" className={`hero-landing__image absolute inset-0 z-0 h-full w-full object-cover ${index === activeIndex ? 'is-active' : ''}`} />)}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(15,15,15,0.82)_0%,rgba(15,15,15,0.58)_42%,rgba(15,15,15,0.08)_100%)]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(15,15,15,0.35),transparent_45%)]" />
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-end justify-between gap-8 px-5 pb-24 pt-44 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <div key={activeIndex} className="hero-landing__copy max-w-[760px]">
          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-white/50 bg-black/40 px-3.5 py-1.5 text-[9px] font-semibold uppercase text-white sm:text-[10px]">{activeSlide.eyebrow}</span><span className="rounded-full border border-[#FFB6C1] bg-[#FFB6C1] px-3.5 py-1.5 text-[9px] font-semibold uppercase text-[#1A1A1A] sm:text-[10px]">{activeSlide.offer}</span></div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/90">{activeSlide.label}</p>
          <h1 className="mt-2 max-w-[700px] text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">{activeSlide.title}</h1>
          <p className="mt-4 text-xs font-semibold text-white">{activeSlide.price}</p>
          <div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={() => onSelectCategory(activeSlide.category)} className="rounded-full border border-[#FFB6C1] bg-[#FFB6C1] px-6 py-3.5 text-[10px] font-semibold uppercase text-[#1A1A1A] shadow-lg transition hover:border-white hover:bg-white sm:text-xs">Más productos</button><button type="button" onClick={() => onSelectCategory('Todos')} className="rounded-full border border-white/50 bg-black/40 px-6 py-3.5 text-[10px] font-semibold uppercase text-white transition hover:bg-white/10 sm:text-xs">Comprar ahora</button></div>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-5 pb-2 sm:flex"><div className="flex items-center gap-3"><button type="button" onClick={() => changeSlide(-1)} aria-label="Slide anterior" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/20 text-xl backdrop-blur-md transition hover:bg-white/20">←</button><button type="button" onClick={() => changeSlide(1)} aria-label="Slide siguiente" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/20 text-xl backdrop-blur-md transition hover:bg-white/20">→</button></div><div className="flex items-center gap-3 text-xs font-medium tabular-nums"><span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span><div className="flex w-28 gap-1">{slides.map((slide, index) => <button key={`${slide.category}-${index}`} type="button" aria-label={`Ver colección ${index + 1}`} onClick={() => setActiveIndex(index)} className={`h-1 flex-1 rounded-full transition ${index === activeIndex ? 'bg-[#FFB6C1]' : 'bg-white/40'}`} />)}</div><span className="text-white/60">{String(slides.length).padStart(2, '0')}</span></div></div>
      </div>
      <span className="absolute bottom-7 right-5 z-20 text-[9px] font-medium uppercase tracking-[0.18em] text-white/60 sm:right-8 lg:right-12">Precios y promociones sujetos a confirmación</span>
    </section>
  )
}