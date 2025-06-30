import db from "~/lib/db"

export default defineEventHandler(async (event) => {
  const { type, id, userId } = await readBody(event)

  try {
    if (type === "pageView") {
      if (!userId) {
        throw createError({ statusCode: 400, statusMessage: "Missing userId for page view" })
      }

      await db.pageView.create({
        data: {
          userId,
          date: new Date(),
        },
      })

      return { message: "Page view recorded" }
    }

    if (type === "link") {
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Missing id for link click" })
      }

      const linkClick = await db.linkClick.create({
        data: {
          userLinkId: id,
          date: new Date(),
        },
      })

      await db.userLink.update({
        where: { id },
        data: { clicks: { increment: 1 } },
      })

      return { message: "Link click recorded", linkClick }
    }

    if (type === "icon") {
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Missing id for icon click" })
      }

      const iconClick = await db.iconClick.create({
        data: {
          userIconId: id,
          date: new Date(),
        },
      })

      await db.userIcon.update({
        where: { id },
        data: { clicks: { increment: 1 } },
      })

      return { message: "Social icon click recorded", iconClick }
    }

    throw createError({ statusCode: 400, statusMessage: "Invalid type provided" })
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update analytics data",
      cause: error,
    })
  }
})
