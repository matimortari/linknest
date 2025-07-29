import { getBaseUrl } from "~/lib/utils"

export async function getIconsService(): Promise<IconType[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/icons`, {
    method: "GET",
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}

export async function createIconService(data: CreateIconPayload): Promise<{ message: string, newIcon: IconType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/icons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}

export async function deleteIconService(id: string): Promise<{ message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/icons/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}
