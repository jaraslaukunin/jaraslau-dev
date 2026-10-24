<script setup lang="ts">
import type { Team } from '~/data/team'

const props = defineProps<{
  team: Team
  tools?: string[]
}>()

const isSolo = () => props.team.size === 1
</script>

<template>
  <div>
    <p v-if="isSolo()" class="mb-3 text-xs text-zinc-500">
      solo project — everything below was built alone
    </p>

    <div
        v-if="tools?.length"
        class="mb-3 flex flex-wrap items-center gap-2"
    >
      <span class="text-xs text-zinc-500">tools:</span>

      <span
          v-for="tool in tools"
          :key="tool"
          class="rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300"
      >
          {{ tool }}
      </span>
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <div
          v-for="member in team.members"
          :key="member.name"
          class="rounded-lg border p-4 transition"
          :class="
              member.lead && !isSolo()
                  ? 'border-[#a3ff12]/60 bg-[#a3ff12]/[0.07] shadow-[0_0_24px_rgba(163,255,18,0.12)]'
                  : 'border-zinc-800 bg-[#111114]'
          "
      >
        <div class="flex items-center justify-between gap-3">
          <component
              :is="member.url ? 'a' : 'span'"
              :href="member.url"
              :target="member.url ? '_blank' : undefined"
              :rel="member.url ? 'noreferrer' : undefined"
              class="text-sm font-semibold text-zinc-100 transition"
              :class="member.url ? 'hover:text-[#a3ff12]' : ''"
          >
            {{ member.name }}
          </component>

          <span
              v-if="member.lead && !isSolo()"
              class="shrink-0 rounded bg-[#a3ff12] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#09090b] shadow-[0_0_14px_rgba(163,255,18,0.45)]"
          >
            team lead
          </span>
        </div>

        <p
            class="mt-2 text-xs leading-5"
            :class="member.lead && !isSolo() ? 'text-zinc-300' : 'text-zinc-500'"
        >
            {{ member.role }}
        </p>
      </div>
    </div>
  </div>
</template>
