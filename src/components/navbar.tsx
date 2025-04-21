"use client"

import UserDialog from "@/src/app/(admin)/profile/user-dialog"
import useUserStore from "@/src/hooks/use-store"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

const Logo = () => (
	<Link href="/" className="scale-xs flex items-center gap-2">
		<Image src="/logo.png" alt="LinkNest Logo" width={35} height={35} className="icon" />
		<span className={`text-2xl ${chau.className}`}>LinkNest</span>
	</Link>
)

const UserCard = ({ slug, description, image, setIsDialogOpen }) => (
	<div className="my-4 flex items-center gap-4">
		<div className="relative">
			{image && <Image src={image} alt={slug} width={60} height={60} className="rounded-full border" />}
			<button
				onClick={() => setIsDialogOpen(true)}
				title="Edit Profile Information"
				className="scale-sm absolute -bottom-2 -right-2 rounded-full border bg-accent p-1"
			>
				<Icon icon="mdi:square-edit-outline" width={20} height={20} />
			</button>
		</div>
		<div className="flex w-full flex-col gap-1 overflow-x-hidden">
			<Link
				href={`/${slug}`}
				title={`linknest-live.vercel.app/${slug}`}
				className="text-caption truncate hover:underline"
			>
				@{slug}
			</Link>
			<p className="text-label break-all text-muted-foreground">{description}</p>
		</div>
	</div>
)

const NavLink = ({ href, icon, label, isActive, onClick }) => (
	<Link href={href} title={label} className={`btn ${isActive ? "btn-selected" : ""}`} onClick={onClick}>
		<Icon icon={icon} width={25} height={25} />
		{label}
	</Link>
)

export default function Navbar() {
	const navLinks = [
		{ href: "/profile", icon: "material-symbols:location-home-outline", label: "Profile" },
		{ href: "/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
		{ href: "/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" }
	]

	const { user } = useUserStore()

	const { theme, setTheme } = useTheme()

	const [isNavOpen, setIsNavOpen] = useState(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [activeTab, setActiveTab] = useState("/profile")

	useEffect(() => setMounted(true), [])

	const themeIcon = mounted ? (theme === "light" ? "radix-icons:moon" : "radix-icons:sun") : null
	const themeTitle = mounted ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : "Loading..."

	return (
		<>
			{/* Mobile header */}
			<div className="md:hidden">
				<div className="flex flex-row items-center justify-between p-4">
					<Logo />
					<nav className="flex flex-row items-center gap-2">
						<button onClick={() => setTheme(theme === "light" ? "dark" : "light")} title={themeTitle} className="btn">
							{themeIcon && <Icon icon={themeIcon} width={25} height={25} />}
						</button>
						<button onClick={() => setIsNavOpen(!isNavOpen)} className="btn">
							<Icon icon={isNavOpen ? "mdi:close" : "mdi:menu"} width={25} height={25} />
						</button>
						<button onClick={() => signOut({ callbackUrl: "/" })} className="btn-danger">
							<Icon icon="material-symbols:logout" width={25} height={25} />
						</button>
					</nav>
				</div>

				{/* Mobile top nav */}
				<AnimatePresence>
					{isNavOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col p-4"
						>
							<nav className="flex flex-row items-center gap-2">
								{navLinks.map((item) => (
									<NavLink
										key={item.label}
										{...item}
										isActive={activeTab === item.href}
										onClick={() => setActiveTab(item.href)}
									/>
								))}
							</nav>
							<UserCard
								slug={user?.slug}
								description={user?.description}
								image={user?.image}
								setIsDialogOpen={setIsDialogOpen}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Desktop sidebar */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				className="hidden w-44 md:fixed md:inset-y-0 md:flex md:flex-col"
			>
				<div className="mt-8 flex flex-grow flex-col gap-4">
					<Logo />
					<UserCard
						slug={user?.slug}
						description={user?.description}
						image={user?.image}
						setIsDialogOpen={setIsDialogOpen}
					/>
					<nav className="space-y-2">
						{navLinks.map((item) => (
							<motion.div key={item.label} variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}>
								<NavLink {...item} onClick={() => setActiveTab(item.href)} isActive={activeTab === item.href} />
							</motion.div>
						))}
					</nav>
				</div>

				<div className="mt-auto flex flex-col gap-2 py-4">
					<button onClick={() => setTheme(theme === "light" ? "dark" : "light")} title={themeTitle} className="btn">
						{themeIcon && <Icon icon={themeIcon} width={25} height={25} />}
						<span>{mounted ? (theme === "light" ? "Dark" : "Light") : ""} Mode</span>
					</button>
					<button onClick={() => signOut({ callbackUrl: "/" })} title="Sign Out" className="btn-danger">
						<Icon icon="material-symbols:logout" width={25} height={25} />
						<span className="hidden md:block">Sign Out</span>
					</button>
				</div>
			</motion.div>

			<UserDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
		</>
	)
}
