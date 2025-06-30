export async function getUserService(): Promise<UserType> {
  const response = await fetch("/api/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function getUserBySlugService(slug: string): Promise<UserType> {
  const response = await fetch(`/api/user/${slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function updateUserService(data: UserType): Promise<UserType> {
  const response = await fetch("/api/user", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.user
}

export async function deleteUserService(): Promise<UserType> {
  const response = await fetch("/api/user", {
    method: "DELETE",
    headers: { "Content-Type": "application/json", },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function trackPageVisitService(userId: string) {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ type: "pageView", userId }),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function trackClickService(id: string, type: "icon" | "link", userId: string) {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ id, type, userId }),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}
