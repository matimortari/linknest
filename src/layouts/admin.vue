<template>
  <div class="bg-image">
    <div class="flex flex-col p-4 gap-4 flex-1 lg:flex-row">
      <div class="lg:w-52">
        <UserMenu />
      </div>

      <main class="flex-1 overflow-y-auto relative min-h-[200px]">
        <Loading v-if="!isLoaded || !session" />
        <div :class="{ hidden: !isLoaded }">
          <slot />
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const { data: session } = useAuth()

const isLoaded = ref(false)

onMounted(() => {
  if (document.readyState === "complete") {
    isLoaded.value = true
  }
  else {
    window.addEventListener("load", () => {
      isLoaded.value = true
    })
  }
})
</script>
