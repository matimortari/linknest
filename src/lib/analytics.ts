import { db } from "@/src/lib/db"

// Track page visits and update UserStats table
export async function trackPageVisit(userId: string) {
	const now = new Date()

	// Find the first record for today
	const userStats = await db.userStats.findFirst({
		where: {
			userId,
			date: {
				gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) // Find any record for today
			}
		}
	})

	if (userStats) {
		await db.userStats.update({
			where: { id: userStats.id },
			data: { views: userStats.views + 1 }
		})
	} else {
		await db.userStats.create({
			data: {
				userId,
				date: now,
				views: 1,
				linkClicks: 0,
				iconClicks: 0
			}
		})
	}
}

// Sum linkClicks and iconClicks and update UserStats table
export async function updateClickStats(userId: string) {
	const now = new Date()

	// Find the first record for today
	const userStats = await db.userStats.findFirst({
		where: {
			userId,
			date: {
				gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) // Find any record for today
			}
		}
	})

	const linkClicksSum = await db.linkClick.aggregate({
		where: { userLink: { userId } },
		_count: { id: true }
	})
	const iconClicksSum = await db.iconClick.aggregate({
		where: { userIcon: { userId } },
		_count: { id: true }
	})

	const linkClicksTotal = linkClicksSum._count.id ?? 0
	const iconClicksTotal = iconClicksSum._count.id ?? 0

	if (userStats) {
		await db.userStats.update({
			where: { id: userStats.id },
			data: {
				linkClicks: linkClicksTotal,
				iconClicks: iconClicksTotal
			}
		})
	} else {
		await db.userStats.create({
			data: {
				userId,
				date: now,
				views: 0,
				linkClicks: linkClicksTotal,
				iconClicks: iconClicksTotal
			}
		})
	}
}
