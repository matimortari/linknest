import {
  deleteUserService,
  getUserBySlugService,
  getUserService,
  trackClickService,
  trackPageVisitService,
  updateUserImageService,
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
        this.error = error?.message
        throw error
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
        this.error = error?.message
      }
      finally {
        this.isLoading = false
      }
    },

    async updateUser(payload: UpdateUserPayload) {
      if (!this.user) {
        this.error = "No user loaded"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await updateUserService(payload)
        this.user = response.user
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

    async updateUserImage(formData: FormData) {
      if (!this.user) {
        this.error = "No user loaded"
        throw new Error(this.error)
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await updateUserImageService(formData)
        this.user.image = response.imageUrl
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

    async deleteUser() {
      this.isLoading = true
      this.error = null

      try {
        const response = await deleteUserService()
        this.user = null
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

    async trackPageVisit(userId: string) {
      if (!userId) {
        return
      }

      try {
        await trackPageVisitService(userId)
      }
      catch (error: any) {
        console.warn("Failed to track page visit:", error)
      }
    },

    async trackClick(id: string, type: "icon" | "link", userId: string) {
      if (!userId) {
        return
      }
      if (!id) {
        return
      }

      try {
        await trackClickService(id, type, userId)
      }
      catch (error: any) {
        console.warn("Failed to track click:", error)
      }
    },
  },
})
