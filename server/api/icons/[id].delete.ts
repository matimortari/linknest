import db from "~/lib/db"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const id = event.context.params?.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing social icon ID" })
  }

  const user = await db.user.findUnique({
    where: { email: sessionUser.email },
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

  return { message: "Social icon deleted", iconId: id }
})
