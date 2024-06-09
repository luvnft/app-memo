// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: ".POAP",
    },
  },

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "nuxt-icon",
    "@nuxt/image",
  ],
  runtimeConfig: {
    apiUrl: "",
    public: {
      appUrl: "",
    },
  },
});
