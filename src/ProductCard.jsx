export default function ProductCard({ product, onQuickView, onAddToCart }) {
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

        {product.badge && <div className="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/50 bg-black/40 px-3 py-1 text-[9px] font-medium uppercase text-white">{product.badge}</div>}
      </div>

      <div className="space-y-3 p-3 sm:p-5">
        <h3 className="min-h-12 text-sm sm:text-base font-semibold leading-5 sm:leading-6 text-[#1A1A1A]">{product.title}</h3>

        <div className="flex min-h-8 items-center justify-between gap-2">
          <span className="text-base sm:text-lg font-semibold text-[#D3001C]">{priceLabel}</span>
          {product.variants?.length > 1 && <span className="text-[9px] uppercase tracking-[0.1em] text-[#777]">Variantes</span>}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 border-t border-[#EAE2DA] pt-3">
          <button type="button" onClick={() => onQuickView(product)} className="flex-1 rounded-full border border-[#E2E2E2] bg-[#F2F2F2] px-2 sm:px-3 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-semibold uppercase text-[#1A1A1A] transition hover:border-[#FFB6C1] hover:bg-[#FFB6C1] active:border-[#FFB6C1] active:bg-[#FFB6C1] whitespace-nowrap">Detalles</button>
          <button type="button" onClick={() => onAddToCart(product)} className="flex-1 rounded-full border border-[#FFB6C1] bg-[#FFB6C1] px-2 sm:px-3 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-semibold uppercase text-[#1A1A1A] transition hover:border-[#D3001C] hover:bg-[#D3001C] hover:text-white whitespace-nowrap">Comprar</button>
        </div>
      </div>
    </article>
  )
}
