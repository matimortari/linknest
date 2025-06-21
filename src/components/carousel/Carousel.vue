<template>
  <div class="relative flex max-h-[550px] select-none items-center justify-center overflow-hidden">
    <Transition name="carousel-fade" mode="out-in">
      <CarouselCard
        :key="currentIndex"
        :preset="CAROUSEL_PRESETS[currentIndex]"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { CAROUSEL_PRESETS } from "~/lib/config/carousel-presets"

const currentIndex = ref(0)

function nextCard() {
  currentIndex.value = (currentIndex.value + 1) % CAROUSEL_PRESETS.length
}

let intervalId: number | undefined

onMounted(() => {
  intervalId = window.setInterval(nextCard, 5000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}
.carousel-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.carousel-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
