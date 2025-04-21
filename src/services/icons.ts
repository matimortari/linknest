export const getIcons = async () => {
	const res = await fetch("/api/icons", { method: "GET" })

	return res.json()
}

export const addIcon = async (newIcon: UserIcon) => {
	const res = await fetch("/api/icons", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newIcon)
	})

	return res.json()
}

export const deleteIcon = async (id: string): Promise<string> => {
	await fetch(`/api/icons?id=${id}`, { method: "DELETE" })

	return id
}
