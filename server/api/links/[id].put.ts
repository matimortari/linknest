import db from "~/lib/db"
import { linkSchema } from "~/lib/schemas"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)
  const id = getRouterParam(event, "id")

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing link ID" })
  }

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

  const updatedLink = await db.userLink.update({
    where: { id },
    data: {
      title,
      url
    },
  })

  return { message: "Link updated", link: updatedLink }
})
