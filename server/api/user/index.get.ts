import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      links: {
        include: {
          linkClicks: true,
        },
      },
      icons: {
        include: {
          iconClicks: true,
        },
      },
      views: true,
      preferences: true,
    },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  return user
})
