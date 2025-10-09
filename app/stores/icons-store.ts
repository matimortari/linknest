import type { CreateUserIconInput } from "#shared/schemas/icons"

export const useIconsStore = defineStore("icons", () => {
  const icons = ref<Icon[]>([])

  const loading = ref<Record<"getIcons" | "createIcon" | "deleteIcon", boolean>>({
    getIcons: false,
    createIcon: false,
    deleteIcon: false,
  })

  const errors = ref<Record<"getIcons" | "createIcon" | "deleteIcon", string | null>>({
    getIcons: null,
    createIcon: null,
    deleteIcon: null,
  })

  async function getIcons() {
    loading.value.getIcons = true
    errors.value.getIcons = null

    try {
      const res = await iconsService.getIcons()
      icons.value = res.icons
    }
    catch (err: any) {
      errors.value.getIcons = err?.message || "Failed to get icons"
      console.error("getIcons error:", err)
      throw err
    }
    finally {
      loading.value.getIcons = false
    }
  }

  async function createIcon(data: CreateUserIconInput) {
    loading.value.createIcon = true
    errors.value.createIcon = null

    try {
      const res = await iconsService.createIcon(data)
      icons.value.push(res.icon)
    }
    catch (err: any) {
      errors.value.createIcon = err?.message || "Failed to create icon"
      console.error("createIcon error:", err)
      throw err
    }
    finally {
      loading.value.createIcon = false
    }
  }

  async function deleteIcon(id: string) {
    loading.value.deleteIcon = true
    errors.value.deleteIcon = null

    try {
      await iconsService.deleteIcon(id)
      icons.value = icons.value.filter(icon => icon.id !== id)
    }
    catch (err: any) {
      errors.value.deleteIcon = err?.message || "Failed to delete icon"
      console.error("deleteIcon error:", err)
      throw err
    }
    finally {
      loading.value.deleteIcon = false
    }
  }

  return {
    loading,
    errors,
    icons,
    getIcons,
    createIcon,
    deleteIcon,
  }
})
