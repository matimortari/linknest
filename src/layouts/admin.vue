<template>
  <div class="bg-image min-h-screen">
    <div class="flex flex-col p-4 gap-4 flex-1 lg:flex-row">
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
const { data: session } = useAuth()

const isLoading = ref(true)

onMounted(() => {
  if (document.readyState === "complete") {
    isLoading.value = false
  }
  else {
    window.addEventListener("load", () => {
      isLoading.value = false
    })
  }
})
</script>
