import { getPreferencesService, resetPreferencesService, updatePreferencesService, updateSupportBannerService } from "~/lib/services/preferences-service"

export const usePreferencesStore = defineStore("preferences", {
  state: () => ({
    preferences: null as UserPreferencesType | null,
    isLoading: false,
  }),

  actions: {
    async getPreferences() {
      this.isLoading = true
      try {
        this.preferences = await getPreferencesService()
      }
      catch (error) {
        console.error("Failed to get preferences", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async updatePreferences(newPreferences: UserPreferencesType) {
      try {
        const updatedPreferences = await updatePreferencesService(newPreferences)
        this.preferences = updatedPreferences
      }
      catch (error) {
        console.error("Failed to update preferences", error)
      }
    },

    async updateSupportBanner(newBanner: string) {
      try {
        const updatedBanner = await updateSupportBannerService(newBanner)
        this.preferences = updatedBanner
      }
      catch (error) {
        console.error("Failed to update support banner", error)
      }
    },

    async resetPreferences() {
      try {
        const defaultPreferences = await resetPreferencesService()
        this.preferences = defaultPreferences
      }
      catch (error) {
        console.error("Failed to reset preferences", error)
      }
    },
  },
})
