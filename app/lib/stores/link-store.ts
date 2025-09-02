import { linkSchema } from "#shared/schemas/schemas"

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
    catch (error: any) {
      error.value = error?.message || "Failed to get links"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function createLink(payload: CreateLinkPayload) {
    isLoading.value = true
    error.value = null

    const result = linkSchema.safeParse(payload)
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
      const response = await createLinkService(result.data)
      links.value.push(response.newLink)
      return response
    }
    catch (error: any) {
      error.value = error?.message || "Failed to create link"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateLink(payload: UpdateLinkPayload) {
    if (!payload?.id) {
      error.value = "Link ID is required to update"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    const result = linkSchema.safeParse(payload)
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
      const response = await updateLinkService({ ...result.data, id: payload.id })
      const index = links.value.findIndex(l => l.id === response.updatedLink.id)
      if (index > -1)
        links.value[index] = response.updatedLink
      return response
    }
    catch (error: any) {
      error.value = error?.message || "Failed to update link"
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteLink(linkId: string) {
    if (!linkId) {
      error.value = "Link ID is required to delete"
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await deleteLinkService(linkId)
      links.value = links.value.filter(link => link.id !== linkId)
      return response
    }
    catch (error: any) {
      error.value = error?.message || "Failed to delete link"
      throw error
    }
    finally {
      isLoading.value = false
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
  }
})
