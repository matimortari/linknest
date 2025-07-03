<template>
  <li
    class="flex flex-row size-10 items-center justify-center rounded-full"
    :style="iconStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <Icon :name="icon" size="20" :style="iconInnerStyle" />
  </li>
</template>

<script setup lang="ts">
const props = defineProps<({
  icon: string
  preferences: UserPreferencesType
})>()

const isHovered = ref(false)

const preferences = computed(() => props.preferences ?? {})

const iconStyle = computed(() => {
  type ShadowWeight = "none" | "light" | "medium" | "heavy"

  const shadowMap: Record<ShadowWeight, string> = {
    none: "none",
    light: `0 2px 4px ${preferences.value?.iconShadowColor}`,
    medium: `0 4px 6px ${preferences.value?.iconShadowColor}`,
    heavy: `0 6px 10px ${preferences.value?.iconShadowColor}`,
  }

  return {
    backgroundColor: isHovered.value
      ? preferences.value?.iconHoverBackgroundColor
      : preferences.value?.iconBackgroundColor,
    boxShadow: preferences.value?.isIconShadow
      ? shadowMap[preferences.value.iconShadowWeight as ShadowWeight] || "none"
      : "none",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease",
  }
})

const iconInnerStyle = computed(() => {
  return {
    color: preferences.value?.iconIconColor,
  }
})
</script>
