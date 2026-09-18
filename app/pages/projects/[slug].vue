<script setup lang="ts">
import { projects } from '~/data/projects'

const route = useRoute()

const project = computed(() =>
    projects.find((item) => item.slug === route.params.slug),
)

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  })
}

useSeoMeta({
  title: () => `${project.value?.name} — Jaraslau Kunin`,
  description: () => project.value?.description ?? '',
})

const formatUpdated = (iso: string) => {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>

<template>
  <article v-if="project">
    <NuxtLink
        to="/projects"
        class="mb-10 inline-block text-sm text-zinc-500 transition hover:text-[#a3ff12]"
    >
      ← cd ..
    </NuxtLink>

    <header class="border-b border-zinc-800 pb-10">
      <p class="text-xs text-[#a3ff12]">./{{ project.type }}</p>

      <h1
          class="mt-4 text-4xl font-semibold tracking-[-0.05em] text-zinc-100 sm:text-6xl"
      >
        {{ project.name }}
      </h1>

      <p class="mt-6 max-w-3xl text-base leading-8 text-zinc-400">
        {{ project.description }}
      </p>

      <div class="mt-8 flex flex-wrap gap-2">
        <span
            v-for="item in project.stack"
            :key="item"
            class="rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300"
        >
          {{ item }}
        </span>
      </div>
    </header>

    <div class="grid gap-10 py-12 lg:grid-cols-[0.9fr_1.6fr]">
      <aside class="space-y-7 text-sm">
        <div>
          <p class="mb-2 text-xs text-zinc-500">YEAR</p>
          <p class="text-zinc-200">{{ project.year }}</p>
        </div>

        <div>
          <p class="mb-2 text-xs text-zinc-500">STATUS</p>
          <p class="text-[#a3ff12]">{{ project.status }}</p>
        </div>

        <div>
          <p class="mb-2 text-xs text-zinc-500">ROLE</p>
          <p class="leading-6 text-zinc-300">{{ project.role }}</p>
        </div>

        <div>
          <p class="mb-2 text-xs text-zinc-500">LINKS</p>
          <div class="space-y-2">
            <a
                :href="project.repo"
                target="_blank"
                rel="noreferrer"
                class="block text-[#a3ff12] transition hover:underline"
            >
              source_repo() ↗
            </a>
            <a
                v-if="project.site"
                :href="project.site"
                target="_blank"
                rel="noreferrer"
                class="block text-[#a3ff12] transition hover:underline"
            >
              visit_site() ↗
            </a>
          </div>
        </div>
      </aside>

      <div>
        <h2 class="text-xl font-semibold text-zinc-100">What it does.</h2>

        <ul class="mt-6 space-y-3">
          <li
              v-for="feature in project.features"
              :key="feature"
              class="flex gap-3 text-sm leading-6 text-zinc-400"
          >
            <span class="text-[#a3ff12]">›</span>
            {{ feature }}
          </li>
        </ul>

        <div
            class="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800"
        >
          <div class="bg-[#111114] p-4">
            <p class="text-[10px] uppercase tracking-wider text-zinc-500">language</p>
            <p class="mt-2 text-sm text-zinc-200">{{ project.language }}</p>
          </div>

          <div class="bg-[#111114] p-4">
            <p class="text-[10px] uppercase tracking-wider text-zinc-500">stars</p>
            <p class="mt-2 text-sm text-zinc-200">★ {{ project.stars }}</p>
          </div>

          <div class="bg-[#111114] p-4">
            <p class="text-[10px] uppercase tracking-wider text-zinc-500">updated</p>
            <p class="mt-2 text-sm text-zinc-200">{{ formatUpdated(project.updated) }}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
