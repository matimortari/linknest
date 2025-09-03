<template>
  <div class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
    <div class="flex flex-col gap-2">
      <PreferencesSelectInput id="supportBanner" v-model:value="localPrefs.supportBanner" label="Support Banner" :options="BANNER_OPTIONS" />
      <PreferencesSelectInput id="profilePictureRadius" v-model:value="localPrefs.profilePictureRadius" label="Profile Picture Radius" :options="RADIUS_SIZES" />
      <PreferencesColorInput id="profilePictureBorderColor" v-model:value="localPrefs.profilePictureBorderColor" label="Profile Picture Border Color" />
      <PreferencesSelectInput id="profilePictureBorderWidth" v-model:value="localPrefs.profilePictureBorderWidth" label="Profile Picture Border Width" :options="BORDER_WIDTHS" />
      <PreferencesSelectInput id="slugFontFamily" v-model:value="localPrefs.slugFontFamily" label="Username Font Family" :options="FONT_FAMILIES" />
      <PreferencesSelectInput id="slugTextSize" v-model:value="localPrefs.slugTextSize" label="Username Font Size" :options="FONT_SIZES" />
      <PreferencesSelectInput id="slugTextWeight" v-model:value="localPrefs.slugTextWeight" label="Username Font Weight" :options="FONT_WEIGHTS" />
      <PreferencesColorInput id="slugTextColor" v-model:value="localPrefs.slugTextColor" label="Username Font Color" />
    </div>

    <div class="flex flex-col gap-2">
      <PreferencesSelectInput id="headerFontFamily" v-model:value="localPrefs.headerFontFamily" label="Header Font Family" :options="FONT_FAMILIES" />
      <PreferencesSelectInput id="headerTextSize" v-model:value="localPrefs.headerTextSize" label="Header Font Size" :options="FONT_SIZES" />
      <PreferencesSelectInput id="headerTextWeight" v-model:value="localPrefs.headerTextWeight" label="Header Font Weight" :options="FONT_WEIGHTS" />
      <PreferencesColorInput id="headerTextColor" v-model:value="localPrefs.headerTextColor" label="Header Font Color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BORDER_WIDTHS, FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS, RADIUS_SIZES } from "#shared/config/appearance-options"
import { BANNER_OPTIONS } from "#shared/config/banner-options"

const props = defineProps<{
  preferences: UserPreferencesType
}>()

const emit = defineEmits<{
  (e: "update:preferences", value: UserPreferencesType): void
}>()

const localPrefs = reactive({ ...props.preferences })

watch(localPrefs, (newVal) => {
  emit("update:preferences", { ...newVal })
}, { deep: true })
</script>
