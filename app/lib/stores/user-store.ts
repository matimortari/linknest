import { userDataSchema } from "#shared/schemas/schemas"
import {
  deleteUserService,
  getUserBySlugService,
  getUserService,
  trackClickService,
  trackPageVisitService,
  updateUserImageService,
  updateUserService,
} from "~/lib/services/user-service"

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
    catch (error: any) {
      error.value = error?.message
      throw error
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
    catch (error: any) {
      error.value = error?.message
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

    const result = userDataSchema.safeParse(payload)
    if (!result.success) {
      const firstError = result.error.issues[0]
      if (firstError && firstError.message) {
        error.value = firstError.message
        throw new Error(firstError.message)
      }
      else {
        error.value = "Validation error"
        throw new Error("Validation error")
      }
    }

    try {
      const response = await updateUserService(result.data)
      user.value = response.user
      return response
    }
    catch (error: any) {
      error.value = error?.message
      throw error
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
    catch (error: any) {
      error.value = error?.message
      throw error
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
    catch (error: any) {
      error.value = error?.message
      throw error
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
    catch (error: any) {
      console.warn("Failed to track page visit:", error)
    }
  }

  async function trackClick(id: string, type: "icon" | "link", userId: string) {
    if (!userId || !id)
      return

    try {
      await trackClickService(id, type, userId)
    }
    catch (error: any) {
      console.warn("Failed to track click:", error)
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
