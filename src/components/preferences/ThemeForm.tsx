import { themePresets } from "@/src/config/themePresets"
import { useState } from "react"

export default function ThemeForm({ setTheme }) {
	const [selectedTheme, setSelectedTheme] = useState("")

	const handleThemeSelection = (themeTitle: string) => {
		const selected = themePresets.find((theme) => theme.title === themeTitle)

		if (selected) {
			setSelectedTheme(themeTitle)
			setTheme(selected.preferences)
		}
	}

	return (
		<div className="preview-scrollbar grid h-64 grid-cols-1 gap-2 overflow-auto md:grid-cols-3">
			{themePresets.map(({ title, preferences }) => (
				<button
					key={title}
					onClick={() => handleThemeSelection(title)}
					tabIndex={0}
					title={title}
					className={`flex size-full items-center justify-center rounded-lg border p-8 ${
						selectedTheme === title ? "opacity-40" : "border-muted"
					}`}
					style={{
						backgroundImage:
							preferences.backgroundType === "GRADIENT"
								? `linear-gradient(to right, ${preferences.backgroundGradientStart}, ${preferences.backgroundGradientEnd})`
								: "none",
						backgroundColor: preferences.backgroundType !== "GRADIENT" ? preferences.backgroundColor : "none"
					}}
				>
					<div
						className="line-clamp-1 truncate p-2 text-center text-sm"
						style={{
							backgroundColor: preferences.linkBackgroundColor,
							fontWeight: preferences.slugTextWeight,
							color: preferences.linkTextColor,
							borderRadius: preferences.linkBorderRadius,
							boxShadow: preferences.isLinkShadow
								? {
										none: "none",
										light: `0px 1px 2px ${preferences.linkShadowColor}`,
										medium: `0 2px 6px ${preferences.linkShadowColor}`,
										heavy: `1px 3px 10px ${preferences.linkShadowColor}`
								  }[preferences.linkShadowWeight ?? "none"]
								: "none"
						}}
					>
						{title}
					</div>
				</button>
			))}
		</div>
	)
}
