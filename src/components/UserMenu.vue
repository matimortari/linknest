<template>
  <div class="hidden lg:my-8 lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:w-52">
    <div class="flex flex-col gap-4">
      <NuxtLink to="/" class="flex flex-row items-center gap-2 scale-sm">
        <img src="/logo.png" alt="LinkNest Logo" width="35" height="35" class="icon">
        <span class="text-2xl font-chau">LinkNest</span>
      </NuxtLink>

      <div class="my-4 flex items-center gap-4">
        <div class="relative size-10 sm:w-12 sm:h-12 flex-shrink-0">
          <img v-if="session?.user?.image" :src="session?.user?.image" :alt="session?.user?.slug" class="size-full rounded-full border object-cover">

          <button title="Edit Profile Information" class="absolute -bottom-2 -right-2 btn-primary p-1" @click="openDialog">
            <Icon name="mdi:square-edit-outline" size="20" class="scale-md" />
          </button>
        </div>

        <div class="flex w-full flex-col gap-1 overflow-x-hidden min-w-0">
          <NuxtLink :to="`/${session?.user?.slug}`" :title="`linknest-live.vercel.app/${session?.user?.slug}`" class="text-caption truncate hover:underline">
            @{{ session?.user?.slug }}
          </NuxtLink>

          <p class="text-label break-words text-muted-foreground max-w-full">
            {{ session?.user?.description }}
          </p>
        </div>
      </div>
    </div>

    <nav class="flex flex-col w-full gap-2">
      <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="btn">
        <Icon :name="link.icon" size="25" />
        <span class="hidden sm:inline">{{ link.label }}</span>
      </NuxtLink>
    </nav>

    <div class="flex-1" />

    <div class="flex flex-col w-full gap-2">
      <button class="btn" @click="toggleTheme">
        <Icon :name="themeIcon" size="25" />
        <span class="hidden sm:inline">Toggle Theme</span>
      </button>

      <button class="btn" @click="() => signOut({ callbackUrl: '/' })">
        <Icon name="material-symbols:logout" size="25" />
        <span class="hidden sm:inline">Sign Out</span>
      </button>
    </div>
  </div>

  <div class="lg:hidden fixed top-0 inset-x-0 bg-card border-b flex items-center justify-between px-4 h-14 z-50">
    <NuxtLink to="/" class="flex items-center gap-2">
      <img src="/logo.png" alt="LinkNest Logo" width="30" height="30" class="icon">
      <span class="text-2xl font-semibold">LinkNest</span>
    </NuxtLink>

    <button class="btn" @click="isMobileNavOpen = !isMobileNavOpen">
      <Icon :name="isMobileNavOpen ? 'ph:x' : 'ph:list'" size="25" />
    </button>
  </div>

  <!-- Mobile Navigation Drawer -->
  <nav v-if="isMobileNavOpen" class="lg:hidden fixed top-14 inset-x-0 bg-card border-b flex flex-col gap-2 p-4 z-40">
    <div class="my-4 flex items-center gap-4">
      <div class="relative size-10 sm:w-12 sm:h-12 flex-shrink-0">
        <img v-if="session?.user?.image" :src="session?.user?.image" :alt="session?.user?.slug" class="size-full rounded-full border object-cover">
        <button title="Edit Profile Information" class="absolute -bottom-2 -right-2 btn-primary p-1" @click="openDialog">
          <Icon name="mdi:square-edit-outline" size="20" class="scale-md" />
        </button>
      </div>

      <div class="flex w-full flex-col gap-1 overflow-x-hidden min-w-0">
        <NuxtLink :to="`/${session?.user?.slug}`" :title="`linknest-live.vercel.app/${session?.user?.slug}`" class="text-caption truncate hover:underline">
          @{{ session?.user?.slug }}
        </NuxtLink>

        <p class="text-label break-words text-muted-foreground max-w-full">
          {{ session?.user?.description }}
        </p>
      </div>
    </div>

    <div class="flex flex-col w-full gap-2 mt-2">
      <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="btn" @click="isMobileNavOpen = false">
        <Icon :name="link.icon" size="25" />
        <span>{{ link.label }}</span>
      </NuxtLink>
    </div>

    <div class="flex flex-col w-full gap-2 mt-4">
      <button class="btn" @click="toggleTheme">
        <Icon :name="themeIcon" size="25" />
        <span>Toggle Theme</span>
      </button>

      <button class="btn" @click="() => signOut({ callbackUrl: '/' })">
        <Icon name="material-symbols:logout" size="25" />
        <span>Sign Out</span>
      </button>
    </div>
  </nav>

  <UserDialog :is-open="isDialogOpen" :slug="session?.user?.slug" :description="session?.user?.description" :image="session?.user?.image" @close="closeDialog" @save="handleSave" />
</template>

<script setup lang="ts">
const { data: session, signOut } = useAuth()

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

function handleSave() {
  // eslint-disable-next-line no-console
  console.log("User profile updated!")
}
</script>
