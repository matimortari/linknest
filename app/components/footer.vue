<template>
  <footer class="mx-auto flex flex-col-reverse items-end gap-4 border-t p-8 md:flex-row md:justify-between md:border-t-0">
    <div class="flex w-full flex-col gap-4 border-t pt-8 md:w-auto md:border-t-0 md:pt-0">
      <img :src="themeTitle" alt="Logo Title" width="100">

      <div class="flex flex-row items-center justify-between gap-4">
        <p class="text-muted-foreground text-sm whitespace-nowrap">
          © {{ new Date().getFullYear() }} LinkNest. All rights reserved.
        </p>

        <nuxt-link to="https://github.com/matimortari/linknest" target="_blank" rel="noopener" aria-label="GitHub Repository">
          <icon name="simple-icons:github" size="25" class="text-muted-foreground hover:scale-md hover:text-accent transition-all" />
        </nuxt-link>
      </div>
    </div>

    <div class="flex w-full flex-wrap gap-8 md:justify-end md:gap-24 md:text-sm">
      <div v-for="(section, index) in footerSections" :key="index" class="flex w-full flex-col gap-2 md:w-auto md:gap-4">
        <p class="font-semibold">
          {{ section.title }}
        </p>
        <ul class="text-muted-foreground flex flex-col md:gap-1">
          <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
            <button v-if="link.action" class="hover:text-accent text-start hover:underline" @click="link.action">
              {{ link.name }}
            </button>
            <nuxt-link v-else :to="link.href" class="hover:text-accent hover:underline">
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { themeTitle } = useTheme()
const { clear, loggedIn } = useUserSession()
const router = useRouter()

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Home", href: "/" },
      !loggedIn.value && { name: "Features", href: "/#features" },
    ].filter(Boolean) as { name: string, href: string, action?: () => void }[],
  },
  {
    title: "Resources",
    links: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms of Service", href: "/legal/terms" },
      loggedIn.value ? { name: "Sign out", href: "#", action: signOut } : { name: "Sign in", href: "/sign-in" },
    ],
  },
]

function signOut() {
  clear()
  router.push("/")
}
</script>
