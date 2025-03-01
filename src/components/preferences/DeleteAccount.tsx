import { useDeleteUser } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"

export default function DeleteAccount() {
	const { mutate: deleteUser, isPending, error } = useDeleteUser()

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
		<div className="">
			<header className="my-2">
				<h2>Delete Account</h2>
				<h6 className="text-danger">This action is irreversible. All data will be lost.</h6>
			</header>
			<div className="input-group justify-end md:justify-start">
				<button onClick={handleDeleteAccount} title="Delete Account" className="btn bg-danger">
					<Icon icon="mdi:user-remove" width={20} height={20} />
					{isPending ? "Deleting..." : "Delete Account"}
				</button>
			</div>

			{error && <div className="mt-2 text-danger">{error.message}</div>}
		</div>
	)
}
