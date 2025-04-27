"use client"

import Carousel from "@/src/app/(root)/carousel"
import Header from "@/src/components/header"
import { quotes } from "@/src/config/quotes"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: ["700"] })

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

	const { status } = useSession()

	const [randomQuote, setRandomQuote] = useState(quotes[0])

	useEffect(() => {
		if (status === "authenticated") {
			redirect("/profile")
		}
	}, [status])

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * quotes.length)
		setRandomQuote(quotes[randomIndex])
	}, [])

	return (
		<>
			<Header />

			<main className="relative z-10 flex min-h-screen flex-col items-center px-4 py-12 md:px-12 md:py-0">
				<div className="flex w-full flex-col md:flex-row">
					{/* Hero section */}
					<motion.section
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col md:w-1/2 md:py-20"
					>
						<div className="space-y-8 text-center md:space-y-4 md:text-start">
							<h4 className={`${lato.className} text-accent`}>Your link-in-bio page 🔗🌐</h4>

							<motion.h1
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
								className={`${bowlby.className} max-w-md`}
							>
								Keep all your stuff together!
							</motion.h1>

							<p className={`${lato.className} max-w-lg text-muted-foreground`}>
								Welcome to <span className="font-bold text-accent">LinkNest</span>! Your links, profiles, contact info,
								and more in one place. Create and customize your page and share it with your audience.
							</p>
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 200, damping: 10 }}
								className="flex max-w-lg flex-row items-center justify-between rounded-2xl border bg-card p-1 pl-3 text-sm shadow-2xl shadow-accent"
							>
								<span className="hidden cursor-default sm:inline">linknest-live.vercel.app/</span>
								<span className="cursor-default sm:hidden">@</span>
								<input
									type="text"
									placeholder="your_name"
									className="flex-1 appearance-none bg-transparent outline-none"
								/>
								<Link href="/login" className="btn-primary">
									Go!
								</Link>
							</motion.div>
						</div>
					</motion.section>

					{/* Carousel section */}
					<motion.section
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="pt-20 md:w-1/2 md:pt-0"
					>
						<Carousel />
					</motion.section>
				</div>
			</main>

			{/* Features section */}
			<section className="relative z-10 flex flex-col items-center justify-center gap-12 p-12 text-center">
				<div className="absolute -z-10 h-44 w-10/12 bg-accent opacity-20 blur-2xl" />
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className={`${bowlby.className}`}
				>
					Why Choose LinkNest?
				</motion.h2>

				<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="card space-y-2 text-start"
						>
							<div className="flex flex-row items-center gap-2">
								<span className="rounded-full bg-gradient-to-bl from-primary to-secondary p-2 text-[#ebe8e8]">
									<Icon icon={feature.icon} width={20} height={20} />
								</span>
								<h5>{feature.title}</h5>
							</div>
							<p className="text-sm text-muted-foreground">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* CTA section */}
			<section className="relative z-10 flex flex-col items-center justify-center gap-12 border-y bg-card p-12">
				<div
					className="absolute inset-0 -z-10 m-6 opacity-60"
					style={{
						backgroundImage: `
        linear-gradient(to right, var(--muted) 1px, transparent 1px),
        linear-gradient(to bottom, var(--muted) 1px, transparent 1px)
      `,
						backgroundSize: `60px 60px`,
						backgroundPosition: `center`
					}}
				/>

				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className={`${bowlby.className}`}
					>
						Ready to Try?
					</motion.h2>
					<p className="text-lead">Create an account and build your page today!</p>
					<Link href="/login" className="btn-secondary">
						Get Started
					</Link>
				</div>

				<p className="text-center text-xs italic">
					"{randomQuote.quote}" - <span className="text-muted-foreground">{randomQuote.author}</span>
				</p>
			</section>
		</>
	)
}
