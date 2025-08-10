import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"
import { linkSchema } from "#shared/schemas/schemas"
import z from "zod"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing link ID" })
  }

  const body = await readBody(event)
  const parseResult = linkSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid input", data: z.treeifyError(parseResult.error) })
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const updatedLink = await db.userLink.update({
    where: { id },
    data: {
      title: parseResult.data.title,
      url: parseResult.data.url,
    },
  })

  return { message: "Link updated successfully", updatedLink }
})
