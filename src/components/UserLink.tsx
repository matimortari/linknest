"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserLink({ url, title, preferences, linkId, userId }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0px 1px 2px ${preferences.linkShadowColor}`,
		medium: `0 2px 6px ${preferences.linkShadowColor}`,
		heavy: `1px 3px 10px ${preferences.linkShadowColor}`
	}

	const handleClick = async () => {
		// await trackClick(linkId, "link", userId)
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(url).then(() => {
			alert("Link copied to clipboard!")
		})
	}

	return (
		<li
			className="flex w-full min-w-32 max-w-72 flex-row items-center justify-between px-4 text-center"
			style={{
				backgroundColor: isHovered ? preferences.linkHoverBackgroundColor : preferences.linkBackgroundColor,
				boxShadow: preferences.isLinkShadow ? shadowStyles[preferences.linkShadowWeight] : "none",
				borderRadius: preferences.linkBorderRadius,
				padding: preferences.linkPadding,
				transition: "background-color 0.3s ease, box-shadow 0.3s ease"
			}}
		>
			<Link href={url} target="_blank" rel="noopener noreferrer" className="flex-grow text-center">
				<button onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					<span
						style={{
							color: preferences.linkTextColor,
							fontWeight: preferences.linkTextWeight,
							fontSize: preferences.linkTextSize
						}}
					>
						{title}
					</span>
				</button>
			</Link>
			{preferences.showCopyButton && (
				<button onClick={handleCopy} className="ml-2 flex-shrink-0">
					<Icon icon="mdi:content-copy" width={15} height={15} style={{ color: preferences.linkTextColor }} />
				</button>
			)}
		</li>
	)
}
