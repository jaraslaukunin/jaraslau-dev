<script setup lang="ts">
import { events } from '~/data/profile'

useSeoMeta({
  title: 'Resume — Jaraslau Kunin',
  description:
      'Career, events, stack proficiency levels and languages of Jaraslau Kunin.',
})

const formatEventDate = (iso: string) => {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ cat resume.md
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Resume.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      Career, events, stack proficiency on a 1–10 scale and languages I speak.
    </p>

    <div class="mt-12">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ git log --career
      </p>

      <h2 class="mt-4 text-xl font-semibold text-zinc-100">Career.</h2>

      <div class="mt-6">
        <CareerLog />
      </div>
    </div>

    <div class="mt-14">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ ls ./events -la
      </p>

      <h2 class="mt-4 text-xl font-semibold text-zinc-100">Events.</h2>

      <div class="mt-6 grid gap-4 lg:grid-cols-2">
        <div
            v-for="event in events"
            :key="event.name"
            class="terminal-card rounded-xl p-6"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs text-[#a3ff12]">{{ formatEventDate(event.date) }}</p>

              <h3 class="mt-2 text-lg font-semibold text-zinc-100">
                {{ event.name }}
              </h3>

              <p class="mt-1 text-xs text-zinc-500">{{ event.place }}</p>
            </div>

            <span
                v-if="event.result"
                class="rounded border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400"
            >
              {{ event.result }}
            </span>
          </div>

          <p class="mt-4 text-sm leading-6 text-zinc-400">
            {{ event.description }}
          </p>

          <div class="mt-5">
            <TeamList :team="event.team" />
          </div>

          <a
              v-if="event.url"
              :href="event.url"
              target="_blank"
              rel="noreferrer"
              class="mt-5 inline-block text-xs text-[#a3ff12] transition hover:underline"
          >
            source_repo() ↗
          </a>
        </div>
      </div>
    </div>

    <div class="mt-14">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ ./stack --levels
      </p>

      <h2 class="mt-4 text-xl font-semibold text-zinc-100">Stack.</h2>

      <p class="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
        Self-assessed proficiency, 1–10.
      </p>

      <div class="mt-6">
        <StackLevels />
      </div>
    </div>

    <div class="mt-14">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ locale -a
      </p>

      <h2 class="mt-4 text-xl font-semibold text-zinc-100">Languages.</h2>

      <div class="mt-6">
        <LanguagesPanel />
      </div>
    </div>

    <div class="mt-12 flex flex-wrap gap-3">
      <NuxtLink
          to="/courses"
          class="rounded-md bg-[#a3ff12] px-4 py-3 text-sm font-semibold text-[#09090b] transition hover:bg-[#baff4f]"
      >
        view_courses()
      </NuxtLink>

      <NuxtLink
          to="/contacts"
          class="rounded-md border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition hover:border-[#a3ff12] hover:text-[#a3ff12]"
      >
        contact_me()
      </NuxtLink>
    </div>
  </section>
</template>
