import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

export function formatDate(dateString: Date) {
	const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
		year: "2-digit",
		month: "short",
		day: "numeric"
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}

export function generateSlug(base: string = "") {
	const randomString = Math.random().toString(36).substring(2, 10)

	return `${base
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")}-${randomString}`
}
