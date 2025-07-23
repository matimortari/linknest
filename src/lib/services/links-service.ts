export async function getLinksService(): Promise<LinkType[]> {
  const response = await fetch("/api/links", {
    method: "GET",
  })
  if (!response.ok) {
    throw new Error(`Failed to get links: ${response.statusText}`)
  }

  return await response.json()
}

export async function createLinkService(data: CreateLinkPayload): Promise<{ message: string, newLink: LinkType }> {
  const response = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to create link: ${response.statusText}`)
  }

  return await response.json()
}

export async function updateLinkService(data: UpdateLinkPayload): Promise<{ message: string, updatedLink: LinkType }> {
  const response = await fetch(`/api/links/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to update link: ${response.statusText}`)
  }

  return await response.json()
}

export async function deleteLinkService(id: string): Promise<{ message: string }> {
  const response = await fetch(`/api/links/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to delete link: ${response.statusText}`)
  }

  return await response.json()
}
