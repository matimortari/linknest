import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import Dialog from "../Dialog"

export default function LinkDialog({ isOpen, onClose, selectedLink, onSave }: LinkDialogProps) {
	const [linkTitle, setLinkTitle] = useState("")
	const [linkUrl, setLinkUrl] = useState("")

	// Pre-fill the form if a link is selected for editing
	useEffect(() => {
		if (selectedLink) {
			setLinkTitle(selectedLink.title)
			setLinkUrl(selectedLink.url)
		} else {
			setLinkTitle("")
			setLinkUrl("")
		}
	}, [selectedLink])

	const handleSubmit = () => {
		if (linkTitle && linkUrl) {
			onSave({ title: linkTitle, url: linkUrl })
			onClose()
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={selectedLink ? "Edit Link" : "Add Link"}>
			<div className="space-y-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="linkTitle" className="font-semibold">
						Link Title
					</label>
					<input
						id="linkTitle"
						type="text"
						value={linkTitle}
						onChange={(e) => setLinkTitle(e.target.value)}
						placeholder="Enter link title"
						className="rounded-2xl border p-2 text-sm"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="linkUrl" className="font-semibold">
						Link URL
					</label>
					<input
						id="linkUrl"
						type="url"
						value={linkUrl}
						onChange={(e) => setLinkUrl(e.target.value)}
						placeholder="Enter link URL"
						className="rounded-2xl border p-2 text-sm"
					/>
				</div>

				<div className="input-group">
					<button onClick={handleSubmit} className="btn-secondary">
						<Icon icon="mdi:check-circle" width={20} height={20} />
						{selectedLink ? "Update Link" : "Add Link"}
					</button>
					<button onClick={onClose} className="btn">
						<Icon icon="mdi:close-circle" width={20} height={20} />
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
