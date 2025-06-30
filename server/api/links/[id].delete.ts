import db from "~/lib/db"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const id = event.context.params?.id
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing link ID" })
  }

  const user = await db.user.findUnique({
    where: { email: sessionUser.email },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const link = await db.userLink.findUnique({
    where: { id },
  })
  if (!link || link.userId !== user.id) {
    throw createError({ statusCode: 404, statusMessage: "Link not found or unauthorized" })
  }

  await db.userLink.delete({ where: { id } })

  return { message: "Link deleted", linkId: id }
})
