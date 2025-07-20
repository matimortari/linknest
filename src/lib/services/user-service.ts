export async function getUserService(): Promise<UserType> {
  const response = await fetch("/api/user", {
    method: "GET",
  })
  if (!response.ok) {
    throw new Error(`Failed to get user data: ${response.statusText}`)
  }

  return await response.json()
}

export async function getUserBySlugService(slug: string): Promise<UserType> {
  const response = await fetch(`/api/user/${slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to get user by slug: ${response.statusText}`)
  }

  return await response.json()
}

export async function updateUserService(updatedUser: UserType): Promise<{ message: string, updatedUser: UserType }> {
  const response = await fetch("/api/user", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  })
  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`)
  }

  return await response.json()
}

export async function deleteUserService(): Promise<{ message: string }> {
  const response = await fetch("/api/user", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.statusText}`)
  }

  return await response.json()
}

export async function trackPageVisitService(userId: string): Promise<{ message: string }> {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "pageView", userId }),
  })
  if (!response.ok) {
    throw new Error(`Failed to track page visit: ${response.statusText}`)
  }

  return await response.json()
}

export async function trackClickService(id: string, type: "icon" | "link", userId: string): Promise<{ message: string }> {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, type, userId }),
  })
  if (!response.ok) {
    throw new Error(`Failed to track click: ${response.statusText}`)
  }

  return await response.json()
}
