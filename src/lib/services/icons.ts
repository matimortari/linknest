export async function getIcons(): Promise<IconType[]> {
  const response = await fetch("/api/icons", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function createIcon(newIcon: IconType): Promise<IconType> {
  const response = await fetch("/api/icons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newIcon),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function deleteIcon(id: string): Promise<IconType> {
  const response = await fetch(`/api/icons/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}
