import { put } from "@vercel/blob"

export default defineEventHandler(async (event) => {
  const form = await readFormData(event)
  const file = form.get("file")
  if (!file || !(file instanceof File)) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" })
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  })

  return blob
})
