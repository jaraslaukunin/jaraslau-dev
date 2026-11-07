<script setup lang="ts">
import '~/assets/css/liquid.css'
const route = useRoute()
const showIntro = ref(false)
const skip = ref<HTMLButtonElement | null>(null)
const pointer = reactive({ x: -500, y: -500, visible: false })
const pulses = ref<{ id: number; x: number; y: number; diameter: number }[]>([])
let id = 0
let timer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | undefined
let media: MediaQueryList | undefined
let previousFocus: HTMLElement | null = null
const finish = () => {
  showIntro.value = false
  if (timer) clearTimeout(timer)
  try { sessionStorage.setItem('jaraslau-glass-intro-v1', '1') } catch {}
  previousFocus?.focus({ preventScroll: true })
}
const keydown = (e: KeyboardEvent) => {
  if (!showIntro.value) return
  if (e.key === 'Escape') finish()
  if (e.key === 'Tab') { e.preventDefault(); skip.value?.focus() }
}
const preference = () => {
  if (media?.matches) { if (showIntro.value) finish(); pulses.value = []; pointer.visible = false }
}
const move = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse' || media?.matches) return
  pointer.x = e.clientX; pointer.y = e.clientY; pointer.visible = true
}
const hide = () => { pointer.visible = false }
const wave = (e: PointerEvent) => {
  if (e.button !== 0 || !e.isPrimary || media?.matches) return
  if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable], [data-no-pulse]')) return
  const radius = Math.hypot(Math.max(e.clientX, innerWidth - e.clientX), Math.max(e.clientY, innerHeight - e.clientY))
  pulses.value = [...pulses.value.slice(-5), { id: id++, x: e.clientX, y: e.clientY, diameter: Math.ceil(radius * 2.2) }]
}
const removeWave = (value: number) => { pulses.value = pulses.value.filter(p => p.id !== value) }
const reveal = async () => {
  await nextTick()
  observer?.disconnect()
  document.querySelectorAll<HTMLElement>('main .terminal-card, main section').forEach(el => {
    if (media?.matches || !observer) { el.classList.remove('glass-reveal'); return }
    if (el.getBoundingClientRect().top > innerHeight * 0.95) { el.classList.add('glass-reveal'); observer.observe(el) }
  })
}
watch(() => route.fullPath, reveal, { flush: 'post' })
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preference)
  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('blur', hide)
  document.documentElement.addEventListener('pointerleave', hide)
  window.addEventListener('keydown', keydown)
  if ('IntersectionObserver' in window) observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('glass-reveal'); observer?.unobserve(entry.target) } })
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
  reveal()
  let seen = true
  try { seen = Boolean(sessionStorage.getItem('jaraslau-glass-intro-v1')) } catch {}
  if (!seen && !media.matches) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    showIntro.value = true
    nextTick(() => skip.value?.focus({ preventScroll: true }))
    timer = setTimeout(finish, 4500)
  }
})
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  observer?.disconnect()
  media?.removeEventListener('change', preference)
  window.removeEventListener('pointermove', move)
  window.removeEventListener('blur', hide)
  document.documentElement.removeEventListener('pointerleave', hide)
  window.removeEventListener('keydown', keydown)
})
</script>

<template>
  <div class="liquid-ambient" aria-hidden="true" />
  <div class="fx-layer" aria-hidden="true">
    <span class="liquid-cursor" :style="{ left: `${pointer.x}px`, top: `${pointer.y}px`, opacity: pointer.visible ? 1 : 0 }" />
    <span v-for="pulse in pulses" :key="pulse.id" class="liquid-wave" :style="{ left: `${pulse.x}px`, top: `${pulse.y}px`, width: `${pulse.diameter}px`, height: `${pulse.diameter}px` }" @animationend="removeWave(pulse.id)" />
  </div>
  <div class="site-layer" :inert="showIntro" @pointerdown="wave"><slot /></div>
  <Transition name="liquid-boot">
    <section v-if="showIntro" class="liquid-intro" role="dialog" aria-modal="true" aria-label="Portfolio introduction">
      <div class="intro-orbit" aria-hidden="true" />
      <div class="intro-lens">
        <span class="intro-eyebrow">INITIALIZING INTERFACE</span>
        <h1><span>$</span> jaraslau.dev</h1>
        <p>Code. Craft. Create.</p>
        <div class="intro-progress" aria-hidden="true"><i /></div>
      </div>
      <button ref="skip" type="button" class="glass-button intro-skip" @click="finish">Skip intro <span aria-hidden="true">↗</span></button>
    </section>
  </Transition>
</template>
