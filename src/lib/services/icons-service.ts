export async function getIconsService(): Promise<IconType[]> {
  const response = await fetch("/api/icons", {
    method: "GET",
  })
  if (!response.ok) {
    throw new Error(`Failed to get social icons: ${response.statusText}`)
  }

  return await response.json()
}

export async function createIconService(data: CreateIconPayload): Promise<{ message: string, newIcon: IconType }> {
  const response = await fetch("/api/icons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to create social icon: ${response.statusText}`)
  }

  return await response.json()
}

export async function deleteIconService(id: string): Promise<{ message: string }> {
  const response = await fetch(`/api/icons/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to delete social icon: ${response.statusText}`)
  }

  return await response.json()
}
