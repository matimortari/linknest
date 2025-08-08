<template>
  <div v-if="preferences" class="section-container flex flex-col gap-4">
    <header class="my-2 flex flex-col gap-2">
      <h3>
        Appearance
      </h3>
      <p class="text-caption text-muted-foreground">
        Customize the appearance for your page.
      </p>
    </header>

    <div class="navigation-group flex-wrap justify-between border-b py-2">
      <div class="flex flex-row flex-wrap items-center gap-1">
        <button
          v-for="t in tabs" :key="t.value"
          class="btn" :class="{ 'btn-selected': activeTab === t.value }"
          @click="activeTab = t.value"
        >
          {{ t.label }}
        </button>
      </div>

      <div class="flex flex-row items-center gap-1">
        <button class="btn-primary" aria-label="Save Preferences" @click="handleUpdatePreferences">
          <icon name="mdi:content-save-check" size="20" />
          <span>{{
            status === 'saved'
              ? 'Saved!'
              : status === 'reset'
                ? 'Reset!'
                : 'Save Changes'
          }}</span>
        </button>

        <button title="Reset Preferences" class="btn-danger" aria-label="Reset Preferences" @click="handleResetPreferences()">
          <icon name="mdi:close" size="20" />
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'background'" class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
      <PreferencesRadioOptions
        v-model:value="preferences.backgroundType" name="backgroundType"
        label="Background Type" :options="BACKGROUND_TYPES"
      />
      <div class="flex flex-col gap-2">
        <PreferencesColorInput
          id="backgroundColor" v-model:value="preferences.backgroundColor"
          label="Background Color" :disabled="isBackgroundGradient"
        />
        <PreferencesColorInput
          id="backgroundGradientStart" v-model:value="preferences.backgroundGradientStart"
          label="Gradient Start Color" :disabled="isBackgroundFlat"
        />
        <PreferencesColorInput
          id="backgroundGradientEnd" v-model:value="preferences.backgroundGradientEnd"
          label="Gradient End Color" :disabled="isBackgroundFlat"
        />
      </div>
    </div>

    <div v-if="activeTab === 'user'" class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <PreferencesSelectInput
          id="supportBanner" v-model:value="preferences.supportBanner"
          label="Support Banner"
          :options="BANNER_OPTIONS"
        />
        <PreferencesSelectInput
          id="profilePictureRadius" v-model:value="preferences.profilePictureRadius"
          label="Profile Picture Radius" :options="RADIUS_SIZES"
        />
        <PreferencesSelectInput
          id="slugTextSize" v-model:value="preferences.slugTextSize"
          label="Username Font Size"
          :options="FONT_SIZES"
        />
        <PreferencesSelectInput
          id="slugTextWeight" v-model:value="preferences.slugTextWeight"
          label="Username Font Weight" :options="FONT_WEIGHTS"
        />
        <PreferencesColorInput
          id="slugTextColor" v-model:value="preferences.slugTextColor"
          label="Username Font Color"
        />
      </div>

      <div class="flex flex-col gap-2">
        <PreferencesSelectInput
          id="headerTextSize" v-model:value="preferences.headerTextSize"
          label="Header Font Size" :options="FONT_SIZES"
        />
        <PreferencesSelectInput
          id="headerTextWeight" v-model:value="preferences.headerTextWeight"
          label="Header Font Weight" :options="FONT_WEIGHTS"
        />
        <PreferencesColorInput
          id="headerTextColor" v-model:value="preferences.headerTextColor"
          label="Header Font Color"
        />
      </div>
    </div>

    <div v-if="activeTab === 'links'" class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <PreferencesColorInput
          id="linkBackgroundColor" v-model:value="preferences.linkBackgroundColor"
          label="Background Color"
        />
        <PreferencesColorInput id="linkTextColor" v-model:value="preferences.linkTextColor" label="Font Color" />
        <PreferencesSelectInput
          id="linkTextSize" v-model:value="preferences.linkTextSize"
          label="Font Size"
          :options="LINK_FONT_SIZES"
        />
        <PreferencesSelectInput
          id="linkTextWeight" v-model:value="preferences.linkTextWeight"
          label="Font Weight"
          :options="FONT_WEIGHTS"
        />
        <PreferencesSelectInput
          id="linkBorderRadius" v-model:value="preferences.linkBorderRadius"
          label="Radius"
          :options="RADIUS_SIZES"
        />
        <PreferencesSelectInput
          id="linkPadding" v-model:value="preferences.linkPadding"
          label="Padding"
          :options="LINK_PADDING_SIZES"
        />
      </div>

      <div class="flex flex-col gap-2">
        <PreferencesColorInput
          id="linkHoverBackgroundColor" v-model:value="preferences.linkHoverBackgroundColor"
          label="Hover Background Color"
        />
        <PreferencesCheckboxInput id="isLinkShadow" v-model:value="preferences.isLinkShadow" label="Enable Shadow" />
        <PreferencesColorInput
          id="linkShadowColor" v-model:value="preferences.linkShadowColor"
          label="Shadow Color"
          :disabled="isLinkShadowDisabled"
        />
        <PreferencesSelectInput
          id="linkShadowWeight" v-model:value="preferences.linkShadowWeight"
          label="Shadow Weight" :options="SHADOW_WEIGHTS"
          :disabled="isLinkShadowDisabled"
        />
        <PreferencesCheckboxInput
          id="showCopyButton" v-model:value="preferences.showCopyButton"
          label="Show 'Copy to Clipboard' Button"
        />
      </div>
    </div>

    <div v-if="activeTab === 'icons'" class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <PreferencesColorInput
          id="iconBackgroundColor" v-model:value="preferences.iconBackgroundColor"
          label="Background Color"
        />
        <PreferencesColorInput id="iconIconColor" v-model:value="preferences.iconIconColor" label="Icon Color" />
        <PreferencesColorInput
          id="iconHoverBackgroundColor" v-model:value="preferences.iconHoverBackgroundColor"
          label="Hover Background Color"
        />
      </div>

      <div class="flex flex-col gap-2">
        <PreferencesCheckboxInput id="isIconShadow" v-model:value="preferences.isIconShadow" label="Enable Shadow" />
        <PreferencesColorInput
          id="iconShadowColor" v-model:value="preferences.iconShadowColor"
          label="Shadow Color"
          :disabled="isIconShadowDisabled"
        />
        <PreferencesSelectInput
          id="iconShadowWeight" v-model:value="preferences.iconShadowWeight"
          label="Shadow Weight" :options="SHADOW_WEIGHTS"
          :disabled="isIconShadowDisabled"
        />
      </div>
    </div>

    <div v-if="activeTab === 'themes'">
      <PreferencesThemeForm :set-theme="handleApplyTheme" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BACKGROUND_TYPES, FONT_SIZES, FONT_WEIGHTS, LINK_FONT_SIZES, LINK_PADDING_SIZES, RADIUS_SIZES, SHADOW_WEIGHTS } from "#shared/config/appearance-options"
import { BANNER_OPTIONS } from "~~/shared/config/banner-options"
import { usePreferencesStore } from "~/lib/stores/preferences-store"

const tabs = [
  { label: "Background", value: "background" },
  { label: "User Info", value: "user" },
  { label: "Links", value: "links" },
  { label: "Social Icons", value: "icons" },
  { label: "Themes", value: "themes" },
]

const preferencesStore = usePreferencesStore()

const { preferences } = storeToRefs(preferencesStore)
const activeTab = ref("background")
const status = ref<"idle" | "saved" | "reset">("idle")

const isBackgroundFlat = computed(() => preferences.value?.backgroundType === "FLAT")
const isBackgroundGradient = computed(() => preferences.value?.backgroundType === "GRADIENT")
const isLinkShadowDisabled = computed(() => !preferences.value?.isLinkShadow)
const isIconShadowDisabled = computed(() => !preferences.value?.isIconShadow)

function handleApplyTheme(newPreferences: UserPreferencesType) {
  preferences.value = newPreferences
}

async function handleUpdatePreferences() {
  try {
    await preferencesStore.updatePreferences(preferences.value!)
    status.value = "saved"
  }
  catch (error: any) {
    console.error("Failed to update preferences:", error)
  }
}

async function handleResetPreferences() {
  try {
    await preferencesStore.resetPreferences()
    status.value = "reset"
  }
  catch (error: any) {
    console.error("Failed to reset preferences:", error)
  }
}

onMounted(async () => {
  if (!preferences.value) {
    await preferencesStore.getPreferences()
  }
})

watch(status, (newStatus, _, onInvalidate) => {
  if (newStatus !== "idle") {
    const timer = setTimeout(() => {
      status.value = "idle"
    }, 2000)
    onInvalidate(() => clearTimeout(timer))
  }
})
</script>
