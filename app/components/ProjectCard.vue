<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{
  project: Project
}>()

const formatUpdated = (iso: string) => {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="terminal-card group rounded-xl p-5 transition duration-200 hover:-translate-y-1">
    <div class="mb-6 flex items-start justify-between gap-4">
      <div>
        <p class="mb-2 text-xs text-[#a3ff12]">./{{ project.type }}</p>

        <h3 class="text-lg font-semibold text-zinc-100 group-hover:text-[#a3ff12]">
          {{ project.name }}
        </h3>
      </div>

      <span
          class="rounded border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400"
      >
        {{ project.status }}
      </span>
    </div>

    <p class="min-h-20 text-sm leading-6 text-zinc-400">
      {{ project.description }}
    </p>

    <div class="mt-6 flex flex-wrap gap-2">
      <span
          v-for="item in project.stack"
          :key="item"
          class="rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300"
      >
        {{ item }}
      </span>
    </div>

    <div
        class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-[11px]"
    >
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500">
        <span class="text-zinc-400">★ {{ project.stars }}</span>
        <span>{{ project.language }}</span>
        <span>updated {{ formatUpdated(project.updated) }}</span>
      </div>

      <a
          :href="project.repo"
          target="_blank"
          rel="noreferrer"
          class="text-[#a3ff12] transition hover:underline"
      >
        repo ↗
      </a>
    </div>

    <p class="mt-4 text-xs text-[#a3ff12]">
      <NuxtLink :to="`/projects/${project.slug}`">
        open_case()
        <span class="inline-block transition group-hover:translate-x-1">→</span>
      </NuxtLink>
    </p>
  </div>
</template>
