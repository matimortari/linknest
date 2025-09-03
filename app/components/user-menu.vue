<template>
  <!-- Mobile menu buttons -->
  <button v-if="!isMobileNavOpen" class="btn fixed top-6 right-6 z-30 md:!hidden" @click="isMobileNavOpen = true">
    <Icon name="ph:list-bold" size="25" />
  </button>

  <button v-if="isMobileNavOpen" class="btn fixed top-6 right-6 z-30 md:!hidden" @click="isMobileNavOpen = false">
    <Icon name="ph:x" size="25" />
  </button>

  <!-- Mobile overlay -->
  <div v-if="isMobileNavOpen" class="fixed inset-0 z-20 bg-black/50" @click="isMobileNavOpen = false" />

  <aside v-if="user" class="bg-card md:bg-background fixed top-0 left-0 z-30 h-full w-72 px-4 py-6 transition-transform md:static md:w-56 md:translate-x-0" :class="isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'">
    <div class="flex h-full flex-col gap-8">
      <nuxt-link to="/" class="hover:scale-sm flex flex-row items-center gap-2 transition-all select-none">
        <img src="/assets/logo.png" alt="Logo" width="35" height="35">
        <span class="font-display text-2xl">LinkNest</span>
      </nuxt-link>

      <div class="navigation-group w-full !gap-4">
        <div class="relative size-12 shrink-0">
          <img v-if="user.image" :src="user.image" :alt="user.slug" class="size-full rounded-full border object-cover select-none">

          <button title="Edit Profile Information" class="btn-primary absolute -right-2 -bottom-2 !p-1" aria-label="Edit Profile Information" @click="isDialogOpen = true">
            <Icon name="mdi:square-edit-outline" size="20" class="transition-all hover:scale-110" />
          </button>
        </div>

        <div class="flex w-full min-w-0 flex-col overflow-x-hidden">
          <nuxt-link :to="`/${user.slug}`" :title="`linknest-live.vercel.app/${user.slug}`" class="text-sm font-semibold break-words hover:underline">
            @{{ user.slug }}
          </nuxt-link>
        </div>
      </div>

      <nav class="flex flex-col gap-2" aria-label="Main Navigation">
        <nuxt-link v-for="link in navLinks" :key="link.url" :to="link.url" class="btn w-full !justify-start">
          <Icon :name="link.icon" size="25" />
          <span>{{ link.label }}</span>
        </nuxt-link>
      </nav>

      <div class="flex-1" />

      <nav class="flex flex-col gap-2" aria-label="Mobile Navigation Actions">
        <button class="btn !justify-start" aria-label="Toggle Theme" @click="toggleTheme">
          <Icon :name="themeIcon" size="25" />
          <span>Toggle Theme</span>
        </button>
        <button class="btn !justify-start" aria-label="Sign Out" @click="signOut">
          <Icon name="material-symbols:logout" size="25" class="text-danger-foreground" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  </aside>

  <UserDialog
    v-if="user"
    :is-open="isDialogOpen" :slug="user.slug ?? undefined"
    :description="user.description ?? undefined" :image="user.image ?? undefined"
    @close="closeDialog"
  />
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
const { clear } = useUserSession()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const isMobileNavOpen = ref(false)
const isDialogOpen = ref(false)

function closeDialog() {
  isDialogOpen.value = false
}

function signOut() {
  clear()
  window.location.href = "/"
}

const navLinks = [
  { url: "/admin/profile", icon: "material-symbols:location-home-outline", label: "Profile" },
  { url: "/admin/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
  { url: "/admin/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" },
]
</script>
