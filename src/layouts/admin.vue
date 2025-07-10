<template>
  <div class="bg-image min-h-screen">
    <div class="flex flex-col p-4 gap-2 lg:gap-4 flex-1 lg:flex-row">
      <div class="lg:w-52">
        <UserMenu />
      </div>

      <main class="flex-1 overflow-x-hidden relative min-h-[200px]">
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

const { data: session } = useAuth()

const isLoading = ref(true)

async function fetchGlobalData() {
  try {
    await Promise.all([
      useUserStore().getUser(),
      usePreferencesStore().getPreferences(),
      useIconStore().getIcons(),
      useLinkStore().getLinks(),
    ])
  }
  catch (error) {
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
