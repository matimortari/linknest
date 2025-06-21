import { SOCIAL_ICONS } from "~/lib/config/social-icons"
import db from "~/lib/db"
import { iconSchema } from "~/lib/schemas"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const body = await readBody(event)
  const parseResult = iconSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input",
      data: parseResult.error.flatten()
    })
  }

  const { platform, url } = parseResult.data

  const icon = SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS]
  if (!icon) {
    throw createError({
      statusCode: 400,
      statusMessage: `No social icon found for platform: ${platform}`
    })
  }

  const user = await db.user.findUnique({
    where: { email: sessionUser.email }
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const newIcon = await db.userIcon.create({
    data: {
      userId: user.id,
      platform,
      url,
      icon,
    }
  })

  return { message: "Social icon created", icon: newIcon }
})
