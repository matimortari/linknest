import { formatDate } from "@/src/lib/utils"
import { getIcons } from "@/src/services/icons"
import { getLinks } from "@/src/services/links"

export const getAnalytics = async () => {
	const res = await fetch("/api/analytics", { method: "GET" })
	const data = await res.json()

	const formattedData = data.map((entry: { date: any }) => ({
		...entry,
		date: formatDate(entry.date)
	}))

	return formattedData
}

export const trackClick = async (id: number, type: "link" | "icon", userId: string) => {
	const res = await fetch("/api/analytics", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ id, type, userId })
	})

	return res.json()
}

export const getClicksByLink = async () => {
	const links = await getLinks()
	const icons = await getIcons()

	const combinedItems = [
		...links.map((link: UserLink) => ({ ...link, type: "link" })),
		...icons.map((icon: UserIcon) => ({ ...icon, type: "icon" }))
	]

	return combinedItems
}
