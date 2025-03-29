"use client"

import AppearanceForm from "@/src/components/preferences/AppearanceForm"
import DeleteAccount from "@/src/components/preferences/DeleteAccount"
import Preview from "@/src/components/Preview"
import { useGetPreferences } from "@/src/hooks/useQueries"
import useUserStore from "@/src/hooks/useUserStore"
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
			<main className="card min-h-screen flex-1">
				<header className="space-y-2">
					<h2>Preferences</h2>
					<p className="text-sm font-semibold text-muted-foreground">Manage your profile.</p>
				</header>

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<AppearanceForm preferences={selectedPreferences} setPreferences={setSelectedPreferences} />
					</section>

					<section className="section-container border-danger-foreground">
						<DeleteAccount />
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview preferences={selectedPreferences} />
			</aside>
		</div>
	)
}
