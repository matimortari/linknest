import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxtjs/color-mode", "@pinia/nuxt", "@vueuse/motion/nuxt", "nuxt-auth-utils"],
  imports: { dirs: ["lib/**"] },
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
  },
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ["~/assets/styles.css"],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  icon: {
    mode: "svg",
    clientBundle: { scan: true },
  },
})
