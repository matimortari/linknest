<template>
  <div class="preview-scrollbar grid h-64 grid-cols-1 gap-2 overflow-auto lg:grid-cols-3">
    <button
      v-for="theme in THEMES"
      :key="theme.title"
      :title="theme.title"
      tabindex="0"
      class="flex size-full items-center justify-center rounded-lg border-2 p-8"
      :class="{
        'border-foreground': selectedTheme === theme.title,
        'opacity-60 border-dashed': selectedTheme !== theme.title,
      }"
      :style="getThemeButtonStyle(theme.preferences)"
      @click="handleThemeSelection(theme.title)"
    >
      <div class="line-clamp-1 truncate p-2 text-center text-sm" :style="getTitleStyle(theme.preferences)">
        {{ theme.title }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { THEMES } from "~/lib/config/themes"

const props = defineProps<{
  setTheme: (preferences: any) => void
}>()

const selectedTheme = ref("")

function handleThemeSelection(title: string) {
  const selected = THEMES.find(theme => theme.title === title)
  if (selected) {
    selectedTheme.value = title
    props.setTheme(selected.preferences)
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
