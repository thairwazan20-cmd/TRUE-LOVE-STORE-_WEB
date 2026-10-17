import { useEffect, useState } from 'react'
import './App.css'
import CartDrawer from './CartDrawer'
import CatalogGrid from './CatalogGrid'
import CategoryShowcase from './CategoryShowcase'
import Footer from './Footer'
import Header from './Header'
import HeroLanding from './HeroLanding'
import PromotionsSection from './PromotionsSection'
import SubscriptionModal from './SubscriptionModal'
import { categories, products, testimonials } from './data/products'

const formatPrice = (value) => `S/ ${Number(value).toFixed(2)}`
const categorySlug = (category) => category.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const categoryFromLocation = () => categories.find((category) => window.location.hash === `#categoria/${categorySlug(category)}`) ?? null

function App() {
  const [activeCategory, setActiveCategory] = useState(categoryFromLocation)
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tls-cart') || '[]')
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(true)
  const [quickProduct, setQuickProduct] = useState(null)
  const [quickVariant, setQuickVariant] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)

  useEffect(() => {
    localStorage.setItem('tls-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const syncCategoryFromHistory = () => {
      const category = categoryFromLocation()
      setActiveCategory(category)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('popstate', syncCategoryFromHistory)
    return () => window.removeEventListener('popstate', syncCategoryFromHistory)
  }, [])

  useEffect(() => {
    let lastScroll = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const current = window.scrollY
        const delta = current - lastScroll
        if (Math.abs(delta) > 3) {
          setHeaderVisible(current < 60 || delta < 0)
          lastScroll = current
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const addToCart = (product, variant = product.variants?.[0] ?? { label: product.variant, price: product.price }) => {
    const key = `${product.id}:${variant.label}`
    setCartItems((items) => {
      const existing = items.find((item) => item.key === key)
      if (existing) {
        return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...items, { key, product, variant: variant.label, price: variant.price, quantity: 1 }]
    })
    setQuickProduct(null)
    setQuickVariant(null)
    setWishlistOpen(false)
    setIsCartOpen(true)
  }

  const changeQuantity = (key, amount) => {
    setCartItems((items) => items
      .map((item) => item.key === key ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  const toggleWishlist = (product) => {
    setWishlist((items) => items.some((item) => item.id === product.id)
      ? items.filter((item) => item.id !== product.id)
      : [...items, product])
  }

  const selectCategory = (category) => {
    if (category === 'Todos') {
      showHome()
      return
    }
    setActiveCategory(category)
    window.history.pushState({}, '', `#categoria/${categorySlug(category)}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showHome = () => {
    setActiveCategory(null)
    window.history.pushState({}, '', '#inicio')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById('product-search')?.focus()
  }

  const openQuickView = (product) => {
    setQuickProduct(product)
    setQuickVariant(product.variants?.[0] ?? { label: product.variant, price: product.price })
  }

  return (
    <div id="top" className="min-h-screen bg-white text-[#1A1A1A]">
      <Header
        catalog={products}
        onSelectCategory={selectCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        headerVisible={headerVisible}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onGoHome={showHome}
      />

      {activeCategory ? (
        <main className="pb-24">
          <CatalogGrid products={products} selectedCategory={activeCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} wishlist={wishlist} onToggleWishlist={toggleWishlist} onQuickView={openQuickView} onAddToCart={addToCart} onBack={showHome} />
        </main>
      ) : (
        <>
          <HeroLanding onSelectCategory={selectCategory} />
          <PromotionsSection products={products} onAddToCart={addToCart} />
          <CategoryShowcase products={products} categories={categories} onSelectCategory={selectCategory} />
          <main className="pb-24">
            <section className="mt-20 border-y border-[#F4B3D1]/70 bg-[#FFF9FC] py-16">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E30613]">Historias felices</p>
            <h2 className="mt-2 font-display text-5xl text-[#1A1A1A]">Lo dicen nuestros clientes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((review) => (
              <a key={review.name} href="https://www.facebook.com/tlsregalosperu/reviews" target="_blank" rel="noreferrer" className="rounded-2xl border border-white bg-white/65 p-6 shadow-[0_12px_35px_rgba(26,26,26,0.05)] backdrop-blur-lg transition hover:-translate-y-1">
                <p className="text-sm tracking-[0.18em] text-[#E30613]" aria-label="5 de 5 estrellas">★★★★★</p>
                <blockquote className="mt-4 text-sm leading-7 text-[#453B40]">“{review.quote}”</blockquote>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]">{review.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#B84869]">{review.occasion}</p>
              </a>
            ))}
          </div>
          <a href="https://www.facebook.com/tlsregalosperu/reviews" target="_blank" rel="noreferrer" className="mx-auto mt-7 block w-fit text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E30613]">Ver reseñas en Facebook ↗</a>
          </section>
          </main>
        </>
      )}

      <Footer />

      <nav aria-label="Navegación móvil" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#F4B3D1]/70 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 shadow-[0_-8px_30px_rgba(26,26,26,0.08)] backdrop-blur-xl md:hidden">
        <a href="#inicio" onClick={(event) => { event.preventDefault(); showHome() }} className="flex flex-col items-center gap-1 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[#5B5550]"><span className="text-lg text-[#E30613]">⌂</span>Inicio</a>
        <button type="button" onClick={focusSearch} className="flex flex-col items-center gap-1 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[#5B5550]"><span className="text-lg text-[#E30613]">⌕</span>Buscar</button>
        <button type="button" onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-1 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[#5B5550]"><span className="text-lg text-[#E30613]">♧</span>Carrito{cartCount > 0 && <span className="absolute left-1/2 top-0 ml-2 flex h-4 min-w-4 -translate-x-1/2 items-center justify-center rounded-full bg-[#F4B3D1] px-1 text-[9px] font-semibold text-[#1A1A1A]">{cartCount}</span>}</button>
        <a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[#5B5550]"><span className="text-lg text-[#E30613]">◉</span>WhatsApp</a>
      </nav>

      <CartDrawer items={cartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={(key) => setCartItems((items) => items.filter((item) => item.key !== key))} />
      <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />

      {quickProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/55 p-4 backdrop-blur-sm" onClick={() => setQuickProduct(null)}>
          <section role="dialog" aria-modal="true" aria-label={`Vista rápida de ${quickProduct.title}`} className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/70 bg-white shadow-[0_30px_90px_rgba(26,26,26,0.25)] md:grid-cols-2" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setQuickProduct(null)} aria-label="Cerrar vista rápida" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl shadow">×</button>
            <img src={quickProduct.image} alt={quickProduct.title} className="h-72 w-full object-cover md:h-full md:min-h-[420px]" />
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E30613]">{quickProduct.category}</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">{quickProduct.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#666]">Una pieza personalizada, preparada con acabados de alta calidad para convertir tus recuerdos en un regalo duradero.</p>
              <label className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77685D]">Presentación / tamaño
                <select value={quickVariant?.label ?? ''} onChange={(event) => setQuickVariant((quickProduct.variants ?? [{ label: quickProduct.variant, price: quickProduct.price }]).find((variant) => variant.label === event.target.value))} className="mt-2 block w-full rounded-xl border border-[#E5DCD3] bg-white px-3 py-3 text-sm normal-case tracking-normal text-[#1A1A1A]">
                  {(quickProduct.variants ?? [{ label: quickProduct.variant, price: quickProduct.price }]).map((variant) => <option key={variant.label} value={variant.label}>{variant.label} · {formatPrice(variant.price)}</option>)}
                </select>
              </label>
              <p className="mt-5 text-2xl font-semibold text-[#E30613]">{formatPrice(quickVariant?.price ?? quickProduct.price)}</p>
              <button type="button" onClick={() => addToCart(quickProduct, quickVariant)} className="mt-5 rounded-full bg-[#F4B3D1] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] transition hover:bg-[#ED91BB]">Añadir al carrito</button>
            </div>
          </section>
        </div>
      )}

      {wishlistOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/50 p-4" onClick={() => setWishlistOpen(false)}>
          <section role="dialog" aria-modal="true" aria-label="Lista de deseos" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-4xl">Tus favoritos</h2><button type="button" onClick={() => setWishlistOpen(false)} aria-label="Cerrar favoritos" className="text-2xl">×</button></div>
            {wishlist.length ? <div className="mt-5 space-y-3">{wishlist.map((product) => <div key={product.id} className="flex items-center gap-3 border-b border-[#EEE6DF] pb-3"><img src={product.image} alt="" className="h-14 w-14 rounded-lg object-cover" /><p className="flex-1 text-sm font-medium">{product.title}</p><button type="button" onClick={() => addToCart(product)} className="text-xs font-semibold text-[#E30613]">Añadir</button></div>)}</div> : <p className="mt-6 text-sm text-[#666]">Aún no tienes productos guardados. Pulsa el corazón en un producto para guardarlo.</p>}
          </section>
        </div>
      )}

      {accountOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/50 p-4" onClick={() => setAccountOpen(false)}>
          <section role="dialog" aria-modal="true" aria-label="Atención al cliente" className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setAccountOpen(false)} aria-label="Cerrar" className="float-right text-2xl">×</button>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E30613]">Atención TLS</p>
            <h2 className="mt-2 font-display text-4xl">Estamos para ayudarte</h2>
            <p className="mt-3 text-sm leading-6 text-[#666]">Escríbenos para consultar pedidos, personalización o envíos a todo el Perú.</p>
            <a href="https://wa.me/51960985082?text=Hola,%20necesito%20ayuda%20con%20un%20pedido%20de%20TLS%20Regalos%20Perú" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-[#F4B3D1] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] transition hover:bg-[#ED91BB]">Contactar por WhatsApp</a>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
