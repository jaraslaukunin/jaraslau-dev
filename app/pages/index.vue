<script setup lang="ts">
useSeoMeta({
  title: 'Jaraslau Kunin — Software Developer',
  description:
      'Personal website of Jaraslau Kunin — developer building cross-platform desktop and full-stack products.',
})
import { projects } from '~/data/projects'

// newest first in life = first in the strip; older projects shift right
const timeline = [...projects].sort(byPeriodDesc)
</script>

<template>
  <main>

    <section class="relative border-b border-zinc-800 py-20 sm:py-28">
      <div
          class="pointer-events-none absolute -left-24 top-14 h-64 w-64 rounded-full bg-[#a3ff12]/10 blur-[110px]"
      />

      <p class="relative mb-6 text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ whoami
      </p>

      <h1
          class="relative max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.06em] text-zinc-100 sm:text-6xl"
      >
        I build products,<br />
        <span class="accent-glow text-[#a3ff12]">not just interfaces.</span>
      </h1>

      <p class="relative mt-7 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
        Jaraslau Kunin — software developer from Minsk. I build cross-platform
        desktop applications, websites and full-stack products with C++, Qt, Vue, Nuxt
        and Supabase.
      </p>

      <div class="relative mt-6 flex items-center gap-2 text-xs text-zinc-400">
        <span
            class="h-2 w-2 rounded-full bg-[#a3ff12] shadow-[0_0_12px_#a3ff12]"
        />
        open_to_work = <span class="text-[#a3ff12]">true</span>
        <span class="text-zinc-600">// looking for internship since sep 2026</span>
      </div>

      <div class="relative mt-9 flex flex-wrap gap-3">
        <a
            href="#projects"
            class="rounded-md bg-[#a3ff12] px-4 py-3 text-sm font-semibold text-[#09090b] transition hover:bg-[#baff4f]"
        >
          view_projects()
        </a>

        <NuxtLink
            to="/resume"
            class="rounded-md border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition hover:border-[#a3ff12] hover:text-[#a3ff12]"
        >
          cat_resume()
        </NuxtLink>

        <a
            href="mailto:hello@jaraslau.dev"
            class="rounded-md border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition hover:border-[#a3ff12] hover:text-[#a3ff12]"
        >
          contact_me() hello@jaraslau.dev
        </a>
      </div>

      <div
          class="relative mt-16 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3"
      >
        <div class="bg-[#111114] p-5">
          <p class="text-[11px] uppercase tracking-wider text-zinc-500">focus</p>
          <p class="mt-2 text-sm text-zinc-200">Web & full stack</p>
        </div>

        <div class="bg-[#111114] p-5">
          <p class="text-[11px] uppercase tracking-wider text-zinc-500">core</p>
          <p class="mt-2 text-sm text-zinc-200">Python · Go · SQL </p>
        </div>

        <div class="bg-[#111114] p-5">
          <p class="text-[11px] uppercase tracking-wider text-zinc-500">currently</p>
          <p class="mt-2 text-sm text-zinc-200">Vue · Nuxt · Golang</p>
        </div>
      </div>
    </section>

    <section id="projects" class="border-b border-zinc-800 py-16 sm:py-20">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs text-[#a3ff12]">
            <span class="text-zinc-500">~/jaraslau</span> $ ls ./projects --featured
          </p>

          <h2 class="mt-4 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            Selected work.
          </h2>

          <p class="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
            Products I have designed, developed and continue to improve — solo
            and in teams.
          </p>
        </div>

        <NuxtLink
            to="/projects"
            class="text-xs text-zinc-500 transition hover:text-[#a3ff12]"
        >
          all_projects() →
        </NuxtLink>
      </div>

      <div class="-mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-4 pt-3 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10 h-scroll">
        <div class="flex w-max gap-4">
          <ProjectCard
              v-for="project in timeline"
              :key="project.slug"
              :project="project"
              class="w-[85vw] max-w-[420px] shrink-0 snap-start"
          />
        </div>
      </div>

      <p class="mt-1 text-xs text-zinc-600">→ scroll for more</p>
    </section>

    <section class="border-b border-zinc-800 py-16 sm:py-20">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ ./stack --levels
      </p>

      <div class="mb-8 mt-4 flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          Stack.
        </h2>

        <p class="text-xs text-zinc-500">self-assessed, 1–10</p>
      </div>

      <StackLevels />
    </section>

    <section class="border-b border-zinc-800 py-16 sm:py-20">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ git log --career
      </p>

      <h2 class="mb-8 mt-4 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
        Career.
      </h2>

      <CareerLog />
    </section>

    <section class="border-b border-zinc-800 py-16 sm:py-20">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ locale -a
      </p>

      <h2 class="mb-8 mt-4 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
        Languages.
      </h2>

      <LanguagesPanel />
    </section>

    <section class="terminal-card mt-8 rounded-xl p-6 sm:p-8">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ cat now.txt
      </p>

      <p class="mt-5 max-w-3xl text-sm leading-7 text-zinc-300">
        Currently building education projects, learning
        modern Vue/Nuxt architecture and turning ideas into useful,
        visually-polished software.
      </p>

      <NuxtLink
          to="/now"
          class="mt-5 inline-block text-xs text-[#a3ff12] transition hover:underline"
      >
        read_more() →
      </NuxtLink>
    </section>
  </main>
</template>
