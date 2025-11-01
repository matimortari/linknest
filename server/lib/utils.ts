import type { EventHandlerRequest, H3Event } from "h3"
import db from "#server/lib/db"
import { del, put } from "@vercel/blob"

export async function getUserFromSession(event: H3Event<EventHandlerRequest>) {
  const session = await getUserSession(event)
  if (session?.user?.id) {
    return session.user
  }

  const authHeader = event.node.req.headers.authorization
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  return session.user
}

export async function generateSlug(base: string = ""): Promise<string> {
  const cleanedBase = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-") // One or more whitespace characters to hyphen
    .replace(/[^a-z0-9-]/g, "") // Any character NOT a-z, 0-9, or hyphen
    .replace(/(-)+/g, "-") // One or more hyphens
    .replace(/^(-)+|(-)+$/g, "") // Leading OR trailing hyphens
    || "user"

  let slug: string
  let exists = true
  let attempt = 0

  while (exists && attempt < 5) {
    const randomString = Math.random().toString(36).slice(2, 8)
    slug = `${cleanedBase}-${randomString}`
    const existingUser = await db.user.findUnique({ where: { slug } })
    exists = !!existingUser
    attempt++
  }

  return slug!
}

export async function uploadFile({ path, file, maxSize, allowedMimeTypes, oldFileUrl }: {
  path: string
  file: File
  maxSize: number
  allowedMimeTypes: string[]
  oldFileUrl?: string
}) {
  if (!file || !(file instanceof File)) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" })
  }
  if (allowedMimeTypes.length && !allowedMimeTypes.includes(file.type)) {
    throw createError({ statusCode: 415, statusMessage: `Unsupported file type: ${file.type}` })
  }
  if (file.size > maxSize) {
    throw createError({ statusCode: 413, statusMessage: "File too large" })
  }

  const ext = file.name.split(".").pop()?.toLowerCase()
  const blob = await put(`${path}/${Date.now()}.${ext}`, file, { access: "public" })
  if (oldFileUrl?.includes("blob.vercel-storage.com")) {
    await del(oldFileUrl).catch(err => console.error("Failed to delete old file:", err))
  }

  return blob.url
}
