"use client"

import AppearanceForm from "@/src/components/preferences/AppearanceForm"
import DeleteAccount from "@/src/components/preferences/DeleteAccount"
import Preview from "@/src/components/Preview"
import { useGetPreferences } from "@/src/hooks/useQueries"
import useUserStore from "@/src/hooks/useUserStore"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Preferences() {
	const { setUser } = useUserStore()
	const { data: session, status } = useSession()

	const { data: preferences = {} } = useGetPreferences()

	const [selectedPreferences, setSelectedPreferences] = useState(preferences)

	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		setUser(session.user)
	}, [session, status, setUser])

	useEffect(() => {
		setSelectedPreferences(preferences)
	}, [preferences])

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<motion.main
				className="card min-h-screen flex-1"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
			>
				<header className="space-y-2">
					<motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
						Preferences
					</motion.h2>
					<motion.p
						className="text-sm font-semibold text-muted-foreground"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Manage your profile.
					</motion.p>
				</header>

				<hr className="my-4" />

				<motion.div
					className="flex flex-col gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<section className="section-container">
						<AppearanceForm preferences={selectedPreferences} setPreferences={setSelectedPreferences} />
					</section>

					<section className="section-container border-danger-foreground">
						<DeleteAccount />
					</section>
				</motion.div>
			</motion.main>

			<motion.aside
				className="md:w-4/12"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
			>
				<Preview preferences={selectedPreferences} />
			</motion.aside>
		</div>
	)
}
