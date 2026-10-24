<script setup lang="ts">
useSeoMeta({
  title: 'Uses — Jaraslau Kunin',
  description: 'Languages, frameworks and tools Jaraslau Kunin uses.',
})

const categories = [
  {
    title: 'languages',
    items: ['c++', 'python', 'typescript', 'java', 'kotlin', 'sql'],
  },
  {
    title: 'frameworks',
    items: ['qt-6', 'django', 'vue', 'nuxt', 'kivy', 'react-native'],
  },
  {
    title: 'storage',
    items: ['postgresql', 'mysql', 'sqlite', 'supabase'],
  },
  {
    title: 'tools',
    items: [
      'qt-creator',
      'jetbrains-pycharm',
      'vscode',
      'xcode',
      'git',
      'github',
      'github-actions',
      'docker',
      'buildozer',
      'npm',
    ],
  },
  {
    title: 'platform',
    items: ['macos', 'ios', 'android'],
  },
]
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ cat uses.md
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Uses.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      Languages, frameworks and tools I use day to day.
    </p>

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
          v-for="category in categories"
          :key="category.title"
          class="terminal-card rounded-xl p-5"
      >
        <p class="text-xs text-[#a3ff12]">./{{ category.title }}</p>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
              v-for="item in category.items"
              :key="item"
              class="rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
