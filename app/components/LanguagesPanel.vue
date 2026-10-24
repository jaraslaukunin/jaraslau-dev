<script setup lang="ts">
import { languages } from '~/data/profile'
</script>

<template>
  <div
      class="grid max-w-3xl gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3"
  >
    <div
        v-for="language in languages"
        :key="language.code"
        class="bg-[#111114] p-5"
    >
      <p class="text-[11px] uppercase tracking-wider text-zinc-500">
        {{ language.code }}
      </p>

      <p class="mt-2 text-sm text-zinc-100">{{ language.name }}</p>

      <p class="mt-2 text-sm text-[#a3ff12]">{{ language.level }}</p>

      <p class="mt-2 text-xs leading-5 text-zinc-500">
        {{ language.note }}
      </p>
    </div>
  </div>
</template>
