import db from "~/lib/db"
import { userDataSchema } from "~/lib/schemas"
import { getUserFromSession } from "~/lib/utils"

export default defineEventHandler(async (event) => {
  const sessionUser = await getUserFromSession(event)

  const body = await readBody(event)
  const parseResult = userDataSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input",
      data: parseResult.error.flatten(),
    })
  }

  const { slug, description, image } = parseResult.data

  const user = await db.user.findUnique({
    where: { email: sessionUser.email }
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" })
  }

  const updatedUserData = await db.user.update({
    where: { id: user.id },
    data: {
      slug,
      description,
      image,
    }
  })

  return { message: "User data updated", userData: updatedUserData }
})
