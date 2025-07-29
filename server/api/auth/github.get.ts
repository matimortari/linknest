import type { H3Event } from "h3"
import { handleOAuthUser } from "~~/server/lib/auth"

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event: any, { user, tokens }: any) {
    console.log("Received user data from GitHub:", JSON.stringify(user, null, 2))
    console.log("Received tokens from GitHub:", JSON.stringify(tokens, null, 2))
    if (!user || typeof user !== "object") {
      throw createError({ statusCode: 400, statusMessage: "Invalid user data received from GitHub" })
    }

    const githubId = user.id?.toString()
    const email = user.email
    const name = user.name
    const picture = user.avatar_url

    console.log("Extracted user data from GitHub:", { githubId, email, name, picture })
    if (!githubId || !email) {
      throw createError({ statusCode: 400, statusMessage: "Missing required user data from GitHub" })
    }

    return handleOAuthUser(event, {
      id: githubId,
      name,
      email,
      image: picture,
      provider: "github",
    })
  },
  onError(error: any, event?: H3Event) {
    console.error("GitHub OAuth error:", error)
    if (!event || !event.node?.res) {
      return { statusCode: 500, body: "OAuth error occurred and response stream was unavailable." }
    }

    return sendRedirect(event, "/login?error=github_oauth_failed")
  },
})
