import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"
import { put } from "@vercel/blob"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const form = await readFormData(event)
  const file = form.get("file")
  const type = typeof form.get("type") === "string" ? form.get("type") : ""
  if (!file || !(file instanceof File)) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" })
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const allowedTypes = ["avatar", "banner"] as const
  type AllowedType = typeof allowedTypes[number]
  const safeType: AllowedType | "other" = allowedTypes.includes(type as AllowedType) ? (type as AllowedType) : "other"

  // Validate MIME type
  const allowedMimeTypes: Record<AllowedType, string[]> = {
    avatar: ["image/png", "image/jpeg", "image/webp"],
    banner: ["image/png", "image/jpeg", "image/webp"],
  }
  if (safeType === "other" || !allowedMimeTypes[safeType]?.includes(file.type)) {
    throw createError({ statusCode: 415, statusMessage: `Unsupported file type: ${file.type}` })
  }

  // Validate file size (max 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_FILE_SIZE) {
    throw createError({ statusCode: 413, statusMessage: "File too large" })
  }

  const ext = file.name.split(".").pop()
  const timestamp = Date.now()
  const blob = await put(`linknest-user-uploads/${safeType}/${user.id}/${timestamp}.${ext}`, file, {
    access: "public",
  })

  await db.user.update({
    where: { id: user.id },
    data: {
      image: blob.url,
    },
  })

  return {
    imageUrl: blob.url,
  }
})
