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
        console.error("Failed to get links:", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async createLink(link: LinkType) {
      if (!link || !link.url || !link.title) {
        this.error = "Link must have a URL and title"
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await createLinkService(link)
        this.links.push(response.newLink)
        return response
      }
      catch (error: any) {
        console.error("Failed to create link:", error)
        this.error = error?.message
        throw error
      }
      finally {
        this.isLoading = false
      }
    },

    async updateLink(link: LinkType) {
      if (!link || !link.id) {
        this.error = "Link ID is required to update"
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await updateLinkService(link)
        const index = this.links.findIndex(l => l.id === response.updatedLink.id)
        if (index > -1)
          this.links[index] = response.updatedLink
        return response
      }
      catch (error: any) {
        console.error("Failed to update link:", error)
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
        return
      }
      this.isLoading = true
      try {
        const response = await deleteLinkService(id)
        this.links = this.links.filter(link => link.id !== id)
        return response
      }
      catch (error: any) {
        console.error("Failed to delete link:", error)
        this.error = error?.message
        throw error
      }
      finally {
        this.isLoading = false
      }
    },
  },
})
