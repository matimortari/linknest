import { createIconService, deleteIconService, getIconsService } from "~/lib/services/icons-service"

export const useIconStore = defineStore("icon", {
  state: () => ({
    icons: [] as IconType[],
    isLoading: false,
  }),

  actions: {
    async getIcons() {
      this.isLoading = true
      try {
        this.icons = await getIconsService()
      }
      catch (error) {
        console.error("Failed to get social icons:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async createIcon(icon: IconType) {
      this.isLoading = true
      try {
        const newIcon = await createIconService(icon)
        this.icons.push(newIcon)
      }
      catch (error) {
        console.error("Failed to create social icon:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async deleteIcon(id: string) {
      this.isLoading = true
      try {
        await deleteIconService(id)
        this.icons = this.icons.filter(icon => icon.id !== id)
      }
      catch (error) {
        console.error("Failed to delete social icon:", error)
      }
      finally {
        this.isLoading = false
      }
    },
  },
})
