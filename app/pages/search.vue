<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const q = ref(String(route.query.q || ''))

// Mantiene el campo sincronizado cuando se navega desde el buscador del encabezado.
watch(
  () => route.query.q,
  (val) => {
    q.value = String(val || '')
  }
)

const { data: products } = await useAsyncData('search-products', () =>
  queryCollection('products').all()
)

const results = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return []

  return (products.value || []).filter((p) => {
    const haystack = [p.title, p.description, p.longDescription, p.brand, p.model, p.category]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
})

function onSubmit() {
  router.push({ path: '/search', query: q.value.trim() ? { q: q.value.trim() } : {} })
}
</script>

<template>
  <div>
    <h1>Búsqueda</h1>

    <div class="search-hero">
      <form @submit.prevent="onSubmit">
        <input v-model="q" type="search" placeholder="Buscar productos…" aria-label="Buscar productos" />
      </form>
    </div>

    <p class="result-count">
      {{ q.trim() ? `${results.length} resultado(s) para “${q.trim()}”` : 'Escribe una palabra clave para buscar.' }}
    </p>

    <div v-if="results.length" class="product-grid">
      <ProductCard v-for="product in results" :key="product.slug" :product="product" />
    </div>
    <p v-else-if="q.trim()">No se encontraron productos que coincidan con la búsqueda.</p>
  </div>
</template>
