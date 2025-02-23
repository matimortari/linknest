import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-between gap-2 p-8 md:flex-row">
			<hr className="my-2 w-full" />

			<div className="mx-4 whitespace-nowrap font-light text-muted-foreground">
				<p>© 2025 Matheus Mortari. All rights reserved.</p>
			</div>

			<div className="mx-4 flex flex-row gap-4 text-muted-foreground">
				<Link href="https://github.com/matimortari" target="_blank" rel="noopener noreferrer">
					<Icon icon="simple-icons:github" width={25} height={25} />
				</Link>
				<Link href="https://www.linkedin.com/in/matheus-mortari-19rt" target="_blank" rel="noopener noreferrer">
					<Icon icon="simple-icons:linkedin" width={25} height={25} />
				</Link>
			</div>
		</footer>
	)
}
