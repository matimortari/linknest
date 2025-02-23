"use client"

import { Icon } from "@iconify/react"
import { signIn } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "700" })

export default function Login() {
	return (
		<div className="flex min-h-screen">
			<main className="flex w-1/2 flex-col items-center justify-center p-10">
				<header className="my-8 flex w-full flex-col items-center gap-4">
					<h1 className={`${bowlby.className}`}>Sign In</h1>
					<h5 className={`${lato.className} text-muted-foreground`}>Sign in with Google or GitHub to continue.</h5>
				</header>

				<hr className="w-full" />

				<div className="my-8 flex w-full flex-col items-center gap-2">
					<button
						onClick={() => signIn("google", { callbackUrl: "/profile" })}
						className="btn w-full max-w-xs bg-[#db4437] text-white"
					>
						<Icon icon="simple-icons:google" width={20} height={20} />
						Sign in with Google
					</button>
					<button
						onClick={() => signIn("github", { callbackUrl: "/profile" })}
						className="btn w-full max-w-xs bg-[#333333] text-white"
					>
						<Icon icon="simple-icons:github" width={20} height={20} />
						Sign in with GitHub
					</button>
				</div>
			</main>

			<aside className="relative hidden w-1/2 md:block">
				<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#db4437] to-[#333333]" />
				{/* <Image src="/login-image.jpg" alt="Login Visual" layout="fill" objectFit="cover" /> */}
			</aside>
		</div>
	)
}
