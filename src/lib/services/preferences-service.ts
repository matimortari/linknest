export async function getPreferencesService(): Promise<UserPreferencesType> {
  const response = await fetch("/api/preferences", {
    method: "GET",
  })
  if (!response.ok) {
    throw new Error(`Failed to get user preferences: ${response.statusText}`)
  }

  return await response.json()
}

export async function updatePreferencesService(data: UpdatePreferencesPayload): Promise<{ message: string, updatedPreferences: UserPreferencesType }> {
  const response = await fetch("/api/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to update user preferences: ${response.statusText}`)
  }

  return await response.json()
}

export async function updateSupportBannerService(data: UpdateSupportBannerPayload): Promise<{ message: string, preferences: UserPreferencesType }> {
  const response = await fetch("/api/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to update support banner: ${response.statusText}`)
  }

  return await response.json()
}

export async function resetPreferencesService(): Promise<{ message: string, preferences: UserPreferencesType }> {
  const response = await fetch("/api/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reset: true }),
  })
  if (!response.ok) {
    throw new Error(`Failed to reset user preferences: ${response.statusText}`)
  }

  return await response.json()
}
