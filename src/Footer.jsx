import whiteWordmark from './assets/CASD.png'
import whatsappIcon from './assets/whatsapp.svg'
import instagramIcon from './assets/instagram.svg'
import facebookIcon from './assets/facebook.svg'
import tiktokIcon from './assets/tiktok.svg'

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/tlsregalosperu/', icon: instagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/tlsregalosperu/', icon: facebookIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@tlsregalosperu', icon: tiktokIcon },
  { label: 'WhatsApp', href: 'https://wa.me/51960985082', icon: whatsappIcon },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E2E2] bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <span className="brand-logo-window brand-logo-window--footer" aria-hidden="true">
            <img src={whiteWordmark} alt="" />
          </span>
          <p className="mt-3 text-sm text-[#DAD4CF]">Cada detalle, un toque de amor</p>

          <div className="mt-5 space-y-2 text-sm text-[#DAD4CF]">
            <p>Lima, Perú</p>
            <a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" className="inline-flex text-[#FFAFD4] transition hover:text-white">WhatsApp: +51 960 985 082</a>
            <p>Horario de atención: consulta disponibilidad por WhatsApp.</p>
          </div>
          <p className="mt-5 max-w-md text-sm font-semibold uppercase leading-7 text-[#DAD4CF]">PHOTOBOOKS | FOTOBOOK, CUADROS, SCRAPBOOK, CUADERNOS, OTROS</p>
        </div>

      

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFAFD4]">Síguenos</p>
          <div className="mt-4 flex items-center gap-5">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label} TLS Regalos Perú`} className="transition hover:opacity-70">
                <img src={link.icon} alt="" className="h-6 w-6 invert" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
