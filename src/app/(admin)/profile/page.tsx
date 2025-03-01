"use client"

import Preview from "@/src/components/Preview"
import IconList from "@/src/components/profile/IconList"
import LinkList from "@/src/components/profile/LinkList"
import ShareAccount from "@/src/components/profile/ShareAccount"
import useUserStore from "@/src/hooks/useUserStore"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Profile() {
	const { user, setUser } = useUserStore()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		setUser(session.user)
	}, [session, status, setUser])

	if (!user) return <div>Loading...</div>

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card min-h-screen flex-1">
				<header className="space-y-2">
					<h2>Profile</h2>
					<p className="text-sm font-semibold text-muted-foreground">
						Welcome back, <span className="font-bold text-accent">{user.slug}</span>!
					</p>
				</header>

				<ShareAccount />

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<LinkList />
					</section>

					<section className="section-container">
						<IconList />
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
