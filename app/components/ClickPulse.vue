<script setup lang="ts">
type Pulse = {
  id: number
  x: number
  y: number
  diameter: number
}

const pulses = ref<Pulse[]>([])

const pointer = reactive({
  x: -500,
  y: -500,
  visible: false,
})

const showIntro = ref(true)

let pulseId = 0
let introTimer: ReturnType<typeof window.setTimeout> | undefined

const reducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const isInteractiveTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false

  return Boolean(
      target.closest(
          [
            'a',
            'button',
            'input',
            'textarea',
            'select',
            'label',
            'summary',
            '[role="button"]',
            '[data-no-pulse]',
          ].join(', '),
      ),
  )
}

const movePointer = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return

  pointer.x = event.clientX
  pointer.y = event.clientY
  pointer.visible = true
}

const hidePointer = () => {
  pointer.visible = false
}

const getWaveDiameter = (x: number, y: number) => {
  const farthestHorizontalDistance = Math.max(x, window.innerWidth - x)
  const farthestVerticalDistance = Math.max(y, window.innerHeight - y)

  const radiusToFarthestCorner = Math.hypot(
      farthestHorizontalDistance,
      farthestVerticalDistance,
  )

  /*
    ×2 — превращаем радиус в диаметр.
    ×1.16 — небольшой запас: волна гарантированно выйдет
    за края даже при клике у угла окна.
  */
  return Math.ceil(radiusToFarthestCorner * 2 * 1.16)
}

const createWave = (event: PointerEvent) => {
  if (event.button !== 0) return
  if (event.pointerType === 'touch') return
  if (reducedMotion()) return
  if (isInteractiveTarget(event.target)) return

  const id = pulseId++

  pulses.value.push({
    id,
    x: event.clientX,
    y: event.clientY,
    diameter: getWaveDiameter(event.clientX, event.clientY),
  })

  window.setTimeout(() => {
    pulses.value = pulses.value.filter((pulse) => pulse.id !== id)
  }, 1350)
}

const finishIntro = () => {
  showIntro.value = false
  sessionStorage.setItem('jaraslau-intro-seen', 'true')
}

onMounted(() => {
  window.addEventListener('pointermove', movePointer, { passive: true })
  window.addEventListener('pointerleave', hidePointer)

  const introWasShown = sessionStorage.getItem('jaraslau-intro-seen')

  if (introWasShown || reducedMotion()) {
    showIntro.value = false
    return
  }

  introTimer = window.setTimeout(finishIntro, 2700)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', movePointer)
  window.removeEventListener('pointerleave', hidePointer)

  if (introTimer) {
    window.clearTimeout(introTimer)
  }
})
</script>

<template>
  <!--
    Этот слой содержит ТОЛЬКО декоративные эффекты.

    z-index: 0      → эффекты ниже текста, кнопок и карточек.
    pointer-events  → слой ничего не перехватывает, весь UI кликается нормально.
  -->
  <div class="fx-layer" aria-hidden="true">
    <!-- Размытый свет строго ПОД курсором -->
    <span
        class="cursor-glow"
        :class="{ 'cursor-glow--visible': pointer.visible }"
        :style="{
        left: `${pointer.x}px`,
        top: `${pointer.y}px`,
      }"
    />

    <!-- Размытые волны после клика -->
    <span
        v-for="pulse in pulses"
        :key="pulse.id"
        class="click-wave"
        :style="{
        left: `${pulse.x}px`,
        top: `${pulse.y}px`,
        width: `${pulse.diameter}px`,
        height: `${pulse.diameter}px`,
      }"
    />
  </div>

  <!-- Весь реальный контент сайта: он всегда выше fx-layer -->
  <div class="site-layer" @pointerdown="createWave">
    <slot />
  </div>

  <!-- Одноразочная стартовая анимация -->
  <Transition name="boot">
    <section v-if="showIntro" class="boot-screen" aria-hidden="true">
      <div class="boot-grid" />
      <div class="boot-noise" />

      <div class="boot-terminal">
        <div class="boot-terminal__bar">
          <span class="boot-terminal__dot boot-terminal__dot--red" />
          <span class="boot-terminal__dot boot-terminal__dot--yellow" />
          <span class="boot-terminal__dot boot-terminal__dot--green" />
          <span class="boot-terminal__title">jaraslau.dev — boot sequence</span>
        </div>

        <div class="boot-terminal__body">
          <p class="boot-command">
            <span class="boot-muted">~/jaraslau</span>
            <span class="boot-accent">$</span>
            boot --portfolio
          </p>

          <div class="boot-log">
            <p class="boot-line boot-line--one">
              <span class="boot-accent">✓</span>
              loading developer profile
            </p>

            <p class="boot-line boot-line--two">
              <span class="boot-accent">✓</span>
              mounting selected projects
            </p>

            <p class="boot-line boot-line--three">
              <span class="boot-accent">✓</span>
              initializing interface system
            </p>

            <p class="boot-line boot-line--four">
              <span class="boot-accent">✓</span>
              connection established
            </p>
          </div>

          <p class="boot-ready">
            <span class="boot-accent">system ready</span>
            <span class="boot-caret" />
          </p>
        </div>
      </div>

      <div class="boot-scan" />
      <div class="boot-burst" />
    </section>
  </Transition>
</template>

<style scoped>
/* =========================================================
   BACKGROUND INTERACTIONS
   ========================================================= */

.fx-layer {
  position: fixed;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/*
  ВАЖНО ПРО ЦЕНТРИРОВАНИЕ:

  left/top получают точные clientX/clientY курсора.
  translate(-50%, -50%) переносит центр элемента в эту точку.

  Поэтому glow НЕ будет находиться справа-снизу от стрелки.
*/
.cursor-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  background: radial-gradient(
      circle,
      rgba(163, 255, 18, 0.115) 0%,
      rgba(163, 255, 18, 0.065) 21%,
      rgba(163, 255, 18, 0.025) 45%,
      rgba(163, 255, 18, 0.006) 63%,
      transparent 76%
  );
  filter: blur(10px);
  transition:
      left 220ms cubic-bezier(0.16, 1, 0.3, 1),
      top 220ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 220ms ease;
  will-change: left, top, opacity;
}

.cursor-glow--visible {
  opacity: 1;
}

/*
  Волна получает размер из JS: её диаметр гарантированно
  больше расстояния до самого дальнего угла viewport.
*/
.click-wave {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(
      circle,
      rgba(163, 255, 18, 0.26) 0%,
      rgba(163, 255, 18, 0.12) 13%,
      rgba(163, 255, 18, 0.045) 29%,
      rgba(163, 255, 18, 0.012) 47%,
      transparent 67%
  );
  filter: blur(20px);
  animation: click-wave-expand 1350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
}

@keyframes click-wave-expand {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }

  8% {
    opacity: 0.9;
  }

  38% {
    opacity: 0.38;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}

/*
  Контент находится над fx-layer:
  текст и карточки не замыливаются, не меняют контраст,
  и не перекрываются анимациями.
*/
.site-layer {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

/* =========================================================
   ONE-TIME BOOT INTRO
   ========================================================= */

.boot-screen {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #09090b;
  color: #f4f4f5;
  font-family:
      'JetBrains Mono',
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      monospace;
}

.boot-grid {
  position: absolute;
  inset: 0;
  background:
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 38px 38px;
  mask-image: radial-gradient(circle at center, black 0%, transparent 72%);
  opacity: 0.78;
}

.boot-noise {
  position: absolute;
  inset: 0;
  opacity: 0.055;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
  mix-blend-mode: screen;
}

.boot-terminal {
  position: relative;
  z-index: 2;
  width: min(620px, calc(100vw - 42px));
  overflow: hidden;
  border: 1px solid rgba(163, 255, 18, 0.3);
  background: rgba(14, 14, 17, 0.88);
  box-shadow:
      0 0 0 1px rgba(163, 255, 18, 0.05),
      0 0 90px rgba(163, 255, 18, 0.11),
      0 32px 120px rgba(0, 0, 0, 0.66);
  backdrop-filter: blur(18px);
  animation: terminal-arrive 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.boot-terminal__bar {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.025);
}

.boot-terminal__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.boot-terminal__dot--red {
  background: #fb7185;
}

.boot-terminal__dot--yellow {
  background: #fbbf24;
}

.boot-terminal__dot--green {
  background: #a3ff12;
  box-shadow: 0 0 12px rgba(163, 255, 18, 0.8);
}

.boot-terminal__title {
  margin-left: 6px;
  overflow: hidden;
  color: #71717a;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.boot-terminal__body {
  padding: 25px;
}

.boot-command,
.boot-line,
.boot-ready {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
}

.boot-muted {
  color: #71717a;
}

.boot-accent {
  color: #a3ff12;
}

.boot-log {
  margin-top: 20px;
}

.boot-line {
  opacity: 0;
  color: #d4d4d8;
  transform: translateY(9px);
  animation: boot-line-in 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.boot-line--one {
  animation-delay: 360ms;
}

.boot-line--two {
  animation-delay: 690ms;
}

.boot-line--three {
  animation-delay: 1020ms;
}

.boot-line--four {
  animation-delay: 1350ms;
}

.boot-ready {
  margin-top: 20px;
  opacity: 0;
  animation: boot-line-in 340ms 1700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.boot-caret {
  display: inline-block;
  width: 7px;
  height: 14px;
  margin-left: 6px;
  vertical-align: -2px;
  background: #a3ff12;
  box-shadow: 0 0 14px rgba(163, 255, 18, 0.85);
  animation: caret-blink 650ms steps(2, start) infinite;
}

.boot-scan {
  position: absolute;
  z-index: 3;
  right: 0;
  left: 0;
  height: 2px;
  opacity: 0;
  background: #a3ff12;
  box-shadow:
      0 0 22px 7px rgba(163, 255, 18, 0.65),
      0 0 120px 20px rgba(163, 255, 18, 0.16);
  animation: boot-scan-run 1150ms 1720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.boot-burst {
  position: absolute;
  z-index: 4;
  inset: 0;
  opacity: 0;
  background: radial-gradient(
      circle at center,
      rgba(163, 255, 18, 0.24),
      rgba(163, 255, 18, 0.05) 32%,
      transparent 62%
  );
  animation: boot-burst-flash 650ms 2180ms ease-out forwards;
}

@keyframes terminal-arrive {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
    filter: blur(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes boot-line-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}

@keyframes boot-scan-run {
  0% {
    top: -4%;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    top: 104%;
    opacity: 0.1;
  }
}

@keyframes boot-burst-flash {
  0% {
    opacity: 0;
  }

  35% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

/*
  Когда showIntro = false, Vue Transition запускает этот выход.
  В итоге заставка не исчезает резко, а как бы «растворяется».
*/
.boot-leave-active {
  transition:
      opacity 620ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 620ms ease;
}

.boot-leave-to {
  opacity: 0;
  transform: scale(1.025);
  filter: blur(8px);
}

/* На тач-устройствах и при Reduce Motion не рисуем тяжёлые эффекты. */
@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .cursor-glow,
  .click-wave,
  .boot-screen {
    display: none;
  }
}
</style>