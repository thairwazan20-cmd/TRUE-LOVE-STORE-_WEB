import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'

const occasions = [
  { value: 'best-sellers', label: 'Más vendidos' },
  { value: 'anniversaries', label: 'Aniversarios' },
  { value: 'birthdays', label: 'Cumpleaños' },
  { value: 'mothers-day', label: 'Día de la madre' },
  { value: 'fathers-day', label: 'Día del padre' },
  { value: 'christmas', label: 'Navidad' },
  { value: 'other', label: 'Otros' },
]

const occasionCategories = {
  anniversaries: ['Photobooks & Fotolibros', 'Cuadros con Realidad Aumentada', 'Packs & Special Boxes', 'Scrapbooks & Agendas'],
  birthdays: ['Photobooks & Fotolibros', 'Cuadros con Realidad Aumentada', 'Álbumes de Figuritas', 'Packs & Special Boxes', 'Scrapbooks & Agendas'],
  'mothers-day': ['Photobooks & Fotolibros', 'Cuadros con Realidad Aumentada', 'Packs & Special Boxes', 'Scrapbooks & Agendas'],
  'fathers-day': ['Photobooks & Fotolibros', 'Cuadros con Realidad Aumentada', 'Álbumes de Figuritas', 'Packs & Special Boxes', 'Scrapbooks & Agendas'],
  christmas: ['Photobooks & Fotolibros', 'Cuadros con Realidad Aumentada', 'Álbumes de Figuritas', 'Packs & Special Boxes', 'Scrapbooks & Agendas'],
  other: ['Photobooks & Fotolibros', 'Cuadros con Realidad Aumentada', 'Álbumes de Figuritas', 'Packs & Special Boxes', 'Scrapbooks & Agendas'],
}

const collectionDescriptions = {
  'Photobooks & Fotolibros': 'Diseñamos tus fotografías como un libro para volver a tus momentos favoritos. Elige el formato y crea una edición a tu medida.',
  'Cuadros con Realidad Aumentada': 'Convierte una foto especial en una pieza para tu hogar. Explora diseños personalizados y distintos tamaños.',
  'Álbumes de Figuritas': 'Un álbum personal para reunir personas, recuerdos y pequeños detalles en una sola historia.',
  'Packs & Special Boxes': 'Encuentra una caja personalizada para sorprender, celebrar y hacer que el momento de abrirla sea inolvidable.',
  'Scrapbooks & Agendas': 'Organiza tus ideas o crea un álbum de experiencias con papelería pensada para acompañarte.',
  Otros: 'Descubre álbumes de figuritas y cajas de regalo para sorprender en cualquier ocasión.',
  Scrapbook: 'Crea un álbum de recuerdos y experiencias para conservar esos momentos que quieres volver a vivir.',
  Cuadernos: 'Cuadernos y planificadores personalizados para organizar tus ideas, metas y días especiales.',
}

const otherCategories = ['Álbumes de Figuritas', 'Packs & Special Boxes']

const matchesCollection = (product, selectedCategory) => {
  if (selectedCategory === 'Otros') return otherCategories.includes(product.category)
  if (selectedCategory === 'Scrapbook') return product.id === 'scrapbook-100'
  if (selectedCategory === 'Cuadernos') return ['agenda-diaria', 'planner'].includes(product.id)
  return product.category === selectedCategory
}

export default function CatalogGrid({ products, selectedCategory, searchTerm, setSearchTerm, wishlist, onToggleWishlist, onQuickView, onAddToCart, onBack }) {
  const [selectedOccasion, setSelectedOccasion] = useState('best-sellers')
  const visibleProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('es')
    const result = products.filter((product) => {
      const categoryMatches = matchesCollection(product, selectedCategory)
      const textMatches = !query || `${product.title} ${product.category}`.toLocaleLowerCase('es').includes(query)
      const occasionMatches = selectedOccasion === 'best-sellers'
        || occasionCategories[selectedOccasion]?.includes(product.category)
      return categoryMatches && textMatches && occasionMatches
    })
    if (selectedOccasion === 'best-sellers') {
      const bestSellerScore = (product) => product.badge === 'Más vendido' ? 2 : ['Favorito', 'Premium'].includes(product.badge) ? 1 : 0
      return [...result].sort((a, b) => bestSellerScore(b) - bestSellerScore(a))
    }
    return result
  }, [products, searchTerm, selectedCategory, selectedOccasion])

  const collectionImages = products.filter((product) => matchesCollection(product, selectedCategory)).slice(0, 3)

  const clearFilters = () => {
    setSelectedOccasion('best-sellers')
    setSearchTerm('')
  }

  return (
    <section className="mx-auto min-h-[70vh] max-w-[1600px] scroll-mt-8 px-5 pb-20 pt-48 sm:px-8 lg:px-12 lg:pb-24 lg:pt-36" id="catalog">
      <div className="collection-intro">
        <div className="collection-intro__collage" aria-label={`Fotografías de ${selectedCategory}`}>
          {collectionImages.map((product, index) => <img key={product.id} className={index === 0 ? 'collection-intro__image-main' : 'collection-intro__image-small'} src={product.image} alt={index === 0 ? product.title : ''} />)}
        </div>
        <div className="collection-intro__copy">
          <button type="button" onClick={onBack} className="collection-intro__back">← Volver a categorías</button>
          <p className="collection-intro__eyebrow">TLS REGALOS PERÚ · COLECCIÓN</p>
          <h1>{selectedCategory}</h1>
          <p className="collection-intro__description">{collectionDescriptions[selectedCategory]}</p>
          <button type="button" className="collection-intro__cta" onClick={() => document.getElementById('collection-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explorar diseños <span aria-hidden="true">↓</span></button>
        </div>
      </div>
      <div className="collection-products-heading" id="collection-products">
        <div><p className="collection-intro__eyebrow">PIEZAS PERSONALIZADAS</p><h2>{selectedCategory}</h2></div>
        <p>Diseños seleccionados para crear un regalo único.</p>
      </div>
      <div className="mb-6 flex flex-col gap-4 border-b border-[#EAE2DA] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-xs text-[#666]">{visibleProducts.length} productos</p>
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor="occasion-filter" className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#777]">Elegir ocasión<select id="occasion-filter" value={selectedOccasion} onChange={(event) => setSelectedOccasion(event.target.value)} className="rounded-full border border-[#E2E2E2] bg-white px-4 py-2.5 text-xs normal-case tracking-normal text-[#1A1A1A] outline-none focus:border-[#E30613]">{occasions.map((occasion) => <option key={occasion.value} value={occasion.value}>{occasion.label}</option>)}</select></label>
          {(searchTerm || selectedOccasion !== 'best-sellers') && <button type="button" onClick={clearFilters} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E30613]">Limpiar filtros</button>}
        </div>
      </div>
      {visibleProducts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} isWishlisted={wishlist.some((item) => item.id === product.id)} onToggleWishlist={onToggleWishlist} onQuickView={onQuickView} onAddToCart={onAddToCart} />)}</div> : <div className="rounded-xl border border-[#E2E2E2] bg-white p-12 text-center"><h3 className="font-display text-3xl">No encontramos ese regalo</h3><p className="mt-2 text-sm text-[#666]">Ajusta los filtros para ver más opciones.</p><button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-[#FFAFD4] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#E30613]">Limpiar filtros</button></div>}
    </section>
  )
}