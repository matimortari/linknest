export async function getLinksService(): Promise<LinkType[]> {
  const response = await fetch("/api/links", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function createLinkService(newLink: LinkType): Promise<LinkType> {
  const response = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLink),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.link
}

export async function updateLinkService(updatedLink: LinkType): Promise<LinkType> {
  const response = await fetch(`/api/links/${updatedLink.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedLink),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.link
}

export async function deleteLinkService(id: string): Promise<LinkType> {
  const response = await fetch(`/api/links/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}
