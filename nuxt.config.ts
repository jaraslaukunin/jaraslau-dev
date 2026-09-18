export default defineNuxtConfig({
  compatibilityDate: '2026-09-08',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },

      title: 'Jaraslau Kunin — Software Developer',

      meta: [
        {
          name: 'description',
          content:
              'Personal website of Jaraslau Kunin — software developer from Minsk.',
        },
        {
          name: 'theme-color',
          content: '#09090b',
        },
      ],

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})