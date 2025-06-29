import { defineStore } from "pinia"
import { createLink, deleteLink, getLinks, updateLink } from "~/lib/services/links-service"

export const useLinkStore = defineStore("link", {
  state: () => ({
    links: [] as LinkType[],
    isLoading: false,
  }),

  actions: {
    async fetchLinks() {
      this.isLoading = true
      try {
        this.links = await getLinks()
      }
      catch (error) {
        console.error("Failed to fetch links:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async addLink(link: LinkType) {
      const newLink = await createLink(link)
      this.links.push(newLink)
    },

    async updateLink(link: LinkType) {
      const updated = await updateLink(link)
      const index = this.links.findIndex(l => l.id === updated.id)
      if (index > -1)
        this.links[index] = updated
    },

    async removeLink(id: string) {
      await deleteLink(id)
      this.links = this.links.filter(link => link.id !== id)
    },
  },
})
