import { CheckboxInput, ColorInput, RadioOptions, SelectInput } from "@/src/components/Inputs"
import ThemeForm from "@/src/components/preferences/ThemeForm"
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
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function AppearanceForm({ preferences, setPreferences }) {
	const { mutate: updatePreferencesMutation } = useUpdatePreferences()

	const [activeTab, setActiveTab] = useState("background")
	const [selectedPreferences, setSelectedPreferences] = useState(preferences)

	useEffect(() => {
		setSelectedPreferences(preferences)
	}, [preferences])

	const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
		setPreferences((prevPreferences: any) => ({
			...prevPreferences,
			[field]: value
		}))
	}

	const isBackgroundFlat = selectedPreferences.backgroundType === "FLAT"
	const isBackgroundGradient = selectedPreferences.backgroundType === "GRADIENT"
	const isLinkShadowDisabled = !selectedPreferences.isLinkShadow
	const isIconShadowDisabled = !selectedPreferences.isIconShadow

	const tabs = [
		{ label: "Background", value: "background" },
		{ label: "User Info", value: "user" },
		{ label: "Links", value: "links" },
		{ label: "Social Icons", value: "icons" },
		{ label: "Themes", value: "themes" }
	]

	return (
		<div>
			<header className="my-2 flex flex-col gap-2">
				<h3>Appearance</h3>
				<p className="text-caption text-muted-foreground">Customize the appearance for your page.</p>
			</header>

			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-2">
					{tabs.map((t) => (
						<button
							key={t.value}
							className={`btn ${activeTab === t.value ? "btn-selected" : ""}`}
							onClick={() => setActiveTab(t.value)}
						>
							{t.label}
						</button>
					))}
				</div>
				<div className="input-group justify-end">
					<button onClick={() => updatePreferencesMutation(selectedPreferences)} className="btn-primary">
						<Icon icon="mdi:content-save-check" width={20} height={20} />
						Save Changes
					</button>
				</div>
			</div>

			<hr className="my-2" />

			{activeTab === "background" && (
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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

			{activeTab === "user" && (
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<SelectInput
							id="supportBanner"
							label="Support Banner"
							options={BANNER_OPTIONS}
							value={selectedPreferences.supportBanner || "NONE"}
							onChange={handleChange("supportBanner")}
						/>
						<SelectInput
							id="profilePictureRadius"
							label="Profile Picture Radius"
							options={RADIUS_SIZES}
							value={selectedPreferences.profilePictureRadius}
							onChange={handleChange("profilePictureRadius")}
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

			{activeTab === "links" && (
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
							id="linkBorderRadius"
							label="Radius"
							options={RADIUS_SIZES}
							value={selectedPreferences.linkBorderRadius}
							onChange={handleChange("linkBorderRadius")}
						/>
						<SelectInput
							id="linkPadding"
							label="Padding"
							options={LINK_PADDING_SIZES}
							value={selectedPreferences.linkPadding}
							onChange={handleChange("linkPadding")}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<ColorInput
							id="linkHoverBackgroundColor"
							label="Hover Background Color"
							value={selectedPreferences.linkHoverBackgroundColor}
							onChange={handleChange("linkHoverBackgroundColor")}
						/>
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
						<CheckboxInput
							id="showCopyButton"
							label="Show 'Copy to Clipboard' Button"
							checked={selectedPreferences.showCopyButton}
							onChange={handleChange("showCopyButton")}
						/>
					</div>
				</div>
			)}

			{activeTab === "icons" && (
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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

			{activeTab === "themes" && <ThemeForm setTheme={setPreferences} />}
		</div>
	)
}
