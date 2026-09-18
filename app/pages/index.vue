<script setup lang="ts">
useSeoMeta({
  title: 'Jaraslau Kunin — Software Developer',
  description:
      'Personal website of Jaraslau Kunin — developer building cross-platform desktop and full-stack products.',
})
import { projects } from '~/data/projects'
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
        desktop applications and full-stack products with C++, Qt, Vue, Nuxt
        and Supabase.
      </p>

      <div class="relative mt-9 flex flex-wrap gap-3">
        <a
            href="#projects"
            class="rounded-md bg-[#a3ff12] px-4 py-3 text-sm font-semibold text-[#09090b] transition hover:bg-[#baff4f]"
        >
          view_projects()
        </a>

        <a
            href="mailto:hello@jaraslau.dev"
            class="rounded-md border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition hover:border-[#a3ff12] hover:text-[#a3ff12]"
        >
          contact_me()
        </a>
      </div>

      <div
          class="relative mt-16 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3"
      >
        <div class="bg-[#111114] p-5">
          <p class="text-[11px] uppercase tracking-wider text-zinc-500">focus</p>
          <p class="mt-2 text-sm text-zinc-200">Desktop & full stack</p>
        </div>

        <div class="bg-[#111114] p-5">
          <p class="text-[11px] uppercase tracking-wider text-zinc-500">core</p>
          <p class="mt-2 text-sm text-zinc-200">C++ · Qt · Python</p>
        </div>

        <div class="bg-[#111114] p-5">
          <p class="text-[11px] uppercase tracking-wider text-zinc-500">currently</p>
          <p class="mt-2 text-sm text-zinc-200">Vue · Nuxt · Avela</p>
        </div>
      </div>
    </section>

    <section id="projects" class="py-16 sm:py-20">
      <div class="mb-8">
        <p class="text-xs text-[#a3ff12]">
          <span class="text-zinc-500">~/jaraslau</span> $ ls ./projects --featured
        </p>

        <h2 class="mt-4 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          Selected work.
        </h2>

        <p class="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
          A few products I have designed, developed and continue to improve.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <ProjectCard
            v-for="project in projects"
            :key="project.slug"
            :project="project"
        />
      </div>
    </section>

    <section class="terminal-card mb-8 rounded-xl p-6 sm:p-8">
      <p class="text-xs text-[#a3ff12]">
        <span class="text-zinc-500">~/jaraslau</span> $ cat now.txt
      </p>

      <p class="mt-5 max-w-3xl text-sm leading-7 text-zinc-300">
        Currently building <span class="text-[#a3ff12]">Avela</span>, learning
        modern Vue/Nuxt architecture and turning ideas into useful,
        visually-polished software.
      </p>
    </section>
  </main>
</template>