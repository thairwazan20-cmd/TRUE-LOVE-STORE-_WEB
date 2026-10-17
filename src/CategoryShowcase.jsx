const tileConfig = [
  { label: 'PHOTOBOOK', categoryIndex: 0, productMatch: '18 × 14' },
  { label: 'CUADROS', categoryIndex: 1, productMatch: '20 × 30' },
  { label: 'ACORDEÓN', categoryIndex: 0, productMatch: '22 × 22' },
  { label: 'ÁLBUM DE FIGURITAS', categoryIndex: 2, productMatch: '50 Figuritas' },
  { label: 'CUADERNOS', categoryIndex: 4, productMatch: 'Agenda Diaria' },
  { label: '100 CITAS', categoryIndex: 4, productMatch: '100 Citas' },
  { label: 'SPECIAL BOX', categoryIndex: 3, productMatch: 'Special Box' },
  { label: 'SCRAPBOOK', categoryIndex: 4, productMatch: 'Scrapbook' },
  { label: 'ÁLBUM DE COLOREO', categoryIndex: 2, productMatch: '30 Figuritas' },
  { label: 'BOX CHELERO', categoryIndex: 3, productMatch: 'Box Chelero' },
  { label: 'BOX CREATIVO', categoryIndex: 3, productMatch: 'Box Mágico' },
  { label: 'BOXES PERSONALIZADOS', categoryIndex: 3, productMatch: 'Box Auténtica' },
]

export default function CategoryShowcase({ products, categories, onSelectCategory }) {
  return (
    <section className="category-showcase" aria-labelledby="category-showcase-title">
      <div className="category-showcase__heading">
        <div>
          <p>HECHOS PARA TUS MOMENTOS</p>
          <h2 id="category-showcase-title">Detalles personalizados</h2>
        </div>
      </div>
      <div className="category-showcase__grid">
        {tileConfig.map((tile) => {
          const product = products.find((item) => item.title.includes(tile.productMatch)) ?? products.find((item) => item.category === categories[tile.categoryIndex])
          const category = categories[tile.categoryIndex]
          return (
            <button key={tile.label} type="button" className="category-tile" onClick={() => onSelectCategory(category)} aria-label={`Ver categoría ${category}: ${tile.label}`}>
              <img src={product?.image} alt="" loading="lazy" />
              <span className="category-tile__copy"><strong>{tile.label}</strong></span>
            </button>
          )
        })}
      </div>
    </section>
  )
}