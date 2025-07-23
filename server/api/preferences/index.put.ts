import db from "~~/server/lib/db"
import { getUserFromSession } from "~~/server/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)
  const body = await readBody(event)

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
    include: { preferences: true },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  if (body.reset === true) {
    await db.userPreferences.delete({ where: { userId: user.id } })
    const defaultPreferences = await db.userPreferences.create({ data: { userId: user.id } })

    return { message: "User references reset successfully", updatedPreferences: defaultPreferences }
  }

  const updatedPreferences = await db.userPreferences.update({
    where: { userId: user.id },
    data: body,
  })

  return { message: "User preferences updated successfully", updatedPreferences }
})
