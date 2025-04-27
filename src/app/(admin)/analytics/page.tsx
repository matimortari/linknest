"use client"

import AnalyticsPanel from "@/src/app/(admin)/analytics/analytics-panel"
import ClicksByLink from "@/src/app/(admin)/analytics/clicks-by-link"
import useUserStore from "@/src/hooks/use-store"
import { motion } from "framer-motion"
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
		<div className="flex w-full flex-col gap-4 lg:flex-row">
			<motion.main
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="card flex-1"
			>
				<header className="space-y-2">
					<motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
						Analytics
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-caption text-muted-foreground"
					>
						View your profile analytics.
					</motion.p>
				</header>

				<hr className="my-4" />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="flex flex-col gap-4"
				>
					<section className="section-container">
						<AnalyticsPanel />
					</section>

					<section className="section-container">
						<ClicksByLink />
					</section>
				</motion.div>
			</motion.main>
		</div>
	)
}
