"use client"

import Preview from "@/src/components/Preview"

export default function Preferences() {
	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card min-h-screen flex-1">
				<header>
					<h2>Profile</h2>
				</header>

				<div className="flex flex-col gap-4">
					<section></section>
					<section></section>
					<section></section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
