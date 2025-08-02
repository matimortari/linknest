<template>
  <li
    class="flex size-10 flex-row items-center justify-center rounded-full"
    :style="iconStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <Icon :name="icon" size="20" :style="iconInnerStyle" />
  </li>
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"

const props = defineProps<{
  icon: string
  preferences: UserPreferencesType
}>()

const iconStore = useIconStore()

const isHovered = ref(false)

const iconStyle = computed(() =>
  iconStore.getIconStyle(props.preferences, isHovered.value),
)

const iconInnerStyle = computed(() =>
  iconStore.getIconInnerStyle(props.preferences),
)
</script>
