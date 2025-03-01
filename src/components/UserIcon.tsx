"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import { trackClick } from "../services/analyticsService"

export default function UserIcon({ url, icon, preferences, iconId, userId }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0px 1px 2px ${preferences.iconShadowColor}`,
		medium: `0 2px 6px ${preferences.iconShadowColor}`,
		heavy: `1px 3px 10px ${preferences.iconShadowColor}`
	}

	const handleClick = async () => {
		await trackClick(iconId, "icon", userId)
	}

	return (
		<li
			className="flex size-10 flex-row items-center justify-center rounded-full"
			style={{
				backgroundColor: isHovered ? preferences.iconHoverBackgroundColor : preferences.iconBackgroundColor,
				boxShadow: preferences.isIconShadow ? shadowStyles[preferences.iconShadowWeight] : "none",
				transition: "background-color 0.3s ease, box-shadow 0.3s ease"
			}}
		>
			<Link href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
				<button onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					{icon && <Icon icon={icon} width={20} height={20} style={{ color: preferences.iconIconColor }} />}
				</button>
			</Link>
		</li>
	)
}
