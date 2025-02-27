import { SOCIAL_ICONS } from "@/src/config/preferencesConfig"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import Dialog from "../Dialog"

export default function IconDialog({ isOpen, onClose, onSave }: IconDialogProps) {
	const [selectedPlatform, setSelectedPlatform] = useState<string>("")
	const [iconUrl, setIconUrl] = useState<string>("")

	const icon = selectedPlatform ? SOCIAL_ICONS[selectedPlatform] : ""

	useEffect(() => {
		setSelectedPlatform("")
		setIconUrl("")
	}, [isOpen])

	const handleSubmit = () => {
		if (selectedPlatform && iconUrl) {
			onSave({ platform: selectedPlatform, icon, url: iconUrl })
			onClose()
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add Social Icon">
			<div className="space-y-2">
				<div>
					<div className="grid max-h-48 grid-cols-3 gap-1 overflow-y-auto md:max-h-full md:grid-cols-9">
						{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
							<button
								key={platform}
								onClick={() => setSelectedPlatform(platform)}
								tabIndex={0}
								className={`flex flex-col items-center justify-center rounded-lg border p-2 ${
									selectedPlatform === platform ? "bg-muted" : "bg-transparent"
								} hover:bg-muted`}
							>
								<Icon icon={icon} width={20} height={20} />
								<span className="mt-1 text-center text-xs">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
							</button>
						))}
					</div>

					<div>
						<label htmlFor="iconUrl" className="block text-sm font-medium">
							Social Icon URL
						</label>
						<input
							id="linkUrl"
							type="url"
							className="input"
							value={iconUrl}
							onChange={(e) => setIconUrl(e.target.value)}
							placeholder="Enter link URL"
						/>
					</div>
				</div>

				<div className="input-group">
					<button onClick={handleSubmit} className="btn">
						Add Social Icon
					</button>
					<button onClick={onClose} className="btn text-muted-foreground">
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
