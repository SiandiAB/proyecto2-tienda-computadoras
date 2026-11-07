<script setup lang="ts">
const { data: categories } = await useAsyncData('home-categories', () =>
  queryCollection('categories').all()
)

const { data: featured } = await useAsyncData('home-featured', () =>
  queryCollection('products').all()
)

const featuredProducts = computed(() => (featured.value || []).slice(0, 4))
</script>

<template>
  <div>
    <h1>Tienda de Computadoras</h1>
    <p>
      Bienvenido a nuestra tienda en línea. Explora las categorías, busca productos y realiza
      tus compras con el carrito de Snipcart. Cada artículo cuenta con comentarios de usuarios.
    </p>

    <h2>Categorías</h2>
    <div class="category-grid">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        class="category-card"
        :to="`/categories/${category.slug}`"
      >
        <img :src="category.image" :alt="category.title" />
        <div class="category-card-body">
          <h3>{{ category.icon }} {{ category.title }}</h3>
          <p>{{ category.description }}</p>
        </div>
      </NuxtLink>
    </div>

    <h2 style="margin-top: 36px">Productos destacados</h2>
    <div class="product-grid">
      <ProductCard v-for="product in featuredProducts" :key="product.slug" :product="product" />
    </div>
  </div>
</template>
