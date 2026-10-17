const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

export const categories = [
  'Photobooks & Fotolibros',
  'Cuadros con Realidad Aumentada',
  'Álbumes de Figuritas',
  'Packs & Special Boxes',
  'Scrapbooks & Agendas',
]

export const products = [
  { id: 'photo-1814', title: 'Photobook & Fotolibro 18 × 14 cm', category: categories[0], price: 99, badge: 'Nuevo', variant: '18 × 14 cm', image: image('photo-1511285560929-80b456fea0bc') },
  { id: 'photo-1520', title: 'Photobook & Fotolibro 15 × 20 cm', category: categories[0], price: 149, badge: 'Favorito', variant: '15 × 20 cm', image: image('photo-1529156069898-49953e39b3ac') },
  { id: 'photo-2222', title: 'Photobook & Fotolibro 22 × 22 cm', category: categories[0], price: 229, badge: '', variant: '22 × 22 cm', image: image('photo-1516483638261-f4dbaf036963') },
  { id: 'photo-2230', title: 'Photobook & Fotolibro 22 × 30 cm', category: categories[0], price: 309, badge: 'Exclusivo', variant: '22 × 30 cm', image: image('photo-1520854221256-17451cc331bf') },
  { id: 'photo-biocuero', title: 'Photobook Premium Biocuero', category: categories[0], price: 210, badge: 'Premium', variant: 'Tamaño estándar', variants: [{ label: 'Tamaño estándar', price: 210 }, { label: 'Tamaño grande', price: 410 }], image: image('photo-1517849845537-4d257902454a') },
  { id: 'stickers-a4', title: 'Álbum de 50 Figuritas A4 Tapa Dura', category: categories[2], price: 160, badge: 'Nuevo', variant: 'A4 · 50 figuritas', image: image('photo-1519682337058-a94d519337bc') },
  { id: 'stickers-a5', title: 'Álbum de 30 Figuritas A5', category: categories[2], price: 90, badge: '', variant: 'A5 · 30 figuritas', image: image('photo-1516979187457-637abb4f9353') },
  { id: 'frame-netflix', title: 'Cuadro “Netflix”', category: categories[1], price: 69, badge: 'Favorito', variant: '20 × 30 cm', image: image('photo-1513519245088-0e12902e5a38') },
  { id: 'frame-corazon', title: 'Cuadro “Corazón”', category: categories[1], price: 69, badge: '', variant: '20 × 30 cm', image: image('photo-1507643179773-3e975d7ac515') },
  { id: 'frame-noticia', title: 'Cuadro “Noticia”', category: categories[1], price: 79, badge: 'Exclusivo', variant: '30 × 40 cm', image: image('photo-1579783902614-a3fb3927b6a5') },
  { id: 'frame-favorita', title: 'Cuadro “Nombre Favorita”', category: categories[1], price: 55, badge: '', variant: '15 × 20 cm', image: image('photo-1561214115-f2f134cc4912') },
  { id: 'frame-2015', title: 'Cuadro con Realidad Aumentada 20 × 15 cm', category: categories[1], price: 55, badge: 'Nuevo', variant: '20 × 15 cm', image: image('photo-1513519245088-0e12902e5a38') },
  { id: 'frame-2030', title: 'Cuadro con Realidad Aumentada 20 × 30 cm', category: categories[1], price: 69, badge: '', variant: '20 × 30 cm', image: image('photo-1507643179773-3e975d7ac515') },
  { id: 'frame-3040', title: 'Cuadro con Realidad Aumentada 30 × 40 cm', category: categories[1], price: 79, badge: 'Más vendido', variant: '30 × 40 cm', image: image('photo-1579783902614-a3fb3927b6a5') },
  { id: 'box-autentica', title: 'Box Auténtica', category: categories[3], price: 65, badge: '', variant: 'Presentación clásica', image: image('photo-1513201099705-a9746e1e201f') },
  { id: 'box-magico', title: 'Box Mágico', category: categories[3], price: 85, badge: 'Favorito', variant: 'Presentación premium', image: image('photo-1549465220-1a8b9238cd48') },
  { id: 'box-netflix', title: 'Box Netflix', category: categories[3], price: 99, badge: 'Exclusivo', variant: 'Edición Netflix', image: image('photo-1512909006721-3d6018887383') },
  { id: 'special-box', title: 'Special Box', category: categories[3], price: 99, badge: 'Premium', variant: 'Special Box', image: image('photo-1513883049090-d0b7439799bf') },
  { id: 'box-chelero', title: 'Box Chelero', category: categories[3], price: 40, badge: '', variant: 'Personalizado', variants: [{ label: 'Box pequeño', price: 40 }, { label: 'Box grande', price: 69 }], image: image('photo-1513201099705-a9746e1e201f') },
  { id: 'scrapbook-100', title: 'Scrapbook 100 Citas', category: categories[4], price: 79, badge: 'Regalo ideal', variant: '100 citas', image: image('photo-1455390582262-044cdead277a') },
  { id: 'agenda-diaria', title: 'Agenda Diaria', category: categories[4], price: 48, badge: '', variant: 'Agenda diaria', variants: [{ label: 'Agenda diaria', price: 48 }, { label: 'Agenda premium', price: 80 }], image: image('photo-1517842645767-c639042777db') },
  { id: 'planner', title: 'Planificador', category: categories[4], price: 48, badge: 'Nuevo', variant: 'Planificador', variants: [{ label: 'Planificador', price: 48 }, { label: 'Planificador premium', price: 80 }], image: image('photo-1434030216411-0b793f4b4173') },
]

export const testimonials = [
  { name: 'Mónica O.', occasion: 'Boda', quote: 'El photobook quedó precioso. La atención y cada acabado se sienten hechos con mucho cuidado.' },
  { name: 'Katherine A.', occasion: 'Regalo especial', quote: 'Una experiencia excelente: presentación impecable y un detalle que emocionó a toda la familia.' },
  { name: 'Rubi R.', occasion: 'Aniversario', quote: 'El cuadro con realidad aumentada fue un regalo inolvidable. La calidad superó mis expectativas.' },
]
