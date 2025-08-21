export async function getUserService(): Promise<UserType> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "GET",
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function getUserBySlugService(userSlug: string): Promise<UserType> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user/${userSlug}`, {
    method: "GET",
  })
  if (!response.ok)
    throw new Error(`Failed to get user by slug: ${response.statusText}`)
  return await response.json()
}

export async function updateUserService(payload: UpdateUserPayload): Promise<{ message: string, user: UserType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function updateUserImageService(image: FormData): Promise<{ imageUrl: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user/image-upload`, {
    method: "POST",
    body: image,
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function deleteUserService(): Promise<{ message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function trackPageVisitService(userId: string): Promise<{ message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user/analytics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "pageView", userId }),
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function trackClickService(eventId: string, type: "icon" | "link", userId: string): Promise<{ message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/user/analytics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, type, userId }),
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}
