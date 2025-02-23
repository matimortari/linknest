"use client"

import Dialog from "@/src/components/Dialog"
import Preview from "@/src/components/Preview"
import { useDialog } from "@/src/hooks/useDialog"
import { useSession } from "next-auth/react"

export default function Profile() {
	const { isOpen, openDialog, closeDialog } = useDialog()

	const { data: session } = useSession()

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card min-h-screen flex-1">
				<header>
					<h2>Profile</h2>
					<p>
						Welcome back, <span className="font-bold text-accent">{session?.user?.slug}</span>!
					</p>
				</header>

				<div className="flex flex-col gap-4">
					<section>
						<button onClick={openDialog} className="btn">
							Open Dialog
						</button>
						<Dialog isOpen={isOpen} onClose={closeDialog} title="Dialog Test">
							<button onClick={closeDialog} className="btn">
								Close
							</button>
						</Dialog>
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
