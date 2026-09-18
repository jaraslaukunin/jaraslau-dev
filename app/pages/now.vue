<script setup lang="ts">
useSeoMeta({
  title: 'Now — Jaraslau Kunin',
  description: 'What Jaraslau Kunin is working on right now.',
})

const items = [
  'Building Avela — a Telegram bot for medical appointment booking, reminders and clinic information.',
  'Developing MRC Schedule — a college timetable on Django for Minsk Radioengineering College.',
  'Improving Trackly — a cross-platform desktop app for epilepsy monitoring.',
  'Learning modern Vue/Nuxt architecture and Supabase.',
  'Studying at Minsk Radioengineering College.',
]
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ cat now.txt
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Now.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      What I am currently working on, learning and building.
    </p>

    <ul class="mt-10 max-w-2xl space-y-4">
      <li
          v-for="item in items"
          :key="item"
          class="flex gap-3 text-sm leading-7 text-zinc-300"
      >
        <span class="text-[#a3ff12]">›</span>
        {{ item }}
      </li>
    </ul>

    <p class="mt-10 max-w-3xl text-xs leading-6 text-zinc-500">
      updated 2026-09-18 · inspired by nownownow.com
    </p>
  </section>
</template>
