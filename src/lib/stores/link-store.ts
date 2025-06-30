import { createLinkService, deleteLinkService, getLinksService, updateLinkService } from "~/lib/services/links-service"

export const useLinkStore = defineStore("link", {
  state: () => ({
    links: [] as LinkType[],
    isLoading: false,
  }),

  actions: {
    async getLinks() {
      this.isLoading = true
      try {
        this.links = await getLinksService()
      }
      catch (error) {
        console.error("Failed to get links:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async createLink(link: LinkType) {
      this.isLoading = true
      try {
        const newLink = await createLinkService(link)
        this.links.push(newLink)
      }
      catch (error) {
        console.error("Failed to create link:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async updateLink(link: LinkType) {
      this.isLoading = true
      try {
        const updated = await updateLinkService(link)
        const index = this.links.findIndex(l => l.id === updated.id)
        if (index > -1)
          this.links[index] = updated
      }
      catch (error) {
        console.error("Failed to update link:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async deleteLink(id: string) {
      this.isLoading = true
      try {
        await deleteLinkService(id)
        this.links = this.links.filter(link => link.id !== id)
      }
      catch (error) {
        console.error("Failed to delete link:", error)
      }
      finally {
        this.isLoading = false
      }
    },
  },
})
