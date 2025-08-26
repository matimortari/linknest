<template>
  <div class="scroll-area grid h-64 grid-cols-1 gap-2 overflow-auto py-2 md:grid-cols-3">
    <button
      v-for="theme in THEMES" :key="theme.title"
      :title="theme.title" aria-label="Select Theme"
      tabindex="0" class="flex size-full cursor-pointer items-center justify-center rounded-lg border-2 p-8 hover:!border-dashed hover:opacity-80"
      :class="{
        'opacity-60': selectedTheme !== theme.title,
      }"
      :style="getThemeButtonStyle(theme.preferences)" @click="handleThemeSelection(theme.title)"
    >
      <p class="line-clamp-1 truncate p-2 text-center text-sm select-none" :style="getTitleStyle(theme.preferences)">
        {{ theme.title }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  setTheme: (preferences: any) => void
}>()

const selectedTheme = ref("")

function handleThemeSelection(title: string) {
  if (THEMES.find(theme => theme.title === title)) {
    selectedTheme.value = title
    props.setTheme(THEMES.find(theme => theme.title === title)?.preferences || {})
  }
}

function getThemeButtonStyle(preferences: any) {
  return {
    backgroundImage:
      preferences.backgroundType === "GRADIENT"
        ? `linear-gradient(to right, ${preferences.backgroundGradientStart}, ${preferences.backgroundGradientEnd})`
        : "none",
    backgroundColor:
      preferences.backgroundType !== "GRADIENT" ? preferences.backgroundColor : "none",
  }
}

function getTitleStyle(preferences: any) {
  const shadowMap = {
    none: "none",
    light: `0px 1px 2px ${preferences.linkShadowColor}`,
    medium: `0 2px 6px ${preferences.linkShadowColor}`,
    heavy: `1px 3px 10px ${preferences.linkShadowColor}`,
  }

  return {
    backgroundColor: preferences.linkBackgroundColor,
    fontWeight: preferences.slugTextWeight,
    color: preferences.linkTextColor,
    borderRadius: preferences.linkBorderRadius,
    boxShadow: preferences.isLinkShadow
      ? shadowMap[(preferences.linkShadowWeight as keyof typeof shadowMap) ?? "none"]
      : "none",
  }
}
</script>
