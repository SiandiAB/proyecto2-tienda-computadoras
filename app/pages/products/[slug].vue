<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: product } = await useAsyncData(`product-${slug.value}`, () =>
  queryCollection('products').where('slug', '=', slug.value).first()
)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' })
}

const { data: category } = await useAsyncData(`product-category-${product.value.category}`, () =>
  queryCollection('categories').where('slug', '=', product.value.category).first()
)

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
</script>

<template>
  <div>
    <p>
      <NuxtLink :to="category ? `/categories/${category.slug}` : '/products'">← Volver</NuxtLink>
    </p>

    <article class="product-detail">
      <img :src="product.image" :alt="product.title" />

      <div>
        <h1>{{ product.title }}</h1>
        <p class="brand">
          Marca: <NuxtLink :to="`/search?q=${encodeURIComponent(product.brand)}`">{{ product.brand }}</NuxtLink>
          · Modelo: {{ product.model }}
        </p>
        <p v-if="category">
          Categoría:
          <NuxtLink :to="`/categories/${category.slug}`">{{ category.icon }} {{ category.title }}</NuxtLink>
        </p>

        <div class="price-big">{{ formatPrice(product.price) }}</div>
        <p>Existencias: {{ product.stock }} unidad(es)</p>

        <BuyButton :product="product" />

        <p style="white-space: pre-line">{{ product.longDescription }}</p>
      </div>
    </article>

    <section v-if="product.specs?.length" class="comments" style="margin-top: 28px">
      <h3>Características</h3>
      <table class="specs-table">
        <tbody>
          <tr v-for="spec in product.specs" :key="spec.label">
            <td>{{ spec.label }}</td>
            <td>{{ spec.value }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <CommentsSection />
  </div>
</template>
