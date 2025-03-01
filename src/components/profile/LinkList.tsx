import { useDialog } from "@/src/hooks/useDialog"
import { useAddLink, useDeleteLink, useUpdateLink } from "@/src/hooks/useMutations"
import { useGetLinks } from "@/src/hooks/useQueries"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import LinkDialog from "./LinkDialog"

export default function LinkList() {
	const { isOpen, openDialog, closeDialog } = useDialog()

	const { data: userLinks = [] } = useGetLinks()
	const { mutate: addLink } = useAddLink()
	const { mutate: updateLink } = useUpdateLink()
	const { mutate: deleteLink } = useDeleteLink()

	const [selectedLink, setSelectedLink] = useState<UserLink | null>(null)

	const handleUpdateLink = (link: UserLink) => {
		setSelectedLink(link)
		openDialog()
	}

	const handleDeleteLink = (id: string) => {
		deleteLink(id)
	}

	const handleSave = (link: { title: string; url: string }) => {
		if (selectedLink) {
			updateLink({ id: selectedLink.id, ...link })
		} else {
			addLink(link)
		}

		closeDialog()
	}

	return (
		<>
			<header className="my-2">
				<h3>My Links</h3>
				<h6 className="text-muted-foreground">Manage your social links.</h6>
			</header>

			{userLinks.length === 0 ? (
				<h4 className="my-2 text-center text-muted-foreground">No links here yet. Get started!</h4>
			) : (
				<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{userLinks.map((l: UserLink) => (
						<li key={l.id} className="card">
							<div className="flex flex-col gap-2">
								<div className="flex flex-row items-center gap-4">
									<Link href={l.url} target="_blank" rel="noopener noreferrer" className="w-full overflow-hidden">
										<h4 className="truncate">{l.title}</h4>
									</Link>
									<div className="input-group">
										<button onClick={() => handleUpdateLink(l)} title="Edit Link">
											<Icon icon="mdi:circle-edit-outline" width={20} height={20} className="text-accent" />
										</button>
										<button onClick={() => l.id && handleDeleteLink(l.id)} title="Remove Link">
											<Icon
												icon="mdi:remove-circle-outline"
												width={20}
												height={20}
												className="text-danger-foreground"
											/>
										</button>
									</div>
								</div>
								<span className="truncate text-xs text-muted-foreground">{l.url}</span>
							</div>
						</li>
					))}
				</ul>
			)}

			<div className="input-group justify-end">
				<button
					onClick={() => {
						setSelectedLink(null) // When adding a new link, set selectedLink to null
						openDialog()
					}}
					className="btn"
				>
					Add Link
				</button>
				<LinkDialog isOpen={isOpen} onClose={closeDialog} selectedLink={selectedLink} onSave={handleSave} />
			</div>
		</>
	)
}
