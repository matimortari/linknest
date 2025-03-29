import { db } from "@/src/lib/db"
import { generateSlug } from "@/src/lib/utils"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, SessionStrategy } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
	interface Session {
		user: {
			id: string
			slug: string
			description?: string
			image?: string
			links: UserLink[]
			icons: UserIcon[]
			preferences: UserPreferences[]
		}
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
		})
	],
	adapter: PrismaAdapter(db),
	session: {
		strategy: "database" as SessionStrategy
	},
	callbacks: {
		async signIn({ user, profile }: { user: any; account: any; profile?: any }) {
			if (!user.email) return false

			const existingUser = await db.user.findUnique({
				where: { email: user.email }
			})
			if (!existingUser) {
				const slug = generateSlug(profile.name || user.name)
				const newUser = await db.user.create({
					data: {
						email: user.email,
						name: profile.name || user.name,
						image: user.image || "",
						slug
					}
				})

				await db.userPreferences.create({
					data: { userId: newUser.id }
				})
			} else {
				await db.user.update({
					where: { id: existingUser.id },
					data: {
						name: profile.name ?? existingUser.name,
						image: user.image
					}
				})
			}

			return true
		},

		async session({ session, user }: { session: any; user: any }) {
			const dbUser = await db.user.findUnique({
				where: { email: user.email },
				include: {
					userLinks: true,
					userIcons: true,
					userPreferences: true
				}
			})
			if (dbUser) {
				session.user = {
					id: dbUser.id,
					slug: dbUser.slug,
					description: dbUser.description,
					image: dbUser.image,
					links: dbUser.userLinks,
					icons: dbUser.userIcons,
					preferences: dbUser.userPreferences
				}
			}

			return session
		}
	}
}
