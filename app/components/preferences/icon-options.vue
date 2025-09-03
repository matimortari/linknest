<template>
  <div class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
    <div class="flex flex-col gap-2">
      <PreferencesColorInput id="iconBackgroundColor" v-model:value="localPrefs.iconBackgroundColor" label="Background Color" />
      <PreferencesColorInput id="iconLogoColor" v-model:value="localPrefs.iconLogoColor" label="Icon Color" />
      <PreferencesColorInput id="iconHoverBackgroundColor" v-model:value="localPrefs.iconHoverBackgroundColor" label="Hover Background Color" />
    </div>

    <div class="flex flex-col gap-2">
      <PreferencesCheckboxInput id="isIconShadow" v-model:value="localPrefs.isIconShadow" label="Enable Shadow" />
      <PreferencesColorInput id="iconShadowColor" v-model:value="localPrefs.iconShadowColor" label="Shadow Color" :disabled="isIconShadowDisabled" />
      <PreferencesSelectInput
        id="iconShadowWeight" v-model:value="localPrefs.iconShadowWeight"
        label="Shadow Weight" :options="SHADOW_WEIGHTS"
        :disabled="isIconShadowDisabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SHADOW_WEIGHTS } from "#shared/config/appearance-options"

const props = defineProps<{ preferences: UserPreferencesType }>()

const emit = defineEmits<{
  (e: "update:preferences", value: UserPreferencesType): void
}>()

const localPrefs = reactive({ ...props.preferences })

watch(localPrefs, (newVal) => {
  emit("update:preferences", { ...newVal })
}, { deep: true })

const isIconShadowDisabled = computed(() => !localPrefs.isIconShadow)
</script>
