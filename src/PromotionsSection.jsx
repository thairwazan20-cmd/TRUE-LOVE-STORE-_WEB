const promotions = [
  { id: 'photo-1814', title: 'PHOTOBOOK 18x14cm', description: 'Formato cuadrado - 10 páginas (20 fotos)', price: 79, gallery: ['photo-1511285560929-80b456fea0bc', 'photo-1529156069898-49953e39b3ac', 'photo-1516483638261-f4dbaf036963', 'photo-1520854221256-17451cc331bf', 'photo-1511895426328-dc8714191300'] },
  { id: 'photo-2222', title: 'PHOTOBOOK 22x22cm', description: 'Formato cuadrado - 10 páginas (30 fotos)', price: 99, gallery: ['photo-1520854221256-17451cc331bf', 'photo-1529156069898-49953e39b3ac', 'photo-1516483638261-f4dbaf036963', 'photo-1511285560929-80b456fea0bc', 'photo-1511895426328-dc8714191300'] },
]

const imageUrl = (imageId) => `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=900&q=85`

export default function PromotionsSection({ products, onAddToCart }) {
  const addPromotion = (promotion) => {
    const product = products.find((item) => item.id === promotion.id)
    if (product) onAddToCart(product, { label: `Promoción del mes · S/ ${promotion.price}`, price: promotion.price })
  }

  return (
    <section className="monthly-promotions" aria-labelledby="promotions-title">
      <div className="monthly-promotions__inner">
        <h2 id="promotions-title">PROMOCIONES DEL MES</h2>
        <div className="monthly-promotions__grid">
          {promotions.map((promotion) => (
            <article key={promotion.id} className="monthly-promotion">
              <div className="monthly-promotion__gallery">
                <img className="monthly-promotion__main" src={imageUrl(promotion.gallery[0])} alt={promotion.title} />
                <div className="monthly-promotion__thumbs">{promotion.gallery.slice(1).map((image) => <img key={image} src={imageUrl(image)} alt="" loading="lazy" />)}</div>
              </div>
              <h3>{promotion.title}</h3>
              <p>{promotion.description}</p>
              <div className="monthly-promotion__purchase">
                <span className="monthly-promotion__price">S/ {promotion.price}.00</span>
                <button type="button" onClick={() => addPromotion(promotion)}>COMPRAR</button>
              </div>
            </article>
          ))}
        </div>
        <p className="monthly-promotions__note">*Editamos las fotos y viene en caja con tarjeta dedicatoria</p>
      </div>
    </section>
  )
}