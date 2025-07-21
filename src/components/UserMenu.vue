<template>
  <div v-if="user" class="lg:fixed lg:inset-y-0 lg:my-4 lg:flex lg:w-52 lg:flex-col">
    <div class="flex flex-col gap-4">
      <NuxtLink to="/admin/profile" class="hover:scale-sm flex flex-row items-center gap-2">
        <img
          src="/logo.png" alt="Logo"
          width="35" height="35"
          class="icon"
        >
        <span class="font-chau text-2xl">LinkNest</span>
      </NuxtLink>

      <div
        v-motion class="flex flex-col lg:gap-12"
        :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }"
        :duration="800"
      >
        <div class="my-2 flex flex-row items-center gap-4">
          <div class="flex w-full flex-row items-center gap-4 lg:w-auto">
            <div class="relative size-14 flex-shrink-0">
              <img
                v-if="user.image"
                :src="user.image"
                :alt="user.slug"
                class="size-full rounded-full border object-cover"
              >
              <button title="Edit Profile Information" class="btn-primary absolute -bottom-2 -right-2 p-1" @click="openDialog">
                <Icon name="mdi:square-edit-outline" size="20" class="hover:scale-md" />
              </button>
            </div>

            <div class="flex w-full min-w-0 flex-col gap-1 overflow-x-hidden">
              <NuxtLink
                :to="`/${user.slug}`"
                :title="`linknest-live.vercel.app/${user.slug}`"
                class="text-caption truncate hover:underline"
              >
                @{{ user.slug }}
              </NuxtLink>
              <p class="text-label max-w-full break-words text-muted-foreground">
                {{ user.description }}
              </p>
            </div>
          </div>

          <nav class="flex flex-row gap-2 lg:hidden">
            <button class="btn" @click="toggleTheme">
              <Icon :name="themeIcon" size="25" />
            </button>
            <button class="btn" @click="() => (isMobileNavOpen = !isMobileNavOpen)">
              <Icon name="material-symbols:menu" size="25" />
            </button>
            <button class="btn" @click="() => signOut({ callbackUrl: '/' })">
              <Icon name="material-symbols:logout" size="25" class="text-danger-foreground" />
            </button>
          </nav>
        </div>

        <nav
          class="w-full gap-2 lg:flex lg:flex-col lg:items-start lg:justify-start"
          :class="[isMobileNavOpen ? 'flex flex-row items-center justify-center' : 'hidden']"
        >
          <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="btn lg:w-full">
            <Icon :name="link.icon" size="25" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </nav>

        <div class="lg:flex-1" />

        <nav class="hidden w-full flex-col gap-2 lg:flex">
          <button class="btn" @click="toggleTheme">
            <Icon :name="themeIcon" size="25" />
            <span>Toggle Theme</span>
          </button>
          <button class="btn-danger" @click="() => signOut({ callbackUrl: '/' })">
            <Icon name="material-symbols:logout" size="25" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </div>
  </div>

  <UserDialog
    :is-open="isDialogOpen" :slug="user?.slug ?? undefined"
    :description="user?.description ?? undefined" :image="user?.image ?? undefined"
    @close="closeDialog"
  />
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"

const userStore = useUserStore()
const { signOut } = useAuth()
const { toggleTheme, themeIcon } = useTheme()

const { user } = storeToRefs(userStore)
const isMobileNavOpen = ref(false)
const isDialogOpen = ref(false)

function openDialog() {
  isDialogOpen.value = true
}
function closeDialog() {
  isDialogOpen.value = false
}

const navLinks = [
  { href: "/admin/profile", icon: "material-symbols:location-home-outline", label: "Profile" },
  { href: "/admin/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
  { href: "/admin/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" },
]
</script>
