import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user preferences
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const preferences = await db.userPreferences.findUnique({ where: { userId: session?.user.id } })
	if (!preferences) {
		return NextResponse.json({ error: "User preferences not found" }, { status: 404 })
	}

	return NextResponse.json(preferences, { status: 200 })
}

// PUT method for updating user preferences or resetting to default
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const preferencesData = await req.json()

	const currentPreferences = await db.userPreferences.findUnique({ where: { userId: session?.user.id } })
	if (!currentPreferences) {
		return NextResponse.json({ error: "User preferences not found" }, { status: 404 })
	}

	// Reset by deleting and recreating the preferences
	if (Object.keys(preferencesData).length === 0) {
		await db.userPreferences.delete({ where: { userId: session?.user.id } })
		const newPreferences = await db.userPreferences.create({ data: { userId: session!.user.id } })

		return NextResponse.json(
			{ message: "User preferences reset to default", preferences: newPreferences },
			{ status: 200 }
		)
	}

	const updatedPreferences = await db.userPreferences.update({
		where: { userId: session?.user.id },
		data: preferencesData
	})

	return NextResponse.json(
		{ message: "User preferences updated successfully", preferences: updatedPreferences },
		{ status: 200 }
	)
}
