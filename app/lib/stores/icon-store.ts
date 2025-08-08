import { iconSchema } from "#shared/schemas/schemas"
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
    catch (error: any) {
      error.value = error?.message
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
      error.value = error?.message
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteIcon(id: string) {
    if (!id) {
      error.value = "Icon ID is required to delete"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await deleteIconService(id)
      icons.value = icons.value.filter(icon => icon.id !== id)
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
