<template>
  <Loading v-if="isLoading" />

  <div v-show="!isLoading" class="bg-image min-h-screen">
    <div class="md:navigation-group flex flex-1 flex-col gap-2 p-4">
      <div class="md:w-52">
        <UserMenu />
      </div>

      <main class="relative min-h-[200px] flex-1 overflow-x-hidden">
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

const isLoading = ref(true)

async function getGlobalData() {
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
    getGlobalData()
  }
  else {
    window.addEventListener("load", getGlobalData)
  }
})
</script>
