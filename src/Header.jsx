import { useMemo, useState } from 'react'
import redWordmark from './assets/IMAGOTIPO TLS25-25.png'

export default function Header({
  catalog,
  onSelectCategory,
  searchTerm,
  setSearchTerm,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onGoHome,
  headerVisible = true,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return catalog.slice(0, 4)

    return catalog.filter((item) => {
      const text = `${item.title} ${item.category}`.toLowerCase()
      return text.includes(searchTerm.toLowerCase())
    }).slice(0, 5)
  }, [catalog, searchTerm])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-white/30 bg-white/75 shadow-[0_12px_34px_rgba(26,26,26,0.08)] backdrop-blur-xl transition-transform duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-[#F4B3D1] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] sm:px-6">
        Envíos a domicilio a nivel nacional 🇵🇪 | WhatsApp: 960 985 082
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[220px_minmax(260px,1fr)_auto] lg:gap-6">
          <a href="#inicio" onClick={(event) => { event.preventDefault(); onGoHome() }} className="flex min-w-0 items-center gap-3 lg:col-start-1 lg:row-start-1" aria-label="TLS Regalos Perú, inicio">
            <span className="brand-logo-window brand-logo-window--header" aria-hidden="true">
              <img src={redWordmark} alt="" />
            </span>
          </a>

          <div className="col-span-2 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
            <div className="relative w-full">
              <div className="flex items-center rounded-full border border-[#F4B3D1] bg-[#FFF9FC]/90 px-3 py-2.5 shadow-[0_8px_22px_rgba(26,26,26,0.03)] backdrop-blur-lg transition focus-within:border-[#ED91BB] focus-within:ring-2 focus-within:ring-[#F4B3D1]/40 sm:px-4">
                <span className="mr-3 text-lg text-[#6B6B6B]">⌕</span>
                <input
                  id="product-search"
                  value={searchTerm}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 180)}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar regalos personalizados..."
                  className="w-full border-0 bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#8A8A8A]"
                  aria-label="Buscar productos"
                />
                <button
                  type="button"
                  className="ml-2 hidden rounded-full bg-[#F4B3D1] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A] transition hover:bg-[#ED91BB] sm:inline-flex"
                  onClick={() => {
                    const query = searchTerm.trim().toLocaleLowerCase('es')
                    const match = query ? catalog.find((item) => `${item.title} ${item.category}`.toLocaleLowerCase('es').includes(query)) : null
                    if (match) onSelectCategory(match.category)
                    setIsSearchOpen(false)
                  }}
                >
                  Buscar
                </button>
              </div>

              {isSearchOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-[20px] border border-[#F1E8DE] bg-white p-2 shadow-[0_18px_50px_rgba(26,26,26,0.12)]">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onMouseDown={() => {
                        setSearchTerm(item.title)
                        setIsSearchOpen(false)
                        onSelectCategory(item.category)
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-[#F9F3F2]"
                    >
                      <img src={item.image} alt={item.title} className="h-12 w-12 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#1A1A1A]">{item.title}</p>
                        <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">{item.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#E30613]">S/ {item.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 lg:col-start-3 lg:row-start-1 lg:gap-3">
            <button type="button" aria-label={`Favoritos, ${wishlistCount} productos`} onClick={onOpenWishlist} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#F4B3D1] bg-white text-lg text-[#E30613] transition hover:border-[#ED91BB]" title="Favoritos">
              ♡{wishlistCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F4B3D1] px-1 text-[9px] font-bold text-[#1A1A1A]">{wishlistCount}</span>}
            </button>
            <button type="button" aria-label="Atención al cliente" onClick={onOpenAccount} className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#F4B3D1] bg-white text-sm text-[#1A1A1A] transition hover:border-[#ED91BB] sm:flex" title="Atención al cliente">
              ♙
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Abrir carrito, ${cartCount} productos`}
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#F4B3D1] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A] shadow-[0_10px_25px_rgba(227,6,19,0.12)] transition hover:bg-[#ED91BB] sm:px-4"
            >
              <span className="hidden sm:inline">Carrito</span><span className="sm:hidden">Bag</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4B3D1] text-[10px] font-bold text-[#1A1A1A]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

      </div>
    </header>
  )
}
