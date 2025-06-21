import type { EventHandlerRequest, H3Event } from "h3"
import { getServerSession } from "#auth"

export async function getUserFromSession(event: H3Event<EventHandlerRequest>) {
  const session = await getServerSession(event)
  if (!session?.user?.email)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })

  return session.user
}

export function generateSlug(base: string = "") {
  const randomString = Math.random().toString(36).substring(2, 10)

  return `${base
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}-${randomString}`
}

export function formatDate(dateString: Date) {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  })

  return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}
