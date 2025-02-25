// Get user preferences
export const getPreferences = async () => {
	const res = await fetch("/api/preferences", { method: "GET" })
	return res.json()
}

// Update user preferences
export const updatePreferences = async (newPreferences: object) => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newPreferences)
	})
	return res.json()
}

// Update user preferences for support banner
export const updateSupportBanner = async (newBanner: string) => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ supportBanner: newBanner })
	})
	return res.json()
}

// Reset user preferences (send empty object to trigger defaults in Prisma)
export const resetPreferences = async () => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({})
	})
	return res.json()
}
