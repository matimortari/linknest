import db from "~/lib/db"
import { linkSchema } from "~/lib/schemas"
import { getUserFromSession } from "~/lib/utils"

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

  const { title, url } = parseResult.data

  const user = await db.user.findUnique({
    where: { email: sessionUser.email }
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const newLink = await db.userLink.create({
    data: {
      userId: user.id,
      title,
      url,
    },
  })

  return { message: "Link created", link: newLink }
})
