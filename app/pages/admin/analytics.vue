<template>
  <div class="flex w-full flex-col gap-4 md:flex-row">
    <main
      v-motion class="card flex-1"
      :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }"
      :duration="800"
    >
      <header class="space-y-2 border-b py-2">
        <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
          Analytics
        </h2>
        <p
          v-motion class="text-caption text-muted-foreground"
          :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
          :duration="800"
        >
          View your profile analytics.
        </p>
      </header>

      <div class="flex flex-col gap-4 py-2">
        <section class="section-container">
          <AnalyticsPanel />
        </section>
        <section class="section-container">
          <AnalyticsClicksByLink />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import auth from "~~/app/lib/middleware/auth"

useHead({
  title: "Analytics – LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/admin/analytics" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "LinkNest analytics page." }],
})

useSeoMeta({
  title: "Analytics – LinkNest",
  description: "LinkNest analytics page.",
})

definePageMeta({
  layout: "admin",
  middleware: auth,
})
</script>
