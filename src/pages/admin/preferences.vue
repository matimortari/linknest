<template>
  <div class="flex flex-col gap-4 w-full min-h-screen lg:flex-row">
    <main v-motion class="flex-1 card" :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }" :duration="600">
      <header class="space-y-2">
        <h2 v-motion :initial="{ opacity: 0 }" :visible="{ opacity: 1 }" :duration="600">
          Preferences
        </h2>

        <p v-motion class="text-caption text-muted-foreground" :initial="{ opacity: 0 }" :visible="{ opacity: 1 }" :duration="600">
          Manage your profile.
        </p>
      </header>

      <hr class="my-4">

      <div class="flex flex-col gap-4">
        <section class="section-container">
          <PreferencesAppearanceForm />
        </section>

        <section class="section-container">
          <PreferencesDeleteAccount />
        </section>
      </div>
    </main>

    <aside v-motion class="lg:w-1/3 w-full" :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }" :duration="600">
      <Spinner v-if="isLoading" />
      <Preview v-else-if="preferences" :preferences="preferences" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { getPreferences } from "~/lib/services/preferences"

const preferences = ref<UserPreferencesType | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    preferences.value = await getPreferences()
  }
  catch (error) {
    console.error("Failed to load preferences:", error)
  }
  finally {
    isLoading.value = false
  }
})

useHead({
  title: "Preferences – LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/admin/preferences" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "LinkNest preferences page." }]
})

useSeoMeta({
  title: "Preferences – LinkNest",
  description: "LinkNest preferences page.",
})

definePageMeta({
  layout: "admin",
})
</script>
