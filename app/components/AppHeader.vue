<script setup lang="ts">
const route = useRoute()
const progress = ref(0)
let frame = 0
const links = [
  { label: 'projects', to: '/projects' },
  { label: 'about', to: '/about' },
  { label: 'resume', to: '/resume' },
  { label: 'courses', to: '/courses' },
  { label: 'contacts', to: '/contacts' },
]
const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
const update = () => {
  if (frame) return
  frame = requestAnimationFrame(() => { progress.value = Math.min(1, Math.max(0, window.scrollY / 120)); frame = 0 })
}
onMounted(() => { update(); window.addEventListener('scroll', update, { passive: true }) })
onBeforeUnmount(() => { window.removeEventListener('scroll', update); cancelAnimationFrame(frame) })
</script>

<template>
  <div class="glass-header-space">
    <header class="glass-header" :style="{ '--dock': progress }">
      <nav aria-label="Main navigation" class="glass-nav">
        <NuxtLink to="/" aria-label="jaraslau.dev home" class="glass-brand"><span>$</span> jaraslau.dev<span class="glass-status" aria-hidden="true" /></NuxtLink>
        <div class="glass-links h-scroll">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined" :class="{ 'is-active': isActive(link.to) }">./{{ link.label }}</NuxtLink>
        </div>
        <a href="https://github.com/jaraslaukunin" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" class="glass-button glass-github">GitHub ↗</a>
      </nav>
    </header>
  </div>
</template>
