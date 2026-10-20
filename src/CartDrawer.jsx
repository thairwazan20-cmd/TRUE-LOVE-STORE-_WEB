import { useEffect } from 'react'

const formatPrice = (value) => `S/ ${Number(value).toFixed(2)}`

export default function CartDrawer({ items, isOpen, onClose, onChangeQuantity, onRemove }) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const orderLines = items.map((item) => `• ${item.product.title} (${item.variant}) × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
  const message = `Hola, deseo realizar este pedido de TLS REGALOS PERÚ:\n${orderLines.join('\n')}\n\nSubtotal: ${formatPrice(subtotal)}`
  const checkoutUrl = `https://wa.me/51960985082?text=${encodeURIComponent(message)}`

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Cerrar carrito"
        onClick={onClose}
        className={`absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito de compras"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col border-l border-white/40 bg-[#FFAFD4] text-white shadow-[-20px_0_70px_rgba(26,26,26,0.2)] transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-white/50 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white">TLS REGALOS PERÚ</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Tu carrito <span className="text-sm font-normal text-white/80">({itemCount})</span></h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar carrito" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-2xl text-white transition hover:bg-[#E30613]">×</button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="text-5xl text-[#FFAFD4]">♡</span>
            <h3 className="mt-4 text-xl font-semibold text-white">Tu carrito está vacío</h3>
            <p className="mt-2 text-sm leading-6 text-white/90">Descubre regalos personalizados para tus momentos especiales.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#E30613] transition hover:bg-[#E30613] hover:text-white">Explorar catálogo</button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <article key={item.key} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b border-white/40 pb-5">
                  <img src={item.product.image} alt={item.product.title} className="h-24 w-[84px] rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold leading-5 text-white">{item.product.title}</h3>
                        <p className="mt-1 text-xs text-white/85">{item.variant}</p>
                      </div>
                      <button type="button" onClick={() => onRemove(item.key)} aria-label={`Quitar ${item.product.title}`} className="text-lg leading-none text-white/80 hover:text-[#E30613]">×</button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-white/70 text-white">
                        <button type="button" onClick={() => onChangeQuantity(item.key, -1)} aria-label="Reducir cantidad" className="h-8 w-8 text-sm text-white">−</button>
                        <span className="min-w-7 text-center text-xs font-semibold text-white">{item.quantity}</span>
                        <button type="button" onClick={() => onChangeQuantity(item.key, 1)} aria-label="Aumentar cantidad" className="h-8 w-8 text-sm text-white">+</button>
                      </div>
                      <p className="text-sm font-semibold text-white">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="border-t border-white/50 bg-[#FFAFD4] px-6 pb-6 pt-5">
              <div className="flex items-center justify-between text-sm text-white">
                <span>Subtotal</span>
                <strong className="text-xl text-white">{formatPrice(subtotal)}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/90">El costo de envío se coordina al confirmar el pedido.</p>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#E30613] shadow-[0_12px_30px_rgba(227,6,19,0.1)] transition hover:bg-[#E30613] hover:text-white"
              >
                Comprar por WhatsApp
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
