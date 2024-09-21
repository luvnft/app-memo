// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: ".POAP",
    },
  },

  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@vue-final-modal/nuxt",
  ],

  runtimeConfig: {
    apiUrl: "",
    public: {
      appUrl: "",
    },
  },

  googleFonts: {
    families: {
      Unbounded: true,
    },
  },

  compatibilityDate: "2024-09-20",
});
