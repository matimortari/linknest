import db from "~~/server/lib/db"
import { getUserFromSession } from "~~/server/lib/utils"
import { linkSchema } from "~~/shared/lib/schemas"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const body = await readBody(event)
  const parseResult = linkSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input",
      data: parseResult.error.flatten(),
    })
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const newLink = await db.userLink.create({
    data: {
      userId: user.id,
      title: parseResult.data.title,
      url: parseResult.data.url,
    },
  })

  return { message: "Link created successfully", newLink }
})
