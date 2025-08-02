import {
  createLinkService,
  deleteLinkService,
  getLinksService,
  updateLinkService,
} from "~/lib/services/links-service"

export const useLinkStore = defineStore("link", () => {
  const links = ref<LinkType[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getLinks() {
    isLoading.value = true
    error.value = null

    try {
      links.value = await getLinksService()
    }
    catch (err: any) {
      error.value = err?.message
    }
    finally {
      isLoading.value = false
    }
  }

  async function createLink(payload: CreateLinkPayload) {
    if (!payload || !payload.url || !payload.title) {
      error.value = "Link must have a URL and title"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await createLinkService(payload)
      links.value.push(response.newLink)
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

  async function updateLink(payload: UpdateLinkPayload) {
    if (!payload || !payload.id) {
      error.value = "Link ID is required to update"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await updateLinkService(payload)
      const index = links.value.findIndex(l => l.id === response.updatedLink.id)
      if (index > -1)
        links.value[index] = response.updatedLink
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

  async function deleteLink(id: string) {
    if (!id) {
      error.value = "Link ID is required to delete"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await deleteLinkService(id)
      links.value = links.value.filter(link => link.id !== id)
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

  function getLinkStyle(preferences: UserPreferencesType | null | undefined, isHovered: boolean) {
    if (!preferences) {
      return {}
    }

    const shadowMap: Record<ShadowWeight, string> = {
      none: "none",
      light: `0 2px 4px ${preferences.linkShadowColor || "rgba(0,0,0,0.1)"}`,
      medium: `0 4px 6px ${preferences.linkShadowColor || "rgba(0,0,0,0.2)"}`,
      heavy: `0 6px 10px ${preferences.linkShadowColor || "rgba(0,0,0,0.3)"}`,
    }

    return {
      backgroundColor: isHovered
        ? preferences.linkHoverBackgroundColor || "transparent"
        : preferences.linkBackgroundColor || "transparent",
      boxShadow: preferences.isLinkShadow
        ? shadowMap[preferences.linkShadowWeight as ShadowWeight] || "none"
        : "none",
      borderRadius: preferences.linkBorderRadius || "0px",
      padding: preferences.linkPadding || "0px",
      transition: "background-color 0.4s ease, box-shadow 0.4s ease",
    }
  }

  function getLinkInnerStyle(preferences: UserPreferencesType | null | undefined) {
    if (!preferences) {
      return {}
    }

    return {
      color: preferences.linkTextColor || "inherit",
      fontWeight: preferences.linkTextWeight || "normal",
      fontSize: preferences.linkTextSize || "inherit",
    }
  }

  return {
    links,
    isLoading,
    error,
    getLinks,
    createLink,
    updateLink,
    deleteLink,
    getLinkStyle,
    getLinkInnerStyle,
  }
})
