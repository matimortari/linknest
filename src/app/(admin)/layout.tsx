import Providers from "@/src/components/context/Providers"
import Navbar from "@/src/components/Navbar"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import "@/src/styles/inputs.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
	const session = await getServerSession(authOptions)

	const slug = session?.user?.slug

	const metadata: Metadata = {
		title: slug ? `${slug} | LinkNest` : "LinkNest",
		description: "Keep all your stuff together! Share your links in one page and share it with your audience."
	}

	return metadata
}

export default async function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers session={session}>
					<div className="flex flex-col p-4 md:flex-row">
						<aside className="md:w-2/12">
							<Navbar />
						</aside>
						<main className="flex-1">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	)
}
