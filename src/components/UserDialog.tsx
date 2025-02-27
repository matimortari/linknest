import { useUpdateDescription, useUpdateImage, useUpdateSlug } from "@/src/hooks/useMutations"
import useUserStore from "@/src/hooks/useUserStore"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import Dialog from "./Dialog"

export default function UserDialog({ isOpen, onClose, onUpdateUser, currentUser }) {
	const { user, setUser } = useUserStore()

	const { data: session, status } = useSession()

	const { mutate: updateSlug } = useUpdateSlug()
	const { mutate: updateDescription } = useUpdateDescription()
	const { mutate: updateImage } = useUpdateImage()

	// Redirect if the user is unauthenticated
	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		if (session?.user) {
			setUser(session.user) // This sets the user data to your store
		}
	}, [session, status, setUser])

	useEffect(() => {
		const { slug, description, image } = user || {}

		if (slug) updateSlug(slug)
		if (description) updateDescription(description)
		if (image) updateImage(image)
	}, [updateSlug, updateDescription, updateImage])

	const handleSubmit = () => {
		// Do something with the updated user data
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
						value={user?.slug || ""}
						onChange={(e) => updateSlug(e.target.value)}
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
						value={user?.description || ""}
						onChange={(e) => updateDescription(e.target.value)}
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
						value={user?.image || ""}
						onChange={(e) => updateImage(e.target.value)}
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
