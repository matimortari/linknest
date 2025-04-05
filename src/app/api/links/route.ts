import { db } from "@/src/lib/db"
import { linkSchema } from "@/src/lib/formSchema"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Get user links
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const userLinks = await db.userLink.findMany({ where: { userId: session?.user.id } })
	if (!userLinks) {
		return NextResponse.json({ error: "User Links not found" }, { status: 404 })
	}

	return NextResponse.json(userLinks, { status: 200 })
}

// Create a new user link
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { title, url } = await req.json()

	try {
		linkSchema.parse({ title, url })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.errors }, { status: 400 })
		}
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}

	const newLink = await db.userLink.create({
		data: { title, url, userId: session!.user.id }
	})

	return NextResponse.json(newLink)
}

// Update a user link
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { id, title, url } = await req.json()

	try {
		linkSchema.parse({ title, url })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.errors }, { status: 400 })
		}
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}

	const existingLink = await db.userLink.findUnique({ where: { id } })
	if (!existingLink || existingLink.userId !== session?.user.id) {
		return NextResponse.json({ error: "Link not found" }, { status: 404 })
	}

	const updatedLink = await db.userLink.update({ where: { id }, data: { title, url } })

	return NextResponse.json(updatedLink)
}

// Delete a user link
export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const existingLink = await db.userLink.findUnique({ where: { id } })
	if (!existingLink || existingLink.userId !== session?.user.id) {
		return NextResponse.json({ error: "Link not found" }, { status: 404 })
	}

	await db.userLink.delete({ where: { id } })

	return NextResponse.json({ id })
}
