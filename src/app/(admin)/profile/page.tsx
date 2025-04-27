"use client"

import IconList from "@/src/app/(admin)/profile/icon-list"
import LinkList from "@/src/app/(admin)/profile/link-list"
import ShareAccount from "@/src/app/(admin)/profile/share-account"
import Preview from "@/src/components/preview"
import { useGetPreferences } from "@/src/hooks/use-queries"
import useUserStore from "@/src/hooks/use-store"
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
		<div className="flex w-full flex-col gap-4 lg:flex-row">
			<motion.main
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="card flex-1"
			>
				<header className="space-y-2">
					<motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
						Profile
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-caption text-muted-foreground"
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
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="flex flex-col gap-4"
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
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="lg:w-4/12"
			>
				<Preview preferences={preferences} />
			</motion.aside>
		</div>
	)
}
