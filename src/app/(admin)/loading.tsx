"use client"

import { motion } from "framer-motion"

export default function Loading() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
			<motion.div
				className="h-1 w-1/2 rounded-full bg-gradient-to-tr from-accent to-muted"
				initial={{ width: 0 }}
				animate={{ width: "10%" }}
				transition={{
					repeat: Infinity,
					duration: 2,
					ease: "linear"
				}}
			/>

			<motion.p
				className="text-sm font-semibold text-muted-foreground"
				animate={{ opacity: [0.3, 1, 0.3] }}
				transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
			>
				Loading
				<motion.span animate={{ opacity: [0, 1, 0], transition: { duration: 1, repeat: Infinity } }}>.</motion.span>
				<motion.span animate={{ opacity: [0, 1, 0], transition: { duration: 1, repeat: Infinity, delay: 0.3 } }}>
					.
				</motion.span>
				<motion.span animate={{ opacity: [0, 1, 0], transition: { duration: 1, repeat: Infinity, delay: 0.6 } }}>
					.
				</motion.span>
			</motion.p>
		</div>
	)
}
