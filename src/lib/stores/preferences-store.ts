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
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async updatePreferences(payload: UpdatePreferencesPayload) {
      if (!this.preferences) {
        this.error = "No preferences loaded"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await updatePreferencesService(payload)
        this.preferences = response.updatedPreferences
        return response
      }
      catch (error: any) {
        this.error = error?.message
        throw error
      }
      finally {
        this.isLoading = false
      }
    },

    async updateSupportBanner(payload: UpdateSupportBannerPayload) {
      if (!this.preferences) {
        this.error = "No preferences loaded"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await updateSupportBannerService(payload)
        this.preferences = response.preferences
        return response
      }
      catch (error: any) {
        this.error = error?.message
        throw error
      }
      finally {
        this.isLoading = false
      }
    },

    async resetPreferences() {
      if (!this.preferences) {
        this.error = "No preferences loaded"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await resetPreferencesService()
        this.preferences = response.preferences
        return response
      }
      catch (error: any) {
        this.error = error?.message
        throw error
      }
      finally {
        this.isLoading = false
      }
    },
  },
})
