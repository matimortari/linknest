import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing social icon ID" })
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const icon = await db.userIcon.findUnique({
    where: { id },
  })
  if (!icon || icon.userId !== user.id) {
    throw createError({ statusCode: 404, statusMessage: "Social icon not found or unauthorized" })
  }

  await db.userIcon.delete({ where: { id } })

  return { message: "Social icon deleted successfully", iconId: icon.id }
})
