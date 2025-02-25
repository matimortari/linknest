import { useDialog } from "@/src/hooks/useDialog"
import { useAddIcon } from "@/src/hooks/useMutations"
import { useGetIcons } from "@/src/hooks/useQueries"
import { Icon } from "@iconify/react"
import Link from "next/link"
import IconDialog from "./IconDialog"

export default function IconList() {
	const { isOpen, openDialog, closeDialog } = useDialog()

	const { data: userIcons = [] } = useGetIcons()

	const { mutate: addIcon } = useAddIcon()

	const handleSave = (icon: { platform: string; icon: string; url: string }) => {
		addIcon(icon)
		closeDialog()
	}

	return (
		<>
			<header className="my-2">
				<h3>My Social Icons</h3>
				<h6 className="text-muted-foreground">Manage your social icons.</h6>
			</header>

			{userIcons.length === 0 ? (
				<h4 className="my-2 text-center text-muted-foreground">No social icons here yet. Get started!</h4>
			) : (
				<ul className="flex flex-row gap-2">
					{userIcons.map((b: UserIcon) => (
						<li key={b.id} className="card relative">
							<Link href={b.url} title={b.platform} target="_blank" rel="noopener noreferrer">
								<Icon icon={b.icon} width={25} height={25} className="m-1" />
							</Link>
							<button onClick={() => {}} title="Remove Social Button" className="absolute bottom-0 right-0 p-1">
								<Icon icon="mdi:remove-circle-outline" width={20} height={20} className="text-danger" />
							</button>
						</li>
					))}
				</ul>
			)}

			<div className="input-group justify-end">
				<button onClick={openDialog} className="btn">
					Add Social Icon
				</button>
				<IconDialog isOpen={isOpen} onClose={closeDialog} onSave={handleSave} />
			</div>
		</>
	)
}
