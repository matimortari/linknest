<template>
  <div class="scroll-area grid h-64 grid-cols-1 gap-4 overflow-auto py-2 md:grid-cols-2 2xl:grid-cols-4">
    <div v-for="theme in THEMES" :key="theme.title" class="flex flex-col items-center gap-2">
      <button
        :title="theme.title" aria-label="Select Theme"
        tabindex="0" class="flex size-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 hover:border-solid hover:opacity-80"
        :class="{ 'opacity-60': selectedTheme !== theme.title }" :style="themeButtonStyle(theme.preferences)"
        @click="handleThemeSelection(theme.title)"
      >
        <p v-for="i in 3" :key="i" class="line-clamp-1 min-h-[2rem] w-full truncate p-2 text-center text-sm select-none" :style="titleStyle(theme.preferences)">
          {{ '' }}
        </p>
      </button>
      <span class="text-sm">{{ theme.title }}</span>
    </div>
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

function themeButtonStyle(preferences: any) {
  return {
    backgroundImage:
      preferences.backgroundType === "GRADIENT"
        ? `linear-gradient(to right, ${preferences.backgroundGradientStart}, ${preferences.backgroundGradientEnd})`
        : "none",
    backgroundColor:
      preferences.backgroundType !== "GRADIENT" ? preferences.backgroundColor : "none",
  }
}

function titleStyle(preferences: any) {
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
