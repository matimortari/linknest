import { getPreferencesService, resetPreferencesService, updatePreferencesService, updateSupportBannerService } from "~/lib/services/preferences-service"

export const usePreferencesStore = defineStore("preferences", {
  state: () => ({
    preferences: null as UserPreferencesType | null,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async getPreferences() {
      this.isLoading = true
      this.error = null
      try {
        this.preferences = await getPreferencesService()
      }
      catch (error: any) {
        console.error("Failed to get user preferences", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async updatePreferences(updatedPreferences: UserPreferencesType) {
      if (!this.preferences) {
        this.error = "No preferences loaded"
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await updatePreferencesService(updatedPreferences)
        this.preferences = response.updatedPreferences
        return response
      }
      catch (error: any) {
        console.error("Failed to update user preferences", error)
        this.error = error?.message
        throw error
      }
    },

    async updateSupportBanner(newBanner: string) {
      if (!this.preferences) {
        this.error = "No preferences loaded"
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await updateSupportBannerService(newBanner)
        this.preferences = response.preferences
        return response
      }
      catch (error: any) {
        console.error("Failed to update user support banner", error)
        this.error = error?.message
        throw error
      }
    },

    async resetPreferences() {
      this.isLoading = true
      this.error = null
      try {
        const response = await resetPreferencesService()
        this.preferences = response.preferences
        return response
      }
      catch (error: any) {
        console.error("Failed to reset user preferences", error)
        this.error = null
        throw error
      }
    },
  },
})
