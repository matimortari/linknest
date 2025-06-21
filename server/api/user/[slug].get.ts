import db from "~/lib/db"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  const user = await db.user.findUnique({
    where: { slug: slug as string },
    include: {
      links: true,
      icons: true,
      preferences: true,
    },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  return user
})
