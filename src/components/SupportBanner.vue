<template>
  <transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 z-50 flex flex-col lg:flex-row w-screen items-center justify-between px-8 py-4 rounded-t-2xl gap-2 text-[#ebe8e8]"
      :class="bannerStyle"
    >
      <div class="flex flex-row lg:flex-col gap-2 items-center lg:items-start">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row-reverse lg:flex-row items-start text-center lg:items-center gap-4">
            <Icon :name="bannerIcon" size="35" class="hidden lg:block text-[#ebe8e8] flex-shrink-0" />
            <h4>{{ bannerMessage }}</h4>
          </div>

          <p class="leading-4 text-sm">
            {{ bannerDescription }}
          </p>
        </div>
      </div>

      <a :href="bannerLink" target="_blank" rel="noopener noreferrer" class="btn bg-[#ebe8e8] text-[#1f2937]">
        ACT NOW
      </a>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { BANNER_DESCRIPTIONS, BANNER_ICONS, BANNER_LINKS, BANNER_MESSAGES, BANNER_STYLES } from "~/lib/config/banner-config"

const props = defineProps<{
  type: BannerType
}>()

type BannerType = keyof typeof BANNER_MESSAGES

const bannerMessage = computed(() => BANNER_MESSAGES[props.type])
const bannerDescription = computed(() => BANNER_DESCRIPTIONS[props.type])
const bannerStyle = computed(() => BANNER_STYLES[props.type])
const bannerIcon = computed(() => BANNER_ICONS[props.type])
const bannerLink = computed(() => BANNER_LINKS[props.type])

const showBanner = ref(true)
let lastScrollY = window.scrollY

function handleScroll() {
  const currentScrollY = window.scrollY
  showBanner.value = currentScrollY < lastScrollY || currentScrollY < 10
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.8s,
    opacity 0.8s;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
