import { formatDate } from "@/src/lib/utils"
import { getIcons } from "@/src/services/iconsService"
import { getLinks } from "@/src/services/linksService"

// Get user analytics data
export const getAnalytics = async () => {
	const res = await fetch("/api/analytics", { method: "GET" })
	const data = await res.json()

	const formattedData = data.map((entry: { date: any }) => ({
		...entry,
		date: formatDate(entry.date)
	}))

	return formattedData
}

// Track clicks for a link or icon
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

// Combine links and social icons data and fetch them together
export const getClicksByLink = async () => {
	const links = await getLinks()
	const icons = await getIcons()

	const combinedItems = [
		...links.map((link: UserLink) => ({ ...link, type: "link" })),
		...icons.map((icon: UserIcon) => ({ ...icon, type: "icon" }))
	]

	return combinedItems
}
