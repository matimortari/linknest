<template>
  <div class="flex w-full flex-col gap-4 lg:flex-row">
    <main
      v-motion class="card flex-1"
      :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }"
      :transition="{ duration: 800 }"
    >
      <header class="space-y-2 border-b py-2">
        <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :transition="{ duration: 800 }">
          Profile
        </h2>
        <p
          v-motion class="text-caption text-muted-foreground"
          :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
          :transition="{ duration: 800 }"
        >
          Welcome back,
          <span class="font-bold text-accent">{{ user?.slug }}</span>!
        </p>
      </header>

      <ProfileShareAccount />

      <div class="flex flex-col gap-4 py-4">
        <section class="section-container">
          <ProfileLinkList />
        </section>
        <section class="section-container">
          <ProfileIconList />
        </section>
      </div>
    </main>

    <div class="w-full lg:w-1/3">
      <Preview />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

useHead({
  title: "Profile – LinkNest",
  link: [
    { rel: "canonical", href: "https://linknest-live.vercel.app/admin/profile" },
    { rel: "icon", href: "/favicon.ico" },
  ],
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
