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
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async createIcon(payload: CreateIconPayload) {
      if (!payload || !payload.platform || !payload.url) {
        this.error = "Social icon must have a URL and platform"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await createIconService(payload)
        this.icons.push(response.newIcon)
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

    async deleteIcon(id: string) {
      this.isLoading = true
      this.error = null

      try {
        const response = await deleteIconService(id)
        this.icons = this.icons.filter(icon => icon.id !== id)
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
