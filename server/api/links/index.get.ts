import db from "~/lib/db"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const user = await db.user.findUnique({
    where: { email: sessionUser.email },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const links = await db.userLink.findMany({
    where: { userId: user.id },
  })

  return links
})
