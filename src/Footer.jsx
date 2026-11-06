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

const exploreLinks = [
  { label: 'Photobooks', category: 'Photobooks & Fotolibros' },
  { label: 'Cuadros', category: 'Cuadros con Realidad Aumentada' },
  { label: 'Álbumes', category: 'Álbumes de Figuritas' },
  { label: 'Regalos personalizados', category: 'Packs & Special Boxes' },
]

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.45fr_1fr_1fr] lg:px-8">
        <div>
          <span className="brand-logo-window brand-logo-window--footer" aria-hidden="true">
            <img src={whiteWordmark} alt="" />
          </span>
          <p className="mt-3 text-sm text-[#DAD4CF]">Regalos premium para momentos inolvidables</p>
          <address className="mt-4 not-italic">
            <ul className="space-y-2 text-sm text-[#DAD4CF]">
              <li>Lima, Perú</li>
              <li><a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" className="text-[#F5B4D2] transition hover:text-white">WhatsApp: +51 960 985 082</a></li>
              <li>Horario de atención: consulta disponibilidad por WhatsApp.</li>
            </ul>
          </address>
        </div>

        <nav aria-label="Explora">
          <p className="text-[10px] font-semibold uppercase text-[#F5B4D2]">Explora</p>
          <ul className="mt-4 space-y-3 text-sm text-[#DAD4CF]">
            {exploreLinks.map((link) => (
              <li key={link.label}><button type="button" onClick={() => onSelectCategory(link.category)} className="text-left transition hover:text-white">{link.label}</button></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[10px] font-semibold uppercase text-[#F5B4D2]">Síguenos</p>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label} TLS Regalos Perú`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20">
                <img src={link.icon} alt="" className="h-4 w-4 invert" />
              </a>
            ))}
          </div>
        </div>
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
