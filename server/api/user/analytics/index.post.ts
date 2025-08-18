import db from "#server/lib/db"

export default defineEventHandler(async (event) => {
  const { type, id, userId } = await readBody(event)
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: "User ID is required" })
  }

  if (type === "pageView") {
    await db.pageView.create({
      data: {
        userId,
        date: new Date(),
      },
    })

    return { message: "Page view recorded successfully" }
  }

  if (type === "link") {
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Missing ID for link click" })
    }

    const link = await db.userLink.findUnique({ where: { id } })
    if (!link)
      throw createError({ statusCode: 404, statusMessage: "Link not found" })
    if (link.userId === userId) {
      return { message: "Self-click ignored" }
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

    return { message: "Link click recorded successfully", linkClick }
  }

  if (type === "icon") {
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Missing ID for social icon click" })
    }

    const icon = await db.userIcon.findUnique({ where: { id } })
    if (!icon)
      throw createError({ statusCode: 404, statusMessage: "Social icon not found" })
    if (icon.userId === userId) {
      return { message: "Self-click ignored" }
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

    return { message: "Social icon click recorded successfully", iconClick }
  }

  throw createError({ statusCode: 400, statusMessage: "Invalid type provided" })
})
