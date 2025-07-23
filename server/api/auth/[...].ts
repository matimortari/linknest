import type { DefaultSession } from "next-auth"
import { NuxtAuthHandler } from "#auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import db from "~~/server/lib/db"
import { generateSlug } from "~~/server/lib/utils"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      description: string
      image: string
      email: string
      slug: string
      preferences: UserPreferencesType
      links?: LinkType[]
      icons?: IconType[]
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string
  }
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const providerAccountId = account.providerAccountId
        const provider = account.provider
        const email = profile.email as string
        const description = ""

        const getProfilePicture = (profile: any, provider: string) => {
          if (provider === "google")
            return profile.picture ?? ""
          if (provider === "github")
            return profile.avatar_url ?? ""
          return ""
        }

        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider,
              providerAccountId,
            },
          },
          include: { user: true },
        })

        let user = existingAccount?.user
        if (!user) {
          user = await db.user.create({
            data: {
              email,
              name: profile.name,
              image: getProfilePicture(profile, provider),
              description,
              slug: generateSlug(profile.name ?? email),
              preferences: {
                create: {},
              },
              accounts: {
                create: {
                  provider,
                  providerAccountId,
                },
              },
            },
          })
        }
        else {
          const linkedAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider,
                providerAccountId,
              },
            },
          })
          if (!linkedAccount) {
            await db.account.create({
              data: {
                userId: user.id,
                provider,
                providerAccountId,
              },
            })
          }
        }

        token.userId = user.id
      }

      return token
    },

    async session({ session, token }) {
      if (!token.userId)
        return session

      const user = await db.user.findUnique({
        where: { id: token.userId },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          description: true,
          slug: true,
          preferences: true,
          links: {
            select: {
              id: true,
              title: true,
              url: true,
            },
          },
          icons: {
            select: {
              id: true,
              platform: true,
              icon: true,
              url: true,
            },
          },
        },
      })
      if (!user)
        return session

      return {
        ...session,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          description: user.description,
          slug: user.slug,
          preferences: user.preferences,
          links: user.links,
          icons: user.icons,
        },
      }
    },
  },
})
