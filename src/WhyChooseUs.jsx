import { Gift, Image, MessageCircle, Truck } from 'lucide-react'

const pillars = [
  { icon: MessageCircle, title: 'Diseño 100% personalizado', text: 'Te asesoramos por WhatsApp durante todo el proceso.' },
  { icon: Truck, title: 'Envíos garantizados', text: 'Enviamos a todo el Perú.' },
  { icon: Image, title: 'Calidad fotográfica premium', text: 'Impresión en alta definición para tus mejores recuerdos.' },
  { icon: Gift, title: 'Presentación inolvidable', text: 'Detalles pensados para fechas especiales.' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16" aria-labelledby="why-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <h2 id="why-title" className="text-center text-3xl font-semibold text-[#1A1A1A] sm:text-4xl">Por qué elegirnos</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-[#F0E4E9] bg-[#FFF0F5] p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FFB6C1] bg-white text-[#D3001C]"><Icon aria-hidden="true" size={22} strokeWidth={1.8} /></span>
              <h3 className="mt-4 text-base font-semibold text-[#1A1A1A]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5C4A52]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
