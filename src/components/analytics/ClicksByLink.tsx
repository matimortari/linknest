import Spinner from "@/src/components/Spinner"
import { useGetClicksByLink } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"

export default function ClicksByLink() {
	const { data: items = [], isLoading: isClicksByLinkLoading } = useGetClicksByLink()

	return (
		<div className="flex flex-col gap-4">
			<header className="my-2 flex flex-col gap-2">
				<h3>Clicks By Link</h3>
				<p className="text-caption text-muted-foreground">Your most visited links & social icons.</p>
			</header>

			{isClicksByLinkLoading ? (
				<Spinner />
			) : !items.length ? (
				<p className="text-lead my-2 text-center text-muted-foreground">No links or social icons available yet.</p>
			) : (
				<ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
					{items.map((item) => (
						<li key={item.url} className="card">
							{item.type === "link" ? (
								<div className="mb-2 flex flex-row items-center gap-2">
									<h5 className="truncate text-muted-foreground">{item.title}</h5>
									<span className="text-label whitespace-nowrap"> - {item.clicks} clicks</span>
								</div>
							) : (
								<div className="mb-2 flex flex-row items-center gap-2">
									{item.icon && <Icon icon={item.icon} width={20} height={20} className="text-muted-foreground" />}
									<h5 className="truncate text-muted-foreground">{item.platform}</h5>
									<span className="text-label whitespace-nowrap"> - {item.clicks} clicks</span>
								</div>
							)}

							<div className="flex flex-col gap-1">
								<p className="text-label text-muted-foreground">{item.url}</p>
								<p className="text-label text-muted-foreground">Created at {formatDate(item.createdAt)}</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
