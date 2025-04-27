"use client"

import { chau } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
	const { theme, setTheme } = useTheme()

	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<div className="flex w-full items-center justify-between px-4 pt-4">
			<Link href="/" className="flex flex-row items-center justify-start gap-2">
				<Image src="/logo.png" alt="LinkNest Logo" width={35} height={35} className="icon rounded-full" />
				<span className={`text-2xl ${chau.className}`}>LinkNest</span>
			</Link>

			<div className="flex flex-row items-center justify-end gap-2">
				<button
					onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
					className="btn"
				>
					<Icon icon={theme === "light" ? "radix-icons:moon" : "radix-icons:sun"} width={25} height={25} />
				</button>
				<Link href="/login" title="Sign In" className="btn">
					<Icon icon="material-symbols:login" width={25} height={25} />
				</Link>
			</div>
		</div>
	)
}
