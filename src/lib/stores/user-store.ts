import {
  deleteUserService,
  getUserBySlugService,
  getUserService,
  trackClickService,
  trackPageVisitService,
  updateUserService,
} from "~/lib/services/user-service"

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserType | null,
    isLoading: false,
  }),

  actions: {
    async getUser() {
      this.isLoading = true
      try {
        this.user = await getUserService()
      }
      catch (error) {
        console.error("Failed to get user data", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async getUserBySlug(slug: string) {
      this.isLoading = true
      try {
        this.user = await getUserBySlugService(slug)
      }
      catch (error) {
        console.error("failed to get user by slug:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async updateUser(data: UserType) {
      this.isLoading = true
      try {
        const updatedUser = await updateUserService(data)
        this.user = updatedUser
      }
      catch (error) {
        console.error("failed to update user data:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async deleteUser() {
      this.isLoading = true
      try {
        await deleteUserService()
        this.user = null
      }
      catch (error) {
        console.error("failed to delete user:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async trackPageVisit(userId: string) {
      try {
        await trackPageVisitService(userId)
      }
      catch (error) {
        console.error("failed to track page visit:", error)
      }
    },

    async trackClick(id: string, type: "icon" | "link", userId: string) {
      try {
        await trackClickService(id, type, userId)
      }
      catch (error) {
        console.error("failed to track click:", error)
      }
    },
  },
})
