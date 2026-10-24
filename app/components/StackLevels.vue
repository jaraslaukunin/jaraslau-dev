<script setup lang="ts">
import { stack } from '~/data/profile'
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-3">
    <div
        v-for="group in stack"
        :key="group.title"
        class="terminal-card rounded-xl p-5"
    >
      <p class="text-xs text-[#a3ff12]">{{ group.command }}</p>

      <div class="mt-5 space-y-4">
        <div v-for="skill in group.skills" :key="skill.name">
          <div class="flex items-baseline justify-between gap-3">
            <span class="text-xs text-zinc-300">{{ skill.name }}</span>

            <span class="text-[11px] text-zinc-500">
              {{ skill.level }}/10
            </span>
          </div>

          <div class="mt-2 flex gap-1">
            <span
                v-for="i in 10"
                :key="i"
                class="h-1.5 flex-1 rounded-[2px]"
                :class="
                    i <= skill.level
                        ? 'bg-[#a3ff12] shadow-[0_0_8px_rgba(163,255,18,0.35)]'
                        : 'bg-zinc-800'
                "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
