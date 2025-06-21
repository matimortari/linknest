import db from "~/lib/db"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const user = await db.user.findUnique({
    where: { email: sessionUser.email },
    include: {
      links: true,
      icons: true,
      views: true,
      preferences: true
    }
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  return user
})
