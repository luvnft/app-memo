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
      chain: process.env.NUXT_CHAIN_PREFIX || "ahp", // 'ahp' for asset hub polkadot
    },
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
