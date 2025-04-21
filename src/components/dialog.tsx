import { AnimatePresence, motion } from "framer-motion"
import { JSX, useEffect, useRef } from "react"

export default function Dialog({ isOpen, onClose, title, children }): JSX.Element | null {
	const dialogRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Handle keyboard events for closing the dialog and submitting the form
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
			if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
				const form = e.target.form
				if (form) {
					e.preventDefault()
					form.requestSubmit()
				}
			}
		}

		// Handle clicks outside the dialog to close it
		const handleClickOutside = (e: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				onClose()
			}
		}

		// Add event listeners when the dialog opens
		if (isOpen) {
			document.documentElement.style.overflow = "hidden" // Prevent body scroll when dialog is open
			window.addEventListener("keydown", handleKeyDown) // Listen for keyboard events
			document.addEventListener("mousedown", handleClickOutside) // Listen for clicks outside
		} else {
			document.documentElement.style.overflow = ""
		}

		// Cleanup event listeners when the dialog closes or component unmounts
		return () => {
			document.documentElement.style.overflow = "" // Reset overflow style
			window.removeEventListener("keydown", handleKeyDown) // Remove keyboard event listener
			document.removeEventListener("mousedown", handleClickOutside) // Remove click outside event listener
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
				>
					<motion.div
						ref={dialogRef}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="popover min-w-96 max-w-full"
					>
						<header>
							<h3>{title}</h3>
						</header>

						<hr className="my-2" />

						<main>{children}</main>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
