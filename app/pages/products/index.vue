<script setup lang="ts">
const route = useRoute()

const { data: products } = await useAsyncData('all-products', () =>
  queryCollection('products').all()
)

const PAGE_SIZE = 8
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
    <h1>Productos</h1>
    <p class="result-count">{{ products?.length ?? 0 }} artículo(s) en total</p>

    <div class="product-grid">
      <ProductCard v-for="product in paginatedProducts" :key="product.slug" :product="product" />
    </div>

    <Pagination :current-page="currentPage" :total-pages="totalPages" />
  </div>
</template>
