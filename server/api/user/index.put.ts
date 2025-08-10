import db from "#server/lib/db"
import { getUserFromSession } from "#server/lib/utils"
import { userDataSchema } from "#shared/schemas/schemas"
import z from "zod"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const body = await readBody(event)
  const parseResult = userDataSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid input", data: z.treeifyError(parseResult.error) })
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      slug: parseResult.data.slug,
      description: parseResult.data.description,
    },
  })

  return { message: "User updated successfully", user: updatedUser }
})
