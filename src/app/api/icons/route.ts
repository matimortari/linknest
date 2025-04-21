import { db } from "@/src/lib/db"
import { iconSchema } from "@/src/lib/schemas"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Get user social icons
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const userIcons = await db.userIcon.findMany({ where: { userId: session?.user.id } })
	if (!userIcons) {
		return NextResponse.json({ error: "User Social Icons not found" }, { status: 404 })
	}

	return NextResponse.json(userIcons, { status: 200 })
}

// Create a new user social icon
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { platform, url, icon } = await req.json()

	try {
		iconSchema.parse({ platform, url, icon })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.errors }, { status: 400 })
		}
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}

	const newIcon = await db.userIcon.create({ data: { platform, url, icon, userId: session!.user.id } })

	return NextResponse.json(newIcon)
}

// Delete a user social icon
export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const existingIcon = await db.userIcon.findUnique({ where: { id } })
	if (!existingIcon || existingIcon.userId !== session?.user.id) {
		return NextResponse.json({ error: "Social icon not found" }, { status: 404 })
	}

	await db.userIcon.delete({ where: { id } })

	return NextResponse.json({ id })
}
