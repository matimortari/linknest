export async function getPreferencesService(): Promise<UserPreferencesType> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/preferences`, {
    method: "GET",
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function updatePreferencesService(payload: UpdatePreferencesPayload): Promise<{ message: string, updatedPreferences: UserPreferencesType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/preferences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function updateSupportBannerService(payload: UpdateSupportBannerPayload): Promise<{ message: string, preferences: UserPreferencesType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/preferences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}

export async function resetPreferencesService(): Promise<{ message: string, preferences: UserPreferencesType }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/preferences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reset: true }),
  })
  if (!response.ok)
    throw new Error(response.statusText)
  return await response.json()
}
