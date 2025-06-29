<template>
  <div class="flex flex-col gap-4 w-full min-h-screen lg:flex-row">
    <main v-motion class="flex-1 card" :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }" :duration="800">
      <header class="space-y-2">
        <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
          Preferences
        </h2>
        <p v-motion class="text-caption text-muted-foreground" :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
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

    <aside class="lg:w-1/3 w-full">
      <Spinner v-if="isLoading" />
      
      <Preview v-else-if="preferences" :preferences="preferences" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { usePreferencesStore } from "~/lib/stores/preferences-store"

const { data: session } = useAuth()
const preferencesStore = usePreferencesStore()

const preferences = computed(() => preferencesStore.preferences)
const isLoading = computed(() => preferencesStore.isLoading)

onMounted(async () => {
  if (!session.value?.user) {
    return navigateTo("/sign-in")
  }
  await preferencesStore.fetchPreferences()
})

useHead({
  title: "Preferences – LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/admin/preferences" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "LinkNest preferences page." }]
})

useSeoMeta({
  title: "Preferences – LinkNest",
  description: "LinkNest preferences page."
})

definePageMeta({
  layout: "admin",
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/"
  }
})
</script>
