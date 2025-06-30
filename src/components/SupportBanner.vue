<template>
  <div :class="`${bannerStyle} fixed bottom-0 z-50 flex w-screen items-center justify-between px-8 py-4 text-white`">
    <div class="flex flex-row items-center gap-4 text-start text-sm">
      <Icon :name="bannerIcon" size="35" class="text-white" />

      <div class="flex flex-col gap-2">
        <h4>{{ bannerMessage }}</h4>

        <p class="description">
          {{ bannerDescription }}
        </p>
      </div>
    </div>

    <div>
      <a :href="bannerLink" class="btn bg-white font-bold text-gray-800" target="_blank" rel="noopener noreferrer">
        ACT NOW
      </a>
    </div>
  </div>
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
</script>
