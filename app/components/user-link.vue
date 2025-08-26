<template>
  <li
    class="relative flex w-full max-w-80 min-w-32 flex-row items-center justify-center" :style="linkStyle"
    @mouseenter="isHovered = true" @mouseleave="isHovered = false"
  >
    <nuxt-link :to="url" class="flex size-full items-center justify-center" @click="$emit('click')">
      <span class="mx-2 inline-block truncate px-4 text-center" :style="linkInnerStyle">{{ title }}</span>
    </nuxt-link>
    <button
      v-if="preferences?.showCopyButton" class="hover:scale-md absolute right-2 shrink-0 transition-all"
      aria-label="Copy Link" @click.stop="copyToClipboard(props.url)"
    >
      <icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" size="15" :style="{ color: preferences?.linkTextColor }" />
    </button>
  </li>
</template>

<script setup lang="ts">
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
