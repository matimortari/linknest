<template>
  <div class="min-h-screen lg:flex">
    <div
      v-motion class="flex min-h-screen flex-col items-center p-8 lg:w-1/2 lg:justify-center"
      :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
      :duration="600"
    >
      <div
        v-motion class="my-8 flex w-full flex-col items-center gap-6 text-center"
        :initial="{ opacity: 0, scale: 0.8 }" :visible="{ opacity: 1, scale: 1 }"
        :duration="600"
      >
        <img src="/logo.png" alt="Logo" width="100" height="100">
        <h2
          v-motion class="font-bowlby"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :duration="600"
        >
          Sign In
        </h2>
        <p
          v-motion class="text-muted-foreground"
          :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
          :duration="600"
        >
          Sign in with Google or GitHub to continue.
        </p>
      </div>

      <hr class="my-2 w-full">

      <div
        v-motion class="my-8 flex w-full flex-col items-center gap-4"
        :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
        :duration="600"
      >
        <div class="flex flex-col items-center gap-4">
          <button class="btn bg-[#db4437] text-[#ebe8e8]" @click="signIn('google', { callbackUrl: '/admin/profile' })">
            <Icon name="simple-icons:google" size="25" />
            <span>Sign In with Google</span>
          </button>
          <button class="btn bg-[#333333] text-[#ebe8e8]" @click="signIn('github', { callbackUrl: '/admin/profile' })">
            <Icon name="simple-icons:github" size="25" />
            <span>Sign In with GitHub</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-motion class="relative hidden min-h-screen lg:block lg:w-1/2"
      :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }"
      :duration="600"
    >
      <img src="/sign-in-image.png" alt="Sign In Visual" class="size-full rounded-b-xl border-l object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn } = useAuth()

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
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/admin/profile",
  },
})
</script>
