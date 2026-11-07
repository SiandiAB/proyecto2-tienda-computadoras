<script setup lang="ts">
const cartCount = useState('cart-count', () => 0)
const q = ref('')
const router = useRouter()

function onSubmit() {
  router.push({ path: '/search', query: q.value.trim() ? { q: q.value.trim() } : {} })
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink class="brand" to="/">🖥️ Tienda de Computadoras</NuxtLink>

      <nav class="nav">
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/categories">Categorías</NuxtLink>
        <NuxtLink to="/products">Productos</NuxtLink>
      </nav>

      <form class="search-form" @submit.prevent="onSubmit">
        <input v-model="q" type="search" placeholder="Buscar productos…" aria-label="Buscar productos" />
        <button class="button" type="submit">Buscar</button>
      </form>

      <button class="snipcart-checkout cart-button" aria-label="Abrir carrito de compras">
        <ClientOnly>
          <span>{{ cartCount }} artículo(s) en el 🛒</span>
        </ClientOnly>
      </button>
    </div>
  </header>
</template>
