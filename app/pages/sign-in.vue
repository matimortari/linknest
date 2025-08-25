<template>
  <div class="md:flex">
    <div
      v-motion class="flex flex-col items-center p-4 md:w-1/2 md:justify-center"
      :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
      :duration="800"
    >
      <header
        v-motion class="my-8 flex w-full flex-col items-center gap-8 border-b py-4 text-center"
        :initial="{ opacity: 0, scale: 0.8 }" :visible="{ opacity: 1, scale: 1 }"
        :duration="800"
      >
        <img src="/assets/logo.png" alt="Logo" width="120" height="120">
        <h1 class="font-bowlby">
          Sign In
        </h1>
        <p
          v-motion class="text-muted-foreground"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :duration="800"
        >
          Choose your preferred sign-in method.
        </p>
      </header>

      <div
        v-motion class="flex w-full flex-col items-center gap-4"
        :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
        :duration="800"
      >
        <div class="flex flex-col items-center gap-4">
          <button
            v-for="provider in providers" :key="provider.name"
            class="btn" aria-label="Sign In with Provider"
            @click="navigateTo(`/api/auth/${provider.name}`, { external: true })"
          >
            <icon :name="provider.icon" size="25" />
            <span>{{ provider.label }}</span>
          </button>
        </div>

        <p class="text-muted-foreground p-4">
          By continuing, you agree to our
          <nuxt-link to="/legal/privacy" class="text-primary hover:underline">
            Privacy Policy
          </nuxt-link> and
          <nuxt-link to="/legal/terms" class="text-primary hover:underline">
            Terms of Service
          </nuxt-link>.
        </p>
      </div>
    </div>

    <div
      v-motion class="relative hidden md:block md:min-h-screen md:w-1/2"
      :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }"
      :duration="800"
    >
      <img src="/assets/sign-in-image.png" alt="Sign In Visual" class="size-full rounded-b-xl border-l object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
const providers = [
  {
    name: "github",
    label: "Sign In With GitHub",
    icon: "simple-icons:github",
  },
  {
    name: "google",
    label: "Sign In With Google",
    icon: "simple-icons:google",
  },
]

useHead({
  title: "Sign In - LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/sign-in" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "Sign In to LinkNest." }],
})

useSeoMeta({
  title: "Sign In - LinkNest",
  description: "Sign In to LinkNest.",
})

definePageMeta({
  middleware: guest,
})
</script>
