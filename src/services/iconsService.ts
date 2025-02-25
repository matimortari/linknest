// Get user social icons
export const getIcons = async () => {
	const res = await fetch("/api/icons", { method: "GET" })

	return res.json()
}

// Add a new social icon
export const addIcon = async (newIcon: UserIcon) => {
	const res = await fetch("/api/icons", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newIcon)
	})

	return res.json()
}

// Delete an existing social icon by ID
export const deleteIcon = async (id: number): Promise<number> => {
	await fetch(`/api/icons?id=${id}`, { method: "DELETE" })

	return id
}
