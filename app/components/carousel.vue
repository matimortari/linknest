<template>
  <div class="relative flex items-center justify-center overflow-hidden p-8 pt-0 select-none">
    <transition name="carousel-3d" mode="out-in">
      <div
        v-if="preset" :key="preset.slug"
        class="relative flex min-h-[560px] w-[320px] flex-col items-center justify-center gap-2 rounded-[2.5rem] border-4 !border-black pt-12 pb-6 text-center shadow-lg shadow-black" :style="backgroundStyle"
      >
        <div class="from-primary to-secondary absolute -top-1 z-10 w-[312px] rounded-t-[2.5rem] bg-gradient-to-r pb-1">
          <div class="flex flex-row items-center justify-between rounded-t-[2.5rem] bg-[#111016] px-6 py-2">
            <div class="flex flex-row items-center gap-2">
              <div class="size-2 rounded-full bg-[#3b3b41]" />
              <div class="size-2 rounded-full bg-[#3b3b41]" />
              <div class="size-2 rounded-full bg-[#3b3b41]" />
            </div>

            <span class="rounded-xl bg-[#3b3b41] p-1 font-mono text-xs text-[#ebe8e8]">
              @{{ preset.slug }}
            </span>
          </div>
        </div>

        <img
          :src="getPresetImage(preset.image) as string" :alt="preset.slug"
          :style="profilePictureStyle"
          width="80" height="80"
        >
        <p :style="slugStyle">
          @{{ preset.slug }}
        </p>
        <p :style="descriptionStyle">
          {{ preset.description }}
        </p>

        <ul class="my-2 flex flex-row items-center justify-center gap-2">
          <li
            v-for="icon in preset.icons" :key="icon.id"
            class="flex size-10 items-center justify-center rounded-full" :style="iconStore.getIconStyle(preferences, iconHover[icon.id] ?? false)"
            @mouseenter="iconHover[icon.id] = true" @mouseleave="iconHover[icon.id] = false"
          >
            <icon :name="icon.logo" size="20" :style="iconStore.getIconInnerStyle(preferences)" />
          </li>
        </ul>

        <ul class="flex flex-col items-center space-y-4 overflow-auto p-4">
          <li
            v-for="link in preset.links" :key="link.id"
            class="flex w-full max-w-72 min-w-32 justify-center" :style="linkStore.getLinkStyle(preferences, linkHover[link.id] ?? false)"
            @mouseenter="linkHover[link.id] = true" @mouseleave="linkHover[link.id] = false"
          >
            <span :style="linkStore.getLinkInnerStyle(preferences)">{{ link.title }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const iconStore = useIconStore()
const linkStore = useLinkStore()
const { currentIndex } = useCarousel(CAROUSEL_PRESETS.length, 3000)

const iconHover = reactive<Record<string, boolean>>({})
const linkHover = reactive<Record<string, boolean>>({})

const preset = computed(() => CAROUSEL_PRESETS[currentIndex.value])
const preferences = computed(() => (preset.value?.preferences ?? {}) as unknown as UserPreferencesType)

const backgroundStyle = computed(() => {
  if (preferences.value.backgroundType === "GRADIENT") {
    return {
      background: `linear-gradient(to bottom, ${preferences.value.backgroundGradientStart}, ${preferences.value.backgroundGradientEnd})`,
    }
  }
  return { backgroundColor: preferences.value.backgroundColor }
})

const profilePictureStyle = computed(() => ({
  borderRadius: preferences.value.profilePictureRadius,
  borderColor: preferences.value.profilePictureBorderColor,
  borderWidth: preferences.value.profilePictureBorderWidth,
}))

const slugStyle = computed(() => ({
  color: preferences.value.slugTextColor,
  fontWeight: preferences.value.slugTextWeight,
  fontSize: preferences.value.slugTextSize,
  fontFamily: preferences.value.slugFontFamily,
}))

const descriptionStyle = computed(() => ({
  color: preferences.value.headerTextColor,
  fontWeight: preferences.value.headerTextWeight,
  fontSize: preferences.value.headerTextSize,
  fontFamily: preferences.value.headerFontFamily,
}))

const images = import.meta.glob("~/assets/presets/*", { eager: true, import: "default" })
function getPresetImage(filename: string) {
  return images[`/assets/presets/${filename}`]
}
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
