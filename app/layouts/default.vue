<template>
  <div class="min-h-screen overflow-x-hidden">
    <AppHeader />

    <main class="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 lg:px-10">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>