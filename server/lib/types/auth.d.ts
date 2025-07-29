declare module "#auth-utils" {
  interface User {
    id: string
    email: string
    name: string
    image?: string | null
    slug: string
    preferences: Record<string, any>
    links?: Record<string, any>
    icons?: Record<string, any>
  }

  interface UserSession {
    user: User
    loggedInAt: Date
  }
}
