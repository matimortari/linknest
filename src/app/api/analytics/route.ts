import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// Get user analytics data
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const analyticsData = await db.userStats.findMany({ where: { userId: session?.user.id } })
	if (!analyticsData) {
		return NextResponse.json({ error: "Analytics data not found" }, { status: 404 })
	}

	return NextResponse.json(analyticsData, { status: 200 })
}

// Process link and social icon clicks
export async function POST(req: NextRequest) {
	const { type, id } = await req.json()

	// Create a new linkClick or iconClick entry with the current date for every click and increment the clicks count
	if (type === "link") {
		try {
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
		} catch {
			return NextResponse.json({ error: "Failed to create link click" }, { status: 500 })
		}
	} else if (type === "icon") {
		try {
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
		} catch {
			return NextResponse.json({ error: "Failed to create social icon click" }, { status: 500 })
		}
	}
}
