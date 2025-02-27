import { useGetClicksByLink } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"

export default function ClicksByLink() {
	const { data: items } = useGetClicksByLink()

	return (
		<>
			<header className="my-2">
				<h2>Clicks By Link</h2>
				<h6 className="text-muted-foreground">Your most visited links & social icons.</h6>
			</header>

			{!items || items.length === 0 ? (
				<h4 className="my-2 text-center text-muted-foreground">No links or social icons available yet.</h4>
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
		</>
	)
}
