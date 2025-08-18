import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"
import { SOCIAL_ICONS } from "#shared/config/social-icons"
import { iconSchema } from "#shared/schemas/schemas"
import z from "zod"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const body = await readBody(event)
  const parseResult = iconSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid input", data: z.treeifyError(parseResult.error) })
  }

  const { platform, url } = parseResult.data

  const logo = SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS]
  if (!logo) {
    throw createError({ statusCode: 400, statusMessage: `Invalid platform: ${platform}` })
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const newIcon = await db.userIcon.create({
    data: {
      userId: user.id,
      platform,
      url,
      logo,
    },
  })

  return { message: "Social icon created successfully", newIcon }
})
