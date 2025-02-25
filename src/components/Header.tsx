"use client"

import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

export default function Header() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	if (!mounted) return null

	const themeIcon = theme === "light" ? "radix-icons:moon" : "radix-icons:sun"
	const themeTitle = `Switch to ${theme === "light" ? "dark" : "light"} mode`

	return (
		<div className="flex w-full items-center justify-between p-4">
			<Link href="/" className="flex flex-row items-center justify-start gap-2">
				<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
				<span className={`text-2xl ${chau.className}`}>Linksy</span>
			</Link>

			<div className="flex flex-row items-center justify-end gap-2">
				<button onClick={handleThemeToggle} title={themeTitle} className="btn bg-card">
					<Icon icon={themeIcon} width={25} height={25} />
				</button>
				<Link href="/login" title="Sign In" className="btn bg-card">
					<Icon icon="material-symbols:login" width={25} height={25} />
				</Link>
			</div>
		</div>
	)
}
