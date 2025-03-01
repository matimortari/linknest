import { useGetClicksByLink } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"

export default function ClicksByLink() {
	const { data: items } = useGetClicksByLink()

	return (
		<div className="flex flex-col gap-4">
			<header className="my-2 flex flex-col gap-2">
				<h3>Clicks By Link</h3>
				<p className="text-sm font-semibold text-muted-foreground">Your most visited links & social icons.</p>
			</header>

			{!items || items.length === 0 ? (
				<p className="my-2 text-center font-semibold text-muted-foreground">No links or social icons available yet.</p>
			) : (
				<ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
					{items.map((item) => (
						<li key={item.url} className="card">
							{item.type === "link" ? (
								<div className="mb-2 flex flex-row items-center gap-2">
									<h4 className="truncate text-muted-foreground">{item.title}</h4>
									<span className="whitespace-nowrap font-semibold"> - {item.clicks} clicks</span>
								</div>
							) : (
								<div className="mb-2 flex flex-row items-center gap-2">
									{item.icon && <Icon icon={item.icon} className="size-5 text-muted-foreground" />}
									<h4 className="truncate text-muted-foreground">{item.platform}</h4>
									<span className="whitespace-nowrap font-semibold"> - {item.clicks} clicks</span>
								</div>
							)}

							<div className="flex flex-col gap-1">
								<span className="text-xs text-muted-foreground">{item.url}</span>
								<span className="text-xs text-muted-foreground">Created at {formatDate(item.createdAt)}</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
