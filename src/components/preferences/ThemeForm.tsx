import { themePresets } from "@/src/config/themePresets"
import { useState } from "react"

export default function ThemeForm({ setTheme }) {
	const [selectedTheme, setSelectedTheme] = useState("")

	const handleThemeSelection = (themeSlug: string) => {
		const selected = themePresets.find((theme) => theme.title === themeSlug)

		if (selected) {
			setSelectedTheme(themeSlug)
			setTheme(selected.preferences) // Update selected preferences with the selected theme
		}
	}

	return (
		<div className="preview-scrollbar grid h-64 grid-cols-1 gap-2 overflow-auto md:grid-cols-3">
			{themePresets.map(({ title, preferences }) => {
				const {
					backgroundType,
					backgroundGradientStart,
					backgroundGradientEnd,
					backgroundColor,
					linkBackgroundColor,
					slugTextWeight,
					linkTextColor,
					isLinkShadow,
					linkShadowColor,
					linkShadowWeight
				} = preferences

				return (
					<button
						key={title}
						onClick={() => handleThemeSelection(title)}
						tabIndex={0}
						title={title}
						className={`flex size-full items-center justify-center rounded-lg border p-6 md:p-4 ${
							selectedTheme === title ? "bg-muted" : "bg-transparent"
						} hover:bg-muted`}
						style={{
							backgroundImage:
								backgroundType === "GRADIENT"
									? `linear-gradient(to right, ${backgroundGradientStart}, ${backgroundGradientEnd})`
									: "none",
							backgroundColor: backgroundType !== "GRADIENT" ? backgroundColor : "none"
						}}
					>
						<span
							className="line-clamp-1 truncate rounded-full p-2 text-center text-sm"
							style={{
								backgroundColor: linkBackgroundColor,
								fontWeight: slugTextWeight,
								color: linkTextColor,
								boxShadow: isLinkShadow
									? {
											none: "none",
											light: `0px 1px 2px ${linkShadowColor}`,
											medium: `0 2px 6px ${linkShadowColor}`,
											heavy: `1px 3px 10px ${linkShadowColor}`
									  }[linkShadowWeight ?? "none"]
									: "none"
							}}
						>
							{title}
						</span>
					</button>
				)
			})}
		</div>
	)
}
