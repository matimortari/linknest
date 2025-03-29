"use client"

import { carouselPresets } from "@/src/config/carouselPresets"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

function CarouselLink({ title, preferences }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li
			className="flex w-full min-w-32 max-w-72 flex-row items-center justify-center text-center"
			style={{
				backgroundColor: isHovered ? preferences.linkHoverBackgroundColor : preferences.linkBackgroundColor,
				boxShadow: preferences.isLinkShadow
					? preferences.linkShadowWeight === "none"
						? "none"
						: preferences.linkShadowWeight === "light"
						? `0 2px 4px ${preferences.linkShadowColor}`
						: preferences.linkShadowWeight === "medium"
						? `0 4px 6px ${preferences.linkShadowColor}`
						: `0 6px 10px ${preferences.linkShadowColor}`
					: "none",
				borderRadius: preferences.linkBorderRadius,
				padding: preferences.linkPadding,
				transition: "background-color 0.3s ease, box-shadow 0.3s ease"
			}}
		>
			<span
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{
					color: preferences.linkTextColor,
					fontWeight: preferences.linkTextWeight,
					fontSize: preferences.linkTextSize
				}}
			>
				{title}
			</span>
		</li>
	)
}

function CarouselIcon({ icon, preferences }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="flex size-10 items-center justify-center rounded-full"
			style={{
				backgroundColor: isHovered ? preferences.iconHoverBackgroundColor : preferences.iconBackgroundColor,
				boxShadow: preferences.isIconShadow
					? preferences.iconShadowWeight === "none"
						? "none"
						: preferences.iconShadowWeight === "light"
						? `0 2px 4px ${preferences.iconShadowColor}`
						: preferences.iconShadowWeight === "medium"
						? `0 4px 6px ${preferences.iconShadowColor}`
						: `0 6px 10px ${preferences.iconShadowColor}`
					: "none",
				transition: "background-color 0.3s ease, box-shadow 0.3s ease"
			}}
		>
			<Icon icon={icon} width={20} height={20} style={{ color: preferences.iconIconColor }} />
		</li>
	)
}

function CarouselCard({ presetId }) {
	const { description, links, image, icons, slug, preferences } = carouselPresets[presetId]

	return (
		<div
			className="popover relative w-64 opacity-80 md:w-[300px]"
			style={
				preferences.backgroundType === "GRADIENT"
					? {
							background: `linear-gradient(to bottom, ${preferences.backgroundGradientStart}, ${preferences.backgroundGradientEnd})`
					  }
					: { backgroundColor: preferences.backgroundColor }
			}
		>
			<div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
				<Image
					src={image}
					alt={slug}
					width={80}
					height={80}
					style={{ borderRadius: preferences.profilePictureRadius }}
				/>
				<p
					style={{
						color: preferences.slugTextColor,
						fontWeight: preferences.slugTextWeight,
						fontSize: preferences.slugTextSize
					}}
				>
					@{slug}
				</p>
				<p
					style={{
						color: preferences.headerTextColor,
						fontWeight: preferences.headerTextWeight,
						fontSize: preferences.headerTextSize
					}}
				>
					{description}
				</p>
				<ul className="my-2 flex flex-row items-center justify-center gap-2">
					{icons.map((icon) => (
						<CarouselIcon key={icon.id} icon={icon.icon} preferences={preferences} />
					))}
				</ul>
				<ul className="flex flex-col items-center space-y-4 overflow-auto">
					{links.map((link) => (
						<CarouselLink key={link.id} title={link.title} preferences={preferences} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselPresets.length)
	}

	useEffect(() => {
		const intervalId = setInterval(nextCard, 3000)
		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className="animate-float relative my-4 flex h-[480px] select-none items-center justify-center">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentIndex}
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					transition={{ duration: 0.5 }}
				>
					<CarouselCard presetId={currentIndex} />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
