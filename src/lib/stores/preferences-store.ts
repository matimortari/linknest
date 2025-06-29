import { defineStore } from "pinia"
import {
  getPreferences,
  resetPreferences,
  updatePreferences,
  updateSupportBanner,
} from "~/lib/services/preferences-service"

export const usePreferencesStore = defineStore("preferences", {
  state: () => ({
    preferences: null as UserPreferencesType | null,
    isLoading: false,
  }),

  actions: {
    async fetchPreferences() {
      this.isLoading = true
      try {
        this.preferences = await getPreferences()
      }
      catch (error) {
        console.error("Failed to load preferences", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async savePreferences(newPreferences: UserPreferencesType) {
      try {
        const updated = await updatePreferences(newPreferences)
        this.preferences = updated
      }
      catch (error) {
        console.error("Failed to update preferences", error)
      }
    },

    async changeSupportBanner(newBanner: string) {
      try {
        const updated = await updateSupportBanner(newBanner)
        this.preferences = updated
      }
      catch (error) {
        console.error("Failed to update support banner", error)
      }
    },

    async resetPreferences() {
      try {
        const reset = await resetPreferences()
        this.preferences = reset
      }
      catch (error) {
        console.error("Failed to reset preferences", error)
      }
    },
  },
})
