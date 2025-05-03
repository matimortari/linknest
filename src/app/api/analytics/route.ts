import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// Get user analytics data
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const analyticsData = await db.userStats.findMany({ where: { userId: session?.user.id } })
		if (!analyticsData || analyticsData.length === 0) {
			return NextResponse.json({ error: "Analytics data not found" }, { status: 404 })
		}
		return NextResponse.json(analyticsData, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: "Failed to retrieve analytics data", details: String(err) }, { status: 500 })
	}
}

// Update user analytics data
export async function POST(req: NextRequest) {
	const { type, id } = await req.json()

	// Create a new linkClick or iconClick entry with the current date for every click and increment the clicks count
	try {
		if (type === "link") {
			const linkClick = await db.linkClick.create({
				data: {
					userLinkId: id,
					date: new Date()
				}
			})

			await db.userLink.update({
				where: { id },
				data: { clicks: { increment: 1 } }
			})

			return NextResponse.json(linkClick, { status: 200 })
		}

		// Handle icon click tracking
		if (type === "icon") {
			const iconClick = await db.iconClick.create({
				data: {
					userIconId: id,
					date: new Date()
				}
			})

			await db.userIcon.update({
				where: { id },
				data: { clicks: { increment: 1 } }
			})

			return NextResponse.json(iconClick, { status: 200 })
		}

		return NextResponse.json({ error: "Invalid type provided" }, { status: 400 })
	} catch (err) {
		return NextResponse.json({ error: "Failed to update analytics data", details: String(err) }, { status: 500 })
	}
}
