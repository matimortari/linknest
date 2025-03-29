import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting extended user data
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const user = await db.user.findUnique({
		where: { id: session?.user.id },
		include: {
			userLinks: true,
			userIcons: true,
			userPreferences: true
		}
	})
	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 })
	}

	return NextResponse.json(user, { status: 200 })
}

// PUT method for updating user data
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { newSlug, newDescription, newImageUrl } = await req.json()

	const updateData: { slug?: string; description?: string | null; image?: string | null } = {
		...(newSlug && typeof newSlug === "string" && { slug: newSlug }),
		...(newDescription !== undefined && typeof newDescription === "string" && { description: newDescription }),
		...(newImageUrl && typeof newImageUrl === "string" && { image: newImageUrl })
	}

	if (!Object.keys(updateData).length) {
		return NextResponse.json({ error: "No valid data to update" }, { status: 400 })
	}

	const updatedUser = await db.user.update({
		where: { id: session?.user.id },
		data: updateData
	})

	return NextResponse.json({ message: "User updated successfully", updatedUser }, { status: 200 })
}

// DELETE method for deleting user
export async function DELETE() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	await db.user.delete({ where: { id: session?.user.id } })

	return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
}
