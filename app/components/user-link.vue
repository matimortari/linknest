<template>
  <li
    class="relative flex w-full min-w-32 max-w-80 flex-row items-center justify-center"
    :style="linkStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex size-full items-center justify-center"
      @click="$emit('click')"
    >
      <span class="mx-2 inline-block truncate px-4 text-center" :style="linkInnerStyle">
        {{ title }}
      </span>
    </a>
    <button v-if="preferences?.showCopyButton" class="hover:scale-md absolute right-2 flex-shrink-0 transition-all" @click.stop="copyToClipboard(props.url)">
      <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" size="15" :style="{ color: preferences?.linkTextColor }" />
    </button>
  </li>
</template>

<script setup lang="ts">
import { useLinkStore } from "~/lib/stores/link-store"
import { copyToClipboard } from "~/lib/utils"

const props = defineProps<({
  url: string
  title: string
  preferences: UserPreferencesType
})>()

defineEmits(["click"])

const linkStore = useLinkStore()

const isHovered = ref(false)
const copied = ref(false)

const linkStyle = computed(() => {
  return linkStore.getLinkStyle(props.preferences, isHovered.value)
})

const linkInnerStyle = computed(() => {
  return linkStore.getLinkInnerStyle(props.preferences)
})
</script>
