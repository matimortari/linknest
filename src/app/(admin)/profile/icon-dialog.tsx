import Dialog from "@/src/components/dialog"
import { SOCIAL_ICONS } from "@/src/config/social-icons"
import { iconSchema, IconSchemaType } from "@/src/lib/schemas"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function IconDialog({ isOpen, onClose, onSave }: IconDialogProps) {
	const [selectedPlatform, setSelectedPlatform] = useState<string>("")
	const [iconUrl, setIconUrl] = useState<string>("")
	const [errors, setErrors] = useState<Partial<IconSchemaType>>({})

	const icon = SOCIAL_ICONS[selectedPlatform]

	useEffect(() => {
		setSelectedPlatform("")
		setIconUrl("")
		setErrors({})
	}, [isOpen])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const validation = iconSchema.safeParse({ platform: selectedPlatform, url: iconUrl })

		if (!validation.success) {
			const fieldErrors = validation.error.format()
			setErrors({
				platform: fieldErrors.platform?._errors[0],
				url: fieldErrors.url?._errors[0]
			})
			return
		}

		onSave({ platform: selectedPlatform, icon, url: iconUrl })
		onClose()
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add Social Icon">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid max-h-48 grid-cols-3 gap-1 overflow-y-auto md:grid-cols-5 lg:max-h-full lg:grid-cols-9">
					{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
						<button
							key={platform}
							type="button"
							onClick={() => setSelectedPlatform(platform)}
							tabIndex={0}
							className={`flex flex-col items-center justify-center rounded-lg border p-2 ${
								selectedPlatform === platform ? "bg-accent" : "bg-transparent"
							} hover:bg-muted active:bg-accent`}
						>
							<Icon icon={icon} width={20} height={20} />
							<span className="text-label mt-1 text-center">
								{platform.charAt(0).toUpperCase() + platform.slice(1)}
							</span>
						</button>
					))}
				</div>
				{errors.platform && <p className="text-caption text-danger-foreground">{errors.platform}.</p>}

				<div className="flex flex-col gap-2">
					<label htmlFor="iconUrl" className="font-semibold">
						Social Icon URL
					</label>
					<div className="flex flex-col items-start gap-2 lg:max-w-sm lg:flex-row lg:items-center">
						<input
							id="iconUrl"
							type="url"
							value={iconUrl}
							onChange={(e) => setIconUrl(e.target.value)}
							placeholder="Enter link URL"
							className="card text-caption w-full text-muted-foreground"
						/>
						{errors.url && <p className="text-caption text-danger-foreground">{errors.url}.</p>}
					</div>
				</div>

				<div className="input-group">
					<button type="submit" className="btn-secondary">
						<Icon icon="mdi:check-circle" width={20} height={20} />
						Add Social Icon
					</button>
					<button type="button" onClick={onClose} className="btn">
						<Icon icon="mdi:close-circle" width={20} height={20} />
						Close
					</button>
				</div>
			</form>
		</Dialog>
	)
}
