import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    categories: defineCollection({
      type: 'data',
      source: 'categories/*.json',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        icon: z.string()
      })
    }),
    products: defineCollection({
      type: 'data',
      source: 'products/**/*.json',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        longDescription: z.string(),
        category: z.string(),
        image: z.string(),
        price: z.number(),
        brand: z.string(),
        model: z.string(),
        stock: z.number(),
        specs: z.array(z.object({ label: z.string(), value: z.string() }))
      })
    })
  }
})
