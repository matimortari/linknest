import { motion } from "framer-motion"

export default function Spinner() {
	return (
		<div className="flex items-center justify-center p-4">
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
				className="size-8 rounded-full border-t-2 border-solid border-accent"
			/>
		</div>
	)
}
