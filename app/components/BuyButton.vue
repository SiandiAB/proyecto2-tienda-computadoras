<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

defineProps<{
  product: ParsedContent
}>()

const { siteUrl } = useRuntimeConfig().public
</script>

<template>
  <button
    class="snipcart-add-item buy-button"
    :data-item-id="product.slug"
    :data-item-name="product.title"
    :data-item-price="product.price"
    :data-item-url="`${siteUrl}/products/${product.slug}`"
    :data-item-description="product.description"
    :data-item-image="`${siteUrl}${product.image}`"
  >
    🛒 Comprar
  </button>
</template>
