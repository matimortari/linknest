"use client"

import Carousel from "@/src/components/Carousel"
import Header from "@/src/components/Header"
import quotes from "@/src/config/quotes.json"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Bowlby_One, Lato } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] })

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

	const [randomQuote, setRandomQuote] = useState(quotes[0])

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * quotes.length)
		setRandomQuote(quotes[randomIndex])
	}, [])

	return (
		<>
			<Header />

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
								<motion.h4
									className={`${lato.className} font-bold text-accent`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 }}
								>
									Your link-in-bio page 🔗🌐
								</motion.h4>

								<motion.h1
									className={`${bowlby.className} max-w-md`}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8, ease: "easeOut" }}
								>
									Keep all your stuff together!
								</motion.h1>

								<motion.p
									className={`${lato.className} max-w-lg text-muted-foreground`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									Welcome to <span className="font-bold text-accent">LinkNest</span>! Your links, profiles, contact
									info, and more in one place. Create and customize your page and share it with your audience.
								</motion.p>
								<motion.div
									className="flex max-w-lg flex-row items-center rounded-2xl border bg-card p-1 pl-3 text-sm text-muted-foreground shadow-2xl"
									whileHover={{ scale: 1.05 }}
									transition={{ type: "spring", stiffness: 400, damping: 10 }}
								>
									<span className="hidden cursor-default sm:inline">linknest-live.vercel.app/</span>
									<span className="cursor-default sm:hidden">@</span>
									<input type="text" placeholder="your_name" className="flex-1 outline-none" />
									<Link href="/login" className="btn-primary">
										Go!
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
				<section className="relative z-10 flex flex-col items-center justify-center gap-12 py-12 text-center">
					<motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						Why Choose LinkNest?
					</motion.h2>

					<div className="grid grid-cols-1 gap-4 px-10 md:grid-cols-4">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								className="card space-y-2 text-start"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<div className="flex flex-row items-center gap-2">
									<span className="rounded-full bg-gradient-to-tr from-accent to-muted p-2">
										<Icon icon={feature.icon} width={20} height={20} />
									</span>
									<h4>{feature.title}</h4>
								</div>
								<p className="text-sm text-muted-foreground">{feature.description}</p>
							</motion.div>
						))}
					</div>
				</section>

				{/* CTA section */}
				<section className="relative z-10 flex w-full flex-col items-center justify-center gap-12 border-y bg-card p-12">
					<div className="flex flex-col items-center justify-center gap-4">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Ready to Try?
						</motion.h2>
						<p className="text-center font-medium">Create an account and build your page today!</p>
						<Link href="/login" className="btn-secondary">
							Get Started
							<Icon icon="mdi:rocket-launch-outline" width={25} height={25} />
						</Link>
					</div>

					<p className="text-center text-xs italic">
						"{randomQuote.quote}" - <span className="font-medium text-muted-foreground">{randomQuote.author}</span>
					</p>
				</section>
			</div>
		</>
	)
}
