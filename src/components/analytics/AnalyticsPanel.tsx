import Spinner from "@/src/components/Spinner"
import { useGetAnalytics } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AnalyticsPanel() {
	const { data: stats = [], isLoading: isAnalyticsLoading } = useGetAnalytics()
	const { data: session } = useSession()

	const filteredStats = stats
		.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 30)

	const totalViews = filteredStats.reduce((sum: any, entry: any) => sum + entry.views, 0)
	const totalClicks = filteredStats.reduce((sum: any, entry: any) => sum + entry.linkClicks + entry.iconClicks, 0)
	const clickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0"
	const createdAt = session ? formatDate(session.user.createdAt) : "N/A"

	return (
		<div className="flex flex-col gap-4">
			<header className="my-2 flex flex-col gap-2">
				<h3>Analytics Summary</h3>
				<p className="text-sm font-semibold text-muted-foreground">Your Key Metrics.</p>
			</header>

			{isAnalyticsLoading || !session ? (
				<Spinner />
			) : (
				<div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-4 md:place-items-center">
					<div className="flex flex-row items-center gap-2">
						<Icon icon="material-symbols:table-eye" width={25} height={25} className="text-accent" />
						<div className="flex flex-col items-start">
							<p className="text-xs text-muted-foreground">Total Page Views</p>
							<p className="font-semibold md:text-lg">{totalViews}</p>
						</div>
					</div>

					<div className="flex flex-row items-center gap-2">
						<Icon icon="material-symbols:ads-click" width={25} height={25} className="text-accent" />
						<div className="flex flex-col items-start">
							<p className="text-xs text-muted-foreground">Total Link Clicks</p>
							<p className="font-semibold md:text-lg">{totalClicks}</p>
						</div>
					</div>

					<div className="flex flex-row items-center gap-2">
						<Icon icon="material-symbols:percent" width={25} height={25} className="text-accent" />
						<div className="flex flex-col items-start">
							<p className="text-xs text-muted-foreground">Click Rate</p>
							<p className="font-semibold md:text-lg">{clickRate}%</p>
						</div>
					</div>

					<div className="flex flex-row items-center gap-2">
						<Icon icon="material-symbols:calendar-month" width={25} height={25} className="text-accent" />
						<div className="flex flex-col items-start">
							<p className="text-xs text-muted-foreground">Joined On</p>
							<p className="font-semibold md:text-lg">{createdAt}</p>
						</div>
					</div>
				</div>
			)}

			<hr />

			<header className="my-2 flex flex-col gap-2">
				<h3>Profile Views</h3>
				<p className="text-sm font-semibold text-muted-foreground">Total views for your page over the last 30 days.</p>
			</header>

			{isAnalyticsLoading ? (
				<Spinner />
			) : totalViews === 0 || filteredStats.length > 1 ? (
				<div className="card my-1 text-center font-semibold text-muted-foreground">Not enough data yet.</div>
			) : (
				<ResponsiveContainer height={200}>
					<BarChart data={filteredStats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} className="text-xs">
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip
							cursor={false}
							wrapperClassName="popover text-xs"
							labelClassName="text-foreground font-semibold"
							contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
						/>
						<Bar dataKey="views" fill="#31589c" barSize={25} />
					</BarChart>
				</ResponsiveContainer>
			)}

			<hr />

			<div className="my-2 flex flex-col justify-between gap-2 md:flex-row">
				{["linkClicks", "iconClicks"].map((key) => (
					<div key={key} className="flex w-full flex-col gap-2">
						<header className="my-2 flex flex-col gap-2">
							<h3 className="subtitle">{key === "linkClicks" ? "Link Clicks" : "Social Icon Clicks"}</h3>
							<p className="text-sm font-semibold text-muted-foreground">
								{key === "linkClicks"
									? "Total link clicks over the last 30 days."
									: "Total social icon clicks over the last 30 days."}
							</p>
						</header>

						{isAnalyticsLoading ? (
							<Spinner />
						) : totalClicks === 0 || filteredStats.length > 1 ? (
							<div className="card my-1 text-center font-semibold text-muted-foreground">Not enough data yet.</div>
						) : (
							<ResponsiveContainer height={200}>
								<LineChart
									data={filteredStats}
									margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
									className="text-xs"
								>
									<XAxis dataKey="date" />
									<YAxis />
									<Line
										type="monotone"
										dataKey={key}
										name={key === "linkClicks" ? "Link Clicks" : "Social Icon Clicks"}
										stroke="#31589c"
									/>
									<Tooltip
										cursor={false}
										wrapperClassName="popover text-xs"
										labelClassName="text-foreground font-semibold"
										contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
									/>
								</LineChart>
							</ResponsiveContainer>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
