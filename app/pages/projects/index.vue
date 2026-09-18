<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Projects — Jaraslau Kunin',
  description: 'Selected software projects by Jaraslau Kunin.',
})
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ ls ./projects -la
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Projects archive.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      Products, experiments and engineering work I have designed and built.
    </p>

    <div class="mt-10 grid gap-4 md:grid-cols-2">
      <ProjectCard
          v-for="project in projects"
          :key="project.slug"
          :project="project"
      />
    </div>
  </section>
</template>