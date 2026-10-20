const tileConfig = [
  { label: 'PHOTOBOOKS & FOTOLIBROS', categoryIndex: 0, productMatch: '18 × 14' },
  { label: 'CUADROS', categoryIndex: 1, productMatch: 'Cuadro “Netflix”' },
  { label: 'ÁLBUM DE FIGURITAS', categoryIndex: 2, productMatch: '50 Figuritas' },
  { label: 'PACKS & SPECIAL BOXES', categoryIndex: 3, productMatch: 'Box Auténtica' },
  { label: 'SCRAPBOOK', category: 'Scrapbook', productMatch: 'Scrapbook 100 Citas' },
  { label: 'CUADERNOS', category: 'Cuadernos', productMatch: 'Agenda Diaria' },
  { label: 'ACORDEÓN BOOK', categoryIndex: 0, productMatch: '22 × 22' },
  { label: '100 CITAS', category: 'Scrapbook', productMatch: 'Scrapbook 100 Citas' },
  { label: 'SPECIAL BOX', category: 'Otros', productMatch: 'Special Box' },
  { label: 'ÁLBUM DE COLOREO', category: 'Otros', productMatch: '30 Figuritas' },
  { label: 'BOX CHELERO', category: 'Otros', productMatch: 'Box Chelero' },
  { label: 'BOXES PERSONALIZADOS', category: 'Otros', productMatch: 'Box Mágico' },
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
          const category = tile.category ?? categories[tile.categoryIndex]
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