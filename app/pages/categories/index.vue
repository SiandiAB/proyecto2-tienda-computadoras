<script setup lang="ts">
const { data: categories } = await useAsyncData('all-categories', () =>
  queryCollection('categories').all()
)
</script>

<template>
  <div>
    <h1>Categorías</h1>
    <p>Selecciona una categoría para ver los artículos que la componen.</p>

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
  </div>
</template>
