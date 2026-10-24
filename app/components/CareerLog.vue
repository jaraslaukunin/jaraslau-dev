<script setup lang="ts">
import { career } from '~/data/profile'
</script>

<template>
  <div class="max-w-3xl space-y-7">
    <div v-for="entry in career" :key="entry.hash" class="flex gap-4">
      <span class="shrink-0 pt-0.5 text-xs text-[#a3ff12]">
        {{ entry.hash }}
      </span>

      <div class="min-w-0">
        <p class="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span v-if="entry.current" class="text-[11px] text-[#a3ff12]">
            (HEAD → main)
          </span>

          <span class="text-zinc-100">{{ entry.title }}</span>

          <span class="text-xs text-zinc-500">— {{ entry.period }}</span>
        </p>

        <p class="mt-1.5 text-sm leading-6 text-zinc-400">
          {{ entry.description }}
        </p>
      </div>
    </div>
  </div>
</template>
