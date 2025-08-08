<template>
  <li class="flex size-10 flex-row items-center justify-center rounded-full" :style="iconStyle" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex size-full items-center justify-center"
      @click="$emit('click')"
    >
      <icon :name="icon" size="20" :style="iconInnerStyle" />
    </a>
  </li>
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"

const props = defineProps<({
  url: string
  icon: string
  preferences: UserPreferencesType
})>()

defineEmits(["click"])

const iconStore = useIconStore()

const isHovered = ref(false)

const iconStyle = computed(() => {
  return iconStore.getIconStyle(props.preferences, isHovered.value)
})
const iconInnerStyle = computed(() => {
  return iconStore.getIconInnerStyle(props.preferences)
})
</script>
