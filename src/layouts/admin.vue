<template>
  <div class="bg-image min-h-screen">
    <div class="lg:navigation-group flex flex-1 flex-col gap-2 p-4">
      <div class="lg:w-52">
        <UserMenu />
      </div>

      <main class="relative min-h-[200px] flex-1 overflow-x-hidden">
        <Loading v-if="isLoading || !session" />
        <div :class="{ hidden: isLoading }">
          <slot />
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"
import { useLinkStore } from "~/lib/stores/link-store"
import { usePreferencesStore } from "~/lib/stores/preferences-store"
import { useUserStore } from "~/lib/stores/user-store"

const userStore = useUserStore()
const preferencesStore = usePreferencesStore()
const linkStore = useLinkStore()
const iconStore = useIconStore()
const { data: session } = useAuth()

const isLoading = ref(true)

async function fetchGlobalData() {
  try {
    await Promise.all([
      userStore.getUser(),
      preferencesStore.getPreferences(),
      linkStore.getLinks(),
      iconStore.getIcons(),
    ])
  }
  catch (error: any) {
    console.error("Failed to load global data:", error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (document.readyState === "complete") {
    fetchGlobalData()
  }
  else {
    window.addEventListener("load", fetchGlobalData)
  }
})
</script>
