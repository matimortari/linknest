import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { Bowlby_One, Chau_Philomene_One, Inter, Lato } from "next/font/google"
import { NextResponse } from "next/server"

// API: Get the current session or return an unauthorized response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

// Auth: Generate a random slug when a new user is created
export function generateSlug(base: string = "") {
	const randomString = Math.random().toString(36).substring(2, 10)

	return `${base
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")}-${randomString}`
}

// Analytics: Track page visits and update UserStats table
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

// Analytics: Sum linkClicks and iconClicks and update UserStats table
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

// Format date to "mmm, d, yy" format
export function formatDate(dateString: Date) {
	const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
		year: "2-digit",
		month: "short",
		day: "numeric"
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}

// Next.js fonts
export const inter = Inter({ subsets: ["latin"] })
export const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })
export const lato = Lato({ subsets: ["latin"], weight: ["700"] })
export const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
