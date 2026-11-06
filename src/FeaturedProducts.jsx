const featuredIds = ['photo-1814', 'photo-biocuero', 'special-box', 'box-magico']

export default function FeaturedProducts({ products, onQuickView }) {
  const featured = featuredIds.map((id) => products.find((product) => product.id === id)).filter(Boolean)

  return (
    <section id="catalogo" className="bg-[#FAFAFA] py-16" aria-labelledby="featured-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="text-center">
          <span className="inline-block text-[10px] font-medium uppercase text-[#D3001C]">Favoritos de los clientes</span>
          <h2 id="featured-title" className="mt-4 text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">Productos destacados</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <article key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#F0E4E9] bg-white shadow-[0_10px_30px_rgba(26,26,26,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(211,0,28,0.12)]">
              <div className="relative h-64 overflow-hidden">
                <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {product.badge && <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-black/40 px-3 py-1 text-[9px] font-medium uppercase text-white">{product.badge}</span>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold leading-6 text-[#1A1A1A]">{product.title}</h3>
                <p className="mt-2 text-lg font-semibold text-[#D3001C]">S/ {product.price}</p>
                <button type="button" onClick={() => onQuickView(product)} className="mt-auto rounded-full border-2 border-[#F5B4D2] bg-[#D3001C] px-5 py-3 text-[10px] font-semibold uppercase text-white transition hover:bg-[#B90010]">Personalizar ahora</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
