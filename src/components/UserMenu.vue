<template>
  <div class="lg:my-8 lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:w-52">
    <div class="flex flex-col gap-4">
      <NuxtLink to="/" class="flex flex-row items-center gap-2 scale-sm">
        <img src="/logo.png" alt="LinkNest Logo" width="35" height="35" class="icon">
        <span class="text-2xl font-chau">LinkNest</span>
      </NuxtLink>

      <Spinner v-if="isLoading" class="my-4" />

      <div v-else v-motion class="flex flex-col lg:gap-8" :initial="{ opacity: 0, x: -20 }" :visible="{ opacity: 1, x: 0 }" :duration="800">
        <div class="flex items-center gap-4 my-4">
          <div class="relative size-10 sm:w-12 sm:h-12 flex-shrink-0">
            <img v-if="user?.image" :src="user?.image" :alt="user?.slug" class="size-full rounded-full border object-cover">
            <button title="Edit Profile Information" class="absolute -bottom-2 -right-2 btn-primary p-1" @click="openDialog">
              <Icon name="mdi:square-edit-outline" size="20" class="scale-md" />
            </button>
          </div>
          <div class="flex w-full flex-col gap-1 overflow-x-hidden min-w-0">
            <NuxtLink :to="`/${user?.slug}`" :title="`linknest-live.vercel.app/${user?.slug}`" class="text-caption truncate hover:underline">
              @{{ user?.slug }}
            </NuxtLink>
            <p class="text-label break-words text-muted-foreground max-w-full">
              {{ user?.description }}
            </p>
          </div>

          <nav class="flex flex-row gap-2 lg:hidden">
            <button class="btn" @click="toggleTheme">
              <Icon :name="themeIcon" size="25" />
            </button>
            <button class="btn" @click="() => signOut({ callbackUrl: '/' })">
              <Icon name="material-symbols:logout" size="25" />
            </button>
            <button class="btn" @click="isMobileNavOpen = !isMobileNavOpen">
              <Icon name="material-symbols:menu" size="25" />
            </button>
          </nav>
        </div>

        <nav
          class="w-full mt-4 gap-2 lg:items-start lg:justify-start lg:flex-col lg:flex"
          :class="[isMobileNavOpen ? 'flex flex-row items-center justify-center' : 'hidden']"
        >
          <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="btn lg:w-full">
            <Icon :name="link.icon" size="25" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </nav>

        <div class="lg:flex-1" />

        <nav class="flex-col w-full gap-2 hidden lg:flex">
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

  <UserDialog :is-open="isDialogOpen" :slug="user?.slug ?? undefined" :description="user?.description ?? undefined" :image="user?.image ?? undefined" @close="closeDialog" />
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"

const { signOut } = useAuth()

const { user, isLoading } = storeToRefs(useUserStore())

onMounted(async () => {
  if (!user.value)
    await useUserStore().getUser()
})

const { toggleTheme, themeIcon } = useTheme()

const isMobileNavOpen = ref(false)
const isDialogOpen = ref(false)

function openDialog() {
  isDialogOpen.value = true
}
function closeDialog() {
  isDialogOpen.value = false
}

const navLinks = [
  {
    href: "/admin/profile",
    icon: "material-symbols:location-home-outline",
    label: "Profile",
  },
  {
    href: "/admin/preferences",
    icon: "material-symbols:settings-applications-outline",
    label: "Preferences",
  },
  {
    href: "/admin/analytics",
    icon: "material-symbols:chart-data-outline",
    label: "Analytics",
  },
]
</script>
