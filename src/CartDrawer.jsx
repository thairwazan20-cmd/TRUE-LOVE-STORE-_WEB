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
        className={`absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col border-l border-[#E2E2E2] bg-white text-[#1A1A1A] shadow-[-20px_0_70px_rgba(26,26,26,0.2)] transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-[#E2E2E2] px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]">TLS REGALOS PERÚ</p>
            <h2 className="mt-1 text-xl font-semibold text-[#1A1A1A]">Tu carrito <span className="text-sm font-normal text-[#5C4A52]">({itemCount})</span></h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar carrito" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E2E2] text-2xl text-[#1A1A1A] transition hover:bg-[#FFB6C1]">×</button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="text-5xl text-[#FFB6C1]">♡</span>
            <h3 className="mt-4 text-xl font-semibold text-[#1A1A1A]">Tu carrito está vacío</h3>
            <p className="mt-2 text-sm leading-6 text-[#5C4A52]">Descubre regalos personalizados para tus momentos especiales.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-[#FFB6C1] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A] transition hover:bg-[#FFF0F6]">Explorar catálogo</button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <article key={item.key} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b border-[#E2E2E2] pb-5">
                  <img src={item.product.image} alt={item.product.title} className="h-24 w-[84px] rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold leading-5 text-[#1A1A1A]">{item.product.title}</h3>
                        <p className="mt-1 text-xs text-[#5C4A52]">{item.variant}</p>
                      </div>
                      <button type="button" onClick={() => onRemove(item.key)} aria-label={`Quitar ${item.product.title}`} className="text-lg leading-none text-[#5C4A52] hover:text-[#E30613]">×</button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-[#E2E2E2] text-[#1A1A1A]">
                        <button type="button" onClick={() => onChangeQuantity(item.key, -1)} aria-label="Reducir cantidad" className="h-8 w-8 text-sm text-[#1A1A1A]">−</button>
                        <span className="min-w-7 text-center text-xs font-semibold text-[#1A1A1A]">{item.quantity}</span>
                        <button type="button" onClick={() => onChangeQuantity(item.key, 1)} aria-label="Aumentar cantidad" className="h-8 w-8 text-sm text-[#1A1A1A]">+</button>
                      </div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="border-t border-[#E2E2E2] bg-white px-6 pb-6 pt-5">
              <div className="flex items-center justify-between text-sm text-[#1A1A1A]">
                <span>Subtotal</span>
                <strong className="text-xl text-[#1A1A1A]">{formatPrice(subtotal)}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5C4A52]">El costo de envío se coordina al confirmar el pedido.</p>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-[#D3001C] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(227,6,19,0.1)] transition hover:bg-[#B90010]"
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
