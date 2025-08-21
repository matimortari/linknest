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
  imports: {
    dirs: ["lib", "lib/middleware", "lib/services", "lib/stores"],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
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
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/styles.css",
    quiet: true,
  },
  compatibilityDate: "2025-05-24",
})
