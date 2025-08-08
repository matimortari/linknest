<template>
  <li class="flex w-full min-w-32 max-w-72 flex-row items-center justify-center" :style="linkStyle" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <span :style="linkInnerStyle">{{ title }}</span>
  </li>
</template>

<script setup lang="ts">
import { useLinkStore } from "~/lib/stores/link-store"

const props = defineProps<{
  title: string
  preferences: UserPreferencesType
}>()

const linkStore = useLinkStore()

const isHovered = ref(false)

const linkStyle = computed(() =>
  linkStore.getLinkStyle(props.preferences, isHovered.value),
)
const linkInnerStyle = computed(() =>
  linkStore.getLinkInnerStyle(props.preferences),
)
</script>
