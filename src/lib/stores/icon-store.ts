import { defineStore } from "pinia"
import { createIcon, deleteIcon, getIcons } from "~/lib/services/icons-service"

export const useIconStore = defineStore("icon", {
  state: () => ({
    icons: [] as IconType[],
    isLoading: false,
  }),

  actions: {
    async fetchIcons() {
      this.isLoading = true
      try {
        this.icons = await getIcons()
      }
      catch (error) {
        console.error("Failed to fetch icons:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async addIcon(icon: IconType) {
      const newIcon = await createIcon(icon)
      this.icons.push(newIcon)
    },

    async removeIcon(id: string) {
      await deleteIcon(id)
      this.icons = this.icons.filter(icon => icon.id !== id)
    },
  },
})
