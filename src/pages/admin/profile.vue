<template>
  <div class="flex flex-col gap-4 w-full min-h-screen lg:flex-row">
    <main v-motion class="flex-1 card" :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }" :duration="600">
      <header class="space-y-2">
        <h2 v-motion :initial="{ opacity: 0 }" :visible="{ opacity: 1 }" :duration="600">
          Profile
        </h2>

        <p v-motion class="text-caption text-muted-foreground" :initial="{ opacity: 0 }" :visible="{ opacity: 1 }" :duration="600">
          Welcome back,
          <span class="font-bold text-accent">{{ session?.user?.slug }}</span>!
        </p>
      </header>

      <ProfileShareAccount />

      <hr class="my-4">

      <div class="flex flex-col gap-4">
        <section class="section-container">
          <ProfileLinkList />
        </section>

        <section class="section-container">
          <ProfileIconList />
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

const { data: session } = useAuth()

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
  title: "Profile – LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/admin/profile" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "LinkNest profile page." }]
})

useSeoMeta({
  title: "Profile – LinkNest",
  description: "LinkNest profile page.",
})

definePageMeta({
  layout: "admin",
})
</script>
