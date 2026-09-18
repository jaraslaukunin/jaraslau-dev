<script setup lang="ts">
const route = useRoute()

const links = [
  { label: 'projects', to: '/projects' },
  { label: 'about', to: '/about' },
  { label: 'now', to: '/now' },
  { label: 'uses', to: '/uses' },
]

const isActive = (to: string) => {
  return route.path === to || (to !== '/' && route.path.startsWith(`${to}/`))
}
</script>

<template>
  <header
      class="sticky top-0 z-50 border-b border-zinc-800/90 bg-[#09090b]/80 backdrop-blur-xl"
  >
    <nav
        class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10"
    >
      <NuxtLink to="/" class="group flex items-center gap-2 text-sm font-semibold">
        <span class="text-[#a3ff12]">$</span>
        <span>jaraslau.dev</span>
        <span
            class="cursor scale-75 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </NuxtLink>

      <div class="hidden items-center gap-5 text-xs text-zinc-400 md:flex">
        <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="transition hover:text-[#a3ff12]"
            :class="{ 'text-[#a3ff12]': isActive(link.to) }"
        >
          ./{{ link.label }}
        </NuxtLink>
      </div>

      <a
          href="https://github.com/jaraslaukunin"
          target="_blank"
          rel="noreferrer"
          class="rounded-md border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:border-[#a3ff12] hover:text-[#a3ff12]"
      >
        GitHub ↗
      </a>
    </nav>
  </header>
</template>