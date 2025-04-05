import Dialog from "@/src/components/Dialog"
import { linkSchema, LinkSchemaType } from "@/src/lib/formSchema"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function LinkDialog({ isOpen, onClose, selectedLink, onSave }: LinkDialogProps) {
	const [linkTitle, setLinkTitle] = useState("")
	const [linkUrl, setLinkUrl] = useState("")
	const [errors, setErrors] = useState<Partial<LinkSchemaType>>({})

	// Clear or pre-fill form depending on dialog state
	useEffect(() => {
		if (isOpen) {
			if (selectedLink) {
				setLinkTitle(selectedLink.title)
				setLinkUrl(selectedLink.url)
			} else {
				setLinkTitle("")
				setLinkUrl("")
			}
			setErrors({})
		}
	}, [isOpen, selectedLink])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const validation = linkSchema.safeParse({ title: linkTitle, url: linkUrl })

		if (!validation.success) {
			const fieldErrors = validation.error.format()
			setErrors({
				title: fieldErrors.title?._errors[0],
				url: fieldErrors.url?._errors[0]
			})
			return
		}

		onSave({ title: linkTitle, url: linkUrl })
		onClose()
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={selectedLink ? "Edit Link" : "Add Link"}>
			<form onSubmit={handleSubmit} className="space-y-4">
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
						className="card text-caption text-muted-foreground"
					/>
					{errors.title && <p className="text-caption text-danger-foreground">{errors.title}.</p>}
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
						className="card text-caption text-muted-foreground"
					/>
					{errors.url && <p className="text-caption text-danger-foreground">{errors.url}.</p>}
				</div>

				<div className="input-group">
					<button type="submit" className="btn-secondary">
						<Icon icon="mdi:check-circle" width={20} height={20} />
						{selectedLink ? "Update Link" : "Add Link"}
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
