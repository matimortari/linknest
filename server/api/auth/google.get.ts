import type { H3Event } from "h3"
import { handleOAuthUser } from "~~/server/lib/auth"

export default defineOAuthGoogleEventHandler({
  async onSuccess(event: any, { user, tokens }: any) {
    if (!user || typeof user !== "object") {
      throw createError({ statusCode: 400, statusMessage: "Invalid user data received from Google" })
    }

    const googleId = user.id?.toString() || user.sub?.toString()
    const email = user.email
    const name = user.name || user.given_name
    const picture = user.picture

    console.log("Received tokens from Google:", JSON.stringify(tokens, null, 2))
    console.log("Extracted user data from Google:", { googleId, email, name, picture })
    if (!googleId || !email) {
      throw createError({ statusCode: 400, statusMessage: "Missing required user data from Google" })
    }

    return handleOAuthUser(event, {
      id: googleId,
      name,
      email,
      image: picture,
      provider: "google",
    })
  },
  async onError(event: H3Event, error: any) {
    console.error("Google OAuth error:", error)
    if (!event || !event.node?.res) {
      throw createError({ statusCode: 500, statusMessage: "Internal server error" })
    }

    return sendRedirect(event, "/sign-in?error=google_oauth_failed")
  },
})
