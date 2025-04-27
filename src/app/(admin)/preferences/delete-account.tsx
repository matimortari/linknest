import { useDeleteUser } from "@/src/hooks/use-mutations"
import { Icon } from "@iconify/react"

export default function DeleteAccount() {
	const { mutate: deleteUser, error } = useDeleteUser()

	const handleDeleteAccount = () => {
		const confirm = window.confirm("Are you sure you want to delete your account?")
		if (!confirm) return false

		deleteUser(undefined, {
			onSuccess: () => {
				window.location.href = "/"
			},
			onError: (err) => {
				alert(error || err.message || "An error occurred while deleting the account.")
			}
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<header className="my-2 flex flex-col gap-2">
				<h3>Delete Account</h3>
				<p className="text-caption text-danger-foreground">This action is irreversible. All data will be lost.</p>
			</header>

			<div className="input-group justify-end lg:justify-start">
				<button onClick={handleDeleteAccount} title="Delete Account" className="btn-danger">
					<Icon icon="mdi:user-remove" width={20} height={20} />
					Delete Account
				</button>
			</div>

			{error && <div className="mt-2 text-danger-foreground">{error.message}</div>}
		</div>
	)
}
