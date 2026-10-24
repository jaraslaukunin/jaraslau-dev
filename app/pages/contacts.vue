<script setup lang="ts">
import { socials } from '~/data/profile'

useSeoMeta({
  title: 'Contacts — Jaraslau Kunin',
  description:
      'Social links of Jaraslau Kunin — GitHub, LinkedIn, Telegram, Instagram and email.',
})
</script>

<template>
  <section>
    <p class="mb-3 text-xs text-[#a3ff12]">
      <span class="text-zinc-500">~/jaraslau</span> $ cat contacts.txt
    </p>

    <h1 class="text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-5xl">
      Contacts.
    </h1>

    <p class="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
      Everywhere I exist on the internet. Pick a channel — Telegram is the
      fastest one.
    </p>

    <div class="mt-10 grid gap-4 md:grid-cols-2">
      <a
          v-for="social in socials"
          :key="social.id"
          :href="social.url"
          :target="social.id === 'email' ? undefined : '_blank'"
          :rel="social.id === 'email' ? undefined : 'noreferrer'"
          class="terminal-card group rounded-xl p-5 transition duration-200 hover:-translate-y-1"
      >
        <div class="flex items-center gap-4">
          <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 transition group-hover:border-[#a3ff12] group-hover:text-[#a3ff12]"
          >
            <SocialIcon :id="social.id" />
          </span>

          <div class="min-w-0 flex-1">
            <p class="text-xs text-zinc-500">./{{ social.id }}</p>

            <h2
                class="mt-1 truncate text-lg font-semibold text-zinc-100 transition group-hover:text-[#a3ff12]"
            >
              {{ social.label }}
            </h2>
          </div>

          <span
              class="text-[#a3ff12] transition group-hover:translate-x-1"
          >
            ↗
          </span>
        </div>

        <p class="mt-4 truncate text-sm text-zinc-300">{{ social.handle }}</p>

        <p class="mt-1 text-xs text-zinc-500">{{ social.note }}</p>
      </a>
    </div>

    <p class="mt-10 text-xs leading-6 text-zinc-500">
      $ ping jaraslau — usually replies within a day
    </p>
  </section>
</template>
