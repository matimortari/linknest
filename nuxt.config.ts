import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/motion/nuxt", "nuxt-auth-utils"],
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
  css: ["~/assets/styles.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
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

      // Dynamic user fonts
      "Roboto": true,
      "Noto Sans": true,
      "Montserrat": true,
      "Playfair Display": true,
      "Lora": true,
      "Amarante": true,
      "Righteous": true,
      "Ribeye": true,
      "Ribeye Marrow": true,
      "Ubuntu Mono": true,
      "Audiowide": true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  compatibilityDate: "2025-05-24",
})
