<template>
  <ClickPulse>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClickPulse>
</template>

<style>
/* Override only the decorative pulse; keep the existing intro and lifecycle. */
.fx-layer > span.click-wave {
  background: radial-gradient(circle,
    transparent 0% 30%,
    rgba(163, 255, 18, 0.025) 30.2%,
    rgba(163, 255, 18, 0.14) 30.6%,
    transparent 31.1% 39%,
    rgba(163, 255, 18, 0.035) 39.2%,
    rgba(163, 255, 18, 0.23) 39.6%,
    transparent 40.1% 48%,
    rgba(163, 255, 18, 0.06) 48.2%,
    rgba(210, 255, 148, 0.42) 48.6%,
    transparent 49.1%);
  filter: none;
  animation: water-ripple-expand 1350ms cubic-bezier(0.2, 0.35, 0.45, 1) forwards;
}

@keyframes water-ripple-expand {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.005); }
  7% { opacity: 0.85; }
  35% { opacity: 0.65; }
  70% { opacity: 0.22; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
}

a:focus-visible,
button:focus-visible,
summary:focus-visible {
  outline: 2px solid #a3ff12;
  outline-offset: 5px;
}

@media (prefers-reduced-motion: reduce) {
  .fx-layer > span.click-wave { display: none; animation: none; }
}
</style>
