import { createIconService, deleteIconService, getIconsService } from "~/lib/services/icons-service"

export const useIconStore = defineStore("icon", {
  state: () => ({
    icons: [] as IconType[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async getIcons() {
      this.isLoading = true
      this.error = null
      try {
        this.icons = await getIconsService()
      }
      catch (error: any) {
        console.error("Failed to get social icons:", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async createIcon(icon: IconType) {
      if (!icon || !icon.platform || !icon.url) {
        this.error = "Social icon must have an URL and platform"
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await createIconService(icon)
        this.icons.push(response.newIcon)
      }
      catch (error: any) {
        console.error("Failed to create social icon:", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async deleteIcon(id: string) {
      this.isLoading = true
      this.error = null
      try {
        await deleteIconService(id)
        this.icons = this.icons.filter(icon => icon.id !== id)
      }
      catch (error: any) {
        console.error("Failed to delete social icon:", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },
  },
})
