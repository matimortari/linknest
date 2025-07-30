import {
  getPreferencesService,
  resetPreferencesService,
  updatePreferencesService,
  updateSupportBannerService,
} from "~/lib/services/preferences-service"

export const usePreferencesStore = defineStore("preferences", () => {
  const preferences = ref<UserPreferencesType | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getPreferences() {
    isLoading.value = true
    error.value = null

    try {
      preferences.value = await getPreferencesService()
    }
    catch (err: any) {
      error.value = err?.message
    }
    finally {
      isLoading.value = false
    }
  }

  async function updatePreferences(payload: UpdatePreferencesPayload) {
    if (!preferences.value) {
      error.value = "No preferences loaded"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await updatePreferencesService(payload)
      preferences.value = response.updatedPreferences
      return response
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateSupportBanner(payload: UpdateSupportBannerPayload) {
    if (!preferences.value) {
      error.value = "No preferences loaded"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await updateSupportBannerService(payload)
      preferences.value = response.preferences
      return response
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function resetPreferences() {
    if (!preferences.value) {
      error.value = "No preferences loaded"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await resetPreferencesService()
      preferences.value = response.preferences
      return response
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    preferences,
    isLoading,
    error,
    getPreferences,
    updatePreferences,
    updateSupportBanner,
    resetPreferences,
  }
})
