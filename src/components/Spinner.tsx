import { motion } from "framer-motion"

export default function Spinner() {
	return (
		<div className="flex items-center justify-center p-4">
			<motion.div
				className="size-8 rounded-full border-t-2 border-solid border-accent"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
			/>
		</div>
	)
}
