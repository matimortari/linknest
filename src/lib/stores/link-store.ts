import { createLinkService, deleteLinkService, getLinksService, updateLinkService } from "~/lib/services/links-service"

export const useLinkStore = defineStore("link", {
  state: () => ({
    links: [] as LinkType[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async getLinks() {
      this.isLoading = true
      this.error = null

      try {
        this.links = await getLinksService()
      }
      catch (error: any) {
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async createLink(payload: CreateLinkPayload) {
      if (!payload || !payload.url || !payload.title) {
        this.error = "Link must have a URL and title"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await createLinkService(payload)
        this.links.push(response.newLink)
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

    async updateLink(payload: UpdateLinkPayload) {
      if (!payload || !payload.id) {
        this.error = "Link ID is required to update"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await updateLinkService(payload)
        const index = this.links.findIndex(l => l.id === response.updatedLink.id)
        if (index > -1)
          this.links[index] = response.updatedLink
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

    async deleteLink(id: string) {
      if (!id) {
        this.error = "Link ID is required to delete"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await deleteLinkService(id)
        this.links = this.links.filter(link => link.id !== id)
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
