import Carousel from "@/src/components/Carousel"
import { Icon } from "@iconify/react"
import { Bowlby_One, Lato } from "next/font/google"
import Link from "next/link"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "700" })

const features = [
	{
		id: 1,
		title: "Unlimited Links",
		description: "Add as many links or social buttons as you want to your page.",
		icon: "ri:infinity-fill"
	},
	{
		id: 2,
		title: "Fully Customizable",
		description: "Customize the colors, layouts and more for your page.",
		icon: "ri:paint-brush-fill"
	},
	{
		id: 3,
		title: "Detailed Analytics",
		description: "Track your page views, clicks, and more with analytics.",
		icon: "ri:line-chart-fill"
	},
	{
		id: 4,
		title: "Free to Use!",
		description: "Linksy is completely free to use, with no hidden fees.",
		icon: "ri:price-tag-3-fill"
	}
]
export default function Home() {
	return (
		<div className="flex flex-col space-y-10 p-6">
			{/* Hero Section */}
			<div className="flex min-h-screen flex-col items-center justify-center gap-6 md:flex-row">
				<section className="flex flex-col items-start justify-center space-y-4 p-6 md:w-1/2">
					<h3 className={`${lato.className} text-accent`}>Your link-in-bio page 🔗🌐</h3>
					<h1 className={`${bowlby.className} max-w-md text-4xl md:text-5xl`}>Keep all your stuff together!</h1>
					<p className={`${lato.className} max-w-lg text-muted-foreground`}>
						Welcome to <span className="text-accent">Linksy</span>! Your links, profiles, contact info, and more in one
						place. Create and customize your page and share it with your audience.
					</p>
					<div className="flex max-w-md flex-row items-center rounded-2xl border bg-card p-1 pl-3 text-sm text-muted-foreground shadow-2xl">
						<span className="hidden cursor-default sm:inline">linksy-live.vercel.app/</span>
						<span className="cursor-default sm:hidden">@</span>
						<input type="text" placeholder="your_name" className="flex-1 outline-none" />
						<Link href="/login" className="btn bg-primary">
							Get Started!
						</Link>
					</div>
				</section>

				<section className="flex items-center justify-center md:w-1/2">
					<Carousel />
				</section>
			</div>

			{/* Features Section */}
			<div className="flex flex-col items-center justify-center space-y-6 p-6">
				<h2 className="text-center text-3xl font-semibold">Why Choose LinkNest?</h2>
				<div className="grid grid-cols-1 gap-4 px-10 md:grid-cols-4">
					{features.map((feature, index) => (
						<div key={index} className="card">
							<div className="flex flex-row items-center gap-2">
								<span className="rounded-full bg-muted p-2">
									<Icon icon={feature.icon} width={20} height={20} />
								</span>
								<h4>{feature.title}</h4>
							</div>
							<p className="text-sm text-muted-foreground">{feature.description}</p>
						</div>
					))}
				</div>
			</div>

			<div>
				<h1 className="text-center text-3xl font-semibold">Ready to Try?</h1>
				<div className="flex flex-col items-center justify-center space-y-6 p-6">
					<p className="text-center text-muted-foreground">
						<Link href="/auth/login">Sign in</Link> to get started.
					</p>
				</div>
			</div>
		</div>
	)
}
