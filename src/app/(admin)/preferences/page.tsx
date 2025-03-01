"use client"

import AppearanceForm from "@/src/components/preferences/AppearanceForm"
import DeleteAccount from "@/src/components/preferences/DeleteAccount"
import Preview from "@/src/components/Preview"

export default function Preferences() {
	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card min-h-screen flex-1">
				<header className="space-y-2">
					<h2>Profile</h2>
					<h5>Manage your profile.</h5>
				</header>

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<AppearanceForm />
					</section>

					<section className="section-container border-danger">
						<DeleteAccount />
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
