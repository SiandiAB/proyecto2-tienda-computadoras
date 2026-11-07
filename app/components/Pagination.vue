<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
  }>(),
  {
    currentPage: 1,
    totalPages: 1
  }
)

const route = useRoute()

function pageLink(page: number | string) {
  const n = Math.min(props.totalPages, Math.max(1, Number(page)))
  return {
    path: route.path,
    query: { ...route.query, page: n > 1 ? String(n) : undefined }
  }
}

// Rango de páginas a mostrar (con elipsis para catálogos grandes).
const items = computed<Array<number | string>>(() => {
  const total = props.totalPages
  const current = props.currentPage
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const wanted = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = Array.from(wanted)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
  const out: Array<number | string> = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) out.push('…')
    out.push(p)
    prev = p
  }
  return out
})
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Paginación">
    <NuxtLink
      v-if="currentPage > 1"
      class="page-link"
      :to="pageLink(currentPage - 1)"
      aria-label="Página anterior"
    >
      ‹ Anterior
    </NuxtLink>
    <span v-else class="page-link disabled">‹ Anterior</span>

    <template v-for="item in items" :key="item">
      <span v-if="item === '…'" class="page-link disabled">…</span>
      <NuxtLink v-else class="page-link" :class="{ active: item === currentPage }" :to="pageLink(item)">
        {{ item }}
      </NuxtLink>
    </template>

    <NuxtLink
      v-if="currentPage < totalPages"
      class="page-link"
      :to="pageLink(currentPage + 1)"
      aria-label="Página siguiente"
    >
      Siguiente ›
    </NuxtLink>
    <span v-else class="page-link disabled">Siguiente ›</span>
  </nav>
</template>
