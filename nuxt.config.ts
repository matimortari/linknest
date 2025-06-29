import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@vueuse/motion/nuxt"
  ],
  srcDir: "src",
  serverDir: "server",
  auth: {
    baseURL: `${process.env.BASE_URL}/api/auth`,
    originEnvKey: process.env.BASE_URL,
    provider: {
      type: "authjs",
      defaultProvider: "github"
    },
    globalAppMiddleware: true,
    sessionRefresh: {
      enablePeriodically: 20000,
      enableOnWindowFocus: true,
    }
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode"
  },
  googleFonts: {
    families: {
      "Inter": true,
      "Lato": { wght: [100, 300, 600, 700, 900,] },
      "Bowlby One": true,
      "Chau Philomene One": true,
    },
    display: "swap",
    prefetch: true,
    preconnect: true
  },
  tailwindcss: {
    cssPath: "~/styles/globals.css"
  },
  compatibilityDate: "2025-05-24"
})
