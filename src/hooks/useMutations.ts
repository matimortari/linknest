import { addIcon, deleteIcon } from "@/src/services/iconsService"
import { addLink, deleteLink, updateLink } from "@/src/services/linksService"
import { resetPreferences, updatePreferences, updateSupportBanner } from "@/src/services/preferencesService"
import { deleteUser, updateDescription, updateImage, updateSlug } from "@/src/services/userService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateSlug() {
	return useMutation({
		mutationKey: ["updateSlug"],
		mutationFn: updateSlug
	})
}

export function useUpdateDescription() {
	return useMutation({
		mutationKey: ["updateDescription"],
		mutationFn: updateDescription
	})
}

export function useUpdateImage() {
	return useMutation({
		mutationKey: ["updateImage"],
		mutationFn: updateImage
	})
}

export function useAddLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addLink"],
		mutationFn: addLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getLinks"] })
		}
	})
}

export function useUpdateLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateLink"],
		mutationFn: updateLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getLinks"] })
		}
	})
}

export function useDeleteLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteLink"],
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getLinks"] })
		}
	})
}

export function useAddIcon() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addIcon"],
		mutationFn: addIcon,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getIcons"] })
		}
	})
}

export function useDeleteIcon() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteIcon"],
		mutationFn: (id: string) => deleteIcon(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getIcons"] })
		}
	})
}

export function useUpdatePreferences() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updatePreferences"],
		mutationFn: updatePreferences,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getPreferences"] })
		}
	})
}

export function useResetPreferences() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["resetPreferences"],
		mutationFn: resetPreferences,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getPreferences"] })
		}
	})
}

export function useUpdateSupportBanner() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSupportBanner"],
		mutationFn: updateSupportBanner,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getSettings"] })
		}
	})
}

export function useDeleteUser() {
	return useMutation({
		mutationKey: ["deleteUser"],
		mutationFn: deleteUser
	})
}
