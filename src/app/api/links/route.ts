import { db } from "@/src/lib/db"
import { linkSchema } from "@/src/lib/schemas"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Get user links
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const userLinks = await db.userLink.findMany({ where: { userId: session?.user.id } })
		return NextResponse.json(userLinks, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: "Failed to retrieve links", details: String(err) }, { status: 500 })
	}
}

// Create a new user link
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const body = await req.json()
		linkSchema.parse(body)

		const newLink = await db.userLink.create({
			data: {
				title: body.title,
				url: body.url,
				userId: session!.user.id
			}
		})

		return NextResponse.json(newLink, { status: 201 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 })
		}
		return NextResponse.json({ error: "Failed to create link", details: String(err) }, { status: 500 })
	}
}

// Update a user link
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { id, title, url } = await req.json()
		linkSchema.parse({ title, url })

		const existingLink = await db.userLink.findUnique({ where: { id } })
		if (!existingLink || existingLink.userId !== session?.user.id) {
			return NextResponse.json({ error: "Link not found or unauthorized" }, { status: 404 })
		}

		const updatedLink = await db.userLink.update({ where: { id }, data: { title, url } })
		return NextResponse.json(updatedLink, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 })
		}
		return NextResponse.json({ error: "Failed to update link", details: String(err) }, { status: 500 })
	}
}

// Delete a user link
export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id) {
		return NextResponse.json({ error: "Missing or invalid link ID" }, { status: 400 })
	}

	try {
		const existingLink = await db.userLink.findUnique({ where: { id } })
		if (!existingLink || existingLink.userId !== session?.user.id) {
			return NextResponse.json({ error: "Link not found or unauthorized" }, { status: 404 })
		}

		await db.userLink.delete({ where: { id } })

		return NextResponse.json({ message: "Link deleted successfully", id }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: "Failed to delete link", details: String(err) }, { status: 500 })
	}
}
