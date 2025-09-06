<template>
  <div v-if="preferences" class="section-container flex flex-col gap-4">
    <header class="my-2 flex flex-col gap-1">
      <h3>
        Appearance
      </h3>
      <p class="text-caption">
        Customize the appearance for your page.
      </p>
    </header>

    <div class="flex flex-col justify-between gap-2 py-2 md:flex-row">
      <div class="flex flex-row flex-wrap items-center gap-2 md:flex-nowrap">
        <button
          v-for="t in tabs" :key="t.value"
          class="btn" :class="{ ' brightness-50': activeTab === t.value }"
          @click="activeTab = t.value"
        >
          {{ t.label }}
        </button>
      </div>

      <div class="flex flex-row flex-wrap items-center gap-2 md:flex-nowrap">
        <button class="btn-primary" @click="handleUpdatePreferences">
          <icon name="mdi:content-save-check" size="20" />
          <span>{{ status === 'saved' ? 'Saved!' : status === 'reset' ? 'Reset!' : 'Save Changes' }}</span>
        </button>
        <button class="btn-danger" @click="handleResetPreferences">
          <icon name="mdi:close" size="20" />
          <span>Reset</span>
        </button>
      </div>
    </div>

    <PreferencesBackgroundOptions v-if="activeTab === 'background'" v-model:preferences="preferences" />
    <PreferencesUserOptions v-if="activeTab === 'user'" v-model:preferences="preferences" />
    <PreferencesLinkOptions v-if="activeTab === 'links'" v-model:preferences="preferences" />
    <PreferencesIconOptions v-if="activeTab === 'icons'" v-model:preferences="preferences" />
    <PreferencesThemeOptions v-if="activeTab === 'themes'" :preferences="preferences" :set-theme="handleApplyTheme" />
  </div>
</template>

<script setup lang="ts">
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

function handleApplyTheme(newPreferences: UserPreferencesType) {
  preferences.value = newPreferences
}

async function handleUpdatePreferences() {
  preferencesStore.error = null

  try {
    await preferencesStore.updatePreferences(preferences.value!)
    status.value = "saved"
  }
  catch (error: any) {
    console.error("Failed to update preferences:", error)
    preferencesStore.error = error.message
  }
}

async function handleResetPreferences() {
  preferencesStore.error = null

  try {
    await preferencesStore.resetPreferences()
    status.value = "reset"
  }
  catch (error: any) {
    console.error("Failed to reset preferences:", error)
    preferencesStore.error = error.message
  }
}

watch(status, (newStatus, _, onInvalidate) => {
  if (newStatus !== "idle") {
    const timer = setTimeout(() => {
      status.value = "idle"
    }, 2000)
    onInvalidate(() => clearTimeout(timer))
  }
})
</script>
