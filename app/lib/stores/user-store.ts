import { userDataSchema } from "#shared/schemas/schemas"

export const useUserStore = defineStore("user", () => {
  const user = ref<UserType | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getUser() {
    isLoading.value = true
    error.value = null

    try {
      user.value = await getUserService()
      return user.value
    }
    catch (error: any) {
      error.value = error?.message || "Failed to get user"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function getUserBySlug(userSlug: string) {
    isLoading.value = true
    error.value = null

    try {
      user.value = await getUserBySlugService(userSlug)
    }
    catch (error: any) {
      error.value = error?.message || "Failed to get user by slug"
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
      error.value = error?.message || "Failed to update user data"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateUserImage(image: FormData) {
    if (!user.value) {
      error.value = "No user loaded"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await updateUserImageService(image)
      if (user.value)
        user.value.image = response.imageUrl
      return response
    }
    catch (error: any) {
      error.value = error?.message || "Failed to update user image"
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
      error.value = error?.message || "Failed to delete user"
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
      error.value = error?.message || "Failed to track page visit"
      throw error
    }
  }

  async function trackClick(eventId: string, type: "icon" | "link", userId: string) {
    if (!userId || !eventId)
      return

    try {
      await trackClickService(eventId, type, userId)
    }
    catch (error: any) {
      error.value = error?.message || "Failed to track click event"
      throw error
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
