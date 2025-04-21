import QrCodeDialog from "@/src/app/(admin)/profile/qr-code-dialog"
import useUserStore from "@/src/hooks/use-store"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"

function ShareDropdown({ isOpen, onClose }) {
	const { user } = useUserStore()

	const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false)

	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest(".popover")) onClose()
	}

	const handleCopy = () => {
		const pageUrl = `https://linknest-live.vercel.app/${user?.slug}`
		navigator.clipboard.writeText(pageUrl)
		alert("Link copied to clipboard!")
	}

	const handleShareX = () => {
		const pageUrl = `https://linknest-live.vercel.app/${user?.slug}`
		const tweetText = `🚀 Check out my #LinkNest profile! 🌟\n\n🔗 ${pageUrl}`
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
		window.open(twitterUrl, "_blank")
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("click", handleClickOutside)
		} else {
			document.removeEventListener("click", handleClickOutside)
		}
		return () => document.removeEventListener("click", handleClickOutside)
	}, [isOpen])

	return (
		<>
			{isOpen && (
				<div className="popover absolute right-0 top-full">
					<div className="flex flex-col items-start gap-2 text-xs font-semibold">
						<button onClick={handleCopy} className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-muted">
							<Icon icon="mdi:clipboard-multiple-outline" width={20} height={20} />
							Copy Link
						</button>
						<button onClick={handleShareX} className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-muted">
							<Icon icon="simple-icons:x" width={20} height={20} />
							Share on X
						</button>
						<button
							onClick={() => setIsQrCodeDialogOpen(true)}
							className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-muted"
						>
							<Icon icon="mdi:qrcode" width={20} height={20} />
							Get QR Code
						</button>
					</div>
				</div>
			)}

			{isQrCodeDialogOpen && (
				<QrCodeDialog isOpen={isQrCodeDialogOpen} onClose={() => setIsQrCodeDialogOpen(false)} slug={user?.slug} />
			)}
		</>
	)
}

export default function ShareBanner() {
	const { user } = useUserStore()

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	return (
		<div className="relative mt-2 flex max-w-lg flex-row justify-between gap-2 rounded-2xl border bg-muted p-2">
			<div className="flex w-full flex-col gap-1 overflow-x-hidden">
				<h5 className="text-foreground">Share your Page:</h5>
				<Link
					href={`/${user?.slug}`}
					title={`linknest-live.vercel.app/${user?.slug}`}
					className="text-label truncate hover:underline"
				>
					linknest-live.vercel.app/{user?.slug}
				</Link>
			</div>

			<div className="input-group">
				<button
					onClick={() => setIsDropdownOpen((prev) => !prev)}
					title="See sharing options"
					className="btn-secondary"
				>
					<Icon icon="mdi:share-variant" width={20} height={20} />
					Share Now
				</button>
			</div>

			<ShareDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
		</div>
	)
}
