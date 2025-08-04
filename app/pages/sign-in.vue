<template>
  <div class="min-h-screen md:flex">
    <div
      v-motion class="flex min-h-screen flex-col items-center p-4 md:w-1/2 md:justify-center"
      :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
      :duration="800"
    >
      <div
        v-motion class="my-8 flex w-full flex-col items-center gap-4 border-b py-4 text-center"
        :initial="{ opacity: 0, scale: 0.8 }" :visible="{ opacity: 1, scale: 1 }"
        :duration="800"
      >
        <img src="/assets/logo.png" alt="Logo" width="100" height="100">
        <h2
          v-motion class="font-bowlby"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :duration="800"
        >
          Sign In
        </h2>
        <p
          v-motion class="text-muted-foreground"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :duration="800"
        >
          Sign in with Google or GitHub to continue.
        </p>
      </div>

      <div
        v-motion class="flex w-full flex-col items-center gap-4"
        :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <div class="flex flex-col items-center gap-4">
          <button v-for="provider in providers" :key="provider.name" class="btn" @click="provider.click">
            <Icon :name="provider.icon" size="25" />
            <span>{{ provider.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-motion class="relative hidden min-h-screen md:block md:w-1/2"
      :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }"
      :duration="800"
    >
      <img src="/assets/sign-in-image.png" alt="Sign In Visual" class="size-full rounded-b-xl border-l object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
import guest from "~/lib/middleware/guest"

const providers = [
  {
    name: "github",
    label: "Sign In With GitHub",
    icon: "simple-icons:github",
    click: async () => {
      await navigateTo("/api/auth/github", { external: true })
    },
  },
  {
    name: "google",
    label: "Sign In With Google",
    icon: "simple-icons:google",
    click: async () => {
      await navigateTo("/api/auth/google", { external: true })
    },
  },
]

useHead({
  title: "Sign In – LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/sign-in" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "Sign In to LinkNest." }],
})

useSeoMeta({
  title: "Sign In – LinkNest",
  description: "Sign In to LinkNest.",
})

definePageMeta({
  middleware: guest,
})
</script>
