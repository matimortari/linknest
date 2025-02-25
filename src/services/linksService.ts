// Get user links
export const getLinks = async () => {
	const res = await fetch("/api/links", { method: "GET" })

	return res.json()
}

// Add a new link
export const addLink = async (newLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newLink)
	})

	return res.json()
}

// Update an existing link
export const updateLink = async (updatedLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedLink)
	})

	return res.json()
}

// Delete an existing link by ID
export const deleteLink = async (id: string): Promise<string> => {
	await fetch(`/api/links?id=${id}`, { method: "DELETE" })

	return id
}
