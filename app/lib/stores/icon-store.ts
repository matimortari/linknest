import {
  createIconService,
  deleteIconService,
  getIconsService,
} from "~/lib/services/icons-service"

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

  type ShadowWeight = "none" | "light" | "medium" | "heavy"

  function getIconStyle(preferences: UserPreferencesType | null | undefined, isHovered: boolean) {
    if (!preferences) {
      return {}
    }

    const shadowMap: Record<ShadowWeight, string> = {
      none: "none",
      light: `0 2px 4px ${preferences.iconShadowColor || "rgba(0,0,0,0.1)"}`,
      medium: `0 4px 6px ${preferences.iconShadowColor || "rgba(0,0,0,0.2)"}`,
      heavy: `0 6px 10px ${preferences.iconShadowColor || "rgba(0,0,0,0.3)"}`,
    }

    return {
      backgroundColor: isHovered
        ? preferences.iconHoverBackgroundColor || "transparent"
        : preferences.iconBackgroundColor || "transparent",
      boxShadow: preferences.isIconShadow
        ? shadowMap[preferences.iconShadowWeight as ShadowWeight] || "none"
        : "none",
      transition: "background-color 0.4s ease, box-shadow 0.4s ease",
    }
  }

  function getIconInnerStyle(preferences: UserPreferencesType | null | undefined) {
    if (!preferences) {
      return {}
    }

    return {
      color: preferences.iconIconColor || "inherit",
    }
  }

  return {
    icons,
    isLoading,
    error,
    getIcons,
    createIcon,
    deleteIcon,
    getIconStyle,
    getIconInnerStyle,
  }
})
