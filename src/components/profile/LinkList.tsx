import LinkDialog from "@/src/components/profile/LinkDialog"
import Spinner from "@/src/components/Spinner"
import useDialog from "@/src/hooks/useDialog"
import { useAddLink, useDeleteLink, useUpdateLink } from "@/src/hooks/useMutations"
import { useGetLinks } from "@/src/hooks/useQueries"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"

export default function LinkList() {
	const { isOpen, openDialog, closeDialog } = useDialog()

	const { data: userLinks = [], isLoading: isLinksLoading } = useGetLinks()
	const { mutate: addLink } = useAddLink()
	const { mutate: updateLink } = useUpdateLink()
	const { mutate: deleteLink } = useDeleteLink()

	const [selectedLink, setSelectedLink] = useState<UserLink | null>(null)

	const handleSave = (link: { title: string; url: string }) => {
		if (selectedLink) {
			updateLink({ id: selectedLink.id, ...link })
		} else {
			addLink(link)
		}
		closeDialog()
	}

	return (
		<div className="flex flex-col gap-2">
			<header className="my-2 flex flex-col gap-2">
				<h3>My Links</h3>
				<p className="text-caption text-muted-foreground">Manage your social links.</p>
			</header>

			{isLinksLoading ? (
				<Spinner />
			) : !userLinks?.length ? (
				<p className="text-lead my-2 text-center text-muted-foreground">No links here yet. Get started!</p>
			) : (
				<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{userLinks.map((l: UserLink) => (
						<li key={l.id} className="card">
							<div className="flex flex-col gap-2">
								<div className="flex flex-row items-center gap-4">
									<Link href={l.url} target="_blank" rel="noopener noreferrer" className="w-full overflow-hidden">
										<h5 className="truncate">{l.title}</h5>
									</Link>
									<div className="input-group">
										<button
											onClick={() => {
												setSelectedLink(l)
												openDialog()
											}}
											title="Edit Link"
											className="scale-md"
										>
											<Icon icon="mdi:circle-edit-outline" width={20} height={20} className="text-accent" />
										</button>
										<button onClick={() => l.id && deleteLink(l.id)} title="Remove Link" className="scale-md">
											<Icon
												icon="mdi:remove-circle-outline"
												width={20}
												height={20}
												className="text-danger-foreground"
											/>
										</button>
									</div>
								</div>
								<p className="text-label truncate text-muted-foreground">{l.url}</p>
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
					className="btn-primary"
				>
					<Icon icon="mdi:link-add" width={20} height={20} />
					Add Link
				</button>

				<LinkDialog isOpen={isOpen} onClose={closeDialog} selectedLink={selectedLink} onSave={handleSave} />
			</div>
		</div>
	)
}
