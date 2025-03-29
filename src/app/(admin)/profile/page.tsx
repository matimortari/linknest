"use client"

import Preview from "@/src/components/Preview"
import IconList from "@/src/components/profile/IconList"
import LinkList from "@/src/components/profile/LinkList"
import ShareAccount from "@/src/components/profile/ShareAccount"
import { useGetPreferences } from "@/src/hooks/useQueries"
import useUserStore from "@/src/hooks/useUserStore"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Profile() {
	const { user, setUser } = useUserStore()
	const { data: session, status } = useSession()

	const { data: preferences } = useGetPreferences()

	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		setUser(session.user)
	}, [session, status, setUser])

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
						Profile
					</motion.h2>
					<motion.p
						className="text-sm font-semibold text-muted-foreground"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Welcome back, <span className="font-bold text-accent">{user?.slug}</span>!
					</motion.p>
				</header>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<ShareAccount />
				</motion.div>

				<hr className="my-4" />

				<motion.div
					className="flex flex-col gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<section className="section-container">
						<LinkList />
					</section>

					<section className="section-container">
						<IconList />
					</section>
				</motion.div>
			</motion.main>

			<motion.aside
				className="md:w-4/12"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
			>
				<Preview preferences={preferences} />
			</motion.aside>
		</div>
	)
}
