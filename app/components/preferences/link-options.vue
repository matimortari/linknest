<template>
  <div class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
    <div class="flex flex-col gap-2">
      <PreferencesColorInput id="linkBackgroundColor" v-model:value="localPrefs.linkBackgroundColor" label="Background Color" />
      <PreferencesColorInput id="linkTextColor" v-model:value="localPrefs.linkTextColor" label="Font Color" />
      <PreferencesSelectInput id="linkFontFamily" v-model:value="localPrefs.linkFontFamily" label="Font Family" :options="FONT_FAMILIES" />
      <PreferencesSelectInput id="linkTextSize" v-model:value="localPrefs.linkTextSize" label="Font Size" :options="LINK_FONT_SIZES" />
      <PreferencesSelectInput id="linkTextWeight" v-model:value="localPrefs.linkTextWeight" label="Font Weight" :options="FONT_WEIGHTS" />
      <PreferencesSelectInput id="linkBorderRadius" v-model:value="localPrefs.linkBorderRadius" label="Radius" :options="RADIUS_SIZES" />
      <PreferencesSelectInput id="linkPadding" v-model:value="localPrefs.linkPadding" label="Padding" :options="LINK_PADDING_SIZES" />
    </div>

    <div class="flex flex-col gap-2">
      <PreferencesColorInput id="linkHoverBackgroundColor" v-model:value="localPrefs.linkHoverBackgroundColor" label="Hover Background Color" />
      <PreferencesCheckboxInput id="isLinkShadow" v-model:value="localPrefs.isLinkShadow" label="Enable Shadow" />
      <PreferencesColorInput id="linkShadowColor" v-model:value="localPrefs.linkShadowColor" label="Shadow Color" :disabled="isLinkShadowDisabled" />
      <PreferencesSelectInput
        id="linkShadowWeight" v-model:value="localPrefs.linkShadowWeight"
        label="Shadow Weight" :options="SHADOW_WEIGHTS"
        :disabled="isLinkShadowDisabled"
      />
      <PreferencesCheckboxInput id="showLinkCopyButton" v-model:value="localPrefs.showLinkCopyButton" label="Show 'Copy to Clipboard' Button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FONT_FAMILIES, FONT_WEIGHTS, LINK_FONT_SIZES, LINK_PADDING_SIZES, RADIUS_SIZES, SHADOW_WEIGHTS } from "#shared/config/appearance-options"

const props = defineProps<{
  preferences: UserPreferencesType
}>()

const emit = defineEmits<{
  (e: "update:preferences", value: UserPreferencesType): void
}>()

const localPrefs = reactive({ ...props.preferences, linkFontFamily: props.preferences.linkFontFamily ?? "Roboto" })

watch(localPrefs, (newVal) => {
  emit("update:preferences", { ...newVal })
}, { deep: true })

const isLinkShadowDisabled = computed(() => !localPrefs.isLinkShadow)
</script>
