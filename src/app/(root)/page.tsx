"use client"

import Carousel from "@/src/components/Carousel"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Bowlby_One, Lato } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "700" })

export default function Home() {
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
			description: "Linknest is completely free to use, with no hidden fees.",
			icon: "ri:price-tag-3-fill"
		}
	]

	return (
		<div className="relative">
			<div className="absolute inset-x-0 bottom-0 hidden opacity-20 md:block md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<main className="relative z-10 flex min-h-screen flex-col items-center px-4 py-12 md:px-12 md:py-0">
				<div className="flex w-full flex-col md:flex-row">
					{/* Hero section */}
					<motion.section
						className="flex flex-col md:w-1/2 md:py-20"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="space-y-8 text-center md:space-y-4 md:text-start">
							<h3 className={`${lato.className} text-accent`}>Your link-in-bio page 🔗🌐</h3>
							<h1 className={`${bowlby.className} max-w-md`}>Keep all your stuff together!</h1>
							<p className={`${lato.className} max-w-lg text-muted-foreground`}>
								Welcome to <span className="text-accent">LinkNest</span>! Your links, profiles, contact info, and more
								in one place. Create and customize your page and share it with your audience.
							</p>
							<motion.div
								className="flex max-w-lg flex-row items-center rounded-2xl border bg-card p-1 pl-3 text-sm text-muted-foreground shadow-2xl"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
							>
								<span className="hidden cursor-default sm:inline">linknest-live.vercel.app/</span>
								<span className="cursor-default sm:hidden">@</span>
								<input type="text" placeholder="your_name" className="flex-1 outline-none" />
								<Link href="/login" className="btn-primary">
									Get Started!
								</Link>
							</motion.div>
						</div>
					</motion.section>

					{/* Carousel section */}
					<motion.section
						className="pt-20 md:w-1/2 md:pt-0"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Carousel />
					</motion.section>
				</div>
			</main>

			{/* Features section */}
			<div className="relative z-10 flex flex-col items-center justify-center space-y-8 py-12 text-center">
				<h2>Why Choose LinkNest?</h2>
				<div className="grid grid-cols-1 gap-4 px-10 md:grid-cols-4">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="card text-start"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
						>
							<div className="flex flex-row items-center gap-2">
								<span className="rounded-full bg-muted p-2">
									<Icon icon={feature.icon} width={20} height={20} />
								</span>
								<h4>{feature.title}</h4>
							</div>
							<p className="text-sm text-muted-foreground">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* CTA section */}
			<div className="relative z-10 flex flex-col items-center justify-center space-y-4 border bg-card py-12 text-center">
				<h2>Ready to Try?</h2>
				<p className="font-semibold">Create an account and build your page today!</p>
				<Link href="/login" className="flex flex-row items-center gap-2 rounded-2xl bg-accent p-4 font-semibold">
					Get Started
					<Icon icon="mdi:rocket-launch-outline" width={25} height={25} />
				</Link>
			</div>
		</div>
	)
}
