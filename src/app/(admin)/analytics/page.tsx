"use client"

import AnalyticsPanel from "@/src/components/analytics/AnalyticsPanel"
import ClicksByLink from "@/src/components/analytics/ClicksByLink"
import useUserStore from "@/src/hooks/useUserStore"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Analytics() {
	const { setUser } = useUserStore()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		setUser(session.user)
	}, [session, status, setUser])

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card min-h-screen flex-1">
				<header className="space-y-2">
					<h2>Profile</h2>
					<h5>View your profile analytics.</h5>
				</header>

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<AnalyticsPanel />
					</section>

					<section className="section-container">
						<ClicksByLink />
					</section>
				</div>
			</main>
		</div>
	)
}
