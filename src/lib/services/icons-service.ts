export async function getIconsService(): Promise<IconType[]> {
  const response = await fetch("/api/icons", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function createIconService(newIcon: IconType): Promise<IconType> {
  const response = await fetch("/api/icons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newIcon),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.icon
}

export async function deleteIconService(id: string): Promise<IconType> {
  const response = await fetch(`/api/icons/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}
