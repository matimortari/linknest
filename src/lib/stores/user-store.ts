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
    error: null as string | null,
  }),

  actions: {
    async getUser() {
      this.isLoading = true
      this.error = null
      try {
        this.user = await getUserService()
      }
      catch (error: any) {
        console.error("Failed to get user data", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async getUserBySlug(slug: string) {
      this.isLoading = true
      this.error = null
      try {
        this.user = await getUserBySlugService(slug)
      }
      catch (error: any) {
        console.error("failed to get user by slug:", error)
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async updateUser(updatedUser: UserType) {
      if (!this.user) {
        this.error = "No user loaded"
        throw new Error(this.error)
      }
      this.isLoading = true
      this.error = null
      try {
        const response = await updateUserService(updatedUser)
        this.user = response.updatedUser
        return response
      }
      catch (error: any) {
        console.error("failed to update user data:", error)
        this.error = error?.message || "Failed to update user"
        throw error
      }
      finally {
        this.isLoading = false
      }
    },

    async deleteUser() {
      this.isLoading = true
      this.error = null
      try {
        const response = await deleteUserService()
        this.user = null
        return response
      }
      catch (error: any) {
        console.error("failed to delete user:", error)
        this.error = error?.message
        throw error
      }
      finally {
        this.isLoading = false
      }
    },

    async trackPageVisit(userId: string) {
      if (!userId) {
        console.warn("No user ID provided for tracking page visit")
        return
      }
      this.error = null
      try {
        await trackPageVisitService(userId)
      }
      catch (error: any) {
        console.error("failed to track page visit:", error)
        this.error = error?.message
      }
    },

    async trackClick(id: string, type: "icon" | "link", userId: string) {
      if (!userId) {
        console.warn("No user ID provided for tracking click")
        return
      }
      if (!id) {
        console.warn("No ID provided for tracking click")
        return
      }
      this.error = null
      try {
        await trackClickService(id, type, userId)
      }
      catch (error: any) {
        console.error("failed to track click:", error)
        this.error = error?.message
      }
    },
  },
})
