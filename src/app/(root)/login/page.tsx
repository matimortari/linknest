"use client"

import { Icon } from "@iconify/react"
import { signIn } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "700" })

export default function Login() {
	return (
		<div className="flex min-h-screen">
			<div className="flex flex-col items-center p-10 md:w-1/2 md:justify-center">
				<header className="my-8 flex w-full flex-col items-center gap-6">
					<h1 className={`${bowlby.className}`}>Sign In</h1>
					<p className={`${lato.className} text-muted-foreground`}>Sign in with Google or GitHub to continue.</p>
				</header>

				<hr className="w-full" />

				<section className="my-8 flex w-full flex-col items-center gap-4">
					<button
						onClick={() => signIn("google", { callbackUrl: "/profile" })}
						className="btn max-w-xs bg-[#db4437] text-white"
					>
						<Icon icon="simple-icons:google" width={20} height={20} />
						Sign in with Google
					</button>
					<button
						onClick={() => signIn("github", { callbackUrl: "/profile" })}
						className="btn max-w-xs bg-[#333333] text-white"
					>
						<Icon icon="simple-icons:github" width={20} height={20} />
						Sign in with GitHub
					</button>
				</section>
			</div>

			<section className="relative hidden md:block md:w-1/2">
				<div className="absolute inset-0 rounded-l-lg bg-gradient-to-r from-[#db4437] to-[#333333]" />
				{/* <Image src="/login-image.jpg" alt="Login Visual" layout="fill" objectFit="cover" /> */}
			</section>
		</div>
	)
}
