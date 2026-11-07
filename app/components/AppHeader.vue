<script setup lang="ts">
const route = useRoute()
const links = [
  { label: 'projects', to: '/projects' },
  { label: 'about', to: '/about' },
  { label: 'resume', to: '/resume' },
  { label: 'courses', to: '/courses' },
  { label: 'contacts', to: '/contacts' },
]
const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-800/90 bg-[#09090b]/80 backdrop-blur-xl">
    <nav aria-label="Main navigation" class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 px-5 sm:px-8 lg:px-10">
      <NuxtLink to="/" aria-label="jaraslau.dev home" class="group flex h-16 shrink-0 items-center gap-2 text-sm font-semibold">
        <span class="text-[#a3ff12]">$</span>
        <span>jaraslau.dev</span>
        <span class="cursor scale-75 opacity-0 transition-opacity group-hover:opacity-100" />
      </NuxtLink>

      <div class="order-last flex w-full items-center gap-5 overflow-x-auto border-t border-zinc-800/60 py-1 text-xs text-zinc-400 md:order-none md:w-auto md:border-0 md:py-0">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          class="flex min-h-11 shrink-0 items-center whitespace-nowrap transition-colors hover:text-[#a3ff12]"
          :class="{ 'text-[#a3ff12]': isActive(link.to) }">
          ./{{ link.label }}
        </NuxtLink>
      </div>

      <a href="https://github.com/jaraslaukunin" target="_blank" rel="noopener noreferrer"
        aria-label="GitHub profile (opens in a new tab)"
        class="flex min-h-11 shrink-0 items-center rounded-md border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-[#a3ff12] hover:text-[#a3ff12]">
        GitHub ↗
      </a>
    </nav>
  </header>
</template>
