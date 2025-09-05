import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-09-05",
  modules: ["@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/motion/nuxt", "nuxt-auth-utils"],
  imports: { dirs: ["lib/**"] },
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/styles.css"],
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
      "Crimson Pro": true,
      "Lato": true,
      "Caprasimo": true,
      "JetBrains Mono": true,

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
    mode: "svg",
    clientBundle: { scan: true },
  },
})
