<template>
  <transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 z-50 flex w-screen flex-col items-center justify-between gap-2 rounded-t-2xl px-8 py-4 text-[#ebe8e8] md:flex-row"
      :class="bannerStyle"
    >
      <div class="flex flex-row items-center gap-2 md:flex-col md:items-start">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row-reverse items-start gap-4 text-center md:flex-row md:items-center">
            <Icon :name="bannerIcon" size="35" class="hidden flex-shrink-0 text-[#ebe8e8] md:block" />
            <h4>
              {{ bannerMessage }}
            </h4>
          </div>

          <p class="text-sm leading-4">
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
/* Support banner styling */
.banner.lgbtq-rights {
  background-color: #5c3963;
}
.banner.anti-racism {
  background-color: #1a1919;
}
.banner.mental-health {
  background-color: #285274;
}
.banner.climate-action {
  background-color: #287445;
}

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
