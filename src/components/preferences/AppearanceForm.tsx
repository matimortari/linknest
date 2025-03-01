import {
	BACKGROUND_TYPES,
	FONT_SIZES,
	FONT_WEIGHTS,
	LINK_FONT_SIZES,
	LINK_PADDING_SIZES,
	RADIUS_SIZES,
	SHADOW_WEIGHTS
} from "@/src/config/preferencesConfig"
import { BANNER_OPTIONS } from "@/src/config/supportBannerConfig"
import { useUpdatePreferences } from "@/src/hooks/useMutations"
import { useGetPreferences } from "@/src/hooks/useQueries"
import { useEffect, useState } from "react"
import { CheckboxInput, ColorInput, RadioOptions, SelectInput } from "../Inputs"

export default function AppearanceForm() {
	const { data: preferences = {} } = useGetPreferences()
	const { mutate: updatePreferencesMutation } = useUpdatePreferences()

	const [tab, setTab] = useState("background")
	const [selectedPreferences, setSelectedPreferences] = useState(preferences)

	useEffect(() => {
		setSelectedPreferences(preferences)
	}, [preferences])

	const tabs = [
		{ label: "Background", value: "background" },
		{ label: "User Info", value: "user" },
		{ label: "Links", value: "links" },
		{ label: "Social Icons", value: "icons" }
	]

	const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
		setSelectedPreferences((prevPreferences: UserPreferences) => ({
			...prevPreferences,
			[field]: value
		}))
	}

	const isBackgroundFlat = selectedPreferences.backgroundType === "FLAT"
	const isBackgroundGradient = selectedPreferences.backgroundType === "GRADIENT"
	const isLinkShadowDisabled = !selectedPreferences.isLinkShadow
	const isIconShadowDisabled = !selectedPreferences.isIconShadow

	return (
		<div>
			<header className="my-2">
				<h2>Appearance</h2>
				<h6 className="text-muted-foreground">Customize the appearance for your page.</h6>
			</header>

			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row items-center gap-2">
					{tabs.map((t) => (
						<button
							key={t.value}
							className={`rounded-full p-2 text-sm font-medium text-muted-foreground hover:bg-muted ${
								t.value === tab ? "bg-muted font-bold" : ""
							}`}
							onClick={() => setTab(t.value)}
						>
							{t.label}
						</button>
					))}
				</div>
				<div className="input-group justify-end">
					<button onClick={() => updatePreferencesMutation(selectedPreferences)} className="btn bg-card">
						Save Changes
					</button>
				</div>
			</div>

			<hr className="my-2" />

			{tab === "background" && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<RadioOptions
						name="backgroundType"
						label="Background Type"
						options={BACKGROUND_TYPES}
						value={selectedPreferences.backgroundType}
						onChange={handleChange("backgroundType")}
					/>
					<div className="flex flex-col gap-2">
						<ColorInput
							id="backgroundColor"
							label="Background Color"
							value={selectedPreferences.backgroundColor}
							onChange={handleChange("backgroundColor")}
							disabled={isBackgroundGradient}
						/>
						<ColorInput
							id="backgroundGradientStart"
							label="Gradient Start Color"
							value={selectedPreferences.backgroundGradientStart}
							onChange={handleChange("backgroundGradientStart")}
							disabled={isBackgroundFlat}
						/>
						<ColorInput
							id="backgroundGradientEnd"
							label="Gradient End Color"
							value={selectedPreferences.backgroundGradientEnd}
							onChange={handleChange("backgroundGradientEnd")}
							disabled={isBackgroundFlat}
						/>
					</div>
				</div>
			)}

			{tab === "user" && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<SelectInput
							id="profilePictureRadius"
							label="Profile Picture Radius"
							options={RADIUS_SIZES}
							value={selectedPreferences.profilePictureRadius}
							onChange={handleChange("profilePictureRadius")}
						/>
						<SelectInput
							id="supportBanner"
							label="Select Support Banner"
							options={BANNER_OPTIONS}
							value={selectedPreferences.supportBanner || "NONE"}
							onChange={handleChange("supportBanner")}
						/>
						<SelectInput
							id="slugTextSize"
							label="Username Font Size"
							options={FONT_SIZES}
							value={selectedPreferences.slugTextSize}
							onChange={handleChange("slugTextSize")}
						/>
						<SelectInput
							id="slugTextWeight"
							label="Username Font Weight"
							options={FONT_WEIGHTS}
							value={selectedPreferences.slugTextWeight}
							onChange={handleChange("slugTextWeight")}
						/>
						<ColorInput
							id="slugTextColor"
							label="Username Font Color"
							value={selectedPreferences.slugTextColor}
							onChange={handleChange("slugTextColor")}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<SelectInput
							id="headerTextSize"
							label="Header Font Size"
							options={FONT_SIZES}
							value={selectedPreferences.headerTextSize}
							onChange={handleChange("headerTextSize")}
						/>
						<SelectInput
							id="headerTextWeight"
							label="Header Font Weight"
							options={FONT_WEIGHTS}
							value={selectedPreferences.headerTextWeight}
							onChange={handleChange("headerTextWeight")}
						/>
						<ColorInput
							id="headerTextColor"
							label="Header Font Color"
							value={selectedPreferences.headerTextColor}
							onChange={handleChange("headerTextColor")}
						/>
					</div>
				</div>
			)}

			{tab === "links" && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<ColorInput
							id="linkBackgroundColor"
							label="Background Color"
							value={selectedPreferences.linkBackgroundColor}
							onChange={handleChange("linkBackgroundColor")}
						/>
						<ColorInput
							id="linkTextColor"
							label="Font Color"
							value={selectedPreferences.linkTextColor}
							onChange={handleChange("linkTextColor")}
						/>
						<SelectInput
							id="linkTextSize"
							label="Font Size"
							options={LINK_FONT_SIZES}
							value={selectedPreferences.linkTextSize}
							onChange={handleChange("linkTextSize")}
						/>
						<SelectInput
							id="linkTextWeight"
							label="Font Weight"
							options={FONT_WEIGHTS}
							value={selectedPreferences.linkTextWeight}
							onChange={handleChange("linkTextWeight")}
						/>
						<SelectInput
							id="linkPadding"
							label="Padding"
							options={LINK_PADDING_SIZES}
							value={selectedPreferences.linkPadding}
							onChange={handleChange("linkPadding")}
						/>
						<ColorInput
							id="linkHoverBackgroundColor"
							label="Hover Background Color"
							value={selectedPreferences.linkHoverBackgroundColor}
							onChange={handleChange("linkHoverBackgroundColor")}
						/>
						<CheckboxInput
							id="showCopyButton"
							label="Show 'Copy to Clipboard' Button"
							checked={selectedPreferences.showCopyButton}
							onChange={handleChange("showCopyButton")}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<CheckboxInput
							id="isLinkShadow"
							label="Enable Shadow"
							checked={selectedPreferences.isLinkShadow}
							onChange={handleChange("isLinkShadow")}
						/>
						<ColorInput
							id="linkShadowColor"
							label="Shadow Color"
							value={selectedPreferences.linkShadowColor}
							onChange={handleChange("linkShadowColor")}
							disabled={isLinkShadowDisabled}
						/>
						<SelectInput
							id="linkShadowWeight"
							label="Shadow Weight"
							options={SHADOW_WEIGHTS}
							value={selectedPreferences.linkShadowWeight}
							onChange={handleChange("linkShadowWeight")}
							disabled={isLinkShadowDisabled}
						/>
					</div>
				</div>
			)}

			{tab === "icons" && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<ColorInput
							id="iconBackgroundColor"
							label="Background Color"
							value={selectedPreferences.iconBackgroundColor}
							onChange={handleChange("iconBackgroundColor")}
						/>
						<ColorInput
							id="iconIconColor"
							label="Icon Color"
							value={selectedPreferences.iconIconColor}
							onChange={handleChange("iconIconColor")}
						/>
						<ColorInput
							id="iconHoverBackgroundColor"
							label="Hover Background Color"
							value={selectedPreferences.iconHoverBackgroundColor}
							onChange={handleChange("iconHoverBackgroundColor")}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<CheckboxInput
							id="isIconShadow"
							label="Enable Shadow"
							checked={selectedPreferences.isIconShadow}
							onChange={handleChange("isIconShadow")}
						/>
						<ColorInput
							id="iconShadowColor"
							label="Shadow Color"
							value={selectedPreferences.iconShadowColor}
							onChange={handleChange("iconShadowColor")}
							disabled={isIconShadowDisabled}
						/>
						<SelectInput
							id="iconShadowWeight"
							label="Shadow Weight"
							options={SHADOW_WEIGHTS}
							value={selectedPreferences.iconShadowWeight}
							onChange={handleChange("iconShadowWeight")}
							disabled={isIconShadowDisabled}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
