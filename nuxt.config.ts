// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: ".MEMO",
    },
  },

  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@vue-final-modal/nuxt",
  ],

  runtimeConfig: {
    apiUrl: "",
    public: {
      appUrl: "",
      api: {
        kodaprice: "",
        coingecko: "",
      },
      chain: "ahp",
    },
  },

  icon: {
    clientBundle: {
      scan: true,
    },
    serverBundle: "local",
  },

  googleFonts: {
    families: {
      Unbounded: true,
    },
  },
  routeRules: {
    "/create": { ssr: false },
  },

  compatibilityDate: "2024-09-20",
});
