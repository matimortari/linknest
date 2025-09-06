<template>
  <!-- Mobile menu buttons -->
  <button v-if="!isMobileNavOpen" class="btn fixed top-8 right-8 z-50 md:!hidden" aria-label="Open menu" @click="isMobileNavOpen = true">
    <icon name="mdi:menu" size="30" />
  </button>

  <button v-if="isMobileNavOpen" class="btn fixed top-8 right-8 z-50 md:!hidden" aria-label="Close menu" @click="isMobileNavOpen = false">
    <icon name="mdi:close" size="30" class="text-muted-foreground" />
  </button>

  <!-- Mobile overlay -->
  <div v-if="isMobileNavOpen" class="fixed inset-0 z-20 bg-black/50" @click="isMobileNavOpen = false" />

  <aside
    v-if="user" class="bg-card md:bg-background fixed top-0 left-0 z-40 size-full p-4 transition-transform md:static md:w-56 md:translate-x-0"
    :class="isMobileNavOpen ? 'slide-in' : 'slide-out'"
  >
    <div class="flex h-full flex-col gap-12">
      <nuxt-link to="/" class="hover:scale-sm flex flex-row items-center gap-2 transition-all select-none">
        <img src="/assets/logo-icon.png" alt="Logo" width="35" height="35">
        <img :src="themeTitle" alt="Logo" width="140" height="35">
      </nuxt-link>

      <div class="navigation-group w-full !gap-4 px-12 md:px-0">
        <div class="relative size-16 shrink-0">
          <img v-if="user.image" :src="user.image" :alt="user.slug" class="size-full rounded-full border object-cover select-none">

          <button title="Edit Profile Information" class="btn-primary absolute -right-2 -bottom-2 !p-1" aria-label="Edit Profile Information" @click="isDialogOpen = true">
            <icon name="mdi:square-edit-outline" size="20" class="transition-all hover:scale-110" />
          </button>
        </div>

        <div class="flex w-full min-w-0 flex-col overflow-x-hidden">
          <nuxt-link :to="`/${user.slug}`" :title="`linknest-live.vercel.app/${user.slug}`" class="text-sm font-semibold break-words hover:underline">
            @{{ user.slug }}
          </nuxt-link>
        </div>
      </div>

      <nav class="flex flex-col gap-2 px-12 md:px-0" aria-label="Main Navigation">
        <nuxt-link
          v-for="link in navLinks" :key="link.url"
          :to="link.url" class="btn w-full !justify-start"
          aria-label="Navigate to {{ link.label }}" @click="isMobileNavOpen = false"
        >
          <icon :name="link.icon" size="25" />
          <span>{{ link.label }}</span>
        </nuxt-link>
      </nav>

      <div class="hidden flex-1 md:block" />

      <nav class="flex flex-col gap-2 px-12 md:px-0" aria-label="Mobile Navigation Actions">
        <button class="btn !justify-start" aria-label="Toggle Theme" @click="toggleTheme">
          <icon :name="themeIcon" size="25" />
          <span>Toggle Theme</span>
        </button>
        <button class="btn !justify-start" aria-label="Sign Out" @click="signOut">
          <icon name="material-symbols:logout" size="25" class="text-danger-foreground" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  </aside>

  <UserDialog
    v-if="user" :is-open="isDialogOpen"
    :slug="user.slug ?? undefined" :description="user.description ?? undefined"
    :image="user.image ?? undefined" @close="closeDialog"
  />
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon, themeTitle } = useTheme()
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

<style scoped>
@media (max-width: 767px) {
  .slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .slide-out {
    animation: slideOut 0.3s ease-in forwards;
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
}
</style>
