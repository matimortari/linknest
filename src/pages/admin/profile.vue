<template>
  <div class="flex flex-col gap-4 w-full lg:flex-row">
    <main v-motion class="flex-1 card" :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }" :duration="800">
      <header class="space-y-2">
        <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
          Profile
        </h2>
        <p v-motion class="text-caption text-muted-foreground" :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
          Welcome back,
          <span class="font-bold text-accent">{{ user?.slug }}</span>!
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

    <aside class="lg:w-1/3 w-full">
      <Spinner v-if="isLoading" />

      <Preview v-else-if="preferences" :preferences="preferences" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { usePreferencesStore } from "~/lib/stores/preferences-store"
import { useUserStore } from "~/lib/stores/user-store"

const { data: session } = useAuth()

const { user } = storeToRefs(useUserStore())
const { preferences, isLoading } = storeToRefs(usePreferencesStore())

onMounted(async () => {
  if (!session.value?.user) {
    return navigateTo("/sign-in")
  }
  await usePreferencesStore().getPreferences()
})

useHead({
  title: "Profile – LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/admin/profile" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "LinkNest profile page." }],
})

useSeoMeta({
  title: "Profile – LinkNest",
  description: "LinkNest profile page.",
})

definePageMeta({
  layout: "admin",
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/",
  },
})
</script>
