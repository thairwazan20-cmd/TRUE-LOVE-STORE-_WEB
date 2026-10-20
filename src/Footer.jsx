import whiteWordmark from './assets/CASD.png'
import whatsappIcon from './assets/whatsapp.svg'
import instagramIcon from './assets/instagram.svg'
import facebookIcon from './assets/facebook.svg'
import tiktokIcon from './assets/tiktok.svg'

const whatsappLink = (text) => `https://wa.me/51960985082?text=${encodeURIComponent(text)}`

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/tlsregalosperu/', icon: facebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/tlsregalosperu/', icon: instagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@tlsregalosperu', icon: tiktokIcon },
  { label: 'WhatsApp', href: 'https://wa.me/51960985082', icon: whatsappIcon },
]

const quickLinks = [
  { label: 'Photobooks', category: 'Photobooks & Fotolibros' },
  { label: 'Acordeón Books', category: 'Photobooks & Fotolibros' },
  { label: 'Regalos Especiales', category: 'Packs & Special Boxes' },
  { label: 'Catálogo Completo', category: 'Todos' },
]

const supportLinks = [
  { label: 'Preguntas Frecuentes', text: 'Hola, tengo una consulta sobre sus productos.' },
  { label: 'Envíos a Nivel Nacional', text: 'Hola, quisiera información sobre envíos a nivel nacional.' },
  { label: 'Términos y Condiciones', text: 'Hola, quisiera conocer los términos y condiciones.' },
]

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <span className="brand-logo-window brand-logo-window--footer" aria-hidden="true">
            <img src={whiteWordmark} alt="" />
          </span>
          <p className="mt-3 text-sm text-[#DAD4CF]">Cada detalle, un toque de amor</p>
          <p className="mt-4 text-xs font-semibold uppercase leading-6 text-[#DAD4CF]">PHOTOBOOKS | FOTOBOOK, CUADROS, SCRAPBOOK, CUADERNOS, OTROS</p>
          <div className="mt-5 flex items-center gap-5">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label} TLS Regalos Perú`} className="transition hover:opacity-70">
                <img src={link.icon} alt="" className="h-6 w-6 invert" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Enlaces rápidos">
          <p className="text-[10px] font-semibold uppercase text-[#FFB6C1]">Enlaces rápidos</p>
          <ul className="mt-4 space-y-3 text-sm text-[#DAD4CF]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href="#catalogo" onClick={(event) => { event.preventDefault(); onSelectCategory(link.category) }} className="transition hover:text-white">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Atención al cliente">
          <p className="text-[10px] font-semibold uppercase text-[#FFB6C1]">Atención al cliente</p>
          <ul className="mt-4 space-y-3 text-sm text-[#DAD4CF]">
            {supportLinks.map((link) => (
              <li key={link.label}><a href={whatsappLink(link.text)} target="_blank" rel="noreferrer" className="transition hover:text-white">{link.label}</a></li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <p className="text-[10px] font-semibold uppercase text-[#FFB6C1]">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-[#DAD4CF]">
            <li>Lima, Perú</li>
            <li><a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" className="transition hover:text-white">WhatsApp: +51 960 985 082</a></li>
            <li>Horario de atención: consulta disponibilidad por WhatsApp.</li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-[#DAD4CF] sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} True Love Store - Todos los derechos reservados</p>
          <a href={whatsappLink('Hola, quisiera acceder al Libro de Reclamaciones.')} target="_blank" rel="noreferrer" className="transition hover:text-white">Libro de Reclamaciones</a>
        </div>
      </div>
    </footer>
  )
}
