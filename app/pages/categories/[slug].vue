<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: category } = await useAsyncData(`category-${slug.value}`, () =>
  queryCollection('categories').where('slug', '=', slug.value).first()
)

const { data: products } = await useAsyncData(`category-products-${slug.value}`, () =>
  queryCollection('products').where('category', '=', slug.value).all()
)

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada' })
}

const PAGE_SIZE = 4
const totalPages = computed(() => Math.max(1, Math.ceil((products.value?.length || 0) / PAGE_SIZE)))
const currentPage = computed(() => Math.min(totalPages.value, Math.max(1, Number(route.query.page) || 1)))
const paginatedProducts = computed(() => {
  const list = products.value || []
  const start = (currentPage.value - 1) * PAGE_SIZE
  return list.slice(start, start + PAGE_SIZE)
})
</script>

<template>
  <div>
    <p>
      <NuxtLink to="/categories">← Todas las categorías</NuxtLink>
    </p>

    <h1>{{ category.icon }} {{ category.title }}</h1>
    <p>{{ category.description }}</p>
    <p class="result-count">{{ products?.length ?? 0 }} artículo(s) en esta categoría</p>

    <div v-if="paginatedProducts.length" class="product-grid">
      <ProductCard v-for="product in paginatedProducts" :key="product.slug" :product="product" />
    </div>
    <p v-else>No hay artículos en esta categoría.</p>

    <Pagination :current-page="currentPage" :total-pages="totalPages" />
  </div>
</template>
