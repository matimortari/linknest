import { QRCodeCanvas } from "qrcode.react"
import Dialog from "../Dialog"

export default function QrCodeDialog({ isOpen, onClose, slug }) {
	const handleDownloadQrCode = (slug: string) => {
		const canvas = document.querySelector("canvas")
		if (canvas) {
			const dataUrl = canvas.toDataURL("image/png")
			const link = document.createElement("a")
			link.href = dataUrl
			link.download = `${slug}-qrcode.png`
			link.click()
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Share QR Code">
			<div className="my-4 flex flex-col items-center gap-4">
				<QRCodeCanvas value={`https://linksy-live.vercel.app/${slug}`} size={200} />

				<p className="text-muted-foreground">Scan this QR code to visit your Linksy profile!</p>

				<div className="input-group">
					<button onClick={() => handleDownloadQrCode(slug)} title="Download Your QR Code" className="btn-secondary">
						Download QR Code
					</button>
					<button onClick={onClose} title="Cancel" className="btn">
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
