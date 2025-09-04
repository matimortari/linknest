<template>
  <Loading v-if="isLoading" />

  <div v-show="!isLoading" class="min-h-screen">
    <div class="flex flex-col !items-start gap-4 p-4 md:flex-row">
      <Sidebar />

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
