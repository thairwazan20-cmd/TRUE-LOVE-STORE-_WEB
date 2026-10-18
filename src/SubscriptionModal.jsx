import { useEffect } from 'react'

export default function SubscriptionModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1A1A1A]/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="subscription-title" className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#FFFDF9] shadow-[0_30px_80px_rgba(26,26,26,0.25)]" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAFA] text-lg text-[#1A1A1A] transition hover:bg-[#F0E7D8]"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div aria-hidden="true" className="relative min-h-[180px] overflow-hidden bg-gradient-to-br from-[#FFAFD4] via-[#F8C9DE] to-[#FFF0F6] md:min-h-[410px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),transparent_50%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <h3 id="subscription-title" className="text-3xl font-bold leading-tight text-[#1A1A1A] sm:text-4xl">
              Suscripción mensual<br />
              de S/ 29.90.
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
              Recibe tu <strong className="font-bold text-[#1A1A1A]">PHOTOBOOK PREMIUM</strong><br />
              de 30 páginas,<br />
              con capacidad para 200 fotos.
            </p>

            <a
              href="https://wa.me/51960985082?text=Hola,%20deseo%20más%20información%20sobre%20la%20Suscripción%20Mensual%20de%20PHOTOBOOK%20PREMIUM"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#FFAFD4] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(227,6,19,0.12)] transition hover:-translate-y-0.5 hover:bg-[#E30613]"
            >
              Conoce más por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
