<template>
  <div class="relative flex max-h-[550px] select-none items-center justify-center overflow-hidden">
    <Transition name="carousel-fade" mode="out-in">
      <div v-if="preset" :key="preset.slug" class="relative w-64 rounded-xl p-2 md:w-[300px]" :style="backgroundStyle">
        <div class="rounded-t-xl bg-gradient-to-r from-primary to-secondary p-1">
          <div class="flex flex-row items-center justify-between rounded-t-xl bg-[#111016] p-2">
            <div class="flex flex-row items-center gap-1">
              <div class="size-2 rounded-full bg-red-500" />
              <div class="size-2 rounded-full bg-yellow-500" />
              <div class="size-2 rounded-full bg-green-500" />
            </div>

            <span class="rounded bg-[#3b3b41] text-[#ebe8e8] p-1 font-mono text-xs">
              @{{ preset.slug }}
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-2 py-6 text-center">
          <img :src="preset.image" :alt="preset.slug" width="80" height="80" :style="profilePictureStyle">

          <p :style="slugStyle">
            @{{ preset.slug }}
          </p>

          <p :style="descriptionStyle">
            {{ preset.description }}
          </p>

          <ul class="my-2 flex flex-row items-center justify-center gap-2">
            <CarouselIcon
              v-for="icon in preset.icons"
              :key="icon.id"
              :icon="icon.icon"
              :preferences="preferences"
            />
          </ul>

          <ul class="flex flex-col items-center space-y-4 overflow-auto">
            <CarouselLink
              v-for="link in preset.links"
              :key="link.id"
              :title="link.title"
              :preferences="preferences"
            />
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { CAROUSEL_PRESETS } from "~/lib/config/carousel-presets"

const currentIndex = ref(0)

function nextCard() {
  currentIndex.value = (currentIndex.value + 1) % CAROUSEL_PRESETS.length
}

let intervalId: number

onMounted(() => {
  intervalId = window.setInterval(nextCard, 5000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})

const preset = computed(() => {
  return CAROUSEL_PRESETS[currentIndex.value]
})

const preferences = computed(() => (preset.value.preferences) as unknown as UserPreferencesType)

const backgroundStyle = computed(() => {
  return preferences.value.backgroundType === "GRADIENT"
    ? {
        background: `linear-gradient(to bottom, ${preferences.value.backgroundGradientStart}, ${preferences.value.backgroundGradientEnd})`,
      }
    : { backgroundColor: preferences.value.backgroundColor }
})

const profilePictureStyle = computed(() => {
  return {
    borderRadius: preferences.value.profilePictureRadius,
  }
})

const slugStyle = computed(() => {
  return {
    color: preferences.value.slugTextColor,
    fontWeight: preferences.value.slugTextWeight,
    fontSize: preferences.value.slugTextSize,
  }
})

const descriptionStyle = computed(() => {
  return {
    color: preferences.value.headerTextColor,
    fontWeight: preferences.value.headerTextWeight,
    fontSize: preferences.value.headerTextSize,
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
