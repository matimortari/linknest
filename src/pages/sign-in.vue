<template>
  <div class="min-h-screen lg:flex">
    <div
      v-motion class="flex min-h-screen flex-col items-center p-4 lg:w-1/2 lg:justify-center"
      :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
      :transition="{ duration: 800 }"
    >
      <div
        v-motion class="my-8 flex w-full flex-col items-center gap-4 border-b py-4 text-center"
        :initial="{ opacity: 0, scale: 0.8 }" :visible="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 800 }"
      >
        <img src="/logo.png" alt="Logo" width="100" height="100">
        <h2
          v-motion class="font-bowlby"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :transition="{ duration: 800 }"
        >
          Sign In
        </h2>
        <p
          v-motion class="text-muted-foreground"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :transition="{ duration: 800 }"
        >
          Sign in with Google or GitHub to continue.
        </p>
      </div>

      <div
        v-motion class="flex w-full flex-col items-center gap-4"
        :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 800 }"
      >
        <div class="flex flex-col items-center gap-4">
          <button v-for="provider in providers" :key="provider.label" class="btn" @click="provider.click">
            <Icon :name="provider.icon" size="25" />
            <span>{{ provider.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-motion class="relative hidden min-h-screen lg:block lg:w-1/2"
      :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }"
      :transition="{ duration: 800 }"
    >
      <img src="/sign-in-image.png" alt="Sign In Visual" class="size-full rounded-b-xl border-l object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
const providers = [
  {
    label: "GitHub",
    icon: "simple-icons:github",
    click: async () => {
      await navigateTo("/api/auth/github", { external: true })
    },
  },
  {
    label: "Google",
    icon: "logos:google-icon",
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
</script>
