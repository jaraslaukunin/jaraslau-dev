<script setup lang="ts">
import { courses } from '~/data/courses'

useSeoMeta({
  title: 'Courses — Jaraslau Kunin',
  description: 'Courses and certifications completed by Jaraslau Kunin.',
})
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ ls ./courses -la
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Courses.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      Courses, certifications and structured learning I have completed or am
      working through.
    </p>

    <div class="mt-10 grid gap-4 md:grid-cols-2">
      <div
          v-for="course in courses"
          :key="course.title"
          class="terminal-card group rounded-xl p-5 transition duration-200 hover:-translate-y-1"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <p class="text-xs text-[#a3ff12]">./{{ course.platform }}</p>

            <h2
                class="mt-2 text-lg font-semibold text-zinc-100 transition group-hover:text-[#a3ff12]"
            >
              {{ course.title }}
            </h2>
          </div>

          <span
              class="rounded border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400"
          >
            {{ course.status }}
          </span>
        </div>

        <p class="text-sm leading-6 text-zinc-400">
          {{ course.description }}
        </p>

        <div class="mt-5 flex flex-wrap gap-2">
          <span
              v-for="skill in course.skills"
              :key="skill"
              class="rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300"
          >
            {{ skill }}
          </span>
        </div>

        <div
            class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-[11px] text-zinc-500"
        >
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span class="text-zinc-400">{{ course.year }}</span>
            <span v-if="course.hours !== '—'">{{ course.hours }}</span>
          </div>

          <a
              v-if="course.url"
              :href="course.url"
              target="_blank"
              rel="noreferrer"
              class="text-[#a3ff12] transition hover:underline"
          >
            certificate() ↗
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
