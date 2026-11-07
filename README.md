# Tienda de Computadoras — Proyecto 2

Aplicación de comercio electrónico desarrollada con **Nuxt** (y **Nuxt Content**),
**Snipcart** (carrito y pagos) y **Utterances** (comentarios). Tema asignado:
**tienda de computadoras**.

## Requisitos

- Node.js 20 o superior (se probó con Node 24).
- npm.

## Puesta en marcha (desarrollo)

```bash
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:3000`.

> Para que el carrito de Snipcart funcione localmente se necesita una clave pública.
> Copia `.env.example` a `.env` y completa `NUXT_PUBLIC_SNIPCART_API_KEY`. Mientras
> el sitio esté en `localhost`, Snipcart muestra el carrito pero **no puede validar
> el pago** (su servidor no alcanza `localhost`); para comprar hay que publicar el sitio.

## Contenido y catálogo

El catálogo vive como **documentos JSON** dentro de [`content/`](./content):

- [`content/categories/*.json`](./content/categories) — 6 categorías
  (laptops, desktops, componentes, monitores, periféricos, accesorios).
- [`content/products/*.json`](./content/products) — **36 artículos**, cada uno con
  nombre, descripción, categoría, imagen, precio, marca, modelo, existencias y
  características específicas (`specs`).

Los documentos JSON y las imágenes SVG de ejemplo se generan a partir del catálogo
definido en [`scripts/generate-catalog.mjs`](./scripts/generate-catalog.mjs). Para
regenerarlos tras modificar el catálogo:

```bash
node scripts/generate-catalog.mjs
```

El esquema de las colecciones se define en [`content.config.ts`](./content.config.ts)
con Nuxt Content.

## Funcionalidades

- **Organización por categorías**: página inicial con las categorías, página por
  categoría con sus artículos y página de detalle de cada artículo.
- **Búsqueda**: campo de búsqueda en el encabezado y página `/search`.
- **Paginación**: los artículos de cada categoría y el listado general se muestran
  con paginación (4 y 8 por página, respectivamente).
- **Comercio electrónico (Snipcart)**: botón "Comprar" en cada artículo (tarjeta y
  detalle) y enlace al carrito en el menú principal con contador de artículos.
- **Comentarios (Utterances)**: sección de comentarios por artículo en la página de
  detalle.

## Configuración (variables de entorno)

Las variables se definen en `runtimeConfig.public` de
[`nuxt.config.ts`](./nuxt.config.ts) y se sobrescriben en producción mediante
variables de entorno (ver [`.env.example`](./.env.example)):

| Variable | Descripción |
| --- | --- |
| `NUXT_PUBLIC_SNIPCART_API_KEY` | Clave **pública** de API de Snipcart (modo de prueba). Nunca uses la clave secreta. |
| `NUXT_PUBLIC_SITE_URL` | Dirección pública del sitio (p. ej. `https://mi-sitio.netlify.app`). Snipcart la usa para validar cada compra. |
| `NUXT_PUBLIC_UTTERANCES_REPO` | Repositorio público de GitHub (`usuario/repositorio`) para los comentarios. |

### Snipcart

1. Crea una cuenta en [snipcart.com](https://snipcart.com) y obtén la clave pública
   de prueba (Account → API keys).
2. Configúrala en `.env` (desarrollo) y como variable de entorno en el hosting.
3. En el panel de Snipcart (sección **Domains**), registra el dominio del sitio
   publicado. Mientras la cuenta esté en modo de prueba se puede comprar con las
   tarjetas de prueba de la documentación de Snipcart.

### Utterances

1. Crea (o usa) un repositorio público de GitHub donde se guardarán los comentarios
   como issues.
2. Instala la aplicación [Utterances](https://github.com/apps/utterances) en ese repositorio.
3. Configura `NUXT_PUBLIC_UTTERANCES_REPO=usuario/repositorio`.

## Publicación en Netlify

El repositorio incluye [`netlify.toml`](./netlify.toml) con:

- Build command: `npm run generate`
- Publish directory: `dist` (en Netlify, `nuxt generate` genera en `dist`; localmente genera en `.output/public`)

Pasos:

1. Sube el proyecto a un repositorio de GitHub.
2. En Netlify: **Add new site → Import an existing project** y selecciona el repositorio.
3. En **Site configuration → Environment variables** define:
   - `NUXT_PUBLIC_SNIPCART_API_KEY`
   - `NUXT_PUBLIC_SITE_URL`
   - `NUXT_PUBLIC_UTTERANCES_REPO`
4. Publica. Tras cambiar una variable de entorno hay que volver a desplegar.

También puedes generar el sitio localmente con `npm run generate` y previsualizarlo:

```bash
npx serve .output/public
```

## Estructura

```text
app/
  assets/css/main.css     # estilos globales
  components/             # HeaderView, FooterView, ProductCard, BuyButton, Pagination, CommentsSection
  layouts/default.vue     # layout con encabezado y pie
  pages/
    index.vue             # portada: categorías + destacados
    categories/index.vue  # listado de categorías
    categories/[slug].vue # artículos de una categoría (paginación)
    products/index.vue    # todos los productos (paginación)
    products/[slug].vue   # detalle + compra + comentarios
    search.vue            # búsqueda
  plugins/snipcart.client.ts  # carga y configura Snipcart en el navegador
content/                  # documentos JSON del catálogo
public/images/            # imágenes SVG de ejemplo
scripts/generate-catalog.mjs # generador del catálogo
content.config.ts         # esquema de las colecciones de Nuxt Content
nuxt.config.ts            # configuración de Nuxt y runtimeConfig
```
