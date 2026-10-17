export default function ProductCard({ product, onQuickView, onAddToCart, isWishlisted, onToggleWishlist }) {
  const prices = product.variants?.map((variant) => variant.price) ?? [product.price]
  const lowestPrice = Math.min(...prices)
  const highestPrice = Math.max(...prices)
  const priceLabel = lowestPrice === highestPrice
    ? `S/ ${lowestPrice.toFixed(2)}`
    : `S/ ${lowestPrice.toFixed(2)} – ${highestPrice.toFixed(2)}`

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-[0_15px_40px_rgba(26,26,26,0.07)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(26,26,26,0.12)]">
      <div className="relative overflow-hidden bg-[#FFF0F6]">
        <button type="button" onClick={() => onQuickView(product)} className="block w-full text-left" aria-label={`Vista rápida de ${product.title}`}>
          <div className="relative h-72 overflow-hidden">
            <img
              src={product.hoverImage ?? product.image}
              alt=""
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
            />
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/10 via-transparent to-transparent" />
          </div>
        </button>

        {product.badge && <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#E30613] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">{product.badge}</div>}
        <button type="button" onClick={() => onToggleWishlist(product)} aria-label={isWishlisted ? `Quitar ${product.title} de favoritos` : `Guardar ${product.title} en favoritos`} className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-xl backdrop-blur-md ${isWishlisted ? 'text-[#E30613]' : 'text-[#58514A]'}`}>
          {isWishlisted ? '♥' : '♡'}
        </button>

      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#E30613]">
          <span>{product.category}</span>
          <span className="shrink-0 text-[#E30613]">★★★★★</span>
        </div>

        <h3 className="min-h-12 text-base font-semibold leading-6 text-[#1A1A1A]">{product.title}</h3>

        <div className="flex min-h-8 items-center justify-between gap-2">
          <span className="text-lg font-semibold text-[#E30613]">{priceLabel}</span>
          {product.variants?.length > 1 && <span className="text-[9px] uppercase tracking-[0.1em] text-[#777]">Variantes</span>}
        </div>
        <div className="flex items-center gap-2 border-t border-[#EAE2DA] pt-3">
          <button type="button" onClick={() => onQuickView(product)} className="flex-1 rounded-full border border-[#F4B3D1] px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#E30613]">Detalles</button>
          <button type="button" onClick={() => onAddToCart(product)} className="flex-1 rounded-full bg-[#F4B3D1] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A] transition hover:bg-[#ED91BB]">Comprar</button>
        </div>
      </div>
    </article>
  )
}
