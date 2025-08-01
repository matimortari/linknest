import {
  createIconService,
  deleteIconService,
  getIconsService,
} from "~~/app/lib/services/icons-service"

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
    catch (err: any) {
      error.value = err?.message
    }
    finally {
      isLoading.value = false
    }
  }

  async function createIcon(payload: CreateIconPayload) {
    if (!payload || !payload.platform || !payload.url) {
      error.value = "Social icon must have a URL and platform"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await createIconService(payload)
      icons.value.push(response.newIcon)
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

  async function deleteIcon(id: string) {
    isLoading.value = true
    error.value = null

    try {
      const response = await deleteIconService(id)
      icons.value = icons.value.filter(icon => icon.id !== id)
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

  return {
    icons,
    isLoading,
    error,
    getIcons,
    createIcon,
    deleteIcon,
  }
})
