import type { UpdateUserInput, UpdateUserPreferencesInput } from "#shared/schemas/user"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)

  const loading = ref<Record<"getUser" | "getUserBySlug" | "updateUser" | "updatePreferences" | "deleteUser", boolean>>({
    getUser: false,
    getUserBySlug: false,
    updateUser: false,
    updatePreferences: false,
    deleteUser: false,
  })

  const errors = ref<Record<"getUser" | "getUserBySlug" | "updateUser" | "updatePreferences" | "deleteUser", string | null>>({
    getUser: null,
    getUserBySlug: null,
    updateUser: null,
    updatePreferences: null,
    deleteUser: null,
  })

  async function getUser() {
    loading.value.getUser = true
    errors.value.getUser = null

    try {
      const res = await userService.getUser() as {
        user: User
      }
      user.value = res.user
    }
    catch (err: any) {
      errors.value.getUser = err?.message || "Failed to get user"
      console.error("getUser error:", err)
      throw err
    }
    finally {
      loading.value.getUser = false
    }
  }

  async function getUserBySlug(slug: string) {
    loading.value.getUserBySlug = true
    errors.value.getUserBySlug = null

    try {
      const res = await userService.getUserBySlug(slug) as User
      return res
    }
    catch (err: any) {
      errors.value.getUserBySlug = err?.message || "Failed to get user by slug"
      console.error("getUserBySlug error:", err)
      throw err
    }
    finally {
      loading.value.getUserBySlug = false
    }
  }

  async function updateUser(data: UpdateUserInput) {
    loading.value.updateUser = true
    errors.value.updateUser = null

    try {
      const res = await userService.updateUser(data)
      user.value = res.user
    }
    catch (err: any) {
      errors.value.updateUser = err?.message || "Failed to update user"
      console.error("updateUser error:", err)
      throw err
    }
    finally {
      loading.value.updateUser = false
    }
  }

  async function updatePreferences(data: UpdateUserPreferencesInput) {
    loading.value.updatePreferences = true
    errors.value.updatePreferences = null

    try {
      const res = await userService.updatePreferences(data)
      if (user.value && res.preferences) {
        user.value.preferences = res.preferences
      }
    }
    catch (err: any) {
      errors.value.updatePreferences = err?.message || "Failed to update preferences"
      console.error("updatePreferences error:", err)
      throw err
    }
    finally {
      loading.value.updatePreferences = false
    }
  }

  async function deleteUser() {
    loading.value.deleteUser = true
    errors.value.deleteUser = null

    try {
      await userService.deleteUser()
      user.value = null
    }
    catch (err: any) {
      errors.value.deleteUser = err?.message || "Failed to delete user"
      console.error("deleteUser error:", err)
      throw err
    }
    finally {
      loading.value.deleteUser = false
    }
  }

  return {
    loading,
    errors,
    user,
    getUser,
    getUserBySlug,
    updateUser,
    updatePreferences,
    deleteUser,
  }
})
