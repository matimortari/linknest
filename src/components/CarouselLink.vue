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
    light: `0 2px 4px ${preferences.value?.linkShadowColor}`,
    medium: `0 4px 6px ${preferences.value?.linkShadowColor}`,
    heavy: `0 6px 10px ${preferences.value?.linkShadowColor}`,
  }

  return {
    backgroundColor: isHovered.value
      ? preferences.value?.linkHoverBackgroundColor
      : preferences.value?.linkBackgroundColor,
    boxShadow: preferences.value?.isLinkShadow
      ? shadowMap[preferences.value.linkShadowWeight as ShadowWeight] || "none"
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
