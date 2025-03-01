interface User {
	id: string
	name?: string
	email?: string
	image?: string
	slug: string
	description?: string
	icons: UserIcon[]
	links: UserLink[]
	preferences: UserPreferences[]
}

interface UserLink {
	id?: string
	url: string
	title: string
	createdAt?: Date
	updatedAt?: Date
}

interface UserIcon {
	id?: string
	url: string
	platform: string
	icon: string
	createdAt?: Date
	updatedAt?: Date
}

interface UserPreferences {
	id?: string
	backgroundType: BackgroundType
	backgroundColor: string
	backgroundGradientStart: string
	backgroundGradientEnd: string
	profilePictureRadius: string
	slugTextColor: string
	slugTextWeight: string
	slugTextSize: string
	headerTextColor: string
	headerTextWeight: string
	headerTextSize: string
	linkBackgroundColor: string
	linkTextColor: string
	linkTextWeight: string
	linkTextSize: string
	isLinkShadow: boolean
	linkShadowColor: string
	linkShadowWeight: string
	linkHoverBackgroundColor: string
	linkBorderRadius: string
	linkPadding: string
	iconBackgroundColor: string
	isIconShadow: boolean
	iconShadowColor: string
	iconShadowWeight: string
	iconIconColor: string
	iconHoverBackgroundColor: string
	showCopyButton: boolean
	supportBanner: SupportBanner
}

interface DialogProps {
	isOpen: boolean // Whether the dialog is open or closed
	onClose: () => void // Function to close the dialog (returns void)
	title: string // The title of the dialog
	children: ReactNode // The content inside the dialog (could be any React element)
}

interface LinkDialogProps {
	isOpen: boolean
	onClose: () => void
	selectedLink: UserLink | null // Can be null for creating a new link
	onSave: (link: { title: string; url: string }) => void
}

interface IconDialogProps {
	isOpen: boolean
	onClose: () => void
	onSave: (icon: { platform: string; icon: string; url: string }) => void
}

interface CheckboxInputProps {
	id: string // Checkbox ID
	label: string // Label text
	checked?: boolean // Whether the checkbox is checked
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // React change event handler
}

// ColorInput component props
interface ColorInputProps {
	id: string // Color input ID
	label: string // Label text
	value?: string // Color value (default "#000000")
	disabled?: boolean // Whether the input is disabled
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // React change event handler
}

// SelectInput component props
interface SelectInputProps {
	id: string // Select input ID
	label: string // Label text
	value: string // Selected value
	disabled?: boolean // Whether the input is disabled
	options: { value: string; label: string }[] // Options list
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void // React change event handler
}

// RadioOptions component props
interface RadioOptionsProps {
	name: string // Radio button name
	value: string // Selected value
	label: string // Label text
	options: { value: string; label: string }[] // Options list
	disabled?: boolean // Whether the options are disabled
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // React change event handler
}
