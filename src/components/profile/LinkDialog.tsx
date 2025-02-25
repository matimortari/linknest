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
			<div className="space-y-2">
				<div>
					<label htmlFor="linkTitle" className="block text-sm font-medium">
						Link Title
					</label>
					<input
						id="linkTitle"
						type="text"
						className="input"
						value={linkTitle}
						onChange={(e) => setLinkTitle(e.target.value)}
						placeholder="Enter link title"
					/>
				</div>

				<div>
					<label htmlFor="linkUrl" className="block text-sm font-medium">
						Link URL
					</label>
					<input
						id="linkUrl"
						type="url"
						className="input"
						value={linkUrl}
						onChange={(e) => setLinkUrl(e.target.value)}
						placeholder="Enter link URL"
					/>
				</div>

				<div className="input-group">
					<button onClick={handleSubmit} className="btn">
						{selectedLink ? "Update Link" : "Add Link"}
					</button>
					<button onClick={onClose} className="btn text-muted-foreground">
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
