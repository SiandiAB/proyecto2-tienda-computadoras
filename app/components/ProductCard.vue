<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

defineProps<{
  product: ParsedContent
}>()

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
</script>

<template>
  <article class="product-card">
    <NuxtLink :to="`/products/${product.slug}`">
      <img :src="product.image" :alt="product.title" loading="lazy" />
    </NuxtLink>
    <div class="product-card-body">
      <h3>
        <NuxtLink :to="`/products/${product.slug}`">{{ product.title }}</NuxtLink>
      </h3>
      <span class="brand">{{ product.brand }} · {{ product.model }}</span>
      <span class="price">{{ formatPrice(product.price) }}</span>
      <div class="actions">
        <BuyButton :product="product" />
        <NuxtLink class="button" :to="`/products/${product.slug}`">Ver detalle</NuxtLink>
      </div>
    </div>
  </article>
</template>
