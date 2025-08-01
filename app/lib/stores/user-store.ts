import {
  deleteUserService,
  getUserBySlugService,
  getUserService,
  trackClickService,
  trackPageVisitService,
  updateUserImageService,
  updateUserService,
} from "~~/app/lib/services/user-service"

export const useUserStore = defineStore("user", () => {
  const user = ref<UserType | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getUser() {
    isLoading.value = true
    error.value = null

    try {
      user.value = await getUserService()
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function getUserBySlug(slug: string) {
    isLoading.value = true
    error.value = null

    try {
      user.value = await getUserBySlugService(slug)
    }
    catch (err: any) {
      error.value = err?.message
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateUser(payload: UpdateUserPayload) {
    if (!user.value) {
      error.value = "No user loaded"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await updateUserService(payload)
      user.value = response.user
      return response
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateUserImage(formData: FormData) {
    if (!user.value) {
      error.value = "No user loaded"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await updateUserImageService(formData)
      if (user.value)
        user.value.image = response.imageUrl
      return response
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteUser() {
    isLoading.value = true
    error.value = null

    try {
      const response = await deleteUserService()
      user.value = null
      return response
    }
    catch (err: any) {
      error.value = err?.message
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function trackPageVisit(userId: string) {
    if (!userId)
      return

    try {
      await trackPageVisitService(userId)
    }
    catch (err: any) {
      console.warn("Failed to track page visit:", err)
    }
  }

  async function trackClick(id: string, type: "icon" | "link", userId: string) {
    if (!userId || !id)
      return

    try {
      await trackClickService(id, type, userId)
    }
    catch (err: any) {
      console.warn("Failed to track click:", err)
    }
  }

  return {
    user,
    isLoading,
    error,
    getUser,
    getUserBySlug,
    updateUser,
    updateUserImage,
    deleteUser,
    trackPageVisit,
    trackClick,
  }
})
