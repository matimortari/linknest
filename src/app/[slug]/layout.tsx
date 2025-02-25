import Providers from "@/src/components/context/Providers"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params

	const metadata: Metadata = {
		title: slug ? `${slug} | LinkNest` : "LinkNest",
		description: "Keep all your stuff together! Share your links in one page and share it with your audience."
	}

	return metadata
}

export default async function SlugLayout({ children }: Readonly<{ children: ReactNode }>) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers session={session}>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
