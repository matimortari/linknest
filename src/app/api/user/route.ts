import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// Get user data
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
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
	} catch (err) {
		return NextResponse.json({ error: "Failed to retrieve user", details: String(err) }, { status: 500 })
	}
}

// Update user data
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { newSlug, newDescription, newImageUrl } = await req.json()

		const updateData: { slug?: string; description?: string | null; image?: string | null } = {
			...(newSlug && typeof newSlug === "string" && { slug: newSlug }),
			...(newDescription !== undefined && typeof newDescription === "string" && { description: newDescription }),
			...(newImageUrl !== undefined && typeof newImageUrl === "string" && { image: newImageUrl || null })
		}

		if (!Object.keys(updateData).length) {
			return NextResponse.json({ error: "No valid data to update" }, { status: 400 })
		}

		const updatedUser = await db.user.update({
			where: { id: session?.user.id },
			data: updateData
		})

		return NextResponse.json({ message: "User updated successfully", updatedUser }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: "Failed to update user", details: String(err) }, { status: 500 })
	}
}

// Delete user
export async function DELETE() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		await db.user.delete({ where: { id: session?.user.id } })
		return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: "Failed to delete user", details: String(err) }, { status: 500 })
	}
}
