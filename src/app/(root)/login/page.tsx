"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"
import Image from "next/image"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "700" })

export default function Login() {
	return (
		<div className="min-h-screen md:flex">
			<motion.div
				className="flex flex-col items-center p-10 md:w-1/2 md:justify-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<Image src="/logo.png" alt="LinkNest Logo" width={80} height={80} />
				</motion.div>

				<motion.header
					className="my-8 flex w-full flex-col items-center gap-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<h2 className={`${bowlby.className}`}>Sign In</h2>
					<p className={`${lato.className} text-muted-foreground`}>Sign in with Google or GitHub to continue.</p>
				</motion.header>

				<hr className="w-full" />

				<motion.section
					className="my-8 flex w-full flex-col items-center gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<button onClick={() => signIn("google", { callbackUrl: "/profile" })} className="btn max-w-xs bg-[#db4437]">
						<Icon icon="simple-icons:google" width={20} height={20} />
						Sign in with Google
					</button>
					<button onClick={() => signIn("github", { callbackUrl: "/profile" })} className="btn max-w-xs bg-[#333333]">
						<Icon icon="simple-icons:github" width={20} height={20} />
						Sign in with GitHub
					</button>
				</motion.section>
			</motion.div>

			<motion.section
				className="relative hidden md:block md:w-1/2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<Image
					src="/login-image.png"
					alt="Sign In Visual"
					fill
					unoptimized={true}
					priority
					className="rounded-b-xl border-l object-cover"
				/>
			</motion.section>
		</div>
	)
}
