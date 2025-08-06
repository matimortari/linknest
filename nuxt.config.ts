import { fileURLToPath } from "node:url"

export default defineNuxtConfig({
  modules: [
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-auth-utils",
  ],
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
        redirectURL: `${process.env.NUXT_PUBLIC_BASE_URL}/api/auth/github`,
      },
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
        redirectURL: `${process.env.NUXT_PUBLIC_BASE_URL}/api/auth/google`,
      },
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  googleFonts: {
    display: "swap",
    prefetch: true,
    preconnect: true,
    families: {
      "Inter": true,
      "Lato": { wght: [100, 300, 600, 700, 900] },
      "Bowlby One": true,
      "Chau Philomene One": true,
      "JetBrains Mono": true,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/styles.css",
  },
  compatibilityDate: "2025-05-24",
})
