<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Projects — Jaraslau Kunin',
  description: 'All software projects by Jaraslau Kunin.',
})

const sortKeys = [
  { key: 'recent', label: 'recent' },
  { key: 'year', label: 'year' },
  { key: 'name', label: 'name' },
  { key: 'team', label: 'team' },
]

const activeSort = ref('recent')

const sortedProjects = computed(() => {
  const list = [...projects]

  if (activeSort.value === 'recent') {
    list.sort(
        (a, b) =>
            b.updated.localeCompare(a.updated) ||
            b.year.localeCompare(a.year),
    )
  } else if (activeSort.value === 'year') {
    list.sort((a, b) => b.year.localeCompare(a.year))
  } else if (activeSort.value === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  } else if (activeSort.value === 'team') {
    list.sort((a, b) => b.team.size - a.team.size)
  }

  return list
})
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ ls ./projects -la
      --sort=
      <button
          v-for="sortKey in sortKeys"
          :key="sortKey.key"
          type="button"
          class="transition after:content-['|'] after:mx-1.5 after:text-zinc-700 last:after:content-['']"
          :class="
              activeSort === sortKey.key
                  ? 'text-[#a3ff12]'
                  : 'text-zinc-500 hover:text-[#a3ff12]'
          "
          @click="activeSort = sortKey.key"
      >
        {{ sortKey.label }}
      </button>
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Projects archive.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      {{ projects.length }} entries — every public repository, solo work and
      team products I have designed and built.
    </p>

    <div class="mt-10 grid gap-4 md:grid-cols-2">
      <ProjectCard
          v-for="project in sortedProjects"
          :key="project.slug"
          :project="project"
      />
    </div>
  </section>
</template>
