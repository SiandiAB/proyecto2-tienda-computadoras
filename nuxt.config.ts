export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  srcDir: 'app',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content'],
  runtimeConfig: {
    public: {
      // Se sobrescriben en producción con NUXT_PUBLIC_SNIPCART_API_KEY y
      // NUXT_PUBLIC_SITE_URL (ver .env.example y README.md).
      snipcartApiKey: 'CLAVE_PUBLICA_DE_PRUEBA',
      siteUrl: 'http://localhost:3000',
      utterancesRepo: 'tu-usuario/tu-repo'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tienda de computadoras: laptops, componentes, monitores y más.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
