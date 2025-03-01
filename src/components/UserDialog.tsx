import { useEffect, useState } from "react"
import Dialog from "./Dialog"

export default function UserDialog({ isOpen, onClose, onUpdateUser, currentUser }) {
	const [slug, setSlug] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState("")

	// Pre-fill form fields with currentUser
	useEffect(() => {
		if (currentUser) {
			setSlug(currentUser.slug)
			setDescription(currentUser.description)
			setImage(currentUser.image)
		}
	}, [currentUser])

	const handleSubmit = () => {
		onUpdateUser({
			slug,
			description,
			image
		})
		onClose()
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Edit User Info">
			<div className="space-y-2">
				<div>
					<label htmlFor="slug" className="block text-sm font-medium">
						Slug
					</label>
					<input
						id="slug"
						type="text"
						className="input"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						placeholder="Your unique identifier"
					/>
				</div>

				<div>
					<label htmlFor="description" className="block text-sm font-medium">
						Description
					</label>
					<input
						id="description"
						type="text"
						className="input"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="A short bio about yourself"
					/>
				</div>

				<div>
					<label htmlFor="image" className="block text-sm font-medium">
						Image
					</label>
					<input
						id="image"
						type="url"
						className="input"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						placeholder="Your profile picture URL"
					/>
				</div>

				<div className="input-group">
					<button onClick={handleSubmit} className="btn">
						Save Changes
					</button>
					<button onClick={onClose} className="btn text-muted-foreground">
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
