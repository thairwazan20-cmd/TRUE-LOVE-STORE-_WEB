const facebookUrl = 'https://web.facebook.com/tlsregalosperu/?_rdc=1&_rdr#'

const reviews = [
  { quote: 'LA ATENCION SUPER BUENA MEDIANTE WSP LA EDITORA SE ENCARGO DE HACER EL DISEÑO JUNTO CONMIGO Y MI FOTOBOOK QUEDO COMO YO LO IMAGINE ME GUSTO LA PACIENCIA QUE TUVO GRACIAS DE VERDAD 100% RECOMENDADO' },
  { quote: 'Los recomiendo! hacen lindos photobooks y la atencion es muy buena 👍😊', author: 'Valeria Molina' },
  { quote: 'Muy buen trabajo! Todo personalizado, seriedad y responsabilidad en el proceso. Gracias. Recomendadísimo', author: 'Flor Abanto' },
  { quote: 'Muy buena atención y sobre todo mucha paciencia. Lo recomiendo 👍', author: 'Andrea Amao' },
  { quote: 'Les quedo lindo el detalle 😊 gracias', author: 'Yajaira Paredes' },
  { quote: 'Una buena opcion para un regalo casual ❤️muy hermosos y unicos para una persona que consideremos especial❤️❤️😍🤩🤩 5 estrellas', author: 'Ale Car' },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section border-y border-[#E5E5E5] py-16" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase text-[#D3001C]">Opiniones de clientes</p>
          <h2 id="testimonials-title" className="mt-2 text-3xl font-semibold text-[#1A1A1A] sm:text-5xl">Experiencias compartidas</h2>
        </div>
        <div className="testimonials-grid mt-10">
          {reviews.map(({ quote, author }) => (
            <blockquote key={quote} className="testimonial-card">
              <span className="rounded-full border border-[#FFB6C1] bg-[#FFF0F5] px-3 py-1 text-[10px] font-semibold text-[#D3001C]">Opinión Verificada</span>
              <div className="testimonial-card__rating" aria-label="5 estrellas">★★★★★</div>
              <p className="testimonial-card__quote">“{quote}”</p>
              {author && <cite className="mb-3 text-xs font-semibold not-italic text-[#1A1A1A]">{author}</cite>}
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="testimonial-card__link">Ver opinión original en Facebook →</a>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
