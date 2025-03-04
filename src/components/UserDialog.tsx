import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useUpdateDescription, useUpdateImage, useUpdateSlug } from "../hooks/useMutations"
import useUserStore from "../hooks/useUserStore"
import { userSchema, UserSchemaType } from "../lib/formSchema"
import Dialog from "./Dialog"

export default function UserDialog({ isOpen, onClose }) {
	const { user, updateUser } = useUserStore()

	const { mutate: updateSlug } = useUpdateSlug()
	const { mutate: updateDescription } = useUpdateDescription()
	const { mutate: updateImage } = useUpdateImage()

	const [slug, setSlug] = useState(user?.slug)
	const [description, setDescription] = useState(user?.description)
	const [image, setImage] = useState(user?.image)
	const [errors, setErrors] = useState<Partial<UserSchemaType>>({})

	useEffect(() => {
		if (user) {
			setSlug(user.slug)
			setDescription(user.description)
			setImage(user.image)
			setErrors({})
		}
	}, [user, isOpen])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const validation = userSchema.safeParse({ slug, description, image })

		if (!validation.success) {
			const fieldErrors = validation.error.format()
			setErrors({
				slug: fieldErrors.slug?._errors[0],
				description: fieldErrors.description?._errors[0],
				image: fieldErrors.image?._errors[0]
			})
			return
		}

		let userUpdated = false

		if (slug !== user?.slug) {
			updateSlug(slug || "")
			userUpdated = true
		}
		if (description !== user?.description) {
			updateDescription(description || "")
			userUpdated = true
		}
		if (image !== user?.image) {
			updateImage(image || "")
			userUpdated = true
		}

		if (userUpdated) {
			updateUser({
				...user,
				slug,
				description,
				image
			})
		}

		onClose()
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Edit User Info">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="slug" className="font-semibold">
						Slug
					</label>
					<input
						id="slug"
						type="text"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						placeholder="Your unique identifier"
						className="rounded-2xl border p-2 text-sm"
					/>
					{errors.slug && <p className="text-sm font-semibold text-danger-foreground">{errors.slug}</p>}
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="description" className="font-semibold">
						Description
					</label>
					<input
						id="description"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="A short bio about yourself"
						className="rounded-2xl border p-2 text-sm"
					/>
					{errors.description && <p className="text-sm font-semibold text-danger-foreground">{errors.description}</p>}
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="image" className="font-semibold">
						Image
					</label>
					<input
						id="image"
						type="url"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						placeholder="Your profile picture URL"
						className="rounded-2xl border p-2 text-sm"
					/>
					{errors.image && <p className="text-sm font-semibold text-danger-foreground">{errors.image}</p>}
				</div>

				<div className="input-group">
					<button type="submit" className="btn-secondary">
						<Icon icon="mdi:content-save-check" width={20} height={20} />
						Save Changes
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
