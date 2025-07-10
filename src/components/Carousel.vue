<template>
  <div class="relative flex items-center justify-center overflow-hidden select-none p-8 pt-0">
    <Transition name="carousel-3d" mode="out-in">
      <div
        v-if="preset" :key="preset.slug"
        class="flex flex-col items-center justify-center gap-2 pt-12 pb-6 text-center relative border-4 border-black shadow-black shadow-lg rounded-[2.5rem] min-h-[560px] w-[320px]" :style="backgroundStyle"
      >
        <div class="absolute -top-1 z-10 w-[312px] rounded-t-[2.5rem] bg-gradient-to-r from-primary to-secondary pb-1">
          <div class="flex flex-row items-center justify-between rounded-t-[2.5rem] bg-[#111016] py-2 px-6">
            <div class="flex flex-row items-center gap-2">
              <div class="size-2 rounded-full bg-[#3b3b41]" />
              <div class="size-2 rounded-full bg-[#3b3b41]" />
              <div class="size-2 rounded-full bg-[#3b3b41]" />
            </div>

            <span class="rounded-xl bg-[#3b3b41] text-[#ebe8e8] p-1 font-mono text-xs">
              @{{ preset.slug }}
            </span>
          </div>
        </div>

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

        <ul class="flex flex-col items-center space-y-4 overflow-auto p-4">
          <CarouselLink
            v-for="link in preset.links"
            :key="link.id"
            :title="link.title"
            :preferences="preferences"
          />
        </ul>
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
  intervalId = window.setInterval(nextCard, 3000)
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
.carousel-3d-enter-active,
.carousel-3d-leave-active {
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
  transform-style: preserve-3d;
}

.carousel-3d-enter-from {
  transform: rotateY(90deg) scale(0.95);
  opacity: 0;
}
.carousel-3d-enter-to {
  transform: rotateY(0deg) scale(1);
  opacity: 1;
}

.carousel-3d-leave-from {
  transform: rotateY(0deg) scale(1);
  opacity: 1;
}
.carousel-3d-leave-to {
  transform: rotateY(-90deg) scale(0.95);
  opacity: 0;
}
</style>
