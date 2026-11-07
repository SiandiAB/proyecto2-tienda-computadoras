// Genera el catálogo de la tienda: documentos JSON para Nuxt Content
// (content/categories y content/products) e imágenes SVG de ejemplo.
// Uso: node scripts/generate-catalog.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const categories = [
  { slug: 'laptops', title: 'Laptops', description: 'Computadoras portátiles para trabajo, estudio y gaming.', icon: '💻', color: '#2563eb' },
  { slug: 'desktops', title: 'Computadoras de Escritorio', description: 'Equipos de escritorio para oficina, diseño y juegos.', icon: '🖥️', color: '#7c3aed' },
  { slug: 'componentes', title: 'Componentes', description: 'Procesadores, tarjetas gráficas, memorias y almacenamiento.', icon: '🧩', color: '#059669' },
  { slug: 'monitores', title: 'Monitores', description: 'Pantallas de distintas resoluciones y tasas de refresco.', icon: '📺', color: '#d97706' },
  { slug: 'perifericos', title: 'Periféricos', description: 'Teclados, ratones, cámaras y equipos de audio.', icon: '⌨️', color: '#dc2626' },
  { slug: 'accesorios', title: 'Accesorios', description: 'Cables, soportes, fundas y otros complementos.', icon: '🔌', color: '#475569' }
]

const byCategory = Object.fromEntries(categories.map((c) => [c.slug, c]))

// Cada producto: slug, title (nombre), description (corta, para Snipcart),
// brand, model, price, stock y specs (pares label/value específicos del artículo).
const products = [
  // Laptops
  { slug: 'acer-nitro-5', title: 'Laptop Gamer Acer Nitro 5', brand: 'Acer', model: 'Nitro 5 AN515-58', price: 1099.0, stock: 8, category: 'laptops',
    description: 'Laptop gamer de 15.6" con NVIDIA RTX 4050 e Intel Core i7.',
    specs: [['Pantalla', '15.6" FHD IPS 144 Hz'], ['Procesador', 'Intel Core i7-12650H'], ['RAM', '16 GB DDR4'], ['Almacenamiento', '512 GB SSD NVMe'], ['GPU', 'NVIDIA GeForce RTX 4050 6 GB'], ['Sistema', 'Windows 11 Home']] },
  { slug: 'macbook-air-m2', title: 'MacBook Air 13" M2', brand: 'Apple', model: 'MacBook Air M2', price: 1199.0, stock: 5, category: 'laptops',
    description: 'Ultraligera con chip Apple M2, silenciosa y con gran batería.',
    specs: [['Pantalla', '13.6" Liquid Retina'], ['Chip', 'Apple M2 (8 CPU / 8 GPU)'], ['RAM', '8 GB unificada'], ['Almacenamiento', '256 GB SSD'], ['Peso', '1.24 kg'], ['Sistema', 'macOS']] },
  { slug: 'lenovo-thinkpad-e14', title: 'Laptop Lenovo ThinkPad E14', brand: 'Lenovo', model: 'ThinkPad E14 Gen 5', price: 749.0, stock: 12, category: 'laptops',
    description: 'Laptop empresarial resistente con Ryzen 5 y teclado ergonómico.',
    specs: [['Pantalla', '14" FHD'], ['Procesador', 'AMD Ryzen 5 7530U'], ['RAM', '8 GB DDR4'], ['Almacenamiento', '256 GB SSD'], ['GPU', 'AMD Radeon integrada'], ['Sistema', 'Windows 11 Pro']] },
  { slug: 'asus-vivobook-15', title: 'Laptop ASUS VivoBook 15', brand: 'ASUS', model: 'VivoBook 15 X1504', price: 599.0, stock: 15, category: 'laptops',
    description: 'Portátil delgada para el día a día con Core i5 de 12.ª generación.',
    specs: [['Pantalla', '15.6" FHD'], ['Procesador', 'Intel Core i5-1235U'], ['RAM', '8 GB DDR4'], ['Almacenamiento', '512 GB SSD'], ['GPU', 'Intel Iris Xe'], ['Sistema', 'Windows 11 Home']] },
  { slug: 'dell-xps-13', title: 'Laptop Dell XPS 13', brand: 'Dell', model: 'XPS 13 9315', price: 1399.0, stock: 4, category: 'laptops',
    description: 'Ultrabook premium con pantalla InfinityEdge y gran autonomía.',
    specs: [['Pantalla', '13.4" FHD+ InfinityEdge'], ['Procesador', 'Intel Core i7-1360P'], ['RAM', '16 GB LPDDR5'], ['Almacenamiento', '1 TB SSD'], ['GPU', 'Intel Iris Xe'], ['Sistema', 'Windows 11']] },
  { slug: 'hp-pavilion-14', title: 'Laptop HP Pavilion 14', brand: 'HP', model: 'Pavilion 14-ec', price: 649.0, stock: 10, category: 'laptops',
    description: 'Portátil versátil para estudiantes con Core i5 y SSD rápido.',
    specs: [['Pantalla', '14" FHD'], ['Procesador', 'Intel Core i5-1335U'], ['RAM', '8 GB DDR4'], ['Almacenamiento', '512 GB SSD'], ['GPU', 'Intel Iris Xe'], ['Sistema', 'Windows 11 Home']] },

  // Desktops
  { slug: 'dell-optiplex-7010', title: 'PC Dell OptiPlex 7010', brand: 'Dell', model: 'OptiPlex 7010 Tower', price: 799.0, stock: 6, category: 'desktops',
    description: 'Torre empresarial compacta con Core i7 y gran rendimiento.',
    specs: [['Procesador', 'Intel Core i7-13700'], ['RAM', '16 GB DDR4'], ['Almacenamiento', '512 GB SSD'], ['GPU', 'Intel UHD Graphics 770'], ['Puertos', 'USB 3.2, HDMI, DisplayPort'], ['Sistema', 'Windows 11 Pro']] },
  { slug: 'hp-elitedesk-800', title: 'PC HP EliteDesk 800 G9', brand: 'HP', model: 'EliteDesk 800 G9 SFF', price: 899.0, stock: 5, category: 'desktops',
    description: 'Equipo de escritorio de perfil pequeño ideal para oficinas.',
    specs: [['Procesador', 'Intel Core i7-13700'], ['RAM', '16 GB DDR5'], ['Almacenamiento', '1 TB SSD NVMe'], ['GPU', 'Intel UHD Graphics 770'], ['Factor de forma', 'Small Form Factor'], ['Sistema', 'Windows 11 Pro']] },
  { slug: 'lenovo-thinkcentre-m80', title: 'PC Lenovo ThinkCentre M80', brand: 'Lenovo', model: 'ThinkCentre M80s', price: 849.0, stock: 7, category: 'desktops',
    description: 'Torre potente con Ryzen 7 y doble unidad de almacenamiento.',
    specs: [['Procesador', 'AMD Ryzen 7 5800G'], ['RAM', '16 GB DDR4'], ['Almacenamiento', '512 GB SSD + 1 TB HDD'], ['GPU', 'AMD Radeon integrada'], ['Conectividad', 'Wi-Fi 6 + Bluetooth'], ['Sistema', 'Windows 11']] },
  { slug: 'mac-mini-m2', title: 'Apple Mac mini M2', brand: 'Apple', model: 'Mac mini M2', price: 599.0, stock: 9, category: 'desktops',
    description: 'Computadora de escritorio compacta con el chip Apple M2.',
    specs: [['Chip', 'Apple M2 (8 CPU / 10 GPU)'], ['RAM', '8 GB unificada'], ['Almacenamiento', '256 GB SSD'], ['Puertos', 'Thunderbolt 4, HDMI, USB-A'], ['Conectividad', 'Wi-Fi 6E + Bluetooth 5.3'], ['Sistema', 'macOS']] },
  { slug: 'pc-gamer-armada', title: 'PC Gamer Armada RTX 4060', brand: 'Armada', model: 'Armada GX-7600', price: 1249.0, stock: 3, category: 'desktops',
    description: 'PC de escritorio para juegos con RTX 4060 y Ryzen 5 de nueva generación.',
    specs: [['Procesador', 'AMD Ryzen 5 7600'], ['RAM', '16 GB DDR5'], ['Almacenamiento', '1 TB SSD NVMe'], ['GPU', 'NVIDIA GeForce RTX 4060 8 GB'], ['Fuente', '650 W 80 Plus Bronze'], ['Sistema', 'Windows 11']] },
  { slug: 'asus-expertcenter-d5', title: 'PC ASUS ExpertCenter D5', brand: 'ASUS', model: 'ExpertCenter D5 SFF', price: 699.0, stock: 11, category: 'desktops',
    description: 'Equipo confiable para tareas de oficina con Core i5.',
    specs: [['Procesador', 'Intel Core i5-13400'], ['RAM', '16 GB DDR4'], ['Almacenamiento', '512 GB SSD'], ['GPU', 'Intel UHD Graphics 730'], ['Factor de forma', 'Small Form Factor'], ['Sistema', 'Windows 11']] },

  // Componentes
  { slug: 'amd-ryzen-7-7800x3d', title: 'Procesador AMD Ryzen 7 7800X3D', brand: 'AMD', model: 'Ryzen 7 7800X3D', price: 449.0, stock: 20, category: 'componentes',
    description: 'CPU gaming de 8 núcleos con caché 3D V-Cache.',
    specs: [['Núcleos / Hilos', '8 / 16'], ['Frecuencia base', '4.2 GHz'], ['Frecuencia boost', '5.0 GHz'], ['Caché', '96 MB (3D V-Cache)'], ['Socket', 'AM5'], ['TDP', '120 W']] },
  { slug: 'intel-core-i9-14900k', title: 'Procesador Intel Core i9-14900K', brand: 'Intel', model: 'Core i9-14900K', price: 599.0, stock: 14, category: 'componentes',
    description: 'CPU de escritorio de 24 núcleos para entusiastas.',
    specs: [['Núcleos / Hilos', '24 / 32 (8P + 16E)'], ['Frecuencia base', '3.2 GHz'], ['Frecuencia turbo', '6.0 GHz'], ['Caché', '36 MB'], ['Socket', 'LGA 1700'], ['TDP', '125 W']] },
  { slug: 'nvidia-rtx-4070', title: 'Tarjeta Gráfica NVIDIA RTX 4070', brand: 'NVIDIA', model: 'GeForce RTX 4070 12 GB', price: 599.0, stock: 10, category: 'componentes',
    description: 'GPU con DLSS 3 y trazado de rayos para juegos en 1440p.',
    specs: [['Memoria', '12 GB GDDR6X'], ['Núcleos CUDA', '5888'], ['Interfaz', '192 bits'], ['Salidas', 'HDMI 2.1, 3x DisplayPort'], ['Alimentación', '650 W recomendada'], ['Tecnología', 'DLSS 3, Ray Tracing']] },
  { slug: 'corsair-vengeance-32gb', title: 'Memoria RAM Corsair Vengeance 32 GB', brand: 'Corsair', model: 'Vengeance RGB DDR5', price: 119.0, stock: 25, category: 'componentes',
    description: 'Kit de 32 GB DDR5 con iluminación RGB.',
    specs: [['Capacidad', '32 GB (2 x 16 GB)'], ['Velocidad', '6000 MT/s'], ['Latencia', 'CL36'], ['Tipo', 'DDR5'], ['Iluminación', 'RGB'], ['Perfil', 'Intel XMP 3.0 / AMD EXPO']] },
  { slug: 'samsung-980-pro-1tb', title: 'SSD Samsung 980 PRO 1 TB', brand: 'Samsung', model: '980 PRO 1 TB', price: 99.0, stock: 30, category: 'componentes',
    description: 'SSD NVMe PCIe 4.0 de alto rendimiento.',
    specs: [['Capacidad', '1 TB'], ['Interfaz', 'PCIe 4.0 NVMe M.2'], ['Lectura', '7000 MB/s'], ['Escritura', '5000 MB/s'], ['Factor de forma', 'M.2 2280'], ['Cifrado', 'AES 256 bits']] },
  { slug: 'asus-tuf-b650', title: 'Placa Madre ASUS TUF B650-Plus', brand: 'ASUS', model: 'TUF Gaming B650-Plus', price: 189.0, stock: 16, category: 'componentes',
    description: 'Placa base AM5 duradera para Ryzen 7000.',
    specs: [['Socket', 'AM5'], ['Memoria', 'DDR5 hasta 128 GB'], ['Expansión', 'PCIe 5.0 x16'], ['Almacenamiento', '2x M.2 + 4x SATA'], ['Red', '2.5 GbE'], ['Formato', 'ATX']] },

  // Monitores
  { slug: 'dell-s2721qs', title: 'Monitor Dell S2721QS 27" 4K', brand: 'Dell', model: 'S2721QS', price: 329.0, stock: 9, category: 'monitores',
    description: 'Monitor 4K IPS con gran fidelidad de color.',
    specs: [['Tamaño', '27"'], ['Resolución', '3840 x 2160 (4K UHD)'], ['Tasa de refresco', '60 Hz'], ['Panel', 'IPS'], ['Conectividad', 'HDMI 2.0, DisplayPort 1.2'], ['Altavoces', 'Integrados 3 W']] },
  { slug: 'lg-27gp850', title: 'Monitor LG UltraGear 27" QHD 165Hz', brand: 'LG', model: '27GP850-B', price: 379.0, stock: 8, category: 'monitores',
    description: 'Monitor gaming QHD con 165 Hz y respuesta de 1 ms.',
    specs: [['Tamaño', '27"'], ['Resolución', '2560 x 1440 (QHD)'], ['Tasa de refresco', '165 Hz'], ['Panel', 'Nano IPS'], ['Tiempo de respuesta', '1 ms'], ['Conectividad', 'HDMI 2.0, DisplayPort 1.4']] },
  { slug: 'samsung-odyssey-g5', title: 'Monitor Samsung Odyssey G5 32" QHD', brand: 'Samsung', model: 'Odyssey G5 G50D', price: 299.0, stock: 7, category: 'monitores',
    description: 'Monitor curvo QHD de 32" con 144 Hz.',
    specs: [['Tamaño', '32"'], ['Resolución', '2560 x 1440 (QHD)'], ['Tasa de refresco', '144 Hz'], ['Panel', 'VA curvo 1000R'], ['Tiempo de respuesta', '1 ms'], ['Conectividad', 'HDMI 2.0, DisplayPort 1.2']] },
  { slug: 'asus-vg248qg', title: 'Monitor ASUS VG248QG 24" 165Hz', brand: 'ASUS', model: 'VG248QG', price: 199.0, stock: 13, category: 'monitores',
    description: 'Monitor competitivo FHD con 165 Hz y 0.5 ms.',
    specs: [['Tamaño', '24"'], ['Resolución', '1920 x 1080 (FHD)'], ['Tasa de refresco', '165 Hz'], ['Panel', 'TN'], ['Tiempo de respuesta', '0.5 ms'], ['Conectividad', 'HDMI, DisplayPort, DVI']] },
  { slug: 'benq-gw2480', title: 'Monitor BenQ GW2480 24"', brand: 'BenQ', model: 'GW2480', price: 149.0, stock: 18, category: 'monitores',
    description: 'Monitor IPS de oficina con tecnología de bajo parpadeo.',
    specs: [['Tamaño', '24"'], ['Resolución', '1920 x 1080 (FHD)'], ['Tasa de refresco', '60 Hz'], ['Panel', 'IPS'], ['Conectividad', 'HDMI, DisplayPort, VGA'], ['Extras', 'Eye-Care, altavoces']] },
  { slug: 'acer-nitro-vg271u', title: 'Monitor Acer Nitro VG271U 27"', brand: 'Acer', model: 'Nitro VG271U M3', price: 229.0, stock: 11, category: 'monitores',
    description: 'Monitor WQHD IPS de 27" con 144 Hz.',
    specs: [['Tamaño', '27"'], ['Resolución', '2560 x 1440 (WQHD)'], ['Tasa de refresco', '144 Hz'], ['Panel', 'IPS'], ['Tiempo de respuesta', '1 ms'], ['Conectividad', 'HDMI 2.0, DisplayPort 1.2']] },

  // Periféricos
  { slug: 'logitech-mx-master-3s', title: 'Ratón Logitech MX Master 3S', brand: 'Logitech', model: 'MX Master 3S', price: 99.0, stock: 22, category: 'perifericos',
    description: 'Ratón inalámbrico de productividad con sensor de 8000 DPI.',
    specs: [['Tipo', 'Inalámbrico (Bluetooth + receptor USB)'], ['DPI', '8000'], ['Botones', '7 programables'], ['Rueda', 'MagSpeed electromagnética'], ['Batería', 'Hasta 70 días'], ['Compatibilidad', 'Windows, macOS, Linux']] },
  { slug: 'logitech-mx-keys', title: 'Teclado Logitech MX Keys', brand: 'Logitech', model: 'MX Keys', price: 119.0, stock: 17, category: 'perifericos',
    description: 'Teclado inalámbrico retroiluminado para escribir con comodidad.',
    specs: [['Tipo', 'Inalámbrico (Bluetooth + receptor USB)'], ['Retroiluminación', 'Sí, con sensor de proximidad'], ['Distribución', 'Español (ES)'], ['Batería', 'Hasta 10 días con luz'], ['Compatibilidad', 'Windows, macOS, Linux'], ['Extras', 'Carga USB-C']] },
  { slug: 'logitech-c920', title: 'Cámara Logitech C920 HD Pro', brand: 'Logitech', model: 'C920 HD Pro', price: 79.0, stock: 20, category: 'perifericos',
    description: 'Cámara web Full HD 1080p con micrófonos duales.',
    specs: [['Resolución', '1080p a 30 fps'], ['Micrófono', 'Doble, estéreo'], ['Enfoque', 'Automático'], ['Campo de visión', '78°'], ['Conexión', 'USB-A'], ['Compatibilidad', 'Zoom, Teams, Meet']] },
  { slug: 'hyperx-cloud-ii', title: 'Audífonos HyperX Cloud II', brand: 'HyperX', model: 'Cloud II', price: 89.0, stock: 15, category: 'perifericos',
    description: 'Headset gaming con sonido envolvente 7.1 virtual.',
    specs: [['Tipo', 'Diadema cerrada'], ['Drivers', '53 mm'], ['Sonido', '7.1 virtual (USB)'], ['Micrófono', 'Desmontable con cancelación de ruido'], ['Conexión', 'USB / 3.5 mm'], ['Compatibilidad', 'PC, PS4, Xbox, Switch']] },
  { slug: 'blue-yeti', title: 'Micrófono Blue Yeti', brand: 'Blue', model: 'Yeti', price: 129.0, stock: 9, category: 'perifericos',
    description: 'Micrófono USB de condensador con múltiples patrones.',
    specs: [['Tipo', 'Condensador USB'], ['Patrones', 'Cardioide, bidireccional, omnidireccional, estéreo'], ['Frecuencia', '20 Hz - 20 kHz'], ['Controles', 'Ganancia, mute, volumen'], ['Salida', 'Auriculares 3.5 mm'], ['Compatibilidad', 'Windows, macOS']] },
  { slug: 'logitech-z313', title: 'Parlantes Logitech Z313', brand: 'Logitech', model: 'Z313', price: 39.0, stock: 26, category: 'perifericos',
    description: 'Sistema de bocinas 2.1 con subwoofer.',
    specs: [['Canales', '2.1'], ['Potencia', '25 W RMS'], ['Subwoofer', 'Incluido'], ['Control', 'De volumen con cable'], ['Entrada', '3.5 mm'], ['Compatibilidad', 'PC, consolas, TV']] },

  // Accesorios
  { slug: 'cable-hdmi-2m', title: 'Cable HDMI 2.1 2m', brand: 'Ugreen', model: 'HDMI 2.1', price: 12.0, stock: 50, category: 'accesorios',
    description: 'Cable HDMI 2.1 que soporta 8K a 60 Hz.',
    specs: [['Versión', 'HDMI 2.1'], ['Resolución máxima', '8K a 60 Hz / 4K a 120 Hz'], ['Longitud', '2 metros'], ['Conectores', 'HDMI macho a macho'], ['Material', 'Nylon trenzado'], ['Compatibilidad', 'TV, monitores, consolas']] },
  { slug: 'usb-hub-7-en-1', title: 'Hub USB-C 7 en 1', brand: 'Anker', model: 'PowerExpand 7-en-1', price: 49.0, stock: 19, category: 'accesorios',
    description: 'Hub USB-C con HDMI, lector de tarjetas y carga de 100 W.',
    specs: [['Puertos', 'HDMI, 2x USB-A, USB-C PD, SD, microSD'], ['Salida de video', '4K a 30 Hz'], ['Carga', 'Hasta 100 W Power Delivery'], ['Material', 'Aluminio'], ['Conexión', 'USB-C'], ['Compatibilidad', 'Windows, macOS, iPadOS']] },
  { slug: 'mousepad-xl', title: 'Mousepad XL Gamer', brand: 'Razer', model: 'Gigantus V2', price: 29.0, stock: 34, category: 'accesorios',
    description: 'Mousepad extra grande con superficie de tela microtexturizada.',
    specs: [['Tamaño', '900 x 400 mm'], ['Superficie', 'Tela microtexturizada'], ['Base', 'Antideslizante de goma'], ['Grosor', '3 mm'], ['Bordes', 'Cosidos reforzados'], ['Uso', 'Gaming y oficina']] },
  { slug: 'mochila-laptop', title: 'Mochila para Laptop 15.6"', brand: 'Kensington', model: 'Classic Backpack', price: 45.0, stock: 14, category: 'accesorios',
    description: 'Mochila acolchada e impermeable para laptops de hasta 15.6".',
    specs: [['Compatibilidad', 'Laptops de hasta 15.6"'], ['Compartimento', 'Acolchado para laptop'], ['Material', 'Polyester resistente al agua'], ['Bolsillos', 'Frontales y laterales'], ['Color', 'Negro'], ['Extras', 'Correa para maleta']] },
  { slug: 'soporte-monitor-brazo', title: 'Soporte para Monitor con Brazo', brand: 'North Bayou', model: 'NB F80', price: 35.0, stock: 21, category: 'accesorios',
    description: 'Brazo articulado para monitores de 17" a 32".',
    specs: [['Compatibilidad', 'Monitores de 17" a 32"'], ['Montaje', 'VESA 75 x 75 / 100 x 100'], ['Peso soportado', 'Hasta 9 kg'], ['Ajustes', 'Altura, inclinación y giro'], ['Instalación', 'Abrazadera o perforación'], ['Cableado', 'Organizador integrado']] },
  { slug: 'base-refrigerante', title: 'Base Refrigerante para Laptop', brand: 'Klim', model: 'Cool+', price: 25.0, stock: 28, category: 'accesorios',
    description: 'Base con ventilador para mantener fresca la laptop.',
    specs: [['Ventiladores', '1 de 120 mm'], ['Alturas', '5 posiciones'], ['Alimentación', 'USB'], ['Compatibilidad', 'Laptops de 11" a 17"'], ['Material', 'Plástico + malla metálica'], ['Ruido', 'Bajo (< 30 dB)']] }
]

function categoryOf(product) {
  return byCategory[product.category]
}

function longDescription(product) {
  const specs = product.specs.map(([label, value]) => `${label}: ${value}`).join('; ')
  return `${product.title} de la marca ${product.brand} (modelo ${product.model}). ${product.description} Características principales: ${specs}.`
}

function svg(text, color, icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${color}" />
      <stop offset="1" stop-color="${color}" stop-opacity="0.75" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" />
  <rect x="24" y="24" width="752" height="552" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="4" rx="24" />
  <text x="400" y="330" font-size="160" text-anchor="middle">${icon}</text>
  <text x="400" y="520" font-size="34" font-family="Segoe UI, Arial, sans-serif" fill="#ffffff" text-anchor="middle">${text}</text>
</svg>
`
}

// Escribir categorías
for (const c of categories) {
  const doc = {
    slug: c.slug,
    title: c.title,
    description: c.description,
    image: `/images/categories/${c.slug}.svg`,
    icon: c.icon
  }
  const file = resolve(root, 'content', 'categories', `${c.slug}.json`)
  writeFileSync(file, JSON.stringify(doc, null, 2) + '\n', 'utf8')
  writeFileSync(resolve(root, 'public', 'images', 'categories', `${c.slug}.svg`), svg(c.title, c.color, c.icon), 'utf8')
}

// Escribir productos
for (const p of products) {
  const cat = categoryOf(p)
  const doc = {
    slug: p.slug,
    title: p.title,
    description: p.description,
    longDescription: longDescription(p),
    category: p.category,
    image: `/images/products/${p.slug}.svg`,
    price: p.price,
    brand: p.brand,
    model: p.model,
    stock: p.stock,
    specs: p.specs.map(([label, value]) => ({ label, value }))
  }
  const file = resolve(root, 'content', 'products', `${p.slug}.json`)
  writeFileSync(file, JSON.stringify(doc, null, 2) + '\n', 'utf8')
  writeFileSync(resolve(root, 'public', 'images', 'products', `${p.slug}.svg`), svg(p.title, cat.color, cat.icon), 'utf8')
}

console.log(`Generado: ${categories.length} categorías y ${products.length} productos.`)
