<template>
  <li
    class="flex flex-row items-center justify-center w-full min-w-32 max-w-72"
    :style="linkStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span :style="linkInnerStyle">
      {{ title }}
    </span>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<({
  title: string
  preferences: UserPreferencesType
})>()

const isHovered = ref(false)

const preferences = computed(() => props.preferences ?? {})

const linkStyle = computed(() => {
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
    borderRadius: props.preferences?.linkBorderRadius,
    padding: props.preferences?.linkPadding,
    transition: "background-color 0.4s ease, box-shadow 0.4s ease",
  }
})

const linkInnerStyle = computed(() => {
  return {
    color: preferences.value?.linkTextColor,
    fontWeight: preferences.value?.linkTextWeight,
    fontSize: preferences.value?.linkTextSize,
  }
})
</script>
