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
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-[#E5E5E5] bg-[#F3F3F3]/95 shadow-[0_12px_34px_rgba(26,26,26,0.08)] backdrop-blur-xl transition-transform duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center justify-center gap-2 bg-[#E30613] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:px-6">
        <span>Envíos a domicilio a nivel nacional</span>
        <span aria-hidden="true">|</span>
        <a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp al 960 985 082" className="inline-flex items-center gap-1.5 text-white transition hover:text-[#FFE5F0]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12.04 2a9.87 9.87 0 0 0-8.46 14.95L2.2 22l5.18-1.36A9.94 9.94 0 1 0 12.04 2Zm0 18.1a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.08.81.82-3-.2-.31A8.17 8.17 0 1 1 12.04 20.1Zm4.49-6.13c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.56.06-.25-.13-1.07-.39-2.04-1.24-.76-.67-1.27-1.49-1.42-1.74-.15-.26-.02-.4.11-.53.12-.12.26-.3.38-.45.13-.15.17-.25.26-.42.08-.17.04-.32-.02-.45-.07-.13-.57-1.37-.78-1.88-.2-.5-.41-.43-.57-.44h-.49c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12 0 1.24.91 2.44 1.04 2.61.13.17 1.79 2.73 4.33 3.83.6.26 1.07.42 1.44.54.61.19 1.16.16 1.59.1.49-.08 1.48-.61 1.69-1.2.21-.58.21-1.08.15-1.19-.07-.11-.23-.17-.49-.3Z" /></svg>
          <span>960 985 082</span>
        </a>
      </div>

      <div className="mx-auto max-w-[1440px] bg-[#F3F3F3]/95 px-4 py-3 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[220px_minmax(260px,1fr)_auto] lg:gap-6">
          <a href="#inicio" onClick={(event) => { event.preventDefault(); onGoHome() }} className="flex min-w-0 items-center gap-3 lg:col-start-1 lg:row-start-1" aria-label="TLS Regalos Perú, inicio">
            <span className="brand-logo-window brand-logo-window--header" aria-hidden="true">
              <img src={redWordmark} alt="" />
            </span>
          </a>

          <div className="col-span-2 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
            <div className="relative w-full">
              <div className="flex items-center rounded-full border border-[#E2E2E2] bg-[#FAFAFA] px-2 py-2 shadow-[0_8px_22px_rgba(26,26,26,0.03)] transition focus-within:border-[#D2D2D2] focus-within:ring-2 focus-within:ring-[#D2D2D2]/30 sm:px-4 sm:py-2.5">
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
                  className="ml-1 inline-flex shrink-0 rounded-full bg-[#E30613] px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#B90010] sm:ml-2 sm:px-4 sm:text-[10px] sm:tracking-[0.14em]"
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
            <button type="button" aria-label={`Favoritos, ${wishlistCount} productos`} onClick={onOpenWishlist} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E2E2] bg-white text-lg text-[#E30613] transition hover:border-[#E30613]" title="Favoritos">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" /></svg>
              {wishlistCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFAFD4] px-1 text-[9px] font-bold text-[#1A1A1A]">{wishlistCount}</span>}
            </button>
            <button type="button" aria-label="Atención al cliente" onClick={onOpenAccount} className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#E2E2E2] bg-white text-sm text-[#1A1A1A] transition hover:border-[#E30613] sm:flex" title="Atención al cliente">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 21h8m-4-5v5m-3-10a3 3 0 1 1 6 0m-7 3c.7-1.5 2-2.3 4-2.3s3.3.8 4 2.3"/></svg>
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Abrir carrito, ${cartCount} productos`}
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#FFAFD4] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_25px_rgba(227,6,19,0.12)] transition hover:bg-[#E30613] sm:px-4"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M2 3h2l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 8H5"/></svg>
              <span className="text-[9px] sm:text-[10px]">Carrito</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E987B5] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

      </div>
    </header>
  )
}
