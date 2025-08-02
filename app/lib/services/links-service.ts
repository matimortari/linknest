import { getBaseUrl } from "~/lib/utils"

export async function getLinksService(): Promise<LinkType[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/links`, {
    method: "GET",
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}

export async function createLinkService(data: CreateLinkPayload): Promise<{ message: string, newLink: LinkType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}

export async function updateLinkService(data: UpdateLinkPayload): Promise<{ message: string, updatedLink: LinkType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/links/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok)
    throw new Error(`x${response.statusText}`)
  return await response.json()
}

export async function deleteLinkService(id: string): Promise<{ message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/links/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok)
    throw new Error(`${response.statusText}`)
  return await response.json()
}
