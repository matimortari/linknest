// Update user slug
export const updateSlug = async (newSlug: string): Promise<void> => {
	const response = await fetch("/api/user", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ newSlug })
	})

	return response.json()
}

// Update user description
export const updateDescription = async (newDescription: string): Promise<void> => {
	const response = await fetch("/api/user", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ newDescription })
	})

	return response.json()
}

// Update user image
export const updateImage = async (newImageUrl: string): Promise<void> => {
	const response = await fetch("/api/user", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ newImageUrl })
	})

	if (!response.ok) {
		throw new Error("Failed to update image")
	}

	return response.json()
}

// Delete user account
export const deleteUser = async () => {
	const response = await fetch("/api/user", { method: "DELETE" })

	return response.json()
}
