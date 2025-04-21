import IconDialog from "@/src/app/(admin)/profile/icon-dialog"
import Spinner from "@/src/components/spinner"
import useDialog from "@/src/hooks/use-dialog"
import { useAddIcon, useDeleteIcon } from "@/src/hooks/use-mutations"
import { useGetIcons } from "@/src/hooks/use-queries"
import { Icon } from "@iconify/react"
import Link from "next/link"

export default function IconList() {
	const { isOpen, openDialog, closeDialog } = useDialog()

	const { data: userIcons = [], isLoading: isIconsLoading } = useGetIcons()
	const { mutate: addIcon } = useAddIcon()
	const { mutate: deleteIcon } = useDeleteIcon()

	const handleSave = (icon: { platform: string; icon: string; url: string }) => {
		addIcon(icon)
		closeDialog()
	}

	return (
		<div className="flex flex-col gap-2">
			<header className="my-2 flex flex-col gap-2">
				<h3>My Social Icons</h3>
				<p className="text-caption text-muted-foreground">Manage your social icons.</p>
			</header>

			{isIconsLoading ? (
				<Spinner />
			) : !userIcons?.length ? (
				<p className="text-lead my-2 text-center text-muted-foreground">No social icons here yet. Get started!</p>
			) : (
				<ul className="flex flex-row gap-2">
					{userIcons.map((b: UserIcon) => (
						<li key={b.id} className="card relative">
							<Link href={b.url} title={b.platform} target="_blank" rel="noopener noreferrer">
								<Icon icon={b.icon} width={25} height={25} className="m-1" />
							</Link>
							<button
								onClick={() => b.id && deleteIcon(b.id)}
								title="Remove Social Icon"
								className="scale-md absolute bottom-0 right-0 p-1"
							>
								<Icon icon="mdi:remove-circle-outline" width={20} height={20} className="text-danger-foreground" />
							</button>
						</li>
					))}
				</ul>
			)}

			<div className="input-group justify-end">
				<button onClick={openDialog} className="btn-primary">
					<Icon icon="mdi:favorite-add" width={20} height={20} />
					Add Social Icon
				</button>

				<IconDialog isOpen={isOpen} onClose={closeDialog} onSave={handleSave} />
			</div>
		</div>
	)
}
