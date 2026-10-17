import whiteWordmark from './assets/CASD.png'

export default function Footer() {
  return (
    <footer className="border-t border-[#F4B3D1] bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <span className="brand-logo-window brand-logo-window--footer" aria-hidden="true">
            <img src={whiteWordmark} alt="" />
          </span>
          <p className="mt-3 text-sm text-[#DAD4CF]">Regalos premium para momentos inolvidables</p>

          <div className="mt-5 space-y-2 text-sm text-[#DAD4CF]">
            <p>Lima, Perú</p>
            <a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" className="inline-flex text-[#F4B3D1] transition hover:text-white">WhatsApp: +51 960 985 082</a>
            <p>Horario de atención: consulta disponibilidad por WhatsApp.</p>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#DAD4CF]">Creamos regalos personalizados con cuidado artesanal para transformar fotografías, celebraciones y momentos cotidianos en recuerdos que permanecen.</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F4B3D1]">Explora</p>
          <ul className="mt-4 space-y-3 text-sm text-[#DAD4CF]">
            <li><a href="#catalog" className="transition hover:text-white">Photobooks</a></li>
            <li><a href="#catalog" className="transition hover:text-white">Cuadros</a></li>
            <li><a href="#catalog" className="transition hover:text-white">Álbumes</a></li>
            <li><a href="#catalog" className="transition hover:text-white">Regalos personalizados</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F4B3D1]">Síguenos</p>
          <div className="mt-4 flex gap-3">
            <a href="https://www.facebook.com/tlsregalosperu" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F4B3D1]/40 bg-[#2A2A2A] text-sm font-semibold text-white">
              f
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F4B3D1]/40 bg-[#2A2A2A] text-sm font-semibold text-white">
              ◎
            </a>
            <a href="https://wa.me/51960985082" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F4B3D1]/40 bg-[#2A2A2A] text-sm font-semibold text-white">
              W
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
