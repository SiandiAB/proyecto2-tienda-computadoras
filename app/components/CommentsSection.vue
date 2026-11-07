<script setup lang="ts">
// Carga el widget de comentarios de Utterances. Los comentarios se guardan
// como issues en el repositorio público configurado en NUXT_PUBLIC_UTTERANCES_REPO.
const { utterancesRepo } = useRuntimeConfig().public
const commentsEnabled = computed(() => !!utterancesRepo && !utterancesRepo.includes('tu-usuario'))

function loadUtterances() {
  if (!commentsEnabled.value) return
  const el = document.getElementById('utterances-comments')
  if (!el || el.firstChild) return

  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', utterancesRepo as string)
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('label', 'comentarios')
  script.setAttribute('theme', 'github-light')
  el.appendChild(script)
}

onMounted(() => {
  loadUtterances()
})
</script>

<template>
  <section class="comments">
    <h3>💬 Comentarios</h3>
    <div v-if="!commentsEnabled" class="notice">
      Los comentarios se activan configurando <code>NUXT_PUBLIC_UTTERANCES_REPO</code> con un
      repositorio público de GitHub (formato <code>usuario/repositorio</code>) e instalando la
      aplicación Utterances en dicho repositorio.
    </div>
    <div id="utterances-comments" />
  </section>
</template>
