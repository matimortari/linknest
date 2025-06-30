export async function getPreferencesService(): Promise<UserPreferencesType> {
  const response = await fetch("/api/preferences", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  return response.json()
}

export async function updatePreferencesService(newPreferences: UserPreferencesType) {
  const response = await fetch("/api/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPreferences),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.preferences
}

export async function updateSupportBannerService(newBanner: string) {
  const response = await fetch("/api/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ supportBanner: newBanner }),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.preferences
}

export async function resetPreferencesService(): Promise<UserPreferencesType> {
  const response = await fetch("/api/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reset: true }),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const json = await response.json()
  return json.preferences
}
