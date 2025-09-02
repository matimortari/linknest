import { iconSchema } from "#shared/schemas/schemas"

export const useIconStore = defineStore("icon", () => {
  const icons = ref<IconType[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getIcons() {
    isLoading.value = true
    error.value = null

    try {
      icons.value = await getIconsService()
    }
    catch (error: any) {
      error.value = error.message || "Failed to get social icons"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function createIcon(payload: CreateIconPayload) {
    isLoading.value = true
    error.value = null

    const result = iconSchema.safeParse(payload)
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
      const response = await createIconService(result.data)
      icons.value.push(response.newIcon)
      return response
    }
    catch (error: any) {
      error.value = error.message || "Failed to create social icon"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteIcon(iconId: string) {
    if (!iconId) {
      error.value = "Icon ID is required to delete"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await deleteIconService(iconId)
      icons.value = icons.value.filter(icon => icon.id !== iconId)
      return response
    }
    catch (error: any) {
      error.value = error.message || "Failed to delete social icon"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    icons,
    isLoading,
    error,
    getIcons,
    createIcon,
    deleteIcon,
  }
})
