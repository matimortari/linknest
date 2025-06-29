import { defineStore } from "pinia"
import {
  deleteUser,
  getUser,
  getUserBySlug,
  trackClick,
  trackPageVisit,
  updateUserData,
} from "~/lib/services/user-service"

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserType | null,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchUser() {
      this.isLoading = true
      this.error = null
      try {
        this.user = await getUser()
      }
      catch (error: any) {
        this.error = error.message || "Failed to fetch user"
        console.error("fetchUser error:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async fetchUserBySlug(slug: string) {
      this.isLoading = true
      this.error = null
      try {
        this.user = await getUserBySlug(slug)
      }
      catch (error: any) {
        this.error = error.message || "Failed to fetch user by slug"
        console.error("fetchUserBySlug error:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async updateUser(data: UserType) {
      this.isLoading = true
      this.error = null
      try {
        const updatedUser = await updateUserData(data)
        this.user = updatedUser
      }
      catch (error: any) {
        this.error = error.message || "Failed to update user"
        console.error("updateUser error:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async removeUser() {
      this.isLoading = true
      this.error = null
      try {
        await deleteUser()
        this.user = null
      }
      catch (error: any) {
        this.error = error.message || "Failed to delete user"
        console.error("removeUser error:", error)
      }
      finally {
        this.isLoading = false
      }
    },

    async trackPageVisit(userId: string) {
      try {
        await trackPageVisit(userId)
      }
      catch (error) {
        console.error("trackPageVisit error:", error)
      }
    },

    async trackClick(id: string, type: "icon" | "link", userId: string) {
      try {
        await trackClick(id, type, userId)
      }
      catch (error) {
        console.error("trackClick error:", error)
      }
    },
  },
})
