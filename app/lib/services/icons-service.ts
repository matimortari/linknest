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

export async function createIconService(payload: CreateIconPayload): Promise<{ message: string, newIcon: IconType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/icons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}

export async function deleteIconService(iconId: string): Promise<{ message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/icons/${iconId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}
